import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LazyHomeHeroScene } from '@/components/three/LazyScenes';
import { Button } from '@/components/ui/Button';
import { CTASection } from '@/components/ui/CTASection';
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
    title: `Traxle | ${dictionary.home.eyebrow}`,
    description: dictionary.home.description,
  });
}

export default async function LocaleHomePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale: Locale = rawLocale;
  const dictionary = getDictionary(locale);
  const projects = getProjects(locale);

  return (
    <main>
      <section className="relative min-h-screen overflow-hidden pt-28">
        <LazyHomeHeroScene className="opacity-40 [mask-image:linear-gradient(to_bottom,transparent_0%,black_12%,black_88%,transparent_100%)] sm:opacity-55 lg:left-auto lg:right-0 lg:w-[58%] lg:opacity-100 lg:[mask-image:linear-gradient(to_right,transparent_0%,black_22%,black_100%)]" />
        <SectionShell className="grid min-h-[calc(100vh-7rem)] items-center py-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,1.08fr)] xl:grid-cols-[minmax(0,0.82fr)_minmax(520px,1.18fr)]">
          <div className="relative z-10 max-w-xl xl:max-w-2xl">
            <p className="mb-5 text-[11px] font-black uppercase tracking-[0.32em] text-cyan-700 dark:text-cyan-200">
              {dictionary.home.eyebrow}
            </p>
            <h1 className="max-w-2xl text-4xl font-black leading-[0.98] text-slate-950 dark:text-white sm:text-5xl lg:text-6xl 2xl:text-7xl">
              {dictionary.home.title}
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
              {dictionary.home.description}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={withLocale(locale, '/projects')}>{dictionary.home.primaryCta}</Button>
              <Button href={withLocale(locale, '/contact')} variant="secondary">
                {dictionary.home.secondaryCta}
              </Button>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {dictionary.home.proof.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200/80 bg-white/64 px-4 py-3 text-sm font-bold text-slate-700 backdrop-blur-xl dark:border-white/10 dark:bg-white/7 dark:text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </SectionShell>
      </section>

      <SectionShell>
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-black text-slate-950 dark:text-white sm:text-5xl">{dictionary.home.hubTitle}</h2>
          <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">{dictionary.home.hubDescription}</p>
        </div>
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
