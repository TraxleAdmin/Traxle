import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DemoCTA from '@/components/home/DemoCTA';
import ProductShowcase from '@/components/home/ProductShowcase';
import NeednapObjects from '@/components/relaunch/NeednapObjects';
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
    <main className="bg-black text-white">
      <SectionShell className="max-w-none isolate overflow-hidden bg-[#080914] px-0 pb-24 pt-36 text-white sm:px-0 lg:px-0">
        <NeednapObjects className="opacity-55" />
        <header className="relative z-10 mx-auto max-w-7xl px-5 text-center sm:px-8 lg:px-10">
          <p className="mb-6 text-xs font-black uppercase tracking-[0.28em] text-[#ec008c]">
            {dictionary.projects.eyebrow}
          </p>
          <h1 className="mx-auto max-w-6xl text-[clamp(4.8rem,10vw,10rem)] font-black uppercase leading-[0.74] text-white">
            products
            <span className="block">HAPPEN</span>
          </h1>
          <p className="mx-auto mt-10 max-w-4xl text-2xl leading-snug text-white/75">{dictionary.projects.description}</p>
        </header>
      </SectionShell>
      <ProductShowcase dictionary={dictionary} locale={locale} products={products} />
      <DemoCTA dictionary={dictionary} locale={locale} />
    </main>
  );
}
