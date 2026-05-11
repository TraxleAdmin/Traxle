import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { IconType } from "react-icons";
import { FaApple, FaGooglePlay, FaWindows } from "react-icons/fa";
import {
  FiActivity,
  FiArrowRight,
  FiArrowUpRight,
  FiBarChart2,
  FiCheck,
  FiClock,
  FiCpu,
  FiDatabase,
  FiDownloadCloud,
  FiFileText,
  FiGlobe,
  FiLayers,
  FiPackage,
  FiRadio,
  FiRefreshCw,
  FiShield,
  FiTag,
  FiUsers,
} from "react-icons/fi";
import { CONTENT, PageCopy, ProductCopy } from "@/lib/i18n/content";
import { Locale, RouteKey, localizedPath, localizedPathForProductPrivacy } from "@/lib/i18n/routes";
import InteractiveGridCard from "@/components/ui/InteractiveGridCard";
import InteractivePageSurface from "@/components/ui/InteractivePageSurface";
import PremiumLandingPage from "@/components/localized/PremiumLandingPage";

const BARKODX_APPSTORE_URL = "https://apps.apple.com/tr/app/barkodx/id6767043219?l=tr";
const MOLATIK_APPSTORE_URL = "https://apps.apple.com/tr/app/molatik/id6765758798?l=tr";

type Tone = "cyan" | "rose" | "emerald" | "amber" | "blue";
type ProductRouteKey = "molatik" | "kunyex" | "logistics";
type EcosystemProductKey = "barkodx" | ProductRouteKey;

const toneVars: Record<Tone, CSSProperties> = {
  cyan: { "--tone-a": "#22d3ee", "--tone-b": "#2563eb", "--tone-c": "#38bdf8" } as CSSProperties,
  rose: { "--tone-a": "#f472b6", "--tone-b": "#7c3aed", "--tone-c": "#fb7185" } as CSSProperties,
  emerald: { "--tone-a": "#34d399", "--tone-b": "#84cc16", "--tone-c": "#10b981" } as CSSProperties,
  amber: { "--tone-a": "#f59e0b", "--tone-b": "#f97316", "--tone-c": "#fbbf24" } as CSSProperties,
  blue: { "--tone-a": "#60a5fa", "--tone-b": "#22d3ee", "--tone-c": "#2dd4bf" } as CSSProperties,
};

interface UiCopy {
  demo: string;
  exploreProducts: string;
  openProduct: string;
  privacy: string;
  appStoreSmall: string;
  appStoreMain: string;
  playSmall: string;
  playMain: string;
  soon: string;
  active: string;
  developing: string;
  planned: string;
  capabilities: string;
  workflow: string;
  operatingLayer: string;
  systemSnapshot: string;
  relatedActions: string;
  legalReview: string;
  finalTitle: string;
  finalBody: string;
  productsEyebrow: string;
  productsTitle: string;
  productsIntro: string;
  barkodxDescription: string;
  barkodxUseCase: string;
  downloadCenter: string;
}

