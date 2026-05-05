import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { CSSProperties } from 'react';
import { Code2, Layers3, PanelsTopLeft, Workflow, type LucideIcon } from 'lucide-react';
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

const serviceIcons: LucideIcon[] = [PanelsTopLeft, Workflow, Code2, Layers3];
const serviceAccents = ['#22d3ee', '#34d399', '#60a5fa', '#8b5cf6'];

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
        {dictionary.services.items.map((item, index) => {
          const Icon = serviceIcons[index % serviceIcons.length];
          const accent = serviceAccents[index % serviceAccents.length];

          return (
            <GlassPanel
              key={item.title}
              className="premium-motion-card group overflow-hidden p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40"
              style={{ '--card-accent': accent } as CSSProperties}
            >
              <div className="premium-icon-tile mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/12 shadow-[0_0_30px_rgba(0,194,255,0.18)]">
                <Icon className="premium-icon-glyph h-5 w-5 text-cyan-700 dark:text-cyan-100" aria-hidden="true" />
              </div>
              <h2 className="relative z-10 text-2xl font-black text-slate-950 dark:text-white">{item.title}</h2>
              <p className="relative z-10 mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
            </GlassPanel>
          );
        })}
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
