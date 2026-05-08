import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Code2, Layers3, PanelsTopLeft, Workflow } from 'lucide-react';
import DemoCTA from '@/components/home/DemoCTA';
import LaunchBackdrop from '@/components/relaunch/LaunchBackdrop';
import { SectionShell } from '@/components/ui/SectionShell';
import { getDictionary, isLocale, type Locale } from '@/lib/i18n';
import { createPageMetadata } from '@/lib/seo';

type PageProps = {
  params: Promise<{ locale: string }>;
};

const serviceIcons = [PanelsTopLeft, Workflow, Code2, Layers3];
const serviceAccents = ['#22d3ee', '#34d399', '#60a5fa', '#f59e0b'];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : 'tr';
  const dictionary = getDictionary(locale);

  return createPageMetadata({
    locale,
    path: '/services',
    title: `Traxle | ${dictionary.nav.services}`,
    description: dictionary.services.description,
  });
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale: Locale = rawLocale;
  const dictionary = getDictionary(locale);

  return (
    <main className="bg-[#f6f8fb] pt-24 text-slate-950 dark:bg-[#030712] dark:text-white">
      <SectionShell className="isolate overflow-hidden pb-12 pt-16">
        <LaunchBackdrop label="SERVICE BLUEPRINT" />
        <header className="relative z-10 max-w-5xl">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-cyan-700 dark:text-cyan-200">
            {dictionary.services.eyebrow}
          </p>
          <h1 className="text-5xl font-black leading-[0.94] text-slate-950 dark:text-white sm:text-7xl">{dictionary.services.title}</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-300 sm:text-lg">{dictionary.services.description}</p>
        </header>
      </SectionShell>

      <SectionShell className="grid gap-3 pt-4 md:grid-cols-2">
        {dictionary.services.items.map((item, index) => {
          const Icon = serviceIcons[index % serviceIcons.length];
          const accent = serviceAccents[index % serviceAccents.length];

          return (
            <article key={item.title} className="rounded-lg border border-slate-200 bg-white/86 p-6 shadow-[0_18px_70px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:border-slate-950 dark:border-white/10 dark:bg-white/[0.055] dark:hover:border-white/30">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.06]" style={{ color: accent }}>
                  <Icon size={19} aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-2xl font-black text-slate-950 dark:text-white">{item.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
                </div>
              </div>
              <div className="mt-6 h-1 w-20 rounded-full" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
            </article>
          );
        })}
      </SectionShell>

      <DemoCTA dictionary={dictionary} locale={locale} />
    </main>
  );
}
