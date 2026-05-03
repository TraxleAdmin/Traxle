import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LazyHomeHeroScene } from '@/components/three/LazyScenes';
import { CTASection } from '@/components/ui/CTASection';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { getDictionary, isLocale, type Locale, withLocale } from '@/lib/i18n';
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

  return (
    <main className="pt-28">
      <section className="relative min-h-[70vh] overflow-hidden">
        <LazyHomeHeroScene className="opacity-35" />
        <SectionShell className="relative z-10 flex min-h-[70vh] items-center">
          <PageHeader eyebrow={dictionary.about.eyebrow} title={dictionary.about.title} description={dictionary.about.description} />
        </SectionShell>
      </section>

      <SectionShell className="grid gap-5 pt-4 md:grid-cols-3">
        {dictionary.about.points.map((point) => (
          <GlassPanel key={point} className="p-6">
            <div className="mb-6 h-12 w-12 rounded-2xl border border-cyan-300/30 bg-cyan-300/12 shadow-[0_0_30px_rgba(0,194,255,0.18)]" />
            <p className="text-lg font-black leading-7 text-slate-950 dark:text-white">{point}</p>
          </GlassPanel>
        ))}
      </SectionShell>

      <SectionShell className="pt-6">
        <CTASection
          title={dictionary.cta.title}
          description={dictionary.cta.description}
          label={dictionary.cta.label}
          href={withLocale(locale, '/contact')}
        />
      </SectionShell>
    </main>
  );
}