const UI_COPY: Record<Locale, UiCopy> = {
  tr: {
    demo: "Demo Talep Et",
    exploreProducts: "Ürünleri Keşfet",
    openProduct: "Ürünü Aç",
    privacy: "Güvenlik ve Gizlilik",
    appStoreSmall: "Download on the",
    appStoreMain: "App Store",
    playSmall: "GET IT ON",
    playMain: "Google Play",
    soon: "Yakında",
    active: "Aktif",
    developing: "Geliştiriliyor",
    planned: "Planlanıyor",
    capabilities: "Operasyon kabiliyetleri",
    workflow: "Canlı iş akışı",
    operatingLayer: "TRAXLE kontrol katmanı",
    systemSnapshot: "Sistem görünümü",
    relatedActions: "İlgili aksiyonlar",
    legalReview: "Güvenlik kapsamı",
    finalTitle: "Operasyonlarını gerçek zamanlı yönetmeye hazır mısın?",
    finalBody: "TRAXLE ekibiyle ürün akışını, şube modelini ve cihaz senkronizasyonunu birlikte planlayalım.",
    productsEyebrow: "TRAXLE Ürün Ekosistemi",
    productsTitle: "Bağımsız iş uygulamaları, tek operasyon altyapısı.",
    productsIntro:
      "BarkodX, Molatik, KunyeX ve TRAXLE Lojistik; ayrı ihtiyaçları çözen ama aynı veri disipliniyle büyüyen kurumsal ürün ailesidir.",
    barkodxDescription: "Barkod, fiyat ve şube verilerini gerçek zamanlı yöneten akıllı perakende altyapısı.",
    barkodxUseCase: "Perakende, market ve şube fiyat operasyonu",
    downloadCenter: "Dağıtım Merkezi",
  },
  en: {
    demo: "Request Demo",
    exploreProducts: "Explore Products",
    openProduct: "Open Product",
    privacy: "Security and Privacy",
    appStoreSmall: "Download on the",
    appStoreMain: "App Store",
    playSmall: "GET IT ON",
    playMain: "Google Play",
    soon: "Coming Soon",
    active: "Active",
    developing: "In Development",
    planned: "Planned",
    capabilities: "Operational capabilities",
    workflow: "Live workflow",
    operatingLayer: "TRAXLE control layer",
    systemSnapshot: "System snapshot",
    relatedActions: "Related actions",
    legalReview: "Security scope",
    finalTitle: "Ready to manage operations in real time?",
    finalBody: "Plan your product flow, branch model and device sync with the TRAXLE team.",
    productsEyebrow: "TRAXLE Product Ecosystem",
    productsTitle: "Independent business apps on one operations foundation.",
    productsIntro:
      "BarkodX, Molatik, KunyeX and TRAXLE Logistics solve separate needs while sharing the same data discipline.",
    barkodxDescription: "Smart retail infrastructure for barcode, price and branch data in real time.",
    barkodxUseCase: "Retail, market and branch price operations",
    downloadCenter: "Distribution Center",
  },
  de: {
    demo: "Demo anfragen",
    exploreProducts: "Produkte entdecken",
    openProduct: "Produkt öffnen",
    privacy: "Sicherheit und Datenschutz",
    appStoreSmall: "Download on the",
    appStoreMain: "App Store",
    playSmall: "GET IT ON",
    playMain: "Google Play",
    soon: "Demnächst",
    active: "Aktiv",
    developing: "In Entwicklung",
    planned: "Geplant",
    capabilities: "Operative Fähigkeiten",
    workflow: "Live-Workflow",
    operatingLayer: "TRAXLE Kontrollschicht",
    systemSnapshot: "Systemüberblick",
    relatedActions: "Verwandte Aktionen",
    legalReview: "Sicherheitsumfang",
    finalTitle: "Bereit, Abläufe in Echtzeit zu steuern?",
    finalBody: "Planen Sie Produktfluss, Filialmodell und Gerätesynchronisierung mit dem TRAXLE Team.",
    productsEyebrow: "TRAXLE Produkt-Ökosystem",
    productsTitle: "Unabhängige Business-Apps auf einer Betriebsplattform.",
    productsIntro:
      "BarkodX, Molatik, KunyeX und TRAXLE Logistics lösen eigene Aufgaben und wachsen mit derselben Datendisziplin.",
    barkodxDescription: "Intelligente Retail-Infrastruktur für Barcode-, Preis- und Filialdaten in Echtzeit.",
    barkodxUseCase: "Retail, Märkte und Filialpreis-Operationen",
    downloadCenter: "Distributionszentrum",
  },
  ru: {
    demo: "Request Demo",
    exploreProducts: "Explore Products",
    openProduct: "Open Product",
    privacy: "Security and Privacy",
    appStoreSmall: "Download on the",
    appStoreMain: "App Store",
    playSmall: "GET IT ON",
    playMain: "Google Play",
    soon: "Coming Soon",
    active: "Active",
    developing: "In Development",
    planned: "Planned",
    capabilities: "Operational capabilities",
    workflow: "Live workflow",
    operatingLayer: "TRAXLE control layer",
    systemSnapshot: "System snapshot",
    relatedActions: "Related actions",
    legalReview: "Security scope",
    finalTitle: "Ready to manage operations in real time?",
    finalBody: "Plan your product flow, branch model and device sync with the TRAXLE team.",
    productsEyebrow: "TRAXLE Product Ecosystem",
    productsTitle: "Independent business apps on one operations foundation.",
    productsIntro: "BarkodX, Molatik, KunyeX and TRAXLE Logistics solve separate needs while sharing the same data discipline.",
    barkodxDescription: "Smart retail infrastructure for barcode, price and branch data in real time.",
    barkodxUseCase: "Retail, market and branch price operations",
    downloadCenter: "Distribution Center",
  },
  ar: {
    demo: "Request Demo",
    exploreProducts: "Explore Products",
    openProduct: "Open Product",
    privacy: "Security and Privacy",
    appStoreSmall: "Download on the",
    appStoreMain: "App Store",
    playSmall: "GET IT ON",
    playMain: "Google Play",
    soon: "Coming Soon",
    active: "Active",
    developing: "In Development",
    planned: "Planned",
    capabilities: "Operational capabilities",
    workflow: "Live workflow",
    operatingLayer: "TRAXLE control layer",
    systemSnapshot: "System snapshot",
    relatedActions: "Related actions",
    legalReview: "Security scope",
    finalTitle: "Ready to manage operations in real time?",
    finalBody: "Plan your product flow, branch model and device sync with the TRAXLE team.",
    productsEyebrow: "TRAXLE Product Ecosystem",
    productsTitle: "Independent business apps on one operations foundation.",
    productsIntro: "BarkodX, Molatik, KunyeX and TRAXLE Logistics solve separate needs while sharing the same data discipline.",
    barkodxDescription: "Smart retail infrastructure for barcode, price and branch data in real time.",
    barkodxUseCase: "Retail, market and branch price operations",
    downloadCenter: "Distribution Center",
  },
};

