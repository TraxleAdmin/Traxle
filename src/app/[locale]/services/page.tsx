import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LazyProjectHubScene } from '@/components/three/LazyScenes';
import { CTASection } from '@/components/ui/CTASection';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { getDictionary, isLocale, type Locale, withLocale } from '@/lib/i18n';
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
    <main className="pt-28">
      <section className="relative min-h-[68vh] overflow-hidden">
        <LazyProjectHubScene projects={getProjects(locale)} className="opacity-35" />
        <SectionShell className="relative z-10 flex min-h-[68vh] items-center">
          <PageHeader
            eyebrow={dictionary.services.eyebrow}
            title={dictionary.services.title}
            description={dictionary.services.description}
          />
        </SectionShell>
      </section>

      <SectionShell className="grid gap-5 pt-4 md:grid-cols-2">
        {dictionary.services.items.map((item) => (
          <GlassPanel key={item.title} className="p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40">
            <div className="mb-6 h-12 w-12 rounded-2xl border border-cyan-300/30 bg-cyan-300/12 shadow-[0_0_30px_rgba(0,194,255,0.18)]" />
            <h2 className="text-2xl font-black text-slate-950 dark:text-white">{item.title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
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
