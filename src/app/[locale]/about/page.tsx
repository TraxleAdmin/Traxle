import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { CSSProperties } from 'react';
import { BadgeCheck, DatabaseZap, MonitorSmartphone, type LucideIcon } from 'lucide-react';
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

const aboutPointIcons: LucideIcon[] = [BadgeCheck, MonitorSmartphone, DatabaseZap];
const aboutPointAccents = ['#22d3ee', '#8b5cf6', '#34d399'];

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
        {dictionary.about.points.map((point, index) => {
          const Icon = aboutPointIcons[index % aboutPointIcons.length];
          const accent = aboutPointAccents[index % aboutPointAccents.length];

          return (
            <GlassPanel
              key={point}
              className="premium-motion-card group overflow-hidden p-6 transition duration-300 hover:border-cyan-300/40"
              style={{ '--card-accent': accent } as CSSProperties}
            >
              <div className="premium-icon-tile mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/12 shadow-[0_0_30px_rgba(0,194,255,0.18)]">
                <Icon className="premium-icon-glyph h-5 w-5 text-cyan-700 dark:text-cyan-100" aria-hidden="true" />
              </div>
              <p className="relative z-10 text-lg font-black leading-7 text-slate-950 dark:text-white">{point}</p>
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