const PRODUCT_ROUTE_KEYS: ProductRouteKey[] = ["molatik", "kunyex", "logistics"];

const PRODUCT_META: Record<
  ProductRouteKey,
  {
    tone: Tone;
    icon: IconType;
    statusKind: "active" | "developing" | "planned";
    useCase: Record<Locale, string>;
    metrics: Array<{ value: string; label: Record<Locale, string> }>;
    actions?: "kunyex" | "molatik";
  }
> = {
  molatik: {
    tone: "rose",
    icon: FiClock,
    statusKind: "active",
    useCase: {
      tr: "Vardiya, mola ve ekip görünürlüğü",
      en: "Shift, break and workforce visibility",
      de: "Schicht-, Pausen- und Teamtransparenz",
      ru: "Shift, break and workforce visibility",
      ar: "Shift, break and workforce visibility",
    },
    metrics: [
      { value: "24/7", label: { tr: "canlı durum", en: "live status", de: "Live-Status", ru: "live status", ar: "live status" } },
      { value: "<15 sn", label: { tr: "bildirim akışı", en: "notification flow", de: "Benachrichtigungen", ru: "notification flow", ar: "notification flow" } },
      { value: "Role", label: { tr: "yetkili görünüm", en: "permission view", de: "Rollenansicht", ru: "permission view", ar: "permission view" } },
    ],
    actions: "molatik",
  },
  kunyex: {
    tone: "emerald",
    icon: FiShield,
    statusKind: "developing",
    useCase: {
      tr: "Kimlik, kayıt ve yetki kontrolü",
      en: "Identity, records and permission control",
      de: "Identität, Einträge und Berechtigungen",
      ru: "Identity, records and permission control",
      ar: "Identity, records and permission control",
    },
    metrics: [
      { value: "QR/NFC", label: { tr: "doğrulama", en: "verification", de: "Verifizierung", ru: "verification", ar: "verification" } },
      { value: "Audit", label: { tr: "iz kaydı", en: "event trail", de: "Audit-Spur", ru: "event trail", ar: "event trail" } },
      { value: "HWID", label: { tr: "cihaz kilidi", en: "device lock", de: "Gerätesperre", ru: "device lock", ar: "device lock" } },
    ],
    actions: "kunyex",
  },
  logistics: {
    tone: "amber",
    icon: FiPackage,
    statusKind: "planned",
    useCase: {
      tr: "Yük, teslimat ve QR doğrulama",
      en: "Load, delivery and QR verification",
      de: "Fracht, Zustellung und QR-Prüfung",
      ru: "Load, delivery and QR verification",
      ar: "Load, delivery and QR verification",
    },
    metrics: [
      { value: "QR", label: { tr: "teslimat kanıtı", en: "delivery proof", de: "Liefernachweis", ru: "delivery proof", ar: "delivery proof" } },
      { value: "Route", label: { tr: "akış planı", en: "flow plan", de: "Ablaufplan", ru: "flow plan", ar: "flow plan" } },
      { value: "KPI", label: { tr: "operasyon paneli", en: "operations panel", de: "Operationspanel", ru: "operations panel", ar: "operations panel" } },
    ],
  },
};

