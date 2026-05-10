import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ProductGlyph from '@/components/home/ProductGlyph';
import { StatusBadge } from '@/components/ui/StatusBadge';
import type { Project } from '@/lib/projects';

const frameColors = ['#ff5a24', '#ffe600', '#ec00ff', '#00d6c8'];

export default function ProductCard({
  product,
  statusLabel,
  href,
  index = 0,
}: {
  product: Project;
  statusLabel: string;
  href: string;
  index?: number;
}) {
  const frameColor = frameColors[index % frameColors.length];

  return (
    <article data-product-card className="group relative min-h-[590px]">
      <Link
        href={href}
        aria-label={product.cardCta}
        className="absolute inset-0 z-20 rounded-[1.35rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      />
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border-[6px] bg-[#e7e7e7] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.42)] transition duration-300 group-hover:-translate-y-2"
        style={{ borderColor: frameColor }}
      >
        <div className="relative min-h-[330px] overflow-hidden rounded-xl bg-[#f4f4f4]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.9),transparent_28%),linear-gradient(135deg,rgba(0,0,0,0.05),transparent_40%)]" />
          <div className="absolute left-1/2 top-[18%] h-[360px] w-[220px] -translate-x-1/2 rotate-[-10deg] rounded-[2rem] border-[10px] border-black bg-[#111] shadow-[0_28px_60px_rgba(0,0,0,0.35)]">
            <div className="absolute inset-3 overflow-hidden rounded-[1.25rem] bg-black">
              <ProductGlyph kind={product.visualKind} accent={product.accent} className="h-full rounded-none border-0" />
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <StatusBadge status={product.status} label={statusLabel} />
          <ArrowUpRight size={19} className="relative z-30 text-black transition group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
        <p className="mt-5 text-sm font-black uppercase text-black/50">{product.category}</p>
        <h3 className="mt-2 text-4xl font-black leading-none text-black">{product.title}</h3>
        <p className="mt-4 text-lg font-black leading-tight text-black">{product.shortDescription}</p>
        <p className="mt-4 text-sm leading-6 text-black/60">{product.detail}</p>
      </div>
    </article>
  );
}
