import type { CSSProperties } from 'react';
import { ArrowDownRight } from 'lucide-react';
import PremiumLightField from '@/components/effects/PremiumLightField';
import InteractiveBackground from '@/components/home/InteractiveBackground';
import ProductGlyph from '@/components/home/ProductGlyph';
import { LazyHomeHeroScene } from '@/components/three/LazyScenes';
import SceneViewportGate from '@/components/three/SceneViewportGate';
import { Button } from '@/components/ui/Button';
import type { Dictionary, Locale } from '@/lib/i18n';
import { withLocale } from '@/lib/i18n';
import type { Project } from '@/lib/projects';

export default function HomeHero({
  dictionary,
  locale,
  products,
}: {
  dictionary: Dictionary;
  locale: Locale;
  products: Project[];
}) {
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="relative isolate overflow-hidden bg-slate-50 pb-16 pt-28 text-slate-950 transition-colors duration-500 dark:bg-[#030712] dark:text-white sm:pt-32 lg:min-h-screen lg:pb-24">
      <InteractiveBackground />
      <PremiumLightField accent="#22d3ee" />
      <SceneViewportGate
        delay={850}
        rootMargin="120px"
        className="inset-x-[-30%] bottom-auto top-14 h-[520px] opacity-32 [mask-image:radial-gradient(circle_at_56%_38%,black,transparent_70%)] sm:top-10 lg:bottom-0 lg:left-[24%] lg:right-[-10%] lg:top-8 lg:h-auto lg:opacity-72 lg:[mask-image:radial-gradient(circle_at_62%_48%,black,transparent_72%)]"
      >
        <LazyHomeHeroScene scrollTargetId="products" />
      </SceneViewportGate>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,rgba(34,211,238,0.12),transparent_24%),linear-gradient(90deg,rgba(248,250,252,0.98)_0%,rgba(248,250,252,0.82)_46%,rgba(248,250,252,0.22)_100%)] dark:hidden" />
      <div className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(circle_at_78%_30%,rgba(255,255,255,0.08),transparent_22%),linear-gradient(90deg,#030712_0%,rgba(3,7,18,0.78)_38%,rgba(3,7,18,0.18)_100%)] dark:block" />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-10">
        <div className="max-w-3xl">
          <p className="mb-5 text-[11px] font-black uppercase tracking-[0.32em] text-cyan-200">
            {dictionary.home.eyebrow}
          </p>
          <h1 className="text-4xl font-black leading-[1.02] text-slate-950 dark:text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            {dictionary.home.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700 dark:text-slate-300 sm:text-lg">
            {dictionary.home.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={withLocale(locale, '/projects')} className="min-h-12 px-6">
              {dictionary.home.primaryCta}
            </Button>
            <Button href={withLocale(locale, '/contact')} variant="secondary" className="min-h-12 px-6">
              {dictionary.home.secondaryCta}
            </Button>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {dictionary.home.proof.map((item) => (
              <div
                key={item}
                className="premium-motion-card overflow-hidden rounded-xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm font-black text-slate-800 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.055] dark:text-slate-100"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative grid gap-3 sm:grid-cols-2">
          <div className="pointer-events-none absolute -inset-6 rounded-[2rem] border border-slate-200/70 bg-white/45 shadow-[0_0_120px_rgba(34,211,238,0.10)] backdrop-blur-[2px] dark:border-white/[0.08] dark:bg-white/[0.018] dark:shadow-[0_0_120px_rgba(34,211,238,0.14)]" />
          {featuredProducts.map((product, index) => (
            <div
              key={product.slug}
              className="premium-motion-card group relative overflow-hidden rounded-[1.25rem] border border-slate-200/80 bg-white/[0.82] p-3 shadow-[0_24px_90px_rgba(15,23,42,0.12)] backdrop-blur-2xl transition duration-500 [transform-style:preserve-3d] hover:bg-white dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_24px_90px_rgba(0,0,0,0.28)] dark:hover:bg-white/[0.08]"
              style={{ '--card-accent': product.accent } as CSSProperties}
            >
              <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" style={{ boxShadow: `inset 0 0 0 1px ${product.accent}55` }} />
              <div className="pointer-events-none absolute -left-24 top-6 h-px w-64 rotate-[-18deg] bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 blur-[0.5px] transition duration-500 group-hover:left-8 group-hover:opacity-80" />
              <div className="grid grid-cols-[96px_1fr] gap-4 sm:grid-cols-1">
                <ProductGlyph kind={product.visualKind} accent={product.accent} />
                <div className="relative flex flex-col justify-center sm:min-h-32">
                  <div className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-100/70">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <ArrowDownRight size={13} aria-hidden="true" />
                  </div>
                  <h2 className="text-xl font-black text-slate-950 dark:text-white">{product.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{product.shortDescription}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
