import Link from 'next/link';
import type { CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
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
      className="premium-motion-card premium-card-surface group relative flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-slate-200/80 bg-white/[0.84] p-4 shadow-[0_24px_90px_rgba(15,23,42,0.12)] backdrop-blur-2xl transition duration-500 [transform-style:preserve-3d] hover:border-cyan-300/[0.55] hover:bg-white sm:p-5 dark:border-white/10 dark:bg-white/[0.055] dark:shadow-[0_24px_90px_rgba(0,0,0,0.28)] dark:hover:border-cyan-300/[0.45] dark:hover:bg-white/[0.075]"
      style={{ '--card-accent': product.accent } as CSSProperties}
    >
      <Link
        href={href}
        aria-label={product.cardCta}
        className="absolute inset-0 z-10 rounded-[1.4rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
      />
      <div className="pointer-events-none absolute inset-0 rounded-[1.4rem] opacity-0 transition duration-500 group-hover:opacity-100" style={{ boxShadow: `inset 0 0 0 1px ${product.accent}55, 0 0 60px ${product.accent}18` }} />
      <div className="pointer-events-none absolute -left-24 top-10 h-px w-72 rotate-[-16deg] bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-0 blur-[0.5px] transition duration-700 group-hover:left-10 group-hover:opacity-80" />
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl" style={{ backgroundColor: `${product.accent}18` }} />
      <div className="pointer-events-none relative z-20 flex h-full flex-col">
        <ProductGlyph
          kind={product.visualKind}
          accent={product.accent}
          forceMotion
          className="h-[174px] min-h-0 sm:h-[176px]"
        />
        <div className="mt-5 flex flex-1 flex-col">
          <div className="mb-4 flex items-center justify-between gap-3">
            <StatusBadge status={product.status} label={statusLabel} />
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: product.accent, boxShadow: `0 0 18px ${product.accent}` }} />
          </div>
          <p className="min-h-8 overflow-hidden text-[11px] font-black uppercase leading-4 tracking-[0.16em] text-cyan-200/80 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
            {product.category}
          </p>
          <h3 className="mt-3 text-2xl font-black text-slate-950 dark:text-white">{product.title}</h3>
          <p className="mt-3 min-h-12 overflow-hidden text-[15px] font-bold leading-6 text-slate-800 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] dark:text-white/[0.88]">
            {product.shortDescription}
          </p>
          <p className="mt-3 min-h-[4.5rem] overflow-hidden text-sm leading-6 text-slate-600 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] dark:text-slate-300">
            {product.detail}
          </p>
          <div className="mt-5 grid gap-2 overflow-hidden">
            {product.features.slice(0, 3).map((feature, index) => (
              <div key={feature} className="flex items-center gap-2">
                <span className="premium-meter h-1.5 flex-1 overflow-hidden rounded-full bg-slate-900/10 dark:bg-white/10" style={{ '--card-accent': index === 1 ? product.accent : '#34d399' } as CSSProperties}>
                  <span className="block h-full rounded-full" />
                </span>
                <span className="max-w-[8rem] truncate text-[10px] font-black uppercase tracking-[0.12em] text-slate-400 dark:text-white/[0.35]">
                  {feature}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-auto pt-6">
            {product.appStoreHref ? (
              <AppStoreBadge
                href={product.appStoreHref}
                label={product.appStoreLabel ?? 'Download on the App Store'}
                subLabel={product.appStoreSubLabel ?? product.title}
                className="pointer-events-auto relative z-30 w-full justify-center"
              />
            ) : (
              <span className="inline-flex min-h-12 items-center gap-2 text-sm font-black text-slate-950 dark:text-white">
                {product.cardCta}
                <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
