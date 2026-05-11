import Link from "next/link";
import type { CSSProperties } from "react";
import { CONTENT, PageCopy, ProductCopy } from "@/lib/i18n/content";
import { Locale, RouteKey, localizedPath, localizedPathForProductPrivacy } from "@/lib/i18n/routes";
import { FaApple, FaGooglePlay, FaWindows } from "react-icons/fa";
import {
  FiArrowUpRight,
  FiDownloadCloud,
  FiShield,
} from "react-icons/fi";
import InteractiveGridCard from "@/components/ui/InteractiveGridCard";
import InteractivePageSurface from "@/components/ui/InteractivePageSurface";
import PremiumLandingPage from "@/components/localized/PremiumLandingPage";

const BARKODX_APPSTORE_URL = "https://apps.apple.com/tr/app/barkodx/id6767043219?l=tr";
const MOLATIK_APPSTORE_URL = "https://apps.apple.com/tr/app/molatik/id6765758798?l=tr";

interface ProductsHubCopy {
  badge: string;
  title: string;
  intro: string;
  openLabel: string;
  interactionTag: string;
  interactionTitle: string;
  interactionBody: string;
  surfaceTag: string;
  surfaceTitle: string;
  surfaceBody: string;
}

const PRODUCTS_HUB_COPY: Record<Locale, ProductsHubCopy> = {
  tr: {
    badge: "Ürün Gridi",
    title: "Traxle Ürünleri: Fareyle Etkileşimli Kartlar",
    intro:
      "Her kart, imlecin hareketine canlı tepki verir. Ürüne yaklaş, kartın katmanlarını ve neon parlamasını hissederek modüle geç.",
    openLabel: "Ürünü aç",
    interactionTag: "Anlık Etkileşim",
    interactionTitle: "Fare Takipli Grid Motoru",
    interactionBody:
      "Kartlar, farenin konumuna göre kendi perspektifini ve neon spot ışığını günceller. Böylece her geçiş canlı ve güçlü görünür.",
    surfaceTag: "Neon Yüzey",
    surfaceTitle: "Parlama ve Derinlik Katmanları",
    surfaceBody:
      "Grid zemini, hareketli ışık süzmeleri ve nabız efektleri aynı yüzeyde çalışır; sayfa statik değil, yaşayan bir vitrin hissi verir.",
  },
  en: {
    badge: "Product Grid",
    title: "Traxle Products with Mouse-Reactive Cards",
    intro: "Each card responds to your cursor in real time with layered motion and neon glow.",
    openLabel: "Open product",
    interactionTag: "Realtime Interaction",
    interactionTitle: "Mouse Tracking Grid Engine",
    interactionBody: "Cards update perspective and spot glow from cursor position for a vivid transition effect.",
    surfaceTag: "Neon Surface",
    surfaceTitle: "Glow and Depth Layers",
    surfaceBody: "Grid textures, animated light beams and pulse effects run together for a living showcase feel.",
  },
  de: {
    badge: "Produkt-Grid",
    title: "Traxle Produkte mit reaktiven Karten",
    intro: "Jede Karte reagiert in Echtzeit auf die Maus mit Bewegung und Neon-Glow.",
    openLabel: "Produkt öffnen",
    interactionTag: "Live Interaktion",
    interactionTitle: "Mausgesteuerter Grid-Motor",
    interactionBody: "Die Karten aktualisieren Perspektive und Spot-Glow anhand der Mausposition fur einen lebendigen Effekt.",
    surfaceTag: "Neon-Oberflache",
    surfaceTitle: "Leuchten und Tiefenebenen",
    surfaceBody: "Grid-Texturen, animierte Lichtbahnen und Pulseffekte erzeugen zusammen ein lebendiges Schaufenster.",
  },
  ru: {
    badge: "Product Grid",
    title: "Traxle Products with Mouse-Reactive Cards",
    intro: "Each card responds to your cursor in real time with layered motion and neon glow.",
    openLabel: "Open product",
    interactionTag: "Realtime Interaction",
    interactionTitle: "Mouse Tracking Grid Engine",
    interactionBody: "Cards update perspective and spot glow from cursor position for a vivid transition effect.",
    surfaceTag: "Neon Surface",
    surfaceTitle: "Glow and Depth Layers",
    surfaceBody: "Grid textures, animated light beams and pulse effects run together for a living showcase feel.",
  },
  ar: {
    badge: "Product Grid",
    title: "Traxle Products with Mouse-Reactive Cards",
    intro: "Each card responds to your cursor in real time with layered motion and neon glow.",
    openLabel: "Open product",
    interactionTag: "Realtime Interaction",
    interactionTitle: "Mouse Tracking Grid Engine",
    interactionBody: "Cards update perspective and spot glow from cursor position for a vivid transition effect.",
    surfaceTag: "Neon Surface",
    surfaceTitle: "Glow and Depth Layers",
    surfaceBody: "Grid textures, animated light beams and pulse effects run together for a living showcase feel.",
  },
};

