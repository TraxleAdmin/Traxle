import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DemoCTA from '@/components/home/DemoCTA';
import HomeHero from '@/components/home/HomeHero';
import HowItWorks from '@/components/home/HowItWorks';
import ProductShowcase from '@/components/home/ProductShowcase';
import { getDictionary, isLocale, type Locale } from '@/lib/i18n';
import { getProjects } from '@/lib/projects';
import { createPageMetadata } from '@/lib/seo';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : 'tr';
  const dictionary = getDictionary(locale);

  return createPageMetadata({
    locale,
    title: `Traxle | ${dictionary.home.title}`,
    description: dictionary.home.description,
  });
}

export default async function LocaleHomePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale: Locale = rawLocale;
  const dictionary = getDictionary(locale);
  const products = getProjects(locale);

  return (
    <main className="bg-[#030712]">
      <HomeHero dictionary={dictionary} locale={locale} products={products} />
      <ProductShowcase dictionary={dictionary} locale={locale} products={products} />
      <HowItWorks dictionary={dictionary} />
      <DemoCTA dictionary={dictionary} locale={locale} />
    </main>
  );
}
