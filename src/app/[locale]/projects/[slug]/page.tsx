import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LazyModelViewer } from '@/components/three/LazyScenes';
import { Button } from '@/components/ui/Button';
import { CTASection } from '@/components/ui/CTASection';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { getDictionary, isLocale, locales, type Locale, withLocale } from '@/lib/i18n';
import { getProjectBySlug, getProjectSlugs } from '@/lib/projects';
import { createPageMetadata } from '@/lib/seo';

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) => getProjectSlugs().map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : 'tr';
  const project = getProjectBySlug(slug, locale);

  if (!project) {
    return {};
  }

  return createPageMetadata({
    locale,
    path: `/projects/${project.slug}`,
    title: `Traxle | ${project.title}`,
    description: project.shortDescription,
  });
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale: Locale = rawLocale;
  const dictionary = getDictionary(locale);
  const project = getProjectBySlug(slug, locale);

  if (!project) {
    notFound();
  }

  return (
    <main className="pt-28">
      <SectionShell className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <StatusBadge status={project.status} label={dictionary.status[project.status]} />
          <PageHeader
            eyebrow={project.category}
            title={project.title}
            description={project.shortDescription}
            className="mt-6"
          />
          <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-300">{project.longDescription}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={project.cta.href}>{project.cta.label}</Button>
            <Button href={withLocale(locale, '/projects')} variant="secondary">
              {dictionary.nav.projects}
            </Button>
          </div>
        </div>

        <GlassPanel className="relative min-h-[420px] overflow-hidden">
          <div className="absolute left-5 top-5 z-10 rounded-full border border-cyan-300/20 bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-700 backdrop-blur-xl dark:bg-black/50 dark:text-cyan-100">
            {dictionary.detail.model}
          </div>
          <LazyModelViewer modelPath={project.modelPath} accent={project.accent} className="rounded-[1.5rem]" />
        </GlassPanel>
      </SectionShell>

      <SectionShell className="grid gap-6 pt-4 lg:grid-cols-[0.85fr_1.15fr]">
        <GlassPanel className="p-7">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-200">
            {dictionary.detail.overview}
          </p>
          <dl className="mt-6 grid gap-4 text-sm">
            <div>
              <dt className="font-bold text-slate-500 dark:text-slate-400">{dictionary.projects.eyebrow}</dt>
              <dd className="mt-1 font-black text-slate-950 dark:text-white">{project.title}</dd>
            </div>
            <div>
              <dt className="font-bold text-slate-500 dark:text-slate-400">{dictionary.nav.services}</dt>
              <dd className="mt-1 font-black text-slate-950 dark:text-white">{project.category}</dd>
            </div>
          </dl>
        </GlassPanel>

        <GlassPanel className="p-7">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">{dictionary.detail.features}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="rounded-2xl border border-slate-200 bg-white/60 p-4 text-sm font-bold leading-6 text-slate-700 dark:border-white/10 dark:bg-white/7 dark:text-slate-200"
              >
                {feature}
              </li>
            ))}
          </ul>
        </GlassPanel>
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