const PRODUCT_CARD_KEYS: Array<"molatik" | "kunyex" | "logistics"> = ["molatik", "kunyex", "logistics"];
type ProductVisualKey = (typeof PRODUCT_CARD_KEYS)[number];

const PRODUCT_VISUAL_THEMES: Record<ProductVisualKey, { a: string; b: string; c: string }> = {
  molatik: { a: "#22d3ee", b: "#3b82f6", c: "#0ea5e9" },
  kunyex: { a: "#34d399", b: "#22d3ee", c: "#10b981" },
  logistics: { a: "#60a5fa", b: "#22d3ee", c: "#2dd4bf" },
};

function ProductMockup3D({ product }: { product: ProductVisualKey }) {
  const theme = PRODUCT_VISUAL_THEMES[product];
  const vars =
    {
      "--mockup-a": theme.a,
      "--mockup-b": theme.b,
      "--mockup-c": theme.c,
    } as CSSProperties;

  return (
    <div className="product-mockup-3d mt-5" style={vars} aria-hidden>
      <span className="product-mockup-3d__aura" />
      <span className="product-mockup-3d__grid" />

      <div className="product-mockup-3d__device product-mockup-3d__device-main">
        <span className="product-mockup-3d__dot" />
        <span className="product-mockup-3d__line product-mockup-3d__line-lg" />
        <span className="product-mockup-3d__line product-mockup-3d__line-md" />
        <span className="product-mockup-3d__line product-mockup-3d__line-sm" />
      </div>

      <div className="product-mockup-3d__device product-mockup-3d__device-side">
        <span className="product-mockup-3d__line product-mockup-3d__line-sm" />
        <span className="product-mockup-3d__line product-mockup-3d__line-xs" />
      </div>

      <span className="product-mockup-3d__chip product-mockup-3d__chip-1" />
      <span className="product-mockup-3d__chip product-mockup-3d__chip-2" />
    </div>
  );
}

function PageShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <div className="page-neon-shell relative min-h-screen overflow-hidden pt-28 pb-20 text-slate-100">
      <div className="page-neon-grid" aria-hidden />
      <div className="page-neon-beams" aria-hidden>
        <span className="page-neon-beam page-neon-beam-1" />
        <span className="page-neon-beam page-neon-beam-2" />
        <span className="page-neon-beam page-neon-beam-3" />
      </div>
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <InteractivePageSurface className="rounded-[2rem] px-5 py-7 sm:px-8 sm:py-10">
          <h1 className="neon-heading max-w-4xl text-3xl font-black tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-200/85">{intro}</p>
          {children}
        </InteractivePageSurface>
      </div>
    </div>
  );
}

function SectionList({ sections }: { sections: PageCopy["sections"] }) {
  return (
    <div className="mt-10 grid gap-4 sm:gap-6 md:grid-cols-2">
      {sections.map((section) => (
        <InteractiveGridCard key={section.title} className="neon-grid-card group rounded-3xl p-6">
          <span className="neon-grid-card__glow" aria-hidden />
          <h2 className="relative z-10 text-xl font-bold text-white">{section.title}</h2>
          <p className="relative z-10 mt-3 text-sm leading-7 text-slate-200/85">{section.body}</p>
        </InteractiveGridCard>
      ))}
    </div>
  );
}

export function LocalizedHome({ locale }: { locale: Locale }) {
  return <PremiumLandingPage locale={locale} />;
}

