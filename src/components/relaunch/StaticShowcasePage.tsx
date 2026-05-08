import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import LaunchBackdrop from '@/components/relaunch/LaunchBackdrop';
import { Button } from '@/components/ui/Button';

export type StaticShowcaseItem = {
  title: string;
  description: string;
  icon: ReactNode;
  accent: string;
};

export default function StaticShowcasePage({
  eyebrow,
  title,
  description,
  items,
  ctaLabel = 'Ürünleri incele',
  ctaHref = '/tr/urunler',
}: {
  eyebrow: string;
  title: string;
  description: string;
  items: StaticShowcaseItem[];
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <main className="bg-[#f6f8fb] pt-24 text-slate-950 dark:bg-[#030712] dark:text-white">
      <section className="relative isolate overflow-hidden px-5 pb-16 pt-16 sm:px-8 lg:px-10">
        <LaunchBackdrop label={eyebrow} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="max-w-5xl">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-cyan-700 dark:text-cyan-200">{eyebrow}</p>
            <h1 className="text-5xl font-black leading-[0.94] text-slate-950 dark:text-white sm:text-7xl">{title}</h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-300 sm:text-lg">{description}</p>
            <Button href={ctaHref} className="mt-8 min-h-12 gap-2 rounded-md px-6">
              {ctaLabel}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-3 px-5 pb-24 sm:px-8 md:grid-cols-2 lg:px-10">
        {items.map((item) => (
          <article key={item.title} className="rounded-lg border border-slate-200 bg-white/86 p-6 shadow-[0_18px_70px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:border-slate-950 dark:border-white/10 dark:bg-white/[0.055] dark:hover:border-white/30">
            <span className="flex h-12 w-12 items-center justify-center rounded-md border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.06]" style={{ color: item.accent }}>
              {item.icon}
            </span>
            <div className="mt-6 h-1 w-20 rounded-full" style={{ background: `linear-gradient(90deg, ${item.accent}, transparent)` }} />
            <h2 className="mt-6 text-2xl font-black text-slate-950 dark:text-white">{item.title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
