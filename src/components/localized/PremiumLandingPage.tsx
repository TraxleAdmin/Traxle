"use client";

import Link from "next/link";
import { useMemo, useState, type CSSProperties, type MouseEvent } from "react";
import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import {
  FiArrowRight,
  FiCheck,
  FiChevronDown,
  FiClock,
  FiCpu,
  FiMapPin,
  FiPackage,
  FiRadio,
  FiRefreshCcw,
  FiShield,
  FiTag,
  FiUsers,
  FiZap,
} from "react-icons/fi";
import { Locale, localizedPath } from "@/lib/i18n/routes";

type Tone = "cyan" | "rose" | "emerald" | "amber";
type ProductKey = "barkodx" | "molatik" | "kunyex" | "logistics";
interface LandingCopy {
  heroEyebrow: string;
  heroTitle: string;
  heroIntro: string;
  primaryCta: string;
  secondaryCta: string;
  showcaseTitle: string;
  showcaseSubtitle: string;
  trustTitle: string;
  sections: {
    features: string;
    realtime: string;
    ecosystem: string;
    pricing: string;
    faq: string;
    final: string;
  };
}

const BARKODX_APPSTORE_URL = "https://apps.apple.com/tr/app/barkodx/id6767043219?l=tr";
const MOLATIK_APPSTORE_URL = "https://apps.apple.com/tr/app/molatik/id6765758798?l=tr";

const toneVars: Record<Tone, CSSProperties> = {
  cyan: { "--tone-a": "#22d3ee", "--tone-b": "#2563eb", "--tone-c": "#38bdf8" } as CSSProperties,
  rose: { "--tone-a": "#f472b6", "--tone-b": "#7c3aed", "--tone-c": "#fb7185" } as CSSProperties,
  emerald: { "--tone-a": "#34d399", "--tone-b": "#84cc16", "--tone-c": "#10b981" } as CSSProperties,
  amber: { "--tone-a": "#f59e0b", "--tone-b": "#f97316", "--tone-c": "#fbbf24" } as CSSProperties,
};

const copy: Record<Locale, LandingCopy> = {
  tr: {
    heroEyebrow: "TRAXLE Operasyon Teknolojileri",
    heroTitle: "Gerçek zamanlı iş yönetimi için tek altyapı.",
    heroIntro:
      "TRAXLE; BarkodX, Molatik, KunyeX ve lojistik operasyon çözümlerini aynı mühendislik altyapısında geliştiren kurumsal teknoloji ekosistemidir.",
    primaryCta: "Projeleri İncele",
    secondaryCta: "Demo Talep Et",
    showcaseTitle: "Canlı operasyon paneli",
    showcaseSubtitle: "Şube, cihaz, barkod ve personel akışlarını tek bakışta takip edin.",
    trustTitle: "Üretim ortamı için modern altyapı",
    sections: {
      features: "Operasyon katmanları",
      realtime: "Gerçek zamanlı operasyon akışı",
      ecosystem: "TRAXLE altyapısı altında geliştirilen bağımsız iş uygulamaları",
      pricing: "Şube ve cihaz ölçeğine göre planlanır",
      faq: "Sık sorulan sorular",
      final: "Operasyonlarını gerçek zamanlı yönetmeye hazır mısın?",
    },
  },
  en: {
    heroEyebrow: "TRAXLE Operations Technology",
    heroTitle: "One infrastructure for real-time business operations.",
    heroIntro:
      "TRAXLE develops BarkodX, Molatik, KunyeX and logistics tools on one enterprise-grade operational technology foundation.",
    primaryCta: "Explore Products",
    secondaryCta: "Request Demo",
    showcaseTitle: "Live operations panel",
    showcaseSubtitle: "Track branches, devices, barcode data and workforce signals in one view.",
    trustTitle: "Modern infrastructure for production teams",
    sections: {
      features: "Operational layers",
      realtime: "Realtime operations flow",
      ecosystem: "Independent business apps developed on TRAXLE infrastructure",
      pricing: "Plans shaped around branches and devices",
      faq: "Frequently asked questions",
      final: "Ready to manage operations in real time?",
    },
  },
  de: {
    heroEyebrow: "TRAXLE Betriebstechnologie",
    heroTitle: "Eine Infrastruktur für Echtzeit-Betriebsführung.",
    heroIntro:
      "TRAXLE entwickelt BarkodX, Molatik, KunyeX und Logistiklösungen auf einer gemeinsamen, unternehmenstauglichen Technologieplattform.",
    primaryCta: "Produkte ansehen",
    secondaryCta: "Demo anfragen",
    showcaseTitle: "Live Operations Panel",
    showcaseSubtitle: "Filialen, Geräte, Barcode-Daten und Teamstatus in einer Ansicht verfolgen.",
    trustTitle: "Moderne Infrastruktur für Produktivteams",
    sections: {
      features: "Operative Ebenen",
      realtime: "Echtzeit-Betriebsfluss",
      ecosystem: "Unabhängige Business-Apps auf TRAXLE Infrastruktur",
      pricing: "Pläne nach Filialen und Geräten",
      faq: "Häufige Fragen",
      final: "Bereit, Abläufe in Echtzeit zu steuern?",
    },
  },
  ru: {
    heroEyebrow: "TRAXLE Operations Technology",
    heroTitle: "One infrastructure for real-time business operations.",
    heroIntro:
      "TRAXLE develops BarkodX, Molatik, KunyeX and logistics tools on one enterprise-grade operational technology foundation.",
    primaryCta: "Explore Products",
    secondaryCta: "Request Demo",
    showcaseTitle: "Live operations panel",
    showcaseSubtitle: "Track branches, devices, barcode data and workforce signals in one view.",
    trustTitle: "Modern infrastructure for production teams",
    sections: {
      features: "Operational layers",
      realtime: "Realtime operations flow",
      ecosystem: "Independent business apps developed on TRAXLE infrastructure",
      pricing: "Plans shaped around branches and devices",
      faq: "Frequently asked questions",
      final: "Ready to manage operations in real time?",
    },
  },
  ar: {
    heroEyebrow: "TRAXLE Operations Technology",
    heroTitle: "One infrastructure for real-time business operations.",
    heroIntro:
      "TRAXLE develops BarkodX, Molatik, KunyeX and logistics tools on one enterprise-grade operational technology foundation.",
    primaryCta: "Explore Products",
    secondaryCta: "Request Demo",
    showcaseTitle: "Live operations panel",
    showcaseSubtitle: "Track branches, devices, barcode data and workforce signals in one view.",
    trustTitle: "Modern infrastructure for production teams",
    sections: {
      features: "Operational layers",
      realtime: "Realtime operations flow",
      ecosystem: "Independent business apps developed on TRAXLE infrastructure",
      pricing: "Plans shaped around branches and devices",
      faq: "Frequently asked questions",
      final: "Ready to manage operations in real time?",
    },
  },
};

