import { ArrowDownRight, Boxes, RadioTower } from 'lucide-react';
import LaunchBackdrop from '@/components/relaunch/LaunchBackdrop';
import ProductRail from '@/components/relaunch/ProductRail';
import MotionReveal from '@/components/motion/MotionReveal';
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
  return (
    <section className="relative isolate overflow-hidden bg-[#f6f8fb] pb-10 pt-28 text-slate-950 dark:bg-[#030712] dark:text-white sm:pt-32 lg:min-h-screen">
      <LaunchBackdrop label="TRAXLE PRODUCT SURFACE" />
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-7xl flex-col justify-center gap-10 px-5 sm:px-8 lg:px-10">
        <MotionReveal className="max-w-5xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white/86 px-3 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-slate-600 shadow-[0_14px_44px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/[0.06] dark:text-cyan-100/70">
            <RadioTower size={15} aria-hidden="true" />
            {dictionary.home.eyebrow}
          </div>
          <h1 className="max-w-6xl text-5xl font-black leading-[0.92] text-slate-950 dark:text-white sm:text-7xl lg:text-8xl">
            {dictionary.home.title}
          </h1>
          <p className="mt-7 max-w-3xl text-base font-medium leading-8 text-slate-700 dark:text-slate-300 sm:text-lg">
            {dictionary.home.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={withLocale(locale, '/projects')} className="min-h-12 gap-2 rounded-md px-6">
              <Boxes size={17} aria-hidden="true" />
              {dictionary.home.primaryCta}
            </Button>
            <Button href={withLocale(locale, '/contact')} variant="secondary" className="min-h-12 gap-2 rounded-md px-6">
              {dictionary.home.secondaryCta}
              <ArrowDownRight size={17} aria-hidden="true" />
            </Button>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.12} y={28}>
          <div className="grid gap-3 border-y border-slate-200 py-4 dark:border-white/10 sm:grid-cols-3">
            {dictionary.home.proof.map((item, index) => (
              <div key={item} className="flex min-h-16 items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white/78 px-4 text-sm font-black text-slate-700 shadow-[0_14px_50px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/[0.045] dark:text-slate-200">
                <span>{item}</span>
                <span className="font-mono text-xs text-slate-400">{String(index + 1).padStart(2, '0')}</span>
              </div>
            ))}
          </div>
        </MotionReveal>

        <MotionReveal delay={0.2} y={28}>
          <ProductRail
            products={products}
            locale={locale}
            statusLabels={dictionary.status}
            compact
          />
        </MotionReveal>
      </div>
    </section>
  );
}