const HUB_PRODUCT_META: Record<EcosystemProductKey, { tone: Tone; icon: IconType; object: EcosystemProductKey }> = {
  barkodx: { tone: "cyan", icon: FiTag, object: "barkodx" },
  molatik: { tone: "rose", icon: FiClock, object: "molatik" },
  kunyex: { tone: "emerald", icon: FiShield, object: "kunyex" },
  logistics: { tone: "amber", icon: FiPackage, object: "logistics" },
};

const PAGE_META: Partial<Record<RouteKey, { eyebrow: string; icon: IconType; tone: Tone }>> = {
  features: { eyebrow: "Capabilities", icon: FiLayers, tone: "cyan" },
  pricing: { eyebrow: "Plans", icon: FiBarChart2, tone: "emerald" },
  integrations: { eyebrow: "Integrations", icon: FiDatabase, tone: "blue" },
  contact: { eyebrow: "Contact", icon: FiRadio, tone: "cyan" },
  careers: { eyebrow: "Careers", icon: FiUsers, tone: "rose" },
  updates: { eyebrow: "Updates", icon: FiRefreshCw, tone: "amber" },
  privacy: { eyebrow: "Legal", icon: FiShield, tone: "blue" },
  terms: { eyebrow: "Legal", icon: FiFileText, tone: "blue" },
  cookies: { eyebrow: "Legal", icon: FiGlobe, tone: "amber" },
  kvkk: { eyebrow: "Legal", icon: FiShield, tone: "emerald" },
  refund: { eyebrow: "Legal", icon: FiRefreshCw, tone: "rose" },
  distance: { eyebrow: "Legal", icon: FiFileText, tone: "cyan" },
  preInfo: { eyebrow: "Legal", icon: FiCheck, tone: "emerald" },
};

function statusLabel(statusKind: "active" | "developing" | "planned", locale: Locale) {
  const ui = UI_COPY[locale];
  if (statusKind === "active") return ui.active;
  if (statusKind === "developing") return ui.developing;
  return ui.planned;
}

