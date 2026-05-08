import { ArrowLeft, Boxes, ShieldCheck } from 'lucide-react';
import LaunchBackdrop from '@/components/relaunch/LaunchBackdrop';
import ProductLiveDemo from '@/components/products/ProductLiveDemo';
import { AppStoreBadge } from '@/components/ui/AppStoreBadge';
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
    <section className="relative isolate overflow-hidden bg-[#f6f8fb] pb-16 pt-32 text-slate-950 dark:bg-[#030712] dark:text-white sm:pt-36">
      <LaunchBackdrop accent={product.accent} label={`${product.title} PRODUCT FILE`} />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-5xl">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <StatusBadge status={product.status} label={dictionary.status[product.status]} />
            <span className="rounded-md border border-slate-200 bg-white/82 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-slate-600 shadow-[0_12px_34px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/[0.06] dark:text-cyan-100">
              {product.category}
            </span>
          </div>
          <h1 className="text-5xl font-black leading-[0.92] text-slate-950 dark:text-white sm:text-7xl lg:text-8xl">{product.title}</h1>
          <p className="mt-6 max-w-3xl text-2xl font-black leading-tight text-slate-950 dark:text-white">{product.shortDescription}</p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-300 sm:text-lg">{product.longDescription}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {product.appStoreHref && (
              <AppStoreBadge
                href={product.appStoreHref}
                label={product.appStoreLabel ?? 'Download on the App Store'}
                subLabel={product.appStoreSubLabel ?? product.title}
                className="rounded-md sm:min-w-[220px]"
              />
            )}
            <Button href={product.cta.href} className="min-h-12 gap-2 rounded-md px-6">
              <Boxes size={16} aria-hidden="true" />
              {product.cta.label}
            </Button>
            <Button href={withLocale(locale, '/projects')} variant="secondary" className="min-h-12 gap-2 rounded-md px-6">
              <ArrowLeft size={16} aria-hidden="true" />
              {dictionary.productDetail.backToProducts}
            </Button>
          </div>
          {product.privacyHref && (
            <Button href={product.privacyHref} variant="ghost" className="mt-4 gap-2 rounded-md text-cyan-700 hover:bg-slate-900/5 dark:text-cyan-100 dark:hover:bg-white/8">
              <ShieldCheck size={16} aria-hidden="true" />
              {product.privacyLabel ?? dictionary.productDetail.privacyLabel}
            </Button>
          )}
        </div>

        <div className="mt-12">
          <ProductLiveDemo product={product} />
        </div>
      </div>
    </section>
  );
}
