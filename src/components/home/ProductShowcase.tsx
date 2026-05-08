import { Blocks, ScanLine } from 'lucide-react';
import ProductCard from '@/components/home/ProductCard';
import MotionReveal from '@/components/motion/MotionReveal';
import { SectionShell } from '@/components/ui/SectionShell';
import type { Dictionary, Locale } from '@/lib/i18n';
import { withLocale } from '@/lib/i18n';
import type { Project } from '@/lib/projects';

export default function ProductShowcase({
  dictionary,
  locale,
  products,
}: {
  dictionary: Dictionary;
  locale: Locale;
  products: Project[];
}) {
  return (
    <SectionShell id="products" className="bg-[#f6f8fb] py-16 text-slate-950 dark:bg-[#030712] dark:text-white sm:py-24">
      <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-white/15 sm:inset-x-8 lg:inset-x-10" />
      <MotionReveal className="mb-10 grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white/80 px-3 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-cyan-700 dark:border-white/10 dark:bg-white/[0.055] dark:text-cyan-200">
            <Blocks size={14} aria-hidden="true" />
            {dictionary.projects.eyebrow}
          </p>
          <h2 className="text-3xl font-black leading-tight text-slate-950 dark:text-white sm:text-5xl">{dictionary.home.productsTitle}</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-700 dark:text-slate-300">{dictionary.home.productsDescription}</p>
        </div>
        <div className="grid gap-3 rounded-lg border border-slate-200 bg-white/76 p-4 shadow-[0_18px_70px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/[0.045]">
          {products.map((product) => (
            <div key={product.slug} className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.06]">
                <ScanLine size={15} style={{ color: product.accent }} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-black text-slate-900 dark:text-white">{product.title}</p>
                <p className="truncate text-xs font-bold text-slate-500 dark:text-slate-400">{product.category}</p>
              </div>
              <span className="h-1.5 w-16 rounded-full" style={{ background: `linear-gradient(90deg, ${product.accent}, transparent)` }} />
            </div>
          ))}
        </div>
      </MotionReveal>

      <MotionReveal delay={0.12} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.slug}
            product={product}
            statusLabel={dictionary.status[product.status]}
            href={withLocale(locale, `/projects/${product.slug}`)}
          />
        ))}
      </MotionReveal>
    </SectionShell>
  );
}
