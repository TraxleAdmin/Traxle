import { ArrowLeft, ShieldCheck } from 'lucide-react';
import PremiumLightField from '@/components/effects/PremiumLightField';
import ProductExperienceScene from '@/components/products/ProductExperienceScene';
import ProductLiveDemo from '@/components/products/ProductLiveDemo';
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
    <section className="relative isolate overflow-hidden bg-[#030712] pb-16 pt-32 text-white sm:pt-36 lg:min-h-screen lg:pb-24">
      <PremiumLightField accent={product.accent} />
      <ProductExperienceScene
        kind={product.visualKind}
        accent={product.accent}
        className="inset-x-[-18%] bottom-auto top-14 h-[560px] opacity-42 [mask-image:radial-gradient(circle_at_50%_34%,black,transparent_72%)] lg:bottom-0 lg:left-[27%] lg:right-[31%] lg:top-8 lg:h-auto lg:opacity-90 lg:[mask-image:radial-gradient(circle_at_50%_45%,black,transparent_74%)]"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 78% 22%, ${product.accent}24, transparent 30%), linear-gradient(90deg, #030712 0%, rgba(3,7,18,0.9) 44%, rgba(3,7,18,0.28) 100%)`,
        }}
      />
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
        <div className="relative min-h-[440px]">
          <div className="absolute inset-0 rounded-full blur-3xl" style={{ backgroundColor: `${product.accent}1f` }} />
          <ProductLiveDemo product={product} />
        </div>
      </div>
    </section>
  );
}
