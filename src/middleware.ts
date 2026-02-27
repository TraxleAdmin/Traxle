// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 1. KİLİTLENMEYECEK ROTALAR (Whitelist)
// Bu yollar bakım modunda olsa bile ERİŞİLEBİLİR kalacak.
const ADMIN_PATHS = ['/panel/admin', '/api/auth', '/api/admin'];
const PUBLIC_ASSETS = ['/_next', '/favicon.ico', '/public', '/images'];

export async function middleware(request: NextRequest) {
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

  // ----------------------------------------------------------------------
  // KURAL 3: Killswitch (Bakım Modu) Kontrolü
  // ----------------------------------------------------------------------
  
  // NOT: Gerçek senaryoda bu değeri Veritabanından (Redis/DB) veya 
  // Environment variable'dan çekmen gerekecek.
  // Şimdilik admin panelinden bir API ile bu durumu kontrol ettiğini varsayıyoruz.
  
  // Örnek: const maintenanceMode = await checkDatabaseForMaintenance();
  // Şimdilik "false" diyerek sistemi açık tutuyorum. 
  // Admin panelindeki butona bağlayacağımız yer burası.
  const isMaintenanceActive = false; // <-- BU DEĞER DB'DEN GELECEK

  // Eğer Bakım Modu AÇIKSA ve kullanıcı Bakım Sayfasında DEĞİLSE -> Yönlendir
  if (isMaintenanceActive && pathname !== '/maintenance') {
    const url = request.nextUrl.clone();
    url.pathname = '/maintenance';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// Hangi yollarda çalışacağını belirtiyoruz (Tüm yollar)
export const config = {
  matcher: '/:path*',
}