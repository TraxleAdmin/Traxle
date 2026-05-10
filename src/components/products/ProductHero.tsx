import { ArrowLeft, ArrowUpRight, ShieldCheck } from 'lucide-react';
import ProductGlyph from '@/components/home/ProductGlyph';
import NeednapObjects from '@/components/relaunch/NeednapObjects';
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
    <section className="relative isolate overflow-hidden bg-[#080914] text-white">
      <div className="relative min-h-[980px] overflow-hidden bg-[radial-gradient(circle_at_50%_18%,#1a1b2a_0%,#080914_42%,#000_100%)]">
        <NeednapObjects className="opacity-80" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[760px] max-w-7xl items-center justify-center px-5 pt-28 text-center sm:px-8 lg:px-10">
          <div className="w-full">
            <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
              <StatusBadge status={product.status} label={dictionary.status[product.status]} />
              <span className="rounded-full border border-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white">
                {product.category}
              </span>
            </div>
            <h1 className="mx-auto max-w-5xl text-[clamp(5.4rem,12vw,12.8rem)] font-black uppercase leading-[0.68] text-white">
              <span className="block text-[0.5em] normal-case">{product.title}</span>
              <span className="block">HAPP</span>
              <span className="block">ENS</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="relative z-10 -mt-32 bg-black px-5 pb-24 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-3xl font-light leading-snug text-white sm:text-4xl">
              We create <span className="font-black text-[#ff4b23]">connections</span> for {product.category.toLowerCase()}.
            </p>
            <p className="mt-6 max-w-3xl text-2xl leading-snug text-white/75">{product.longDescription}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {product.appStoreHref && (
                <AppStoreBadge
                  href={product.appStoreHref}
                  label={product.appStoreLabel ?? 'Download on the App Store'}
                  subLabel={product.appStoreSubLabel ?? product.title}
                  className="rounded-full sm:min-w-[220px]"
                />
              )}
              <Button href={product.cta.href} className="min-h-12 gap-2 rounded-full border-white bg-white px-7 text-black hover:bg-[#f0e9ff]">
                {product.cta.label}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Button>
              <Button href={withLocale(locale, '/projects')} variant="ghost" className="min-h-12 gap-2 rounded-full border border-white bg-transparent px-7 text-white hover:bg-white/10">
                <ArrowLeft size={16} aria-hidden="true" />
                {dictionary.productDetail.backToProducts}
              </Button>
            </div>
            {product.privacyHref && (
              <Button href={product.privacyHref} variant="ghost" className="mt-4 gap-2 rounded-full text-white hover:bg-white/10">
                <ShieldCheck size={16} aria-hidden="true" />
                {product.privacyLabel ?? dictionary.productDetail.privacyLabel}
              </Button>
            )}
          </div>

          <div className="relative min-h-[560px]">
            <div className="absolute left-0 top-[18%] h-[330px] w-[72%] bg-[#ec008c]" />
            <div className="absolute left-0 top-[18%] h-[330px] w-[72%] bg-[repeating-radial-gradient(circle_at_0_50%,transparent_0_28px,rgba(255,255,255,0.12)_29px_34px)]" />
            <div className="absolute right-0 top-[2%] h-[460px] w-[68%] rotate-[15deg] rounded-3xl border-[14px] border-[#252525] bg-[#e8e8e8] shadow-[0_34px_90px_rgba(0,0,0,0.55)]">
              <div className="absolute inset-5 overflow-hidden rounded-2xl bg-black">
                <ProductGlyph kind={product.visualKind} accent={product.accent} className="h-full rounded-none border-0" />
                <div className="absolute left-8 top-8">
                  <p className="text-5xl font-black uppercase leading-none text-white">{product.title}</p>
                  <p className="mt-2 text-xl font-black text-white/70">01/01</p>
                </div>
              </div>
            </div>
            <p className="absolute bottom-0 left-0 max-w-md text-[clamp(4.8rem,9vw,8rem)] font-light lowercase leading-none text-[#ec008c]">
              {product.slug === 'lojistik' ? 'field' : product.slug}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
