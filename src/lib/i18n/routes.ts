export const LOCALES = ["tr", "en", "de", "ru", "ar"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "tr";

export const PRODUCT_KEYS = ["molatik", "kunyex", "logistics"] as const;
export type ProductKey = (typeof PRODUCT_KEYS)[number];

export type RouteKey =
  | "home"
  | "features"
  | "pricing"
  | "integrations"
  | "about"
  | "contact"
  | "careers"
  | "updates"
  | "privacy"
  | "terms"
  | "cookies"
  | "kvkk"
  | "refund"
  | "distance"
  | "preInfo"
  | "molatik"
  | "kunyex"
  | "logistics"
  | "molatikPrivacy"
  | "kunyexPrivacy";

export interface LocaleMeta {
  code: Locale;
  nativeLabel: string;
  englishLabel: string;
  flag: string;
  dir: "ltr" | "rtl";
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  tr: { code: "tr", nativeLabel: "Türkçe", englishLabel: "Turkish", flag: "TR", dir: "ltr" },
  en: { code: "en", nativeLabel: "English", englishLabel: "English", flag: "GB", dir: "ltr" },
  de: { code: "de", nativeLabel: "Deutsch", englishLabel: "German", flag: "DE", dir: "ltr" },
  ru: { code: "ru", nativeLabel: "Русский", englishLabel: "Russian", flag: "RU", dir: "ltr" },
  ar: { code: "ar", nativeLabel: "العربية", englishLabel: "Arabic", flag: "SA", dir: "rtl" },
};

const LOCALIZED_PRIVACY_SEGMENT: Record<Locale, string> = {
  tr: "gizlilik",
  en: "privacy",
  de: "datenschutz",
  ru: "конфиденциальность",
  ar: "الخصوصية",
};

export const ROUTE_SLUGS: Record<RouteKey, Record<Locale, string[]>> = {
  home: { tr: [], en: [], de: [], ru: [], ar: [] },
  features: {
    tr: ["ozellikler"],
    en: ["features"],
    de: ["funktionen"],
    ru: ["возможности"],
    ar: ["المزايا"],
  },
  pricing: {
    tr: ["fiyatlandirma"],
    en: ["pricing"],
    de: ["preise"],
    ru: ["тарифы"],
    ar: ["الأسعار"],
  },
  integrations: {
    tr: ["entegrasyonlar"],
    en: ["integrations"],
    de: ["integrationen"],
    ru: ["интеграции"],
    ar: ["التكاملات"],
  },
  about: {
    tr: ["hakkimizda"],
    en: ["about-us"],
    de: ["über-uns"],
    ru: ["о-нас"],
    ar: ["من-نحن"],
  },
  contact: {
    tr: ["iletisim"],
    en: ["contact"],
    de: ["kontakt"],
    ru: ["контакты"],
    ar: ["اتصل-بنا"],
  },
  careers: {
    tr: ["kariyer"],
    en: ["careers"],
    de: ["karriere"],
    ru: ["карьера"],
    ar: ["الوظائف"],
  },
  updates: {
    tr: ["guncellemeler"],
    en: ["updates"],
    de: ["produkt-updates"],
    ru: ["обновления"],
    ar: ["تحديثات-المنتج"],
  },
  privacy: {
    tr: ["gizlilik-politikasi"],
    en: ["privacy-policy"],
    de: ["datenschutz"],
    ru: ["политика-конфиденциальности"],
    ar: ["سياسة-الخصوصية"],
  },
  terms: {
    tr: ["kullanim-kosullari"],
    en: ["terms-of-use"],
    de: ["nutzungsbedingungen"],
    ru: ["условия-использования"],
    ar: ["شروط-الاستخدام"],
  },
  cookies: {
    tr: ["cerez-politikasi"],
    en: ["cookie-policy"],
    de: ["cookie-richtlinie"],
    ru: ["политика-cookie"],
    ar: ["سياسة-ملفات-الارتباط"],
  },
  kvkk: {
    tr: ["kvkk-aydinlatma"],
    en: ["data-protection-notice"],
    de: ["datenschutzhinweis"],
    ru: ["уведомление-о-защите-данных"],
    ar: ["إشعار-حماية-البيانات"],
  },
  refund: {
    tr: ["iptal-iade"],
    en: ["cancellation-refund"],
    de: ["storno-rueckerstattung"],
    ru: ["отмена-возврат"],
    ar: ["الإلغاء-والاسترداد"],
  },
  distance: {
    tr: ["mesafeli-hizmet-sozlesmesi"],
    en: ["distance-service-agreement"],
    de: ["fernabsatz-vertrag"],
    ru: ["дистанционный-договор-об-услуге"],
    ar: ["اتفاقية-الخدمة-عن-بعد"],
  },
  preInfo: {
    tr: ["on-bilgilendirme-formu"],
    en: ["pre-information-form"],
    de: ["vorabinformation"],
    ru: ["форма-предварительного-информирования"],
    ar: ["نموذج-المعلومات-المسبقة"],
  },
  molatik: {
    tr: ["products", "molatik"],
    en: ["products", "molatik"],
    de: ["products", "molatik"],
    ru: ["products", "molatik"],
    ar: ["products", "molatik"],
  },
  kunyex: {
    tr: ["products", "kunyex"],
    en: ["products", "kunyex"],
    de: ["products", "kunyex"],
    ru: ["products", "kunyex"],
    ar: ["products", "kunyex"],
  },
  logistics: {
    tr: ["products", "logistics"],
    en: ["products", "logistics"],
    de: ["products", "logistics"],
    ru: ["products", "logistics"],
    ar: ["products", "logistics"],
  },
  molatikPrivacy: {
    tr: ["molatik", LOCALIZED_PRIVACY_SEGMENT.tr],
    en: ["molatik", LOCALIZED_PRIVACY_SEGMENT.en],
    de: ["molatik", LOCALIZED_PRIVACY_SEGMENT.de],
    ru: ["molatik", LOCALIZED_PRIVACY_SEGMENT.ru],
    ar: ["molatik", LOCALIZED_PRIVACY_SEGMENT.ar],
  },
  kunyexPrivacy: {
    tr: ["kunyex", LOCALIZED_PRIVACY_SEGMENT.tr],
    en: ["kunyex", LOCALIZED_PRIVACY_SEGMENT.en],
    de: ["kunyex", LOCALIZED_PRIVACY_SEGMENT.de],
    ru: ["kunyex", LOCALIZED_PRIVACY_SEGMENT.ru],
    ar: ["kunyex", LOCALIZED_PRIVACY_SEGMENT.ar],
  },
};

const ROUTE_KEYS = Object.keys(ROUTE_SLUGS) as RouteKey[];

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function splitPath(pathname: string): string[] {
  return pathname.split("/").filter(Boolean);
}

export function detectLocale(pathname: string): Locale {
  const [segment] = splitPath(pathname);
  return segment && isLocale(segment) ? segment : DEFAULT_LOCALE;
}

export function pathWithoutLocale(pathname: string): string[] {
  const segments = splitPath(pathname);
  if (segments[0] && isLocale(segments[0])) return segments.slice(1);
  return segments;
}

export function matchRouteKey(locale: Locale, segments: string[]): RouteKey | null {
  for (const key of ROUTE_KEYS) {
    const localized = ROUTE_SLUGS[key][locale];
    if (localized.length !== segments.length) continue;
    const isMatch = localized.every((segment, index) => segment === segments[index]);
    if (isMatch) return key;
  }
  return null;
}

export function resolveRoute(pathname: string): { locale: Locale; routeKey: RouteKey | null } {
  const locale = detectLocale(pathname);
  return { locale, routeKey: matchRouteKey(locale, pathWithoutLocale(pathname)) };
}

export function localizedPath(routeKey: RouteKey, locale: Locale): string {
  const segments = ROUTE_SLUGS[routeKey][locale];
  if (segments.length === 0) return `/${locale}`;
  return `/${locale}/${segments.join("/")}`;
}

export function localizedPathForProductPrivacy(product: ProductKey, locale: Locale): string {
  return product === "molatik" ? localizedPath("molatikPrivacy", locale) : localizedPath("kunyexPrivacy", locale);
}

export function isPanelPath(pathname: string): boolean {
  const segments = splitPath(pathname);
  if (segments.length === 0) return false;
  if (isLocale(segments[0])) return segments[1] === "panel";
  return segments[0] === "panel";
}

export function replaceLocaleInPath(pathname: string, locale: Locale): string {
  const segments = splitPath(pathname);
  if (segments.length === 0) return `/${locale}`;
  if (isLocale(segments[0])) {
    segments[0] = locale;
    return `/${segments.join("/")}`;
  }
  return `/${locale}/${segments.join("/")}`;
}

export const LEGACY_REDIRECTS: Record<string, RouteKey> = {
  "": "home",
  ozellikler: "features",
  fiyatlandirma: "pricing",
  entegrasyonlar: "integrations",
  hakkimizda: "about",
  iletisim: "contact",
  kariyer: "careers",
  "gizlilik-politikasi": "privacy",
  "kullanim-kosullari": "terms",
  cerezler: "cookies",
  "kvkk-aydinlatma": "kvkk",
  "iptal-iade": "refund",
  "mesafeli-hizmet-sozlesmesi": "distance",
  "on-bilgilendirme": "preInfo",
  molatik: "molatik",
  kunyex: "kunyex",
  lojistik: "logistics",
  "products/molatik": "molatik",
  "products/kunyex": "kunyex",
  "products/logistics": "logistics",
  "molatik/gizlilik": "molatikPrivacy",
  "kunyex/gizlilik": "kunyexPrivacy",
};