export function LocalizedProductsHub({ locale }: { locale: Locale }) {
  const copy = PRODUCTS_HUB_COPY[locale];
  const homeCards = CONTENT[locale].home.cards;

  return (
    <PageShell title={copy.title} intro={copy.intro}>
      <span className="neon-chip mt-8 inline-flex rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider text-cyan-100">
        {copy.badge}
      </span>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {PRODUCT_CARD_KEYS.map((routeKey, index) => {
          const card = homeCards.find((item) => item.key === routeKey);
          if (!card) return null;

          return (
            <InteractiveGridCard key={card.title} className="neon-grid-card group min-h-[280px] rounded-3xl p-6">
              <span className="neon-grid-card__glow" aria-hidden />
              <Link href={localizedPath(routeKey, locale)} className="relative z-10 flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <span className="inline-flex rounded-full border border-cyan-200/35 bg-cyan-200/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-100">
                    {card.status}
                  </span>
                  <FiArrowUpRight className="text-cyan-100/80 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <h2 className="mt-5 text-3xl font-black tracking-tight text-white">{card.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-200/85">{card.description}</p>
                <ProductMockup3D product={routeKey} />
                <div className="mt-auto flex items-end justify-between pt-8">
                  <span className="text-sm font-semibold text-cyan-100">{copy.openLabel}</span>
                  <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.28em] text-slate-300/65">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </Link>
            </InteractiveGridCard>
          );
        })}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <InteractiveGridCard className="neon-grid-card rounded-3xl p-6">
          <span className="neon-grid-card__glow" aria-hidden />
          <p className="relative z-10 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">{copy.interactionTag}</p>
          <h3 className="relative z-10 mt-3 text-2xl font-black text-white">{copy.interactionTitle}</h3>
          <p className="relative z-10 mt-3 text-sm leading-7 text-slate-200/85">{copy.interactionBody}</p>
        </InteractiveGridCard>

        <InteractiveGridCard className="neon-grid-card rounded-3xl p-6">
          <span className="neon-grid-card__glow" aria-hidden />
          <p className="relative z-10 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">{copy.surfaceTag}</p>
          <h3 className="relative z-10 mt-3 text-2xl font-black text-white">{copy.surfaceTitle}</h3>
          <p className="relative z-10 mt-3 text-sm leading-7 text-slate-200/85">{copy.surfaceBody}</p>
        </InteractiveGridCard>
      </div>
    </PageShell>
  );
}

export function LocalizedAbout({ locale }: { locale: Locale }) {
  const content = CONTENT[locale].about;

  return (
    <PageShell title={content.title} intro={content.intro}>
      <span className="neon-chip mt-8 inline-flex rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider text-cyan-100">
        {content.badge}
      </span>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {content.stats.map((stat) => (
          <InteractiveGridCard key={stat.label} className="neon-grid-card rounded-2xl p-5 text-center">
            <span className="neon-grid-card__glow" aria-hidden />
            <p className="relative z-10 text-3xl font-black text-cyan-100">{stat.value}</p>
            <p className="relative z-10 mt-2 text-xs font-semibold uppercase tracking-wider text-slate-300">
              {stat.label}
            </p>
          </InteractiveGridCard>
        ))}
      </div>

      <SectionList sections={content.sections} />
    </PageShell>
  );
}

function productKeyFromRoute(routeKey: RouteKey): "molatik" | "kunyex" | "logistics" | null {
  if (routeKey === "molatik") return "molatik";
  if (routeKey === "kunyex") return "kunyex";
  if (routeKey === "logistics") return "logistics";
  return null;
}

function privacyProductFromRoute(routeKey: RouteKey): "molatik" | "kunyex" | null {
  if (routeKey === "molatikPrivacy") return "molatik";
  if (routeKey === "kunyexPrivacy") return "kunyex";
  return null;
}

