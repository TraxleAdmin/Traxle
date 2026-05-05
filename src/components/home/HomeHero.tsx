import type { CSSProperties } from 'react';
import PremiumLightField from '@/components/effects/PremiumLightField';
import HomeCommandDeck from '@/components/home/HomeCommandDeck';
import InteractiveBackground from '@/components/home/InteractiveBackground';
import MotionReveal from '@/components/motion/MotionReveal';
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
  const proofAccents = ['#22d3ee', '#34d399', '#f59e0b'];

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
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-slate-50 via-slate-50/70 to-transparent dark:from-[#030712] dark:via-[#030712]/[0.76]" />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:px-10">
        <MotionReveal className="max-w-3xl">
          <p className="premium-eyebrow mb-5 text-[11px] font-black uppercase tracking-[0.32em] text-cyan-700 dark:text-cyan-200">
            {dictionary.home.eyebrow}
          </p>
          <h1 className="max-w-[11ch] text-5xl font-black leading-[0.94] text-slate-950 dark:text-white sm:text-6xl lg:text-7xl xl:text-8xl">
            {dictionary.home.title}
          </h1>
          <p className="mt-7 max-w-2xl text-base font-medium leading-8 text-slate-700 dark:text-slate-300 sm:text-lg">
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
            {dictionary.home.proof.map((item, index) => (
              <div
                key={item}
                className="premium-motion-card premium-proof-chip overflow-hidden rounded-xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm font-black text-slate-800 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.055] dark:text-slate-100"
                style={{ '--card-accent': proofAccents[index % proofAccents.length] } as CSSProperties}
              >
                {item}
              </div>
            ))}
          </div>
        </MotionReveal>

        <MotionReveal delay={0.14} y={36}>
          <HomeCommandDeck products={featuredProducts} />
        </MotionReveal>
      </div>
    </section>
  );
}
