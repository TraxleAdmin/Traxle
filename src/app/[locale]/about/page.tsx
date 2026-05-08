import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BadgeCheck, DatabaseZap, MonitorSmartphone } from 'lucide-react';
import DemoCTA from '@/components/home/DemoCTA';
import ProductRail from '@/components/relaunch/ProductRail';
import LaunchBackdrop from '@/components/relaunch/LaunchBackdrop';
import { SectionShell } from '@/components/ui/SectionShell';
import { getDictionary, isLocale, type Locale } from '@/lib/i18n';
import { getProjects } from '@/lib/projects';
import { createPageMetadata } from '@/lib/seo';

type PageProps = {
  params: Promise<{ locale: string }>;
};

const pointIcons = [BadgeCheck, MonitorSmartphone, DatabaseZap];
const accents = ['#22d3ee', '#34d399', '#f59e0b'];

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
    <main className="bg-[#f6f8fb] pt-24 text-slate-950 dark:bg-[#030712] dark:text-white">
      <SectionShell className="isolate overflow-hidden pb-12 pt-16">
        <LaunchBackdrop label="COMPANY OPERATING SYSTEM" />
        <header className="relative z-10 max-w-5xl">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-cyan-700 dark:text-cyan-200">
            {dictionary.about.eyebrow}
          </p>
          <h1 className="text-5xl font-black leading-[0.94] text-slate-950 dark:text-white sm:text-7xl">{dictionary.about.title}</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-300 sm:text-lg">{dictionary.about.description}</p>
        </header>
      </SectionShell>

      <SectionShell className="grid gap-3 pt-4 md:grid-cols-3">
        {dictionary.about.points.map((point, index) => {
          const Icon = pointIcons[index % pointIcons.length];
          const accent = accents[index % accents.length];

          return (
            <article key={point} className="rounded-lg border border-slate-200 bg-white/86 p-5 shadow-[0_18px_70px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/[0.055]">
              <span className="flex h-12 w-12 items-center justify-center rounded-md border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.06]" style={{ color: accent }}>
                <Icon size={19} aria-hidden="true" />
              </span>
              <div className="mt-6 h-1 w-16 rounded-full" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
              <p className="mt-6 text-lg font-black leading-7 text-slate-950 dark:text-white">{point}</p>
            </article>
          );
        })}
      </SectionShell>

      <SectionShell className="pt-6">
        <ProductRail products={products} locale={locale} statusLabels={dictionary.status} />
      </SectionShell>

      <DemoCTA dictionary={dictionary} locale={locale} />
    </main>
  );
}