const trustBadges = ["Next.js", "Vercel", "Firebase", "Google Cloud", "Flutter", "Apple", "Android", "iyzico"];

const featureCards = [
  {
    icon: FiTag,
    title: "BarkodX",
    body: "Fiyat, barkod ve şube verisini canlı senkronize eder.",
    accent: "cyan" as Tone,
  },
  {
    icon: FiClock,
    title: "Molatik",
    body: "Personel mola ve vardiya yönetimini sadeleştirir.",
    accent: "rose" as Tone,
  },
  {
    icon: FiUsers,
    title: "KunyeX",
    body: "Personel ve operasyon kayıtlarını düzenli hale getirir.",
    accent: "emerald" as Tone,
  },
  {
    icon: FiMapPin,
    title: "Lojistik",
    body: "Yük, teslimat ve QR doğrulama süreçlerini destekler.",
    accent: "amber" as Tone,
  },
  {
    icon: FiShield,
    title: "Admin Panel",
    body: "Şube, personel, rol ve yetki yönetimini tek noktada toplar.",
    accent: "cyan" as Tone,
  },
  {
    icon: FiRefreshCcw,
    title: "Realtime Sync",
    body: "Değişiklikleri yetkili cihazlara anlık olarak yayar.",
    accent: "emerald" as Tone,
  },
];

