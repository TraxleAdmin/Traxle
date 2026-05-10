import { notFound } from "next/navigation";
import {
  LocalizedAbout,
  LocalizedGenericPage,
  LocalizedProductPage,
  LocalizedProductPrivacy,
} from "@/components/localized/LocalizedPages";
import {
  LOCALES,
  ROUTE_SLUGS,
  RouteKey,
  isLocale,
  matchRouteKey,
  Locale,
} from "@/lib/i18n/routes";

const PRODUCT_ROUTE_KEYS: RouteKey[] = ["molatik", "kunyex", "logistics"];
const PRODUCT_PRIVACY_ROUTE_KEYS: RouteKey[] = ["molatikPrivacy", "kunyexPrivacy"];

function renderByRoute(routeKey: RouteKey, locale: Locale) {
  if (routeKey === "about") return <LocalizedAbout locale={locale} />;

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

  const routeKey = matchRouteKey(lang, slug ?? []);
  if (!routeKey || routeKey === "home") notFound();

  const page = renderByRoute(routeKey, lang);
  if (!page) notFound();

  return page;
}
