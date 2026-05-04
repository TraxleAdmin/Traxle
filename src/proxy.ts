// src/proxy.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  defaultLocale,
  getCanonicalRouteKey,
  getLocalizedPath,
  getMolatikPrivacyPath,
  isLocale,
  isMolatikPrivacySlug,
  resolveLocalizedRouteKey,
} from '@/lib/i18n';

// 1. KİLİTLENMEYECEK ROTALAR (Whitelist)
// Bu yollar bakım modunda olsa bile ERİŞİLEBİLİR kalacak.
const ADMIN_PATHS = ['/panel/admin', '/api/auth', '/api/admin'];
const PUBLIC_ASSETS = ['/_next', '/favicon.ico', '/public', '/images'];

function getRequestHeadersWithLocale(request: NextRequest) {
  const segment = request.nextUrl.pathname.split('/').filter(Boolean)[0];
  const locale = isLocale(segment) ? segment : defaultLocale;
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set('x-traxle-locale', locale);
  requestHeaders.set('x-traxle-dir', locale === 'ar' ? 'rtl' : 'ltr');

  return requestHeaders;
}

// 🔥 KRİTİK DEĞİŞİKLİK BURADA: "export default async function proxy" olarak güncellendi.
function decodePathname(pathname: string) {
  try {
    return decodeURIComponent(pathname);
  } catch {
    return pathname;
  }
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ----------------------------------------------------------------------
  // KURAL 1: Admin Paneli ve API'ler ASLA engellenemez (Senin Can Simidin)
  // ----------------------------------------------------------------------
  if (ADMIN_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // ----------------------------------------------------------------------
  // KURAL 2: Statik dosyalar (Resimler, CSS, JS) engellenemez
  // Yoksa bakım sayfası bozuk görünür.
  // ----------------------------------------------------------------------
  if (PUBLIC_ASSETS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const segments = pathname.split('/').filter(Boolean);
  const locale = segments[0];
  const decodedPathname = decodePathname(pathname);

  if (isLocale(locale) && segments[1] === 'molatik' && isMolatikPrivacySlug(segments[2])) {
    const target = getMolatikPrivacyPath(locale);

    if (decodedPathname !== target) {
      const url = request.nextUrl.clone();
      url.pathname = target;
      return NextResponse.redirect(url, 308);
    }
  }

  const routeKey = isLocale(locale)
    ? resolveLocalizedRouteKey(locale, segments[1]) ?? getCanonicalRouteKey(segments[1])
    : null;

  if (isLocale(locale) && routeKey) {
    const target = getLocalizedPath(locale, routeKey, segments.slice(2));

    if (decodedPathname !== target) {
      const url = request.nextUrl.clone();
      url.pathname = target;
      return NextResponse.redirect(url, 308);
    }
  }

  // ----------------------------------------------------------------------
  // KURAL 3: Killswitch (Bakım Modu) Kontrolü
  // ----------------------------------------------------------------------

  const isMaintenanceActive = false; // <-- BU DEĞER DB'DEN GELECEK

  // Eğer Bakım Modu AÇIKSA ve kullanıcı Bakım Sayfasında DEĞİLSE -> Yönlendir
  if (isMaintenanceActive && pathname !== '/maintenance') {
    const url = request.nextUrl.clone();
    url.pathname = '/maintenance';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next({
    request: {
      headers: getRequestHeadersWithLocale(request),
    },
  });
}

// Hangi yollarda çalışacağını belirtiyoruz (Tüm yollar)
export const config = {
  matcher: '/:path*',
}
