import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LazyHomeHeroScene } from '@/components/three/LazyScenes';
import { Button } from '@/components/ui/Button';
import { CTASection } from '@/components/ui/CTASection';
import { GlassPanel } from '@/components/ui/GlassPanel';
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
      <div id="universe-scroll" className="relative min-h-[172vh] overflow-hidden pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(34,211,238,0.16),transparent_32%),radial-gradient(circle_at_14%_44%,rgba(255,255,255,0.12),transparent_28%)] dark:bg-[radial-gradient(circle_at_72%_22%,rgba(34,211,238,0.2),transparent_32%),radial-gradient(circle_at_14%_44%,rgba(255,255,255,0.08),transparent_28%)]" />
        <LazyHomeHeroScene
          scrollTargetId="universe-scroll"
          className="translate-x-[18%] translate-y-[7%] opacity-35 [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_86%,transparent_100%)] sm:opacity-50 lg:left-auto lg:right-0 lg:w-[62%] lg:translate-x-0 lg:translate-y-0 lg:opacity-100 lg:[mask-image:linear-gradient(to_right,transparent_0%,black_18%,black_100%)]"
        />
        <SectionShell className="sticky top-0 grid min-h-[calc(100vh-2rem)] items-center py-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] xl:grid-cols-[minmax(0,0.8fr)_minmax(520px,1.2fr)]">
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
                  className="rounded-xl border border-slate-200/80 bg-white/70 px-4 py-3 text-sm font-black text-slate-700 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/7 dark:text-slate-200 dark:shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </SectionShell>

        <SectionShell className="relative z-10 pb-28 pt-28 sm:pt-32">
          <GlassPanel className="overflow-hidden rounded-[1.4rem]">
            <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="border-b border-slate-200/80 bg-white/58 p-6 backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.04] sm:p-8 lg:border-b-0 lg:border-r">
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-cyan-700 dark:text-cyan-200">
                  {dictionary.home.eyebrow}
                </p>
                <h2 className="mt-4 max-w-xl text-3xl font-black leading-tight text-slate-950 dark:text-white sm:text-4xl">
                  {dictionary.home.processTitle}
                </h2>
                <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">
                  {dictionary.home.processDescription}
                </p>
              </div>
              <div className="grid divide-y divide-slate-200/80 dark:divide-white/10 md:grid-cols-2 md:divide-x md:divide-y-0">
                {dictionary.home.process.map((item) => (
                  <article
                    key={item.value}
                    className="group relative min-h-48 overflow-hidden p-6 transition duration-500 hover:bg-cyan-400/8 dark:hover:bg-cyan-300/8 sm:p-7"
                  >
                    <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                    <div className="flex items-start justify-between gap-5">
                      <p className="font-mono text-sm font-black text-cyan-700 dark:text-cyan-200">{item.value}</p>
                      <span className="h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_28px_rgba(34,211,238,0.9)]" />
                    </div>
                    <h3 className="mt-8 text-xl font-black text-slate-950 dark:text-white">{item.label}</h3>
                    <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </GlassPanel>
        </SectionShell>
      </div>

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
