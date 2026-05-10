import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Code2, Layers3, PanelsTopLeft, Workflow } from 'lucide-react';
import DemoCTA from '@/components/home/DemoCTA';
import NeednapObjects from '@/components/relaunch/NeednapObjects';
import { SectionShell } from '@/components/ui/SectionShell';
import { getDictionary, isLocale, type Locale } from '@/lib/i18n';
import { createPageMetadata } from '@/lib/seo';

type PageProps = {
  params: Promise<{ locale: string }>;
};

const serviceIcons = [PanelsTopLeft, Workflow, Code2, Layers3];
const serviceAccents = ['#ff5a24', '#ffe600', '#ec00ff', '#00d6c8'];

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
    <main className="bg-black text-white">
      <SectionShell className="max-w-none isolate overflow-hidden bg-[#080914] px-0 pb-24 pt-36 text-white sm:px-0 lg:px-0">
        <NeednapObjects className="opacity-45" />
        <header className="relative z-10 mx-auto max-w-7xl px-5 text-center sm:px-8 lg:px-10">
          <p className="mb-6 text-xs font-black uppercase tracking-[0.28em] text-[#ec008c]">
            {dictionary.services.eyebrow}
          </p>
          <h1 className="mx-auto max-w-6xl text-[clamp(4.8rem,10vw,10rem)] font-black uppercase leading-[0.74] text-white">
            systems
            <span className="block">SHIFT</span>
          </h1>
          <p className="mx-auto mt-10 max-w-4xl text-2xl leading-snug text-white/75">{dictionary.services.description}</p>
        </header>
      </SectionShell>

      <SectionShell className="max-w-none bg-black px-0 py-20 text-white sm:px-0 lg:px-0">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:px-8 md:grid-cols-2 lg:px-10">
        {dictionary.services.items.map((item, index) => {
          const Icon = serviceIcons[index % serviceIcons.length];
          const accent = serviceAccents[index % serviceAccents.length];

          return (
            <article key={item.title} className="min-h-80 rounded-[1.35rem] border-[6px] bg-[#e8e8e8] p-6 text-black shadow-[0_24px_80px_rgba(0,0,0,0.42)] transition duration-300 hover:-translate-y-2" style={{ borderColor: accent }}>
              <div className="flex items-start gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-black" style={{ color: accent }}>
                  <Icon size={19} aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-4xl font-black leading-tight">{item.title}</h2>
                  <p className="mt-4 text-base leading-7 text-black/60">{item.description}</p>
                </div>
              </div>
            </article>
          );
        })}
        </div>
      </SectionShell>

      <DemoCTA dictionary={dictionary} locale={locale} />
    </main>
  );
}