const productData = [
  {
    key: "barkodx" as ProductKey,
    tone: "cyan" as Tone,
    name: "BarkodX",
    status: "Aktif",
    route: "/barkodx/uygulamalar/guncelleme",
    appStore: BARKODX_APPSTORE_URL,
    playStore: "#",
    description: "Barkod, fiyat ve şube verilerini gerçek zamanlı yöneten akıllı perakende altyapısı.",
    useCase: "Perakende, market, şube operasyonu",
    badges: ["Barkod", "Fiyat", "Şube"],
  },
  {
    key: "molatik" as ProductKey,
    tone: "rose" as Tone,
    name: "Molatik",
    status: "Aktif",
    appStore: MOLATIK_APPSTORE_URL,
    playStore: "#",
    description: "Personel mola, vardiya ve yönetici bildirimlerini sadeleştiren mobil yönetim uygulaması.",
    useCase: "Saha ekipleri ve vardiya yönetimi",
    badges: ["Mola", "Vardiya", "Bildirim"],
  },
  {
    key: "kunyex" as ProductKey,
    tone: "emerald" as Tone,
    name: "KunyeX",
    status: "Geliştiriliyor",
    appStore: "#",
    playStore: "#",
    description: "Personel operasyonlarını, kayıtları ve süreç takibini tek panelden yöneten çözüm.",
    useCase: "Kayıt, kimlik ve süreç takibi",
    badges: ["Kayıt", "Yetki", "Süreç"],
  },
  {
    key: "logistics" as ProductKey,
    tone: "amber" as Tone,
    name: "TRAXLE Lojistik",
    status: "Yakında",
    appStore: "#",
    playStore: "#",
    description: "Yük, teslimat, QR doğrulama ve operasyon akışlarını dijitalleştiren lojistik altyapısı.",
    useCase: "Yük, teslimat ve saha doğrulama",
    badges: ["QR", "Teslimat", "Rota"],
  },
];

const pricingPlans = [
  {
    name: "Başlangıç",
    tag: "Tek şube",
    price: "Demo ile belirlenir",
    features: ["1 şube yönetimi", "Temel cihaz senkronu", "Rol bazlı kullanıcılar"],
  },
  {
    name: "Operasyon",
    tag: "Önerilen",
    price: "Şube ölçeğine göre",
    featured: true,
    features: ["Çoklu şube", "Realtime fiyat akışı", "Personel ve cihaz yönetimi", "Öncelikli destek"],
  },
  {
    name: "Kurumsal",
    tag: "Özel altyapı",
    price: "Teklif ile",
    features: ["Özel entegrasyon", "Gelişmiş yetki modeli", "SLA planlama", "Kurumsal onboarding"],
  },
];

const faqItems = [
  ["TRAXLE nedir?", "BarkodX, Molatik, KunyeX ve lojistik uygulamalarını geliştiren operasyon teknolojisi altyapısıdır."],
  ["BarkodX ne işe yarar?", "Fiyat, barkod ve şube verilerini yetkili cihazlarla gerçek zamanlı senkronize eder."],
  ["Şube yönetimi var mı?", "Evet. Şube, kullanıcı, cihaz ve rol yönetimi aynı panel mantığı içinde kurgulanır."],
  ["Mobil ve web birlikte çalışır mı?", "Evet. Web panel operasyon kontrolü sağlar, mobil uygulamalar sahadaki akışları tamamlar."],
  ["Veriler güvenli mi?", "Rol bazlı yetki, şifreli iletişim ve denetlenebilir işlem akışı temel prensip olarak kullanılır."],
];

function routeForProduct(locale: Locale, key: ProductKey) {
  if (key === "barkodx") return "/barkodx/uygulamalar/guncelleme";
  if (key === "molatik") return localizedPath("molatik", locale);
  if (key === "kunyex") return localizedPath("kunyex", locale);
  return localizedPath("logistics", locale);
}

export default function PremiumLandingPage({ locale }: { locale: Locale }) {
  const t = copy[locale];

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--landing-mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--landing-my", `${event.clientY - rect.top}px`);
  };

  return (
    <div className="traxle-premium-landing" onMouseMove={handleMouseMove}>
      <span className="landing-mouse-light" aria-hidden />
      <span className="landing-noise" aria-hidden />
      <HeroSection locale={locale} t={t} />
      <ShowcaseSection t={t} />
      <TrustBar title={t.trustTitle} />
      <FeatureGrid title={t.sections.features} />
      <RealtimeOpsSection title={t.sections.realtime} />
      <ProductEcosystemGrid locale={locale} title={t.sections.ecosystem} />
      <PricingSection locale={locale} title={t.sections.pricing} />
      <FAQSection title={t.sections.faq} />
      <FinalCTA locale={locale} title={t.sections.final} primary={t.secondaryCta} secondary={t.primaryCta} />
    </div>
  );
}

