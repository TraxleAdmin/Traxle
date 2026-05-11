"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { FiArrowUpRight, FiCpu, FiDownloadCloud, FiZap } from "react-icons/fi";
import { LocaleContent } from "@/lib/i18n/content";
import { Locale, localizedPath } from "@/lib/i18n/routes";

const HomeDepthScene = dynamic(() => import("@/components/home/HomeDepthScene"), {
  ssr: false,
  loading: () => null,
});

const BARKODX_APPSTORE_URL = "https://apps.apple.com/tr/app/barkodx/id6767043219?l=tr";
const MOLATIK_APPSTORE_URL = "https://apps.apple.com/tr/app/molatik/id6765758798?l=tr";

const MOTION_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const LOCALE_LABELS: Record<
  Locale,
  {
    openPage: string;
    primaryCta: string;
    secondaryCta: string;
    productsTitle: string;
    productsIntro: string;
    liveTitle: string;
    aiTitle: string;
    trustTitle: string;
    trustIntro: string;
    finalTitle: string;
    finalIntro: string;
    finalButton: string;
    appStoreBarkodx: string;
    appStoreMolatik: string;
    playSoonMolatik: string;
    updateHub: string;
    statusLive: string;
    statusPilot: string;
    statusScaling: string;
    statThroughput: string;
    statResponse: string;
    statIntegrity: string;
  }
