import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LazyProjectHubScene } from '@/components/three/LazyScenes';
import { CTASection } from '@/components/ui/CTASection';
import { PageHeader } from '@/components/ui/PageHeader';
import { ProjectCard } from '@/components/ui/ProjectCard';
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
  const projects = getProjects(locale);

  return (
    <main className="pt-28">
      <section className="relative min-h-[72vh] overflow-hidden">
        <LazyProjectHubScene projects={projects} className="opacity-90" />
        <SectionShell className="relative z-10 flex min-h-[72vh] items-center">
          <PageHeader eyebrow={dictionary.projects.eyebrow} title={dictionary.projects.title} description={dictionary.projects.description} />
        </SectionShell>
      </section>

      <SectionShell className="pt-6">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              statusLabel={dictionary.status[project.status]}
              openLabel={dictionary.projects.openProject}
              href={withLocale(locale, `/projects/${project.slug}`)}
            />
          ))}
        </div>
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
