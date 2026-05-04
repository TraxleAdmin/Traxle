import Link from 'next/link';
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
      <article className="relative flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.055] p-4 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition duration-500 hover:-translate-y-1 hover:border-cyan-300/45 hover:bg-white/[0.075] sm:p-5">
        <div className="pointer-events-none absolute inset-0 rounded-[1.4rem] opacity-0 transition duration-500 group-hover:opacity-100" style={{ boxShadow: `inset 0 0 0 1px ${product.accent}55, 0 0 60px ${product.accent}18` }} />
        <ProductGlyph kind={product.visualKind} accent={product.accent} />
        <div className="relative mt-5 flex flex-1 flex-col">
          <div className="mb-4 flex items-center justify-between gap-3">
            <StatusBadge status={product.status} label={statusLabel} />
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: product.accent, boxShadow: `0 0 18px ${product.accent}` }} />
          </div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200/80">{product.category}</p>
          <h3 className="mt-3 text-2xl font-black text-white">{product.title}</h3>
          <p className="mt-3 text-base font-bold leading-7 text-white/88">{product.shortDescription}</p>
          <p className="mt-3 text-sm leading-7 text-slate-300">{product.detail}</p>
          <div className="mt-6 inline-flex items-center gap-2 text-sm font-black text-white">
            {product.cardCta}
            <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </article>
    </Link>
  );
}