> = {
  tr: {
    openPage: "Sayfaya git",
    primaryCta: "Operasyon Demosu Al",
    secondaryCta: "Ekosistemi Kesfet",
    productsTitle: "Urun Ekosistemi",
    productsIntro: "Her modul ayni veri omurgasina baglanir ve canli operasyonla birlikte calisir.",
    liveTitle: "Canli Operasyon Akisi",
    aiTitle: "Akilli Altyapi Katmani",
    trustTitle: "Saha Tarafindan Dogrulanan Performans",
    trustIntro: "Traxle cozumleri karar verme hizini artirirken denetlenebilirligi korur.",
    finalTitle: "Traxle ile operasyonunuzu bir ust seviyeye tasiyin",
    finalIntro: "Ekiplerinizi tek akista birlestiren premium bir operasyon platformu kurun.",
    finalButton: "Iletisim Ekibiyle Basla",
    appStoreBarkodx: "BarkodX App Store",
    appStoreMolatik: "Molatik App Store",
    playSoonMolatik: "Google Play Cok Yakinda",
    updateHub: "Masaustu Guncelleme Merkezi",
    statusLive: "Canli Uretim",
    statusPilot: "Pilot Akis",
    statusScaling: "Olcekleniyor",
    statThroughput: "Anlik Islem Hizi",
    statResponse: "Alarm Tepki Suresi",
    statIntegrity: "Veri Butunluk Skoru",
  },
  en: {
    openPage: "Open page",
    primaryCta: "Book Operations Demo",
    secondaryCta: "Explore Ecosystem",
    productsTitle: "Product Ecosystem",
    productsIntro: "Every module shares the same data backbone and moves with live operations.",
    liveTitle: "Live Operations Flow",
    aiTitle: "Intelligent Infrastructure Layer",
    trustTitle: "Field-Validated Performance",
    trustIntro: "Traxle increases decision velocity while preserving auditability.",
    finalTitle: "Elevate your operations with Traxle",
    finalIntro: "Build a premium operational stack that unifies every team in one flow.",
    finalButton: "Start with Contact Team",
    appStoreBarkodx: "BarkodX on App Store",
    appStoreMolatik: "Molatik on App Store",
    playSoonMolatik: "Google Play Coming Soon",
    updateHub: "Desktop Update Center",
    statusLive: "Live Production",
    statusPilot: "Pilot Flow",
    statusScaling: "Scaling",
    statThroughput: "Real-Time Throughput",
    statResponse: "Alert Response Time",
    statIntegrity: "Data Integrity Score",
  },
  de: {
    openPage: "Seite öffnen",
    primaryCta: "Operations-Demo buchen",
    secondaryCta: "Ökosystem entdecken",
    productsTitle: "Produkt-Ökosystem",
    productsIntro: "Alle Module laufen auf derselben Datenbasis und reagieren live auf den Betrieb.",
    liveTitle: "Live-Operations-Flow",
    aiTitle: "Intelligente Infrastruktur",
    trustTitle: "Im Feld validierte Leistung",
    trustIntro: "Traxle beschleunigt Entscheidungen und hält die Nachvollziehbarkeit hoch.",
    finalTitle: "Bringen Sie Ihre Operationen mit Traxle auf das nächste Level",
    finalIntro: "Schaffen Sie eine Premium-Plattform, die alle Teams in einem Ablauf verbindet.",
    finalButton: "Kontakt mit dem Team",
    appStoreBarkodx: "BarkodX im App Store",
    appStoreMolatik: "Molatik im App Store",
    playSoonMolatik: "Google Play folgt bald",
    updateHub: "Desktop-Update-Center",
    statusLive: "Live-Betrieb",
    statusPilot: "Pilot-Flow",
    statusScaling: "Skalierung",
    statThroughput: "Echtzeit-Durchsatz",
    statResponse: "Alarm-Reaktionszeit",
    statIntegrity: "Datenintegrität",
  },
  ru: {
    openPage: "Открыть страницу",
    primaryCta: "Запросить демо",
    secondaryCta: "Изучить экосистему",
    productsTitle: "Экосистема продуктов",
    productsIntro: "Каждый модуль работает на общей модели данных и синхронизируется с живыми операциями.",
    liveTitle: "Поток живых операций",
    aiTitle: "Интеллектуальная инфраструктура",
    trustTitle: "Результат, подтверждённый в поле",
    trustIntro: "Traxle ускоряет принятие решений и сохраняет прозрачность контроля.",
    finalTitle: "Поднимите операционный уровень вместе с Traxle",
    finalIntro: "Постройте премиальную платформу, объединяющую команды в одном потоке.",
    finalButton: "Связаться с командой",
    appStoreBarkodx: "BarkodX в App Store",
    appStoreMolatik: "Molatik в App Store",
    playSoonMolatik: "Google Play скоро",
    updateHub: "Центр обновлений для desktop",
    statusLive: "Рабочий продакшен",
    statusPilot: "Пилотный поток",
    statusScaling: "Масштабирование",
    statThroughput: "Пропускная способность",
    statResponse: "Время реакции",
    statIntegrity: "Целостность данных",
  },
  ar: {
    openPage: "افتح الصفحة",
    primaryCta: "احجز عرضاً تجريبياً",
    secondaryCta: "استكشف المنظومة",
    productsTitle: "منظومة المنتجات",
    productsIntro: "تعمل كل الوحدات على بنية بيانات موحّدة وتتحرك مع العمليات الحية.",
    liveTitle: "تدفق العمليات الحية",
    aiTitle: "طبقة البنية الذكية",
    trustTitle: "أداء مثبت ميدانياً",
    trustIntro: "Traxle يسرّع القرار التشغيلي مع الحفاظ على قابلية التدقيق.",
    finalTitle: "انقل عملياتك إلى مستوى رائد مع Traxle",
    finalIntro: "ابنِ منصة تشغيل ذكية موحدة تجمع جميع الفرق في تدفق واحد.",
    finalButton: "ابدأ مع فريق التواصل",
    appStoreBarkodx: "BarkodX على App Store",
    appStoreMolatik: "Molatik على App Store",
    playSoonMolatik: "Google Play قريباً",
    updateHub: "مركز تحديثات سطح المكتب",
    statusLive: "تشغيل حي",
    statusPilot: "تدفق تجريبي",
    statusScaling: "توسع",
    statThroughput: "الإنتاجية اللحظية",
    statResponse: "زمن الاستجابة",
    statIntegrity: "سلامة البيانات",
  },
};

