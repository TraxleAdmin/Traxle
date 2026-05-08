import Link from 'next/link';
import type { CSSProperties } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import ProductGlyph from '@/components/home/ProductGlyph';
import { AppStoreBadge } from '@/components/ui/AppStoreBadge';
import { StatusBadge } from '@/components/ui/StatusBadge';
import type { Project } from '@/lib/projects';

export default function ProductCard({
  product,
  statusLabel,
  href,
}: {
  product: Project;
  statusLabel: string;
  href: string;
}) {
  return (
    <article
      data-product-card
      className="group relative flex h-full min-h-[520px] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white/92 p-4 shadow-[0_18px_70px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:border-slate-950 hover:shadow-[0_28px_100px_rgba(15,23,42,0.16)] dark:border-white/10 dark:bg-white/[0.055] dark:shadow-[0_20px_90px_rgba(0,0,0,0.24)] dark:hover:border-white/30"
      style={{ '--card-accent': product.accent } as CSSProperties}
    >
      <Link
        href={href}
        aria-label={product.cardCta}
        className="absolute inset-0 z-10 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${product.accent}, transparent)` }} />
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100" style={{ boxShadow: `inset 0 0 0 1px ${product.accent}44` }} />

      <div className="relative z-20 flex h-full flex-col">
        <div className="flex items-center justify-between gap-3">
          <StatusBadge status={product.status} label={statusLabel} />
          <ArrowUpRight size={18} className="text-slate-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-slate-950 dark:group-hover:text-white" />
        </div>

        <ProductGlyph
          kind={product.visualKind}
          accent={product.accent}
          className="mt-5 h-[174px] rounded-md"
        />

        <p className="mt-5 min-h-8 overflow-hidden text-[11px] font-black uppercase leading-4 tracking-[0.16em] text-slate-400 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] dark:text-white/35">
          {product.category}
        </p>
        <h3 className="mt-3 text-2xl font-black text-slate-950 dark:text-white">{product.title}</h3>
        <p className="mt-3 min-h-12 overflow-hidden text-[15px] font-black leading-6 text-slate-800 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] dark:text-white/[0.88]">
          {product.shortDescription}
        </p>
        <p className="mt-3 min-h-[4.5rem] overflow-hidden text-sm leading-6 text-slate-600 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] dark:text-slate-300">
          {product.detail}
        </p>

        <div className="mt-5 grid gap-2">
          {product.features.slice(0, 3).map((feature) => (
            <div key={feature} className="grid grid-cols-[auto_1fr] items-start gap-2 rounded-md border border-slate-200 bg-slate-50/80 px-3 py-2 dark:border-white/10 dark:bg-black/18">
              <CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: product.accent }} aria-hidden="true" />
              <span className="text-xs font-bold leading-5 text-slate-600 dark:text-slate-300">{feature}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-6">
          {product.appStoreHref ? (
            <AppStoreBadge
              href={product.appStoreHref}
              label={product.appStoreLabel ?? 'Download on the App Store'}
              subLabel={product.appStoreSubLabel ?? product.title}
              className="pointer-events-auto relative z-30 w-full justify-center rounded-md"
            />
          ) : (
            <span className="inline-flex min-h-12 items-center gap-2 text-sm font-black text-slate-950 dark:text-white">
              {product.cardCta}
              <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
