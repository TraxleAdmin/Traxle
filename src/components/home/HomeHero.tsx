import { ArrowDownRight } from 'lucide-react';
import PremiumLightField from '@/components/effects/PremiumLightField';
import InteractiveBackground from '@/components/home/InteractiveBackground';
import ProductGlyph from '@/components/home/ProductGlyph';
import HomeHeroScene from '@/components/three/HomeHeroScene';
import { Button } from '@/components/ui/Button';
import type { Dictionary, Locale } from '@/lib/i18n';
import { withLocale } from '@/lib/i18n';
import type { Project } from '@/lib/projects';

export default function HomeHero({
  dictionary,
  locale,
  products,
}: {
  dictionary: Dictionary;
  locale: Locale;
  products: Project[];
}) {
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="relative isolate overflow-hidden bg-[#030712] pb-16 pt-28 text-white sm:pt-32 lg:min-h-screen lg:pb-24">
      <InteractiveBackground />
      <PremiumLightField accent="#22d3ee" />
      <HomeHeroScene
        scrollTargetId="products"
        className="inset-x-[-30%] bottom-auto top-14 h-[520px] opacity-40 [mask-image:radial-gradient(circle_at_56%_38%,black,transparent_70%)] sm:top-10 lg:bottom-0 lg:left-[24%] lg:right-[-10%] lg:top-8 lg:h-auto lg:opacity-85 lg:[mask-image:radial-gradient(circle_at_62%_48%,black,transparent_72%)]"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,rgba(255,255,255,0.08),transparent_22%),linear-gradient(90deg,#030712_0%,rgba(3,7,18,0.78)_38%,rgba(3,7,18,0.18)_100%)]" />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-10">
        <div className="max-w-3xl">
          <p className="mb-5 text-[11px] font-black uppercase tracking-[0.32em] text-cyan-200">
            {dictionary.home.eyebrow}
          </p>
          <h1 className="text-4xl font-black leading-[1.02] text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            {dictionary.home.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            {dictionary.home.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={withLocale(locale, '/projects')} className="min-h-12 px-6">
              {dictionary.home.primaryCta}
            </Button>
            <Button href={withLocale(locale, '/contact')} variant="secondary" className="min-h-12 px-6">
              {dictionary.home.secondaryCta}
            </Button>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {dictionary.home.proof.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-white/10 bg-white/[0.055] px-4 py-3 text-sm font-black text-slate-100 backdrop-blur-xl"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative grid gap-3 sm:grid-cols-2">
          <div className="pointer-events-none absolute -inset-6 rounded-[2rem] border border-white/[0.08] bg-white/[0.018] shadow-[0_0_120px_rgba(34,211,238,0.14)] backdrop-blur-[2px]" />
          {featuredProducts.map((product, index) => (
            <div
              key={product.slug}
              className="group relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.06] p-3 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition duration-500 [transform-style:preserve-3d] hover:-translate-y-1 hover:bg-white/[0.08]"
            >
              <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" style={{ boxShadow: `inset 0 0 0 1px ${product.accent}55` }} />
              <div className="pointer-events-none absolute -left-24 top-6 h-px w-64 rotate-[-18deg] bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 blur-[0.5px] transition duration-500 group-hover:left-8 group-hover:opacity-80" />
              <div className="grid grid-cols-[96px_1fr] gap-4 sm:grid-cols-1">
                <ProductGlyph kind={product.visualKind} accent={product.accent} />
                <div className="relative flex flex-col justify-center sm:min-h-32">
                  <div className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-100/70">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <ArrowDownRight size={13} aria-hidden="true" />
                  </div>
                  <h2 className="text-xl font-black text-white">{product.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{product.shortDescription}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
