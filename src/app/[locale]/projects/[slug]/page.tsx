import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductCTA from '@/components/products/ProductCTA';
import ProductFeatureGrid from '@/components/products/ProductFeatureGrid';
import ProductHero from '@/components/products/ProductHero';
import ProductUseCases from '@/components/products/ProductUseCases';
import { getDictionary, isLocale, locales, type Locale } from '@/lib/i18n';
import { getProjectBySlug, getProjectSlugs } from '@/lib/projects';
import { createPageMetadata } from '@/lib/seo';

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) => getProjectSlugs().map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : 'tr';
  const product = getProjectBySlug(slug, locale);

  if (!product) {
    return {};
  }

  return createPageMetadata({
    locale,
    path: `/projects/${product.slug}`,
    title: `Traxle | ${product.title}`,
    description: product.detail,
  });
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale: Locale = rawLocale;
  const dictionary = getDictionary(locale);
  const product = getProjectBySlug(slug, locale);

  if (!product) {
    notFound();
  }

  return (
    <main className="bg-[#030712]">
      <ProductHero dictionary={dictionary} locale={locale} product={product} />
      <ProductFeatureGrid dictionary={dictionary} product={product} />
      <ProductUseCases dictionary={dictionary} product={product} />
      <ProductCTA dictionary={dictionary} product={product} />
    </main>
  );
}
