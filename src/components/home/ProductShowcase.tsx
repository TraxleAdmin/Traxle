import ProductCard from '@/components/home/ProductCard';
import { SectionShell } from '@/components/ui/SectionShell';
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
    <SectionShell id="products" className="bg-[#030712] py-16 text-white sm:py-24">
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
    </SectionShell>
  );
}
