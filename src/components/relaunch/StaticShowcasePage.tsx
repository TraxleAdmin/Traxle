import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import NeednapObjects from '@/components/relaunch/NeednapObjects';
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
    <main className="bg-black text-white">
      <section className="relative isolate overflow-hidden bg-[#080914] px-5 pb-24 pt-36 text-white sm:px-8 lg:px-10">
        <NeednapObjects className="opacity-45" />
        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <div className="mx-auto max-w-6xl">
            <p className="mb-6 text-xs font-black uppercase tracking-[0.28em] text-[#ec008c]">{eyebrow}</p>
            <h1 className="text-[clamp(4.8rem,10vw,10rem)] font-black uppercase leading-[0.74] text-white">{title}</h1>
            <p className="mx-auto mt-10 max-w-4xl text-2xl leading-snug text-white/75">{description}</p>
            <Button href={ctaHref} className="mt-10 min-h-12 gap-2 rounded-full border-white bg-white px-7 text-black hover:bg-[#f4e7ff]">
              {ctaLabel}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-4 px-5 py-20 sm:px-8 md:grid-cols-2 lg:px-10">
        {items.map((item) => (
          <article key={item.title} className="min-h-80 rounded-[1.35rem] border-[6px] bg-[#e8e8e8] p-6 text-black shadow-[0_24px_80px_rgba(0,0,0,0.42)] transition duration-300 hover:-translate-y-2" style={{ borderColor: item.accent }}>
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black" style={{ color: item.accent }}>
              {item.icon}
            </span>
            <h2 className="mt-24 text-4xl font-black leading-tight">{item.title}</h2>
            <p className="mt-4 text-base leading-7 text-black/60">{item.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
