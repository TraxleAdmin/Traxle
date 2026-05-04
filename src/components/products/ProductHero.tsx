import { ArrowLeft, ShieldCheck } from 'lucide-react';
import ProductGlyph from '@/components/home/ProductGlyph';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import type { Dictionary, Locale } from '@/lib/i18n';
import { withLocale } from '@/lib/i18n';
import type { Project } from '@/lib/projects';

export default function ProductHero({
  dictionary,
  locale,
  product,
}: {
  dictionary: Dictionary;
  locale: Locale;
  product: Project;
}) {
  return (
    <section className="relative overflow-hidden bg-[#030712] pb-16 pt-32 text-white sm:pt-36 lg:pb-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_20%,rgba(34,211,238,0.22),transparent_34%),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:auto,42px_42px,42px_42px]" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-10">
        <div>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <StatusBadge status={product.status} label={dictionary.status[product.status]} />
            <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
              {product.category}
            </span>
          </div>
          <h1 className="text-4xl font-black leading-[1.02] text-white sm:text-6xl lg:text-7xl">{product.title}</h1>
          <p className="mt-5 max-w-2xl text-2xl font-black leading-tight text-white">{product.shortDescription}</p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">{product.longDescription}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={product.cta.href} className="min-h-12 px-6">
              {product.cta.label}
            </Button>
            <Button href={withLocale(locale, '/projects')} variant="secondary" className="min-h-12 gap-2 px-6">
              <ArrowLeft size={16} aria-hidden="true" />
              {dictionary.productDetail.backToProducts}
            </Button>
          </div>
          {product.privacyHref && (
            <Button href={product.privacyHref} variant="ghost" className="mt-4 gap-2 text-cyan-100 hover:bg-white/8">
              <ShieldCheck size={16} aria-hidden="true" />
              {dictionary.productDetail.privacyLabel}
            </Button>
          )}
        </div>
        <div className="relative">
          <div className="absolute inset-8 rounded-full blur-3xl" style={{ backgroundColor: `${product.accent}22` }} />
          <div className="relative rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-4 shadow-[0_28px_110px_rgba(0,0,0,0.38)] backdrop-blur-2xl sm:p-6">
            <ProductGlyph kind={product.visualKind} accent={product.accent} />
          </div>
        </div>
      </div>
    </section>
  );
}