export function LocalizedProductPage({ locale, routeKey }: { locale: Locale; routeKey: RouteKey }) {
  const productKey = productKeyFromRoute(routeKey);
  if (!productKey) return null;
  const copy: ProductCopy = CONTENT[locale].products[productKey];

  const privacyHref =
    productKey === "logistics" ? localizedPath("contact", locale) : localizedPathForProductPrivacy(productKey, locale);

  const labels =
    locale === "tr"
      ? {
          barkodx: "BarkodX'i App Store'dan İndir",
          kunyexManual: "KunyeX Manuel Güncelleme",
          barkodxTransfer: "BarkodX DataTransfer",
          molatikIos: "Molatik iOS İndirme Linki",
          molatikPlay: "Molatik Google Play - Çok Yakında",
        }
      : locale === "de"
        ? {
            barkodx: "BarkodX im App Store laden",
            kunyexManual: "KunyeX Manuelles Update",
            barkodxTransfer: "BarkodX Datenubertragung",
            molatikIos: "Molatik iOS Download",
            molatikPlay: "Molatik Google Play - Demnachst",
          }
        : locale === "ru"
          ? {
              barkodx: "Ğ¡ĞºĞ°Ñ‡Ğ°Ñ‚ÑŒ BarkodX Ğ² App Store",
              kunyexManual: "Ğ ÑƒÑ‡Ğ½Ğ¾Ğµ Ğ¾Ğ±Ğ½Ğ¾Ğ²Ğ»ĞµĞ½Ğ¸Ğµ KunyeX",
              barkodxTransfer: "BarkodX DataTransfer",
              molatikIos: "Ğ¡ĞºĞ°Ñ‡Ğ°Ñ‚ÑŒ Molatik Ğ´Ğ»Ñ iOS",
              molatikPlay: "Molatik Ğ² Google Play - Ğ¡ĞºĞ¾Ñ€Ğ¾",
            }
          : locale === "ar"
            ? {
                barkodx: "ØªÙ†Ø²ÙŠÙ„ BarkodX Ù…Ù† App Store",
                kunyexManual: "ØªØ­Ø¯ÙŠØ« KunyeX Ø§Ù„ÙŠØ¯ÙˆÙŠ",
                barkodxTransfer: "Ù†Ù‚Ù„ Ø¨ÙŠØ§Ù†Ø§Øª BarkodX",
                molatikIos: "ØªÙ†Ø²ÙŠÙ„ Molatik Ù„Ù†Ø¸Ø§Ù… iOS",
                molatikPlay: "Molatik Ø¹Ù„Ù‰ Google Play - Ù‚Ø±ÙŠØ¨Ø§Ù‹",
              }
            : {
                barkodx: "Download BarkodX on the App Store",
                kunyexManual: "KunyeX Manual Update",
                barkodxTransfer: "BarkodX DataTransfer",
                molatikIos: "Molatik iOS Download",
                molatikPlay: "Molatik Google Play - Coming Soon",
              };

  return (
    <PageShell title={copy.title} intro={copy.intro}>
      <span className="neon-chip mt-8 inline-flex rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider text-cyan-100">
        {copy.badge}
      </span>

      <InteractiveGridCard className="neon-grid-card mt-8 rounded-3xl p-6">
        <span className="neon-grid-card__glow" aria-hidden />
        <div className="grid gap-4 sm:grid-cols-2">
          {copy.highlights.map((highlight, index) => (
            <InteractiveGridCard key={highlight} className="neon-grid-card group rounded-2xl p-4">
              <span className="neon-grid-card__glow" aria-hidden />
              <span className="relative z-10 inline-flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500 text-xs font-black text-slate-950">
                {index + 1}
              </span>
              <p className="relative z-10 mt-3 text-sm leading-7 text-slate-200/85">{highlight}</p>
            </InteractiveGridCard>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={privacyHref}
            className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            <FiShield />
            {copy.privacyCta}
          </Link>

          {productKey === "kunyex" && (
            <>
              <Link
                href="/guncelleme/kunyex"
                className="inline-flex items-center gap-2 rounded-full border border-blue-300 bg-blue-50 px-5 py-3 text-sm font-semibold text-blue-800 transition hover:border-blue-400 dark:border-blue-400/40 dark:bg-blue-400/10 dark:text-blue-200 dark:hover:border-blue-300"
              >
                <FaWindows />
                {labels.kunyexManual}
              </Link>
              <Link
                href="/barkodx/uygulamalar/guncelleme"
                className="inline-flex items-center gap-2 rounded-full border border-cyan-300 bg-cyan-50 px-5 py-3 text-sm font-semibold text-cyan-800 transition hover:border-cyan-400 dark:border-cyan-400/40 dark:bg-cyan-400/10 dark:text-cyan-200 dark:hover:border-cyan-300"
              >
                <FiDownloadCloud />
                {labels.barkodxTransfer}
              </Link>
              <Link
                href={BARKODX_APPSTORE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition hover:border-gray-400 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/40"
              >
                <FaApple />
                {labels.barkodx}
              </Link>
            </>
          )}

          {productKey === "molatik" && (
            <>
              <Link
                href={MOLATIK_APPSTORE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition hover:border-gray-400 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/40"
              >
                <FaApple />
                {labels.molatikIos}
              </Link>
              <button
                type="button"
                disabled
                className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-5 py-3 text-sm font-semibold text-amber-700 dark:border-amber-400/40 dark:bg-amber-400/10 dark:text-amber-200"
              >
                <FaGooglePlay />
                {labels.molatikPlay}
              </button>
            </>
          )}
        </div>
      </InteractiveGridCard>
    </PageShell>
  );
}

export function LocalizedProductPrivacy({ locale, routeKey }: { locale: Locale; routeKey: RouteKey }) {
  const productKey = privacyProductFromRoute(routeKey);
  if (!productKey) return null;
  const copy = CONTENT[locale].productPrivacy[productKey];

  return (
    <PageShell title={copy.title} intro={copy.intro}>
      <SectionList sections={copy.sections} />
    </PageShell>
  );
}

export function LocalizedGenericPage({ locale, routeKey }: { locale: Locale; routeKey: RouteKey }) {
  const generic = CONTENT[locale].pages;
  const page = generic[routeKey as keyof typeof generic];
  if (!page) return null;

  return (
    <PageShell title={page.title} intro={page.intro}>
      <SectionList sections={page.sections} />
    </PageShell>
  );
}




