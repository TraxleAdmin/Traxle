import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DemoCTA from '@/components/home/DemoCTA';
import ProductShowcase from '@/components/home/ProductShowcase';
import { SectionShell } from '@/components/ui/SectionShell';
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
    path: '/projects',
    title: `Traxle | ${dictionary.nav.projects}`,
    description: dictionary.projects.description,
  });
}

export default async function ProjectsPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale: Locale = rawLocale;
  const dictionary = getDictionary(locale);
  const products = getProjects(locale);

  return (
    <main className="bg-[#030712] pt-24">
      <SectionShell className="pb-8 pt-14 text-white">
        <header className="max-w-3xl">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-cyan-200">
            {dictionary.projects.eyebrow}
          </p>
          <h1 className="text-4xl font-black leading-tight text-white sm:text-6xl">{dictionary.projects.title}</h1>
          <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">{dictionary.projects.description}</p>
        </header>
      </SectionShell>
      <ProductShowcase dictionary={dictionary} locale={locale} products={products} />
      <DemoCTA dictionary={dictionary} locale={locale} />
    </main>
  );
}
