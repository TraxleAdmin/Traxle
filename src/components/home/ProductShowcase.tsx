import type { CSSProperties } from 'react';
import ProductCard from '@/components/home/ProductCard';
import PremiumLightField from '@/components/effects/PremiumLightField';
import MotionReveal from '@/components/motion/MotionReveal';
import { LazyProjectHubScene } from '@/components/three/LazyScenes';
import SceneViewportGate from '@/components/three/SceneViewportGate';
import type { Dictionary, Locale } from '@/lib/i18n';
import { withLocale } from '@/lib/i18n';
import type { Project } from '@/lib/projects';

export default function ProductShowcase({
  dictionary,
  locale,
  products,
}: {
  dictionary: Dictionary;
  locale: Locale;
  products: Project[];
}) {
  return (
    <section id="products" className="relative isolate overflow-hidden bg-slate-50 py-16 text-slate-950 transition-colors duration-500 dark:bg-[#030712] dark:text-white sm:py-24">
      <PremiumLightField accent="#38bdf8" density="quiet" />
      <SceneViewportGate
        delay={650}
        rootMargin="-120px"
        className="inset-x-[-12%] bottom-auto top-0 h-[560px] opacity-34 [mask-image:radial-gradient(circle_at_58%_34%,black,transparent_70%)] dark:opacity-46"
      >
        <LazyProjectHubScene projects={products} />
      </SceneViewportGate>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,252,0.96)_0%,rgba(248,250,252,0.72)_34%,rgba(248,250,252,0.98)_100%)] dark:bg-[linear-gradient(180deg,#030712_0%,rgba(3,7,18,0.72)_34%,#030712_100%)]" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <MotionReveal className="mb-10 grid gap-8 lg:grid-cols-[0.86fr_1fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="premium-eyebrow mb-4 text-[11px] font-black uppercase tracking-[0.28em] text-cyan-700 dark:text-cyan-200">
              {dictionary.projects.eyebrow}
            </p>
            <h2 className="text-3xl font-black leading-tight text-slate-950 dark:text-white sm:text-5xl">{dictionary.home.productsTitle}</h2>
            <p className="mt-5 text-base leading-8 text-slate-700 dark:text-slate-300">{dictionary.home.productsDescription}</p>
          </div>
          <div className="premium-stack-meter grid gap-3 rounded-[1.25rem] border border-slate-200/80 bg-white/[0.82] p-4 shadow-[0_22px_80px_rgba(15,23,42,0.1)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.055]">
            {products.slice(0, 4).map((product, index) => (
              <div key={product.slug} className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: product.accent, boxShadow: `0 0 18px ${product.accent}` }} />
                <span className="min-w-20 text-xs font-black text-slate-700 dark:text-slate-200">{product.title}</span>
                <span className="premium-meter h-2 flex-1 overflow-hidden rounded-full bg-slate-900/10 dark:bg-white/10" style={{ '--card-accent': product.accent } as CSSProperties}>
                  <span className="block h-full rounded-full" />
                </span>
                <span className="font-mono text-[10px] font-black text-slate-400 dark:text-white/40">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            ))}
          </div>
        </MotionReveal>
        <MotionReveal delay={0.12} className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              statusLabel={dictionary.status[product.status]}
              href={withLocale(locale, `/projects/${product.slug}`)}
            />
          ))}
        </MotionReveal>
      </div>
    </section>
  );
}
