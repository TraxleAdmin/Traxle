import { MetadataRoute } from "next";
import { LOCALES, ROUTE_SLUGS, RouteKey } from "@/lib/i18n/routes";

const BASE_URL = "https://www.traxleapp.com";

const INDEXED_ROUTES: RouteKey[] = [
  "home",
  "features",
  "pricing",
  "integrations",
  "about",
  "contact",
  "careers",
  "updates",
  "molatik",
  "kunyex",
  "logistics",
  "molatikPrivacy",
  "kunyexPrivacy",
  "privacy",
  "terms",
  "cookies",
  "kvkk",
  "refund",
  "distance",
  "preInfo",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const route of INDEXED_ROUTES) {
      const localizedSegments = ROUTE_SLUGS[route][locale];
      const path = localizedSegments.length ? `/${locale}/${localizedSegments.join("/")}` : `/${locale}`;

      entries.push({
        url: `${BASE_URL}${path}`,
        lastModified: now,
        changeFrequency: route === "home" ? "weekly" : "monthly",
        priority: route === "home" ? 1 : 0.7,
      });
    }
  }

  return entries;
}
