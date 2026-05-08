import Link from 'next/link';
import type { CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import ProductGlyph from '@/components/home/ProductGlyph';
import { StatusBadge } from '@/components/ui/StatusBadge';
import type { Locale } from '@/lib/i18n';
import { withLocale } from '@/lib/i18n';
import type { Project } from '@/lib/projects';
import { cn } from '@/lib/cn';

export default function ProductRail({
  products,
  locale,
  statusLabels,
  compact = false,
  className,
}: {
  products: Project[];
  locale: Locale;
  statusLabels: Record<Project['status'], string>;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('grid gap-3 md:grid-cols-2 xl:grid-cols-4', className)}>
      {products.map((product, index) => (
        <Link
          key={product.slug}
          href={withLocale(locale, `/projects/${product.slug}`)}
          className="group relative min-h-[210px] overflow-hidden rounded-lg border border-slate-200 bg-white/90 p-3 shadow-[0_18px_70px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:border-slate-950 hover:shadow-[0_26px_90px_rgba(15,23,42,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 dark:border-white/10 dark:bg-white/[0.055] dark:hover:border-white/30"
          style={{ '--card-accent': product.accent } as CSSProperties}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-1"
            style={{ background: `linear-gradient(90deg, ${product.accent}, transparent)` }}
          />
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 dark:text-white/35">
                {String(index + 1).padStart(2, '0')} / {product.category}
              </p>
              <h3 className="mt-2 truncate text-2xl font-black text-slate-950 dark:text-white">{product.title}</h3>
            </div>
            <ArrowUpRight size={18} className="shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-slate-950 dark:group-hover:text-white" />
          </div>
          <div className={cn('mt-4', compact ? 'hidden sm:block' : '')}>
            <ProductGlyph kind={product.visualKind} accent={product.accent} className="h-28 rounded-md" />
          </div>
          <div className="mt-4 flex items-end justify-between gap-3">
            <p className="line-clamp-2 text-sm font-bold leading-6 text-slate-600 dark:text-slate-300">
              {product.shortDescription}
            </p>
            <StatusBadge status={product.status} label={statusLabels[product.status]} />
          </div>
        </Link>
      ))}
    </div>
  );
}