function productKeyFromRoute(routeKey: RouteKey): ProductRouteKey | null {
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

function productRoute(product: EcosystemProductKey, locale: Locale) {
  if (product === "barkodx") return "/barkodx/uygulamalar/guncelleme";
  return localizedPath(product, locale);
}

function productStatus(product: EcosystemProductKey, locale: Locale) {
  if (product === "barkodx") return UI_COPY[locale].active;
  return statusLabel(PRODUCT_META[product].statusKind, locale);
}

function pageNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

function StoreBadgeButton({ type, href, label }: { type: "apple" | "google"; href: string; label: UiCopy }) {
  const Icon = type === "apple" ? FaApple : FaGooglePlay;
  const small = type === "apple" ? label.appStoreSmall : label.playSmall;
  const main = type === "apple" ? label.appStoreMain : label.playMain;

  return (
    <Link
      href={href}
      target={href === "#" ? undefined : "_blank"}
      rel={href === "#" ? undefined : "noreferrer"}
      aria-label={`${main} ${href === "#" ? label.soon : ""}`.trim()}
      className="store-badge-button"
    >
      <Icon />
      <span>
        <small>{small}</small>
        <strong>{main}</strong>
      </span>
    </Link>
  );
}

function ProductMotionObject({ product }: { product: EcosystemProductKey }) {
  return (
    <div className={`subpage-product-object subpage-product-object-${product}`} aria-hidden>
      <span className="subpage-product-object__orb" />
      <span className="subpage-product-object__orb" />
      <span className="subpage-product-object__panel" />
      <span className="subpage-product-object__line" />
      <span className="subpage-product-object__line" />
      <span className="subpage-product-object__signal" />
    </div>
  );
}

function PageVisual({ title, sections, icon: Icon }: { title: string; sections: PageCopy["sections"]; icon: IconType }) {
  const visualRows = sections.slice(0, 3);

  return (
    <div className="subpage-ops-visual" aria-hidden>
      <div className="subpage-ops-visual__topbar">
        <span />
        <span />
        <span />
      </div>
      <div className="subpage-ops-visual__header">
        <div>
          <small>TRAXLE / OPS</small>
          <strong>{title}</strong>
        </div>
        <Icon />
      </div>
      <div className="subpage-ops-visual__graph">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="subpage-ops-visual__rows">
        {visualRows.map((section, index) => (
          <div key={section.title}>
            <span>{pageNumber(index)}</span>
            <p>{section.title}</p>
            <strong>{index === 0 ? "Live" : index === 1 ? "Sync" : "Secure"}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductDetailVisual({ productKey, copy, locale }: { productKey: ProductRouteKey; copy: ProductCopy; locale: Locale }) {
  const meta = PRODUCT_META[productKey];
  const Icon = meta.icon;

  return (
    <div className="product-detail-visual" aria-hidden>
      <div className="product-detail-visual__phone">
        <div className="product-detail-visual__notch" />
        <div className="product-detail-visual__status">
          <span>{statusLabel(meta.statusKind, locale)}</span>
          <Icon />
        </div>
        <h3>{copy.badge}</h3>
        <div className="product-detail-visual__pulse">
          <i />
          <i />
          <i />
        </div>
        {copy.highlights.slice(0, 3).map((highlight, index) => (
          <div className="product-detail-visual__item" key={highlight}>
            <span>{pageNumber(index)}</span>
            <p>{highlight}</p>
          </div>
        ))}
      </div>
      <div className="product-detail-visual__float product-detail-visual__float-a">
        <FiActivity />
        <span>Realtime</span>
      </div>
      <div className="product-detail-visual__float product-detail-visual__float-b">
        <FiShield />
        <span>Verified</span>
      </div>
    </div>
  );
}

function PremiumSubpageShell({
  locale,
  tone,
  eyebrow,
  title,
  intro,
  icon: Icon,
  visual,
  children,
}: {
  locale: Locale;
  tone: Tone;
  eyebrow: string;
  title: string;
  intro: string;
  icon: IconType;
  visual: ReactNode;
  children: ReactNode;
}) {
  const ui = UI_COPY[locale];

  return (
    <div className="premium-subpage-shell" style={toneVars[tone]}>
      <div className="premium-subpage-grid" aria-hidden />
      <div className="premium-subpage-orb premium-subpage-orb-a" aria-hidden />
      <div className="premium-subpage-orb premium-subpage-orb-b" aria-hidden />

      <div className="premium-subpage-container">
        <InteractivePageSurface className="premium-subpage-surface" intensity={3}>
          <section className="premium-subpage-hero">
            <div className="premium-subpage-hero__copy">
              <span className="premium-subpage-kicker">
                <Icon />
                {eyebrow}
              </span>
              <h1>{title}</h1>
              <p>{intro}</p>
              <div className="premium-subpage-actions">
                <Link href={localizedPath("contact", locale)} className="landing-primary-cta">
                  {ui.demo}
                  <FiArrowRight />
                </Link>
                <Link href={localizedPath("products", locale)} className="landing-secondary-cta">
                  {ui.exploreProducts}
                </Link>
              </div>
            </div>
            {visual}
          </section>

          {children}
        </InteractivePageSurface>
      </div>
    </div>
  );
}

function SectionCards({ sections }: { sections: PageCopy["sections"] }) {
  return (
    <div className="subpage-section-grid">
      {sections.map((section, index) => (
        <InteractiveGridCard key={section.title} className="subpage-info-card" intensity={8}>
          <span className="subpage-info-card__index">{pageNumber(index)}</span>
          <h2>{section.title}</h2>
          <p>{section.body}</p>
        </InteractiveGridCard>
      ))}
    </div>
  );
}

function SubpageFinalCta({ locale }: { locale: Locale }) {
  const ui = UI_COPY[locale];

  return (
    <section className="subpage-final-cta">
      <div>
        <span>TRAXLE</span>
        <h2>{ui.finalTitle}</h2>
        <p>{ui.finalBody}</p>
      </div>
      <Link href={localizedPath("contact", locale)} className="landing-primary-cta">
        {ui.demo}
        <FiArrowRight />
      </Link>
    </section>
  );
}

function buildHubProducts(locale: Locale) {
  const ui = UI_COPY[locale];
  const cards = CONTENT[locale].home.cards;
  const byKey = new Map(cards.map((card) => [card.key, card]));

  return [
    {
      key: "barkodx" as EcosystemProductKey,
      title: "BarkodX",
      description: ui.barkodxDescription,
      status: ui.active,
      useCase: ui.barkodxUseCase,
      badges: ["Barcode", "Price", "Sync"],
      appStore: BARKODX_APPSTORE_URL,
      playStore: "#",
    },
    ...PRODUCT_ROUTE_KEYS.map((key) => {
      const card = byKey.get(key);
      const meta = PRODUCT_META[key];
      return {
        key,
        title: card?.title ?? key,
        description: card?.description ?? CONTENT[locale].products[key].intro,
        status: productStatus(key, locale),
        useCase: meta.useCase[locale],
        badges: CONTENT[locale].products[key].highlights.slice(0, 3).map((item) => item.split(" ").slice(0, 2).join(" ")),
        appStore: key === "molatik" ? MOLATIK_APPSTORE_URL : "#",
        playStore: "#",
      };
    }),
  ];
}

function ProductHubCard({ product, locale }: { product: ReturnType<typeof buildHubProducts>[number]; locale: Locale }) {
  const ui = UI_COPY[locale];
  const meta = HUB_PRODUCT_META[product.key];
  const Icon = meta.icon;

  return (
    <InteractiveGridCard className="subpage-product-card" intensity={10} style={toneVars[meta.tone]}>
      <div className="subpage-product-card__top">
        <span className="subpage-product-card__status">{product.status}</span>
        <Icon />
      </div>
      <div className="subpage-product-card__body">
        <div>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
        </div>
        <ProductMotionObject product={meta.object} />
      </div>
      <div className="subpage-product-card__badges">
        {product.badges.map((badge) => (
          <span key={badge}>{badge}</span>
        ))}
      </div>
      <p className="subpage-product-card__usecase">{product.useCase}</p>
      <div className="subpage-product-card__actions">
        <Link href={productRoute(product.key, locale)} className="subpage-card-cta">
          {product.key === "barkodx" ? ui.downloadCenter : ui.openProduct}
          <FiArrowUpRight />
        </Link>
        <div className="store-row">
          <StoreBadgeButton type="apple" href={product.appStore} label={ui} />
          <StoreBadgeButton type="google" href={product.playStore} label={ui} />
        </div>
      </div>
    </InteractiveGridCard>
  );
}

export function LocalizedHome({ locale }: { locale: Locale }) {
  return <PremiumLandingPage locale={locale} />;
}

export function LocalizedProductsHub({ locale }: { locale: Locale }) {
  const ui = UI_COPY[locale];
  const products = buildHubProducts(locale);
  const sections = [
    { title: ui.operatingLayer, body: ui.productsIntro },
    { title: ui.systemSnapshot, body: CONTENT[locale].pages.features.intro },
    { title: ui.relatedActions, body: CONTENT[locale].pages.integrations.intro },
  ];

  return (
    <PremiumSubpageShell
      locale={locale}
      tone="cyan"
      eyebrow={ui.productsEyebrow}
      title={ui.productsTitle}
      intro={ui.productsIntro}
      icon={FiLayers}
      visual={<PageVisual title="Product OS" sections={sections} icon={FiCpu} />}
    >
      <section className="subpage-block">
        <div className="subpage-block-heading">
          <span>{ui.productsEyebrow}</span>
          <h2>{ui.exploreProducts}</h2>
        </div>
        <div className="subpage-product-grid">
          {products.map((product) => (
            <ProductHubCard key={product.key} product={product} locale={locale} />
          ))}
        </div>
      </section>

      <section className="subpage-metric-rail">
        {sections.map((section, index) => (
          <div key={section.title}>
            <span>{pageNumber(index)}</span>
            <strong>{section.title}</strong>
            <p>{section.body}</p>
          </div>
        ))}
      </section>

      <SubpageFinalCta locale={locale} />
    </PremiumSubpageShell>
  );
}

export function LocalizedAbout({ locale }: { locale: Locale }) {
  const content = CONTENT[locale].about;

  return (
    <PremiumSubpageShell
      locale={locale}
      tone="blue"
      eyebrow={content.badge}
      title={content.title}
      intro={content.intro}
      icon={FiGlobe}
      visual={<PageVisual title={content.badge} sections={content.sections} icon={FiActivity} />}
    >
      <section className="subpage-stats-grid">
        {content.stats.map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="subpage-block">
        <div className="subpage-block-heading">
          <span>TRAXLE DNA</span>
          <h2>{content.badge}</h2>
        </div>
        <SectionCards sections={content.sections} />
      </section>

      <SubpageFinalCta locale={locale} />
    </PremiumSubpageShell>
  );
}

export function LocalizedProductPage({ locale, routeKey }: { locale: Locale; routeKey: RouteKey }) {
  const productKey = productKeyFromRoute(routeKey);
  if (!productKey) return null;

  const copy: ProductCopy = CONTENT[locale].products[productKey];
  const ui = UI_COPY[locale];
  const meta = PRODUCT_META[productKey];
  const Icon = meta.icon;
  const privacyHref =
    productKey === "logistics" ? localizedPath("contact", locale) : localizedPathForProductPrivacy(productKey, locale);

  return (
    <PremiumSubpageShell
      locale={locale}
      tone={meta.tone}
      eyebrow={copy.badge}
      title={copy.title}
      intro={copy.intro}
      icon={Icon}
      visual={<ProductDetailVisual productKey={productKey} copy={copy} locale={locale} />}
    >
      <section className="product-detail-metrics">
        {meta.metrics.map((metric) => (
          <div key={`${metric.value}-${metric.label[locale]}`}>
            <strong>{metric.value}</strong>
            <span>{metric.label[locale]}</span>
          </div>
        ))}
      </section>

      <section className="subpage-block">
        <div className="subpage-block-heading">
          <span>{ui.capabilities}</span>
          <h2>{meta.useCase[locale]}</h2>
        </div>
        <div className="product-detail-capabilities">
          {copy.highlights.map((highlight, index) => (
            <InteractiveGridCard key={highlight} className="product-detail-capability" intensity={8}>
              <span>{pageNumber(index)}</span>
              <h3>{highlight}</h3>
              <p>{index % 2 === 0 ? ui.operatingLayer : ui.workflow}</p>
            </InteractiveGridCard>
          ))}
        </div>
      </section>

      <section className="product-detail-actions">
        <div>
          <span>{ui.relatedActions}</span>
          <h2>{ui.privacy}</h2>
          <p>{copy.privacyCta}</p>
        </div>
        <div className="product-detail-actions__links">
          <Link href={privacyHref} className="subpage-card-cta">
            <FiShield />
            {copy.privacyCta}
          </Link>

          {meta.actions === "kunyex" && (
            <>
              <Link href="/guncelleme/kunyex" className="subpage-card-cta subpage-card-cta-muted">
                <FaWindows />
                KunyeX Manual Update
              </Link>
              <Link href="/barkodx/uygulamalar/guncelleme" className="subpage-card-cta subpage-card-cta-muted">
                <FiDownloadCloud />
                BarkodX DataTransfer
              </Link>
              <StoreBadgeButton type="apple" href={BARKODX_APPSTORE_URL} label={ui} />
            </>
          )}

          {meta.actions === "molatik" && (
            <>
              <StoreBadgeButton type="apple" href={MOLATIK_APPSTORE_URL} label={ui} />
              <StoreBadgeButton type="google" href="#" label={ui} />
            </>
          )}
        </div>
      </section>

      <SubpageFinalCta locale={locale} />
    </PremiumSubpageShell>
  );
}

export function LocalizedProductPrivacy({ locale, routeKey }: { locale: Locale; routeKey: RouteKey }) {
  const productKey = privacyProductFromRoute(routeKey);
  if (!productKey) return null;

  const copy = CONTENT[locale].productPrivacy[productKey];
  const meta = PRODUCT_META[productKey];
  const ui = UI_COPY[locale];

  return (
    <PremiumSubpageShell
      locale={locale}
      tone={meta.tone}
      eyebrow={ui.legalReview}
      title={copy.title}
      intro={copy.intro}
      icon={FiShield}
      visual={<PageVisual title={copy.title} sections={copy.sections} icon={FiShield} />}
    >
      <SectionCards sections={copy.sections} />
      <SubpageFinalCta locale={locale} />
    </PremiumSubpageShell>
  );
}

export function LocalizedGenericPage({ locale, routeKey }: { locale: Locale; routeKey: RouteKey }) {
  const generic = CONTENT[locale].pages;
  const page = generic[routeKey as keyof typeof generic];
  if (!page) return null;

  const meta = PAGE_META[routeKey] ?? { eyebrow: "TRAXLE", icon: FiLayers, tone: "cyan" as Tone };
  const ui = UI_COPY[locale];

  return (
    <PremiumSubpageShell
      locale={locale}
      tone={meta.tone}
      eyebrow={meta.eyebrow}
      title={page.title}
      intro={page.intro}
      icon={meta.icon}
      visual={<PageVisual title={page.title} sections={page.sections} icon={meta.icon} />}
    >
      <section className="subpage-block">
        <div className="subpage-block-heading">
          <span>{ui.operatingLayer}</span>
          <h2>{page.title}</h2>
        </div>
        <SectionCards sections={page.sections} />
      </section>

      <section className="subpage-metric-rail">
        {page.sections.map((section, index) => (
          <div key={section.title}>
            <span>{pageNumber(index)}</span>
            <strong>{section.title}</strong>
            <p>{section.body}</p>
          </div>
        ))}
      </section>

      <SubpageFinalCta locale={locale} />
    </PremiumSubpageShell>
  );
}
