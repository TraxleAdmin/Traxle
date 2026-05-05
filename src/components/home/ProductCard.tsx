import Link from 'next/link';
import type { CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import ProductGlyph from '@/components/home/ProductGlyph';
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
    <Link
      href={href}
      className="group block h-full rounded-[1.4rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
    >
      <article
        className="premium-motion-card relative flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-slate-200/80 bg-white/[0.84] p-4 shadow-[0_24px_90px_rgba(15,23,42,0.12)] backdrop-blur-2xl transition duration-500 [transform-style:preserve-3d] hover:border-cyan-300/55 hover:bg-white sm:p-5 dark:border-white/10 dark:bg-white/[0.055] dark:shadow-[0_24px_90px_rgba(0,0,0,0.28)] dark:hover:border-cyan-300/45 dark:hover:bg-white/[0.075]"
        style={{ '--card-accent': product.accent } as CSSProperties}
      >
        <div className="pointer-events-none absolute inset-0 rounded-[1.4rem] opacity-0 transition duration-500 group-hover:opacity-100" style={{ boxShadow: `inset 0 0 0 1px ${product.accent}55, 0 0 60px ${product.accent}18` }} />
        <div className="pointer-events-none absolute -left-24 top-10 h-px w-72 rotate-[-16deg] bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-0 blur-[0.5px] transition duration-700 group-hover:left-10 group-hover:opacity-80" />
        <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl" style={{ backgroundColor: `${product.accent}18` }} />
        <ProductGlyph kind={product.visualKind} accent={product.accent} />
        <div className="relative mt-5 flex flex-1 flex-col">
          <div className="mb-4 flex items-center justify-between gap-3">
            <StatusBadge status={product.status} label={statusLabel} />
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: product.accent, boxShadow: `0 0 18px ${product.accent}` }} />
          </div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200/80">{product.category}</p>
          <h3 className="mt-3 text-2xl font-black text-slate-950 dark:text-white">{product.title}</h3>
          <p className="mt-3 text-base font-bold leading-7 text-slate-800 dark:text-white/[0.88]">{product.shortDescription}</p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{product.detail}</p>
          <div className="mt-6 inline-flex items-center gap-2 text-sm font-black text-slate-950 dark:text-white">
            {product.cardCta}
            <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </article>
    </Link>
  );
}