function HeroSection({ locale, t }: { locale: Locale; t: LandingCopy }) {
  return (
    <section className="landing-hero mx-auto flex min-h-[88vh] w-full max-w-7xl flex-col justify-end px-4 pb-10 pt-32 sm:px-6 lg:pt-36">
      <div className="max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="landing-eyebrow"
        >
          <FiRadio />
          {t.heroEyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="landing-hero-title"
        >
          {t.heroTitle}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="landing-hero-copy"
        >
          {t.heroIntro}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <Link href={localizedPath("products", locale)} className="landing-primary-cta">
            {t.primaryCta}
            <FiArrowRight />
          </Link>
          <Link href={localizedPath("contact", locale)} className="landing-secondary-cta">
            {t.secondaryCta}
          </Link>
        </motion.div>
      </div>
      <div className="mt-14 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
        {["BarkodX", "Molatik", "KunyeX", "Lojistik"].map((item) => (
          <span key={item} className="landing-product-pill">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

function ShowcaseSection({ t }: { t: LandingCopy }) {
  return (
    <section className="landing-section mx-auto w-full max-w-7xl px-4 sm:px-6">
      <div className="ops-showcase">
        <div className="ops-showcase-header">
          <div>
            <p className="landing-section-kicker">Command Center</p>
            <h2>{t.showcaseTitle}</h2>
            <p>{t.showcaseSubtitle}</p>
          </div>
          <span className="ops-live-indicator">
            <span />
            Live
          </span>
        </div>

        <div className="ops-dashboard-grid">
          <div className="ops-panel ops-panel-wide">
            <div className="ops-panel-topline">
              <span>Şube ağı</span>
              <strong>24 aktif lokasyon</strong>
            </div>
            <div className="ops-map">
              <span className="ops-map-route" />
              {[18, 36, 55, 74].map((left, index) => (
                <i key={left} style={{ left: `${left}%`, top: `${28 + (index % 2) * 28}%` }} />
              ))}
            </div>
          </div>

          <MetricCard icon={FiPackage} label="Barkod senkronu" value="482K" change="+12.4%" />
          <MetricCard icon={FiClock} label="Mola durumu" value="91%" change="uyum" />
          <MetricCard icon={FiTag} label="Fiyat akışı" value="3.8K" change="bugün" />
          <MetricCard icon={FiCpu} label="Aktif cihaz" value="318" change="online" />

          <div className="ops-panel ops-feed">
            <div className="ops-panel-topline">
              <span>Canlı işlem akışı</span>
              <strong>son 6 dakika</strong>
            </div>
            {["QR doğrulama tamamlandı", "Fiyat güncellemesi yayıldı", "Yeni cihaz lisansı etkin"].map((item) => (
              <div key={item} className="ops-feed-row">
                <FiZap />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({ icon: Icon, label, value, change }: { icon: IconType; label: string; value: string; change: string }) {
  return (
    <div className="ops-panel ops-metric">
      <Icon />
      <span>{label}</span>
      <strong>{value}</strong>
      <em>{change}</em>
    </div>
  );
}

function TrustBar({ title }: { title: string }) {
  return (
    <section className="landing-section mx-auto w-full max-w-7xl px-4 sm:px-6">
      <div className="trust-bar">
        <span>{title}</span>
        <div>
          {trustBadges.map((badge) => (
            <b key={badge}>{badge}</b>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureGrid({ title }: { title: string }) {
  return (
    <section className="landing-section mx-auto w-full max-w-7xl px-4 sm:px-6">
      <SectionHeading kicker="Platform" title={title} body="Her katman tek bir amaca hizmet eder: sahadaki değişikliği hızlı, izlenebilir ve güvenli biçimde yönetmek." />
      <div className="feature-grid">
        {featureCards.map((feature) => (
          <article key={feature.title} className="feature-card" style={toneVars[feature.accent]}>
            <feature.icon />
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
            <span />
          </article>
        ))}
      </div>
    </section>
  );
}

function RealtimeOpsSection({ title }: { title: string }) {
  const metrics = [
    ["500K+", "ürün ve barkod kapasitesi"],
    ["Binlerce", "günlük fiyat güncellemesi"],
    ["Çoklu", "şube ve cihaz yönetimi"],
    ["Rol bazlı", "yetki ve işlem denetimi"],
  ];

  return (
    <section className="landing-section mx-auto w-full max-w-7xl px-4 sm:px-6">
      <div className="realtime-section">
        <SectionHeading kicker="Realtime" title={title} body="TRAXLE, ürün verisi ile saha aksiyonunu aynı operasyon çizgisinde buluşturur." />
        <div className="realtime-rail">
          {metrics.map(([value, label]) => (
            <div key={label} className="realtime-metric">
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductEcosystemGrid({ locale, title }: { locale: Locale; title: string }) {
  return (
    <section className="landing-section mx-auto w-full max-w-7xl px-4 sm:px-6">
      <SectionHeading kicker="Ecosystem" title={title} body="Her ürün bağımsız çalışır; altyapı, veri modeli ve güvenlik prensipleri aynı mühendislik standardından beslenir." />
      <div className="product-ecosystem-grid">
        {productData.map((product) => (
          <ProductCard key={product.key} locale={locale} product={product} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ locale, product }: { locale: Locale; product: (typeof productData)[number] }) {
  return (
    <article className="product-ecosystem-card" style={toneVars[product.tone]}>
      <div className="product-card-top">
        <span>{product.status}</span>
        <ProductObject type={product.key} />
      </div>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <small>{product.useCase}</small>
      <div className="product-badges">
        {product.badges.map((badge) => (
          <b key={badge}>{badge}</b>
        ))}
      </div>
      <div className="product-card-actions">
        <Link href={routeForProduct(locale, product.key)} className="product-link">
          Ürünü aç
          <FiArrowRight />
        </Link>
        <div className="store-row">
          <StoreBadgeButton store="apple" href={product.appStore} product={product.name} />
          <StoreBadgeButton store="play" href={product.playStore} product={product.name} />
        </div>
      </div>
    </article>
  );
}

function StoreBadgeButton({ store, href, product }: { store: "apple" | "play"; href: string; product: string }) {
  const isApple = store === "apple";
  return (
    <Link href={href} aria-label={`${product} ${isApple ? "App Store" : "Google Play"}`} className="store-badge-button">
      {isApple ? <FaApple /> : <FaGooglePlay />}
      <span>
        <small>{isApple ? "Download on the" : "GET IT ON"}</small>
        <strong>{isApple ? "App Store" : "Google Play"}</strong>
      </span>
    </Link>
  );
}

function ProductObject({ type }: { type: ProductKey }) {
  return (
    <div className={`product-object product-object-${type}`} aria-hidden>
      {type === "barkodx" && (
        <>
          <i />
          <i />
          <i />
          <span>₺</span>
        </>
      )}
      {type === "molatik" && (
        <>
          <FiClock />
          <span>12:45</span>
        </>
      )}
      {type === "kunyex" && (
        <>
          <FiCheck />
          <span />
          <span />
        </>
      )}
      {type === "logistics" && (
        <>
          <FiMapPin />
          <span />
          <span />
        </>
      )}
    </div>
  );
}

function PricingSection({ locale, title }: { locale: Locale; title: string }) {
  return (
    <section className="landing-section mx-auto w-full max-w-7xl px-4 sm:px-6">
      <SectionHeading kicker="Plans" title={title} body="Net kapsam ve fiyat, şube sayısı, cihaz adedi ve entegrasyon ihtiyacına göre demo görüşmesinde belirlenir." />
      <div className="pricing-grid">
        {pricingPlans.map((plan) => (
          <article key={plan.name} className={`pricing-card ${plan.featured ? "pricing-card-featured" : ""}`}>
            <span>{plan.tag}</span>
            <h3>{plan.name}</h3>
            <strong>{plan.price}</strong>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <FiCheck />
                  {feature}
                </li>
              ))}
            </ul>
            <Link href={localizedPath("contact", locale)}>Demo talep et</Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function FAQSection({ title }: { title: string }) {
  const [open, setOpen] = useState(0);
  const items = useMemo(() => faqItems, []);

  return (
    <section className="landing-section mx-auto w-full max-w-4xl px-4 sm:px-6">
      <SectionHeading kicker="FAQ" title={title} body="TRAXLE ekosistemiyle ilgili en temel operasyon soruları." />
      <div className="faq-list">
        {items.map(([question, answer], index) => {
          const active = open === index;
          return (
            <div key={question} className="faq-item">
              <button type="button" onClick={() => setOpen(active ? -1 : index)} aria-expanded={active}>
                <span>{question}</span>
                <FiChevronDown />
              </button>
              <motion.div initial={false} animate={{ height: active ? "auto" : 0, opacity: active ? 1 : 0 }}>
                <p>{answer}</p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function FinalCTA({ locale, title, primary, secondary }: { locale: Locale; title: string; primary: string; secondary: string }) {
  return (
    <section className="landing-section mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6">
      <div className="final-cta">
        <h2>{title}</h2>
        <p>Şube, ürün, cihaz ve personel akışlarını tek operasyon altyapısında toplamak için TRAXLE ekibiyle konuşun.</p>
        <div>
          <Link href={localizedPath("contact", locale)} className="landing-primary-cta">
            {primary}
            <FiArrowRight />
          </Link>
          <Link href={localizedPath("products", locale)} className="landing-secondary-cta">
            {secondary}
          </Link>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ kicker, title, body }: { kicker: string; title: string; body: string }) {
  return (
    <div className="section-heading">
      <span>{kicker}</span>
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  );
}
