import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BadgeCheck, DatabaseZap, MonitorSmartphone } from 'lucide-react';
import DemoCTA from '@/components/home/DemoCTA';
import ProductRail from '@/components/relaunch/ProductRail';
import NeednapObjects from '@/components/relaunch/NeednapObjects';
import { SectionShell } from '@/components/ui/SectionShell';
import { getDictionary, isLocale, type Locale } from '@/lib/i18n';
import { getProjects } from '@/lib/projects';
import { createPageMetadata } from '@/lib/seo';

type PageProps = {
  params: Promise<{ locale: string }>;
};

const pointIcons = [BadgeCheck, MonitorSmartphone, DatabaseZap];
const accents = ['#ff5a24', '#ffe600', '#ec00ff'];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : 'tr';
  const dictionary = getDictionary(locale);

  return createPageMetadata({
    locale,
    path: '/about',
    title: `Traxle | ${dictionary.nav.about}`,
    description: dictionary.about.description,
  });
}

export default async function AboutPage({ params }: PageProps) {
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
        <NeednapObjects className="opacity-45" />
        <header className="relative z-10 mx-auto max-w-7xl px-5 text-center sm:px-8 lg:px-10">
          <p className="mb-6 text-xs font-black uppercase tracking-[0.28em] text-[#ec008c]">
            {dictionary.about.eyebrow}
          </p>
          <h1 className="mx-auto max-w-6xl text-[clamp(4.8rem,10vw,10rem)] font-light leading-[0.8] text-white">
            machines
            <span className="block font-black uppercase">are people</span>
          </h1>
          <p className="mx-auto mt-10 max-w-4xl text-2xl leading-snug text-white/75">{dictionary.about.description}</p>
        </header>
      </SectionShell>

      <SectionShell className="max-w-none bg-black px-0 py-20 text-white sm:px-0 lg:px-0">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:px-8 md:grid-cols-3 lg:px-10">
        {dictionary.about.points.map((point, index) => {
          const Icon = pointIcons[index % pointIcons.length];
          const accent = accents[index % accents.length];

          return (
            <article key={point} className="min-h-72 rounded-[1.35rem] border-[6px] bg-[#e8e8e8] p-6 text-black shadow-[0_24px_80px_rgba(0,0,0,0.42)]" style={{ borderColor: accent }}>
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white" style={{ color: accent }}>
                <Icon size={19} aria-hidden="true" />
              </span>
              <p className="mt-28 text-3xl font-black leading-tight">{point}</p>
            </article>
          );
        })}
        </div>
      </SectionShell>

      <SectionShell className="max-w-none bg-black px-0 py-16 text-white sm:px-0 lg:px-0">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <ProductRail products={products} locale={locale} statusLabels={dictionary.status} />
        </div>
      </SectionShell>

      <DemoCTA dictionary={dictionary} locale={locale} />
    </main>
  );
}
