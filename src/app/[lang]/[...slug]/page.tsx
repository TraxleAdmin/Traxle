import { notFound, redirect } from "next/navigation";
import {
  LocalizedAbout,
  LocalizedGenericPage,
  LocalizedProductPage,
  LocalizedProductPrivacy,
  LocalizedProductsHub,
} from "@/components/localized/LocalizedPages";
import {
  LOCALES,
  ROUTE_SLUGS,
  RouteKey,
  isLocale,
  localizedPath,
  matchRouteKey,
  Locale,
} from "@/lib/i18n/routes";

const PRODUCT_ROUTE_KEYS: RouteKey[] = ["molatik", "kunyex", "logistics"];
const PRODUCT_PRIVACY_ROUTE_KEYS: RouteKey[] = ["molatikPrivacy", "kunyexPrivacy"];
const LEGACY_PRODUCT_ROUTES: Record<string, RouteKey> = {
  molatik: "molatik",
  kunyex: "kunyex",
  logistics: "logistics",
};

function legacyProductsRedirect(locale: Locale, segments: string[]) {
  if (segments[0] !== "products") return null;
  if (segments.length === 1) return localizedPath("products", locale);

  const routeKey = LEGACY_PRODUCT_ROUTES[segments[1]];
  if (segments.length === 2 && routeKey) return localizedPath(routeKey, locale);

  return null;
}

function renderByRoute(routeKey: RouteKey, locale: Locale) {
  if (routeKey === "about") return <LocalizedAbout locale={locale} />;
  if (routeKey === "products") return <LocalizedProductsHub locale={locale} />;

  if (PRODUCT_ROUTE_KEYS.includes(routeKey)) {
    return <LocalizedProductPage locale={locale} routeKey={routeKey} />;
  }

  if (PRODUCT_PRIVACY_ROUTE_KEYS.includes(routeKey)) {
    return <LocalizedProductPrivacy locale={locale} routeKey={routeKey} />;
  }

  if (routeKey === "home") return null;

  return <LocalizedGenericPage locale={locale} routeKey={routeKey} />;
}

export function generateStaticParams() {
  const routeKeys = Object.keys(ROUTE_SLUGS) as RouteKey[];
  const params: { lang: Locale; slug: string[] }[] = [];

  for (const lang of LOCALES) {
    for (const routeKey of routeKeys) {
      if (routeKey === "home") continue;
      params.push({ lang, slug: ROUTE_SLUGS[routeKey][lang] });
    }
  }

  return params;
}

export default async function LocalizedCatchAllPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string[] }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const segments = slug ?? [];
  const routeKey = matchRouteKey(lang, segments);
  if (!routeKey || routeKey === "home") {
    const redirectTo = legacyProductsRedirect(lang, segments);
    if (redirectTo) redirect(redirectTo);
    notFound();
  }

  const page = renderByRoute(routeKey, lang);
  if (!page) notFound();

  return page;
}
