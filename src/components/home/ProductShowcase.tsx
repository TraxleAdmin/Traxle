import ProductCard from '@/components/home/ProductCard';
import PremiumLightField from '@/components/effects/PremiumLightField';
import ProjectHubScene from '@/components/three/ProjectHubScene';
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
    <section id="products" className="relative isolate overflow-hidden bg-[#030712] py-16 text-white sm:py-24">
      <PremiumLightField accent="#38bdf8" density="quiet" />
      <ProjectHubScene
        projects={products}
        className="inset-x-[-12%] bottom-auto top-0 h-[560px] opacity-50 [mask-image:radial-gradient(circle_at_58%_34%,black,transparent_70%)]"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#030712_0%,rgba(3,7,18,0.72)_34%,#030712_100%)]" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-10 max-w-3xl">
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.28em] text-cyan-200">
            {dictionary.projects.eyebrow}
          </p>
          <h2 className="text-3xl font-black leading-tight text-white sm:text-5xl">{dictionary.home.productsTitle}</h2>
          <p className="mt-5 text-base leading-8 text-slate-300">{dictionary.home.productsDescription}</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              statusLabel={dictionary.status[product.status]}
              href={withLocale(locale, `/projects/${product.slug}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