interface LocalizedHomeExperienceProps {
  locale: Locale;
  content: LocaleContent;
}

function GlassFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`traxle-glass traxle-border-glow rounded-3xl p-6 sm:p-7 ${className}`}>
      {children}
    </div>
  );
}

export default function LocalizedHomeExperience({
  locale,
  content,
}: LocalizedHomeExperienceProps) {
  const labels = LOCALE_LABELS[locale];
  const prefersReducedMotion = useReducedMotion();
  const pageRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const productsRef = useRef<HTMLElement | null>(null);
  const [activeProduct, setActiveProduct] = useState<string | null>(null);
  const [showThreeScene, setShowThreeScene] = useState(false);

  const cursorX = useMotionValue(-300);
  const cursorY = useMotionValue(-300);
  const smoothCursorX = useSpring(cursorX, { stiffness: 180, damping: 30, mass: 0.45 });
  const smoothCursorY = useSpring(cursorY, { stiffness: 180, damping: 30, mass: 0.45 });
  const cursorTransform = useMotionTemplate`translate3d(${smoothCursorX}px, ${smoothCursorY}px, 0)`;

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  const heroParallax = useTransform(scrollYProgress, [0, 0.2], [0, prefersReducedMotion ? 0 : -45]);
  const heroGlowScale = useTransform(scrollYProgress, [0, 0.22], [1, 1.12]);
  const progressOpacity = useTransform(scrollYProgress, [0, 0.25, 1], [0.2, 0.75, 0.1]);

  const heroInView = useInView(heroRef, { amount: 0.35, once: true });
  const productsInView = useInView(productsRef, { amount: 0.2, once: true });

  const heroCards = useMemo(() => content.home.cards, [content.home.cards]);

  const productModules = useMemo(
    () => [
      {
        id: "kunyex",
        href: localizedPath("kunyex", locale),
        name: content.products.kunyex.title,
        badge: content.products.kunyex.badge,
        details: content.products.kunyex.highlights.slice(0, 2),
        status: labels.statusLive,
      },
      {
        id: "molatik",
        href: localizedPath("molatik", locale),
        name: content.products.molatik.title,
        badge: content.products.molatik.badge,
        details: content.products.molatik.highlights.slice(0, 2),
        status: labels.statusPilot,
      },
      {
        id: "logistics",
        href: localizedPath("logistics", locale),
        name: content.products.logistics.title,
        badge: content.products.logistics.badge,
        details: content.products.logistics.highlights.slice(0, 2),
        status: labels.statusScaling,
      },
      {
        id: "future",
        href: localizedPath("updates", locale),
        name: content.pages.updates.title,
        badge: content.home.badge,
        details: content.pages.updates.sections.slice(0, 2).map((item) => item.title),
        status: content.pages.updates.sections[2]?.title ?? labels.statusScaling,
      },
    ],
    [content, labels, locale],
  );

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setShowThreeScene(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
    const cleanups: Array<() => void> = [];

    elements.forEach((element) => {
      const xTo = gsap.quickTo(element, "x", { duration: 0.42, ease: "power3.out" });
      const yTo = gsap.quickTo(element, "y", { duration: 0.42, ease: "power3.out" });
      const glow = element.querySelector<HTMLElement>("[data-magnetic-glow]");
      const glowX = glow ? gsap.quickTo(glow, "x", { duration: 0.38, ease: "power2.out" }) : null;
      const glowY = glow ? gsap.quickTo(glow, "y", { duration: 0.38, ease: "power2.out" }) : null;

      const onMove = (event: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const offsetX = event.clientX - rect.left - rect.width / 2;
        const offsetY = event.clientY - rect.top - rect.height / 2;
        xTo(offsetX * 0.13);
        yTo(offsetY * 0.13);
        glowX?.(offsetX * 0.2);
        glowY?.(offsetY * 0.2);
      };

      const onLeave = () => {
        xTo(0);
        yTo(0);
        glowX?.(0);
        glowY?.(0);
      };

      element.addEventListener("mousemove", onMove);
      element.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        element.removeEventListener("mousemove", onMove);
        element.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [prefersReducedMotion]);

  const onCursorMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    cursorX.set(event.clientX - rect.left - 250);
    cursorY.set(event.clientY - rect.top - 250);
  };

  return (
    <div
      ref={pageRef}
      onMouseMove={onCursorMove}
      className="traxle-home relative min-h-screen overflow-hidden bg-white pb-24 pt-24 text-slate-900 transition-colors duration-300 dark:bg-[#04060f] dark:text-white"
    >
      <div className="traxle-grid-overlay pointer-events-none absolute inset-0" />
      <div className="traxle-noise pointer-events-none absolute inset-0 opacity-30 dark:opacity-50" />
      <div className="traxle-fog-layer pointer-events-none absolute inset-0" />

      <motion.div
        style={{ transform: cursorTransform, scale: heroGlowScale }}
        className="pointer-events-none absolute h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.24),rgba(59,130,246,0.12),transparent_68%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(37,99,235,0.25),rgba(14,165,233,0.16),transparent_70%)]"
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-24 px-4 sm:px-6 lg:gap-28">
        <motion.section
          ref={heroRef}
          style={{ y: heroParallax }}
          className="relative pt-8 sm:pt-14"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 28 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.95, ease: MOTION_EASE }}
        >
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <div className="space-y-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/35 bg-cyan-500/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                <FiZap />
                {content.home.badge}
              </span>

              <div className="space-y-5">
                <h1 className="max-w-3xl text-4xl font-black leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
                  <span>{content.home.title.split(" ").slice(0, 4).join(" ")}</span>{" "}
                  <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 bg-clip-text text-transparent">
                    {content.home.title.split(" ").slice(4).join(" ")}
                  </span>
                </h1>
                <p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
                  {content.home.intro}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={localizedPath("contact", locale)}
                  data-magnetic
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-blue-500/40 bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(37,99,235,0.35)]"
                >
                  <span
                    data-magnetic-glow
                    className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/40 blur-2xl"
                  />
                  <span className="relative">{labels.primaryCta}</span>
                  <FiArrowUpRight className="relative transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                <Link
                  href={localizedPath("features", locale)}
                  data-magnetic
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-slate-300/80 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm dark:border-white/20 dark:bg-white/[0.08] dark:text-white"
                >
                  <span
                    data-magnetic-glow
                    className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/20 blur-2xl"
                  />
                  <span className="relative">{labels.secondaryCta}</span>
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {heroCards.map((card, index) => (
                  <motion.div
                    key={card.key}
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.12 + index * 0.08, ease: MOTION_EASE }}
                  >
                    <Link
                      href={localizedPath(card.key, locale)}
                      className="group block rounded-2xl border border-slate-200/80 bg-white/75 p-4 backdrop-blur-xl transition hover:-translate-y-0.5 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.06]"
                    >
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-700 dark:text-cyan-300">
                        {card.status}
                      </p>
                      <p className="mt-2 text-lg font-bold">{card.title}</p>
                      <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
                        {card.description}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-700 dark:text-blue-300">
                        {labels.openPage}
                        <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative">
              <GlassFrame className="relative overflow-hidden p-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.32),transparent_52%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.2),transparent_52%)]" />
                <div className="relative h-[440px]">
                  {showThreeScene && !prefersReducedMotion ? (
                    <HomeDepthScene />
                  ) : (
                    <div className="flex h-full flex-col justify-between p-6">
                      <div className="space-y-2">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-300">TRAXLE CORE</p>
                        <p className="text-2xl font-black">Operational Intelligence Mesh</p>
                      </div>
                      <div className="grid gap-3">
                        {content.about.stats.map((stat) => (
                          <div
                            key={stat.label}
                            className="rounded-xl border border-white/15 bg-black/20 px-4 py-3 backdrop-blur-xl"
                          >
                            <p className="text-[11px] uppercase tracking-[0.14em] text-slate-300">{stat.label}</p>
                            <p className="mt-1 text-lg font-bold text-cyan-300">{stat.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </GlassFrame>
            </div>
          </div>
        </motion.section>

        <motion.section
          ref={productsRef}
          className="space-y-8"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
          animate={productsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: MOTION_EASE }}
        >
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">
              {labels.productsTitle}
            </p>
            <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
              {content.pages.integrations.title}
            </h2>
            <p className="max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
              {labels.productsIntro}
            </p>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute left-[12%] right-[12%] top-1/2 hidden h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent lg:block" />
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {productModules.map((module, index) => {
                const isActive = activeProduct === module.id;
                const dimmed = activeProduct && activeProduct !== module.id;

                return (
                  <motion.div
                    key={module.id}
                    onMouseEnter={() => setActiveProduct(module.id)}
                    onMouseLeave={() => setActiveProduct(null)}
                    animate={
                      prefersReducedMotion
                        ? {}
                        : {
                            scale: isActive ? 1.02 : dimmed ? 0.97 : 1,
                            y: isActive ? -6 : 0,
                            opacity: dimmed ? 0.74 : 1,
                          }
                    }
                    transition={{ duration: 0.35, ease: MOTION_EASE }}
                  >
                    <Link href={module.href} className="group block h-full">
                      <GlassFrame className="relative h-full overflow-hidden">
                        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.24),transparent_55%)]" />
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-blue-700 dark:text-blue-300">
                          {module.status}
                        </p>
                        <p className="mt-3 text-sm font-semibold text-cyan-700 dark:text-cyan-300">{module.badge}</p>
                        <h3 className="mt-2 text-xl font-black tracking-tight">{module.name}</h3>
                        <ul className="mt-4 space-y-2">
                          {module.details.map((detail) => (
                            <li key={detail} className="text-sm text-slate-600 dark:text-slate-300">
                              {detail}
                            </li>
                          ))}
                        </ul>
                        <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 dark:text-blue-300">
                          {labels.openPage}
                          <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </span>
                      </GlassFrame>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <GlassFrame className="space-y-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
              {labels.liveTitle}
            </p>
            <h3 className="text-3xl font-black tracking-tight">{content.pages.updates.title}</h3>
            <p className="text-sm leading-8 text-slate-600 dark:text-slate-300">
              {content.pages.updates.intro}
            </p>

            <div className="space-y-4">
              {content.pages.updates.sections.map((item, index) => (
                <div key={item.title} className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.05]">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold">{item.title}</p>
                    <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-cyan-700 dark:text-cyan-300">
                      <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                      LIVE
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.body}</p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500"
                      initial={{ width: prefersReducedMotion ? "72%" : "0%" }}
                      whileInView={{ width: `${68 + index * 9}%` }}
                      viewport={{ once: true, amount: 0.7 }}
                      transition={{ duration: 1, delay: index * 0.08, ease: MOTION_EASE }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassFrame>

          <GlassFrame className="relative overflow-hidden">
            <div className="pointer-events-none absolute -inset-20 bg-[radial-gradient(circle,rgba(34,211,238,0.17),transparent_60%)]" />
            <div className="relative space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <MiniMetric title={labels.statThroughput} value="+18.4%" accent="from-cyan-400 to-blue-500" />
                <MiniMetric title={labels.statResponse} value="1.8s" accent="from-blue-500 to-indigo-500" />
                <MiniMetric title={labels.statIntegrity} value="99.98%" accent="from-fuchsia-500 to-purple-500" />
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white/75 p-4 dark:border-white/10 dark:bg-black/20">
                <svg viewBox="0 0 600 260" className="h-[220px] w-full">
                  <defs>
                    <linearGradient id="routeLine" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="50%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#d946ef" />
                    </linearGradient>
                  </defs>
                  <g opacity="0.28">
                    {[40, 95, 150, 205].map((y) => (
                      <line key={y} x1="20" y1={y} x2="580" y2={y} stroke="currentColor" className="text-slate-400 dark:text-slate-500" />
                    ))}
                  </g>
                  <motion.path
                    d="M40 190 C 120 120, 210 130, 290 80 C 360 40, 470 70, 560 36"
                    fill="none"
                    stroke="url(#routeLine)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, amount: 0.7 }}
                    transition={{ duration: 1.8, ease: MOTION_EASE }}
                  />
                  <motion.path
                    d="M40 205 C 130 170, 210 220, 310 190 C 420 155, 500 205, 560 185"
                    fill="none"
                    stroke="url(#routeLine)"
                    strokeWidth="2"
                    strokeDasharray="10 8"
                    initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, amount: 0.7 }}
                    transition={{ duration: 2.2, delay: 0.2, ease: MOTION_EASE }}
                  />
                  {[40, 290, 560].map((x, i) => (
                    <motion.circle
                      key={`${x}-${i}`}
                      cx={x}
                      cy={i === 0 ? 190 : i === 1 ? 80 : 36}
                      r="7"
                      fill="#22d3ee"
                      animate={prefersReducedMotion ? {} : { opacity: [0.55, 1, 0.55], scale: [1, 1.16, 1] }}
                      transition={{ duration: 2.4 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  ))}
                </svg>
              </div>
            </div>
          </GlassFrame>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <GlassFrame className="space-y-5">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
              <FiCpu />
              {labels.aiTitle}
            </p>
            <h3 className="text-3xl font-black tracking-tight">{content.pages.integrations.title}</h3>
            <p className="text-sm leading-8 text-slate-600 dark:text-slate-300">
              {content.pages.integrations.intro}
            </p>
            <div className="space-y-3">
              {content.pages.integrations.sections.map((section) => (
                <div
                  key={section.title}
                  className="rounded-xl border border-slate-200/80 bg-white/70 px-4 py-3 dark:border-white/10 dark:bg-white/[0.05]"
                >
                  <p className="text-sm font-semibold">{section.title}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{section.body}</p>
                </div>
              ))}
            </div>
          </GlassFrame>

          <GlassFrame className="relative min-h-[420px] overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.2),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(124,58,237,0.22),transparent_50%)]" />
            <div className="relative h-full">
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-5 gap-3 p-4">
                {Array.from({ length: 14 }).map((_, index) => (
                  <motion.div
                    key={index}
                    className="rounded-xl border border-white/15 bg-black/15 backdrop-blur-xl"
                    style={{
                      gridColumn: `${(index % 5) + 1} / span 2`,
                      gridRow: `${(index % 4) + 1} / span 1`,
                    }}
                    animate={
                      prefersReducedMotion
                        ? {}
                        : { y: [0, -5, 0], opacity: [0.55, 0.92, 0.55], scale: [1, 1.02, 1] }
                    }
                    transition={{ duration: 2.8 + index * 0.08, repeat: Infinity, ease: "easeInOut" }}
                  />
                ))}
              </div>

              <svg viewBox="0 0 600 420" className="absolute inset-0 h-full w-full">
                {Array.from({ length: 8 }).map((_, index) => (
                  <motion.line
                    key={index}
                    x1={60 + index * 68}
                    y1={50}
                    x2={120 + index * 58}
                    y2={330}
                    stroke="rgba(56,189,248,0.38)"
                    strokeWidth="1.2"
                    strokeDasharray="6 8"
                    animate={prefersReducedMotion ? {} : { opacity: [0.25, 0.75, 0.25] }}
                    transition={{ duration: 2.5 + index * 0.16, repeat: Infinity, ease: "easeInOut" }}
                  />
                ))}
              </svg>
            </div>
          </GlassFrame>
        </section>

        <section className="space-y-8">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
              {labels.trustTitle}
            </p>
            <h3 className="text-3xl font-black tracking-tight sm:text-5xl">{content.about.title}</h3>
            <p className="max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
              {labels.trustIntro}
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {content.about.sections.slice(0, 3).map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.65, delay: index * 0.08, ease: MOTION_EASE }}
              >
                <GlassFrame className="relative h-full overflow-hidden">
                  <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-400/30 blur-3xl" />
                  <div className="relative flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/50 bg-cyan-500/10 text-sm font-black text-cyan-700 dark:text-cyan-300">
                      {item.title
                        .split(" ")
                        .map((chunk) => chunk[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">
                      {content.home.badge}
                    </p>
                  </div>
                  <h4 className="mt-4 text-xl font-bold">{item.title}</h4>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.body}</p>
                </GlassFrame>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[2.2rem] border border-slate-200/80 bg-gradient-to-br from-slate-900 via-blue-950 to-fuchsia-950 px-6 py-16 text-white shadow-[0_25px_90px_rgba(15,23,42,0.52)] sm:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.26),transparent_48%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.24),transparent_44%)]" />
          <div className="traxle-energy-wave pointer-events-none absolute inset-0 opacity-70" />
          <div className="relative mx-auto flex max-w-5xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">{content.nav.brandTag}</p>
              <h3 className="max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                {labels.finalTitle}
              </h3>
              <p className="max-w-2xl text-base leading-8 text-slate-200">{labels.finalIntro}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={localizedPath("contact", locale)}
                data-magnetic
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-cyan-300/60 bg-cyan-400/20 px-6 py-3 text-sm font-semibold text-cyan-100 backdrop-blur-xl"
              >
                <span
                  data-magnetic-glow
                  className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200/40 blur-2xl"
                />
                <span className="relative">{labels.finalButton}</span>
                <FiArrowUpRight className="relative transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={localizedPath("updates", locale)}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl"
              >
                <FiDownloadCloud />
                {labels.updateHub}
              </Link>
            </div>
          </div>

          <div className="relative mt-10 grid gap-3 sm:grid-cols-3">
            <a
              href={BARKODX_APPSTORE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-sm font-semibold backdrop-blur-xl transition hover:bg-white/20"
            >
              <FaApple />
              {labels.appStoreBarkodx}
            </a>
            <a
              href={MOLATIK_APPSTORE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-sm font-semibold backdrop-blur-xl transition hover:bg-white/20"
            >
              <FaApple />
              {labels.appStoreMolatik}
            </a>
            <button
              type="button"
              disabled
              className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-5 py-4 text-sm font-semibold text-slate-200"
            >
              <FaGooglePlay />
              {labels.playSoonMolatik}
            </button>
          </div>
        </section>
      </div>

      <motion.div
        style={{ opacity: progressOpacity }}
        className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent"
      />

      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(circle_at_center,transparent_45%,rgba(2,6,23,0.18)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_38%,rgba(2,6,23,0.42)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-[2]">
        <div className="absolute bottom-20 left-1/2 h-[320px] w-[78%] -translate-x-1/2 rounded-[999px] bg-[radial-gradient(circle,rgba(56,189,248,0.18),transparent_68%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(59,130,246,0.26),transparent_70%)]" />
      </div>
    </div>
  );
}

function MiniMetric({
  title,
  value,
  accent,
}: {
  title: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/75 p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.05]">
      <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">{title}</p>
      <p className={`mt-2 bg-gradient-to-r ${accent} bg-clip-text text-2xl font-black text-transparent`}>{value}</p>
    </div>
  );
}
