import Link from "next/link";
import { CONTENT, PageCopy, ProductCopy } from "@/lib/i18n/content";
import { Locale, RouteKey, localizedPath, localizedPathForProductPrivacy } from "@/lib/i18n/routes";
import { FaApple, FaGooglePlay, FaWindows } from "react-icons/fa";
import {
  FiArrowUpRight,
  FiCode,
  FiDatabase,
  FiDownloadCloud,
  FiLayers,
  FiShield,
  FiTerminal,
} from "react-icons/fi";
import InteractiveGridCard from "@/components/ui/InteractiveGridCard";
import InteractivePageSurface from "@/components/ui/InteractivePageSurface";

const BARKODX_APPSTORE_URL = "https://apps.apple.com/tr/app/barkodx/id6767043219?l=tr";
const MOLATIK_APPSTORE_URL = "https://apps.apple.com/tr/app/molatik/id6765758798?l=tr";

interface StudioHomeCopy {
  badge: string;
  title: string;
  intro: string;
  stackLabel: string;
  workflowLabel: string;
  metrics: { label: string; value: string }[];
}

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

const STUDIO_HOME_COPY: Record<Locale, StudioHomeCopy> = {
  tr: {
    badge: "Yazılım Stüdyosu",
    title: "Kod, Altyapı ve Operasyonları Tek Üründe Birleştiren Mühendislik Ekibi",
    intro:
      "Ürün stratejisini, backend altyapısını ve modern arayüzleri tek sprint akışında tasarlıyor; kurumlar için ölçeklenebilir yazılımlar üretiyoruz.",
    stackLabel: "Kullandığımız teknoloji yığını",
    workflowLabel: "Geliştir - Test Et - Yayınla akışı",
    metrics: [
      { label: "Yayın Süresi", value: "< 2 hafta" },
      { label: "Ortalama Uptime", value: "99.96%" },
      { label: "Aktif Modüller", value: "12+" },
    ],
  },
  en: {
    badge: "Software Studio",
    title: "Engineering Team Turning Code, Infrastructure and Operations into One Product",
    intro:
      "We align product strategy, backend architecture and modern interfaces in one sprint rhythm to ship scalable software for enterprise teams.",
    stackLabel: "Core stack",
    workflowLabel: "Build - Test - Ship pipeline",
    metrics: [
      { label: "Release cycle", value: "< 2 weeks" },
      { label: "Average uptime", value: "99.96%" },
      { label: "Active modules", value: "12+" },
    ],
  },
  de: {
    badge: "Software Studio",
    title: "Ein Engineering-Team, das Code, Infrastruktur und Betrieb in ein Produkt verwandelt",
    intro:
      "Wir verbinden Produktstrategie, Backend-Architektur und moderne Interfaces in einem Sprint-Rhythmus fur skalierbare Unternehmenssoftware.",
    stackLabel: "Kern-Stack",
    workflowLabel: "Build - Test - Ship pipeline",
    metrics: [
      { label: "Release-Zyklus", value: "< 2 Wochen" },
      { label: "Durchschnitt Uptime", value: "99.96%" },
      { label: "Aktive Module", value: "12+" },
    ],
  },
  ru: {
    badge: "Software Studio",
    title: "Engineering Team Turning Code, Infrastructure and Operations into One Product",
    intro:
      "We align product strategy, backend architecture and modern interfaces in one sprint rhythm to ship scalable software for enterprise teams.",
    stackLabel: "Core stack",
    workflowLabel: "Build - Test - Ship pipeline",
    metrics: [
      { label: "Release cycle", value: "< 2 weeks" },
      { label: "Average uptime", value: "99.96%" },
      { label: "Active modules", value: "12+" },
    ],
  },
  ar: {
    badge: "Software Studio",
    title: "Engineering Team Turning Code, Infrastructure and Operations into One Product",
    intro:
      "We align product strategy, backend architecture and modern interfaces in one sprint rhythm to ship scalable software for enterprise teams.",
    stackLabel: "Core stack",
    workflowLabel: "Build - Test - Ship pipeline",
    metrics: [
      { label: "Release cycle", value: "< 2 weeks" },
      { label: "Average uptime", value: "99.96%" },
      { label: "Active modules", value: "12+" },
    ],
  },
};

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
  const content = CONTENT[locale].home;
  const studio = STUDIO_HOME_COPY[locale];
  const stackItems =
    locale === "tr"
      ? ["Next.js 16", "TypeScript", "Firebase", "Framer Motion", "API odaklı"]
      : ["Next.js 16", "TypeScript", "Firebase", "Framer Motion", "API-first"];
  const openPageLabel =
    locale === "tr"
      ? "Sayfaya git"
      : locale === "de"
        ? "Seite öffnen"
        : "Open page";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050814] pb-20 pt-28 text-slate-100">
      <div className="studio-grid-overlay" aria-hidden />
      <div className="studio-lightfield" aria-hidden>
        <span className="studio-beam studio-beam-1" />
        <span className="studio-beam studio-beam-2" />
        <span className="studio-beam studio-beam-3" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <InteractivePageSurface className="rounded-[2rem] px-5 py-7 sm:px-8 sm:py-10">
          <div className="studio-reveal max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
              <FiCode />
              {studio.badge}
            </span>
            <h1 className="neon-heading mt-6 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">{studio.title}</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-200/85 sm:text-lg">{studio.intro}</p>
          </div>

          <div className="studio-reveal mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "160ms" }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-100">
              <FiTerminal />
              {studio.stackLabel}
            </span>
            {stackItems.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-slate-200/90"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {content.cards.map((card, index) => (
              <InteractiveGridCard key={card.title} className="studio-app-card studio-reveal group">
                <span className="studio-card-glow" aria-hidden />
                <Link href={localizedPath(card.key, locale)} className="relative z-10 flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex rounded-full border border-cyan-200/25 bg-cyan-200/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-100">
                      {card.status}
                    </span>
                    <FiArrowUpRight className="text-cyan-100/80 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <h2 className="mt-5 text-3xl font-black tracking-tight text-white">{card.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-200/80">{card.description}</p>
                  <div className="mt-auto flex items-end justify-between pt-7">
                    <span className="text-sm font-semibold text-cyan-100">{openPageLabel}</span>
                    <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.28em] text-slate-300/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </Link>
              </InteractiveGridCard>
            ))}
          </div>

          <div
            className="studio-reveal mt-10 rounded-3xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur-xl"
            style={{ animationDelay: "260ms" }}
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200/80">
              <FiLayers />
              {studio.workflowLabel}
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {studio.metrics.map((metric) => (
                <InteractiveGridCard key={metric.label} className="neon-grid-card rounded-2xl p-4">
                  <span className="neon-grid-card__glow" aria-hidden />
                  <p className="relative z-10 font-[var(--font-mono)] text-2xl font-semibold text-cyan-100">{metric.value}</p>
                  <p className="relative z-10 mt-2 text-xs uppercase tracking-[0.16em] text-slate-300/80">{metric.label}</p>
                </InteractiveGridCard>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-2 text-xs text-slate-300/70">
              <FiDatabase />
              <span>{content.badge}</span>
            </div>
          </div>
        </InteractivePageSurface>
      </div>
    </div>
  );
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

