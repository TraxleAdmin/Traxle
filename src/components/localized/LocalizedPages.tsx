import Link from "next/link";
import { CONTENT, PageCopy, ProductCopy } from "@/lib/i18n/content";
import { Locale, RouteKey, localizedPath, localizedPathForProductPrivacy } from "@/lib/i18n/routes";
import { FaApple, FaGooglePlay, FaWindows } from "react-icons/fa";
import { FiShield, FiDownloadCloud } from "react-icons/fi";
import LocalizedHomeExperience from "@/components/localized/LocalizedHomeExperience";

const BARKODX_APPSTORE_URL = "https://apps.apple.com/tr/app/barkodx/id6767043219?l=tr";
const MOLATIK_APPSTORE_URL = "https://apps.apple.com/tr/app/molatik/id6765758798?l=tr";

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
    <div className="relative min-h-screen bg-gray-50 pt-28 pb-20 text-gray-900 transition-colors dark:bg-[#050814] dark:text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.10),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.10),transparent_35%)]" />
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <h1 className="max-w-4xl text-3xl font-black tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-300">{intro}</p>
        {children}
      </div>
    </div>
  );
}

function SectionList({ sections }: { sections: PageCopy["sections"] }) {
  return (
    <div className="mt-10 grid gap-4 sm:gap-6 md:grid-cols-2">
      {sections.map((section) => (
        <article
          key={section.title}
          className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04]"
        >
          <h2 className="text-xl font-bold">{section.title}</h2>
          <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">{section.body}</p>
        </article>
      ))}
    </div>
  );
}

export function LocalizedHome({ locale }: { locale: Locale }) {
  return <LocalizedHomeExperience locale={locale} content={CONTENT[locale]} />;
}

export function LocalizedAbout({ locale }: { locale: Locale }) {
  const content = CONTENT[locale].about;

  return (
    <PageShell title={content.title} intro={content.intro}>
      <span className="mt-8 inline-flex rounded-full border border-gray-200 bg-white px-4 py-1 text-xs font-bold uppercase tracking-wider text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-200">
        {content.badge}
      </span>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {content.stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm dark:border-white/10 dark:bg-white/[0.04]"
          >
            <p className="text-3xl font-black text-blue-700 dark:text-blue-300">{stat.value}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300">
              {stat.label}
            </p>
          </div>
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
          barkodx: "BarkodX'i App Store'dan Indir",
          kunyexManual: "KunyeX Manuel Guncelleme",
          barkodxTransfer: "BarkodX DataTransfer",
          molatikIos: "Molatik iOS Indirme Linki",
          molatikPlay: "Molatik Google Play - Cok Yakinda",
        }
      : locale === "de"
        ? {
            barkodx: "BarkodX im App Store laden",
            kunyexManual: "KunyeX Manuelles Update",
            barkodxTransfer: "BarkodX Datenübertragung",
            molatikIos: "Molatik iOS Download",
            molatikPlay: "Molatik Google Play - Demnächst",
          }
        : locale === "ru"
          ? {
              barkodx: "Скачать BarkodX в App Store",
              kunyexManual: "Ручное обновление KunyeX",
              barkodxTransfer: "BarkodX DataTransfer",
              molatikIos: "Скачать Molatik для iOS",
              molatikPlay: "Molatik в Google Play - скоро",
            }
          : locale === "ar"
            ? {
                barkodx: "تنزيل BarkodX من App Store",
                kunyexManual: "التحديث اليدوي لـ KunyeX",
                barkodxTransfer: "نقل بيانات BarkodX",
                molatikIos: "تنزيل Molatik لنظام iOS",
                molatikPlay: "Molatik على Google Play - قريباً",
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
      <span className="mt-8 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300">
        {copy.badge}
      </span>

      <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
        <div className="grid gap-4 sm:grid-cols-2">
          {copy.highlights.map((highlight, index) => (
            <article
              key={highlight}
              className="group relative overflow-hidden rounded-2xl border border-gray-200/90 bg-gradient-to-br from-white to-blue-50/40 p-4 transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:from-white/[0.05] dark:to-blue-500/[0.08]"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_55%)]" />
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-black text-white">
                {index + 1}
              </span>
              <p className="mt-3 text-sm leading-7 text-gray-700 dark:text-gray-200">{highlight}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={privacyHref}
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
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
      </div>
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

