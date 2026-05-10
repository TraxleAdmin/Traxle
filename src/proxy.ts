import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  DEFAULT_LOCALE,
  LEGACY_REDIRECTS,
  isLocale,
  localizedPath,
} from "@/lib/i18n/routes";

const INTERNAL_PREFIXES = ["/_next", "/api", "/favicon.ico", "/robots.txt", "/sitemap.xml"];
const PASSTHROUGH_PREFIXES = ["/panel", "/odeme", "/giris", "/kayit-ol", "/sifre-yenile", "/sifremi-unuttum"];
const PUBLIC_FILE_REGEX = /\.[^/]+$/;

function isInternalPath(pathname: string): boolean {
  return INTERNAL_PREFIXES.some((prefix) => pathname.startsWith(prefix)) || PUBLIC_FILE_REGEX.test(pathname);
}

function isPassthroughPath(pathname: string): boolean {
  return PASSTHROUGH_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function normalizePath(pathname: string): string {
  return pathname.replace(/^\/+|\/+$/g, "");
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isInternalPath(pathname) || isPassthroughPath(pathname)) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] && isLocale(segments[0])) {
    return NextResponse.next();
  }

  const normalized = normalizePath(pathname);
  const legacyRouteKey = LEGACY_REDIRECTS[normalized];
  if (legacyRouteKey) {
    const url = request.nextUrl.clone();
    url.pathname = localizedPath(legacyRouteKey, DEFAULT_LOCALE);
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}`;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
