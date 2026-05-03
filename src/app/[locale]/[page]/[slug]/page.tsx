import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectDetailPage, { generateMetadata as generateProjectMetadata } from '@/app/[locale]/projects/[slug]/page';
import {
  isLocale,
  localizedRouteSlugs,
  locales,
  resolveLocalizedRouteKey,
  type Locale,
} from '@/lib/i18n';
import { getProjectSlugs } from '@/lib/projects';

type PageProps = {
  params: Promise<{ locale: string; page: string; slug: string }>;
};

type ProjectDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

function toProjectDetailProps(locale: Locale, slug: string): ProjectDetailPageProps {
  return {
    params: Promise.resolve({ locale, slug }),
  };
}

export function generateStaticParams() {
  return locales.flatMap((locale) => {
    const page = localizedRouteSlugs.projects[locale];

    if (page === 'projects') {
      return [];
    }

    return getProjectSlugs().map((slug) => ({ locale, page, slug }));
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, page, slug } = await params;

  if (!isLocale(rawLocale) || resolveLocalizedRouteKey(rawLocale, page) !== 'projects') {
    return {};
  }

  return generateProjectMetadata(toProjectDetailProps(rawLocale, slug));
}

export default async function LocalizedProjectDetailPage({ params }: PageProps) {
  const { locale: rawLocale, page, slug } = await params;

  if (!isLocale(rawLocale) || resolveLocalizedRouteKey(rawLocale, page) !== 'projects') {
    notFound();
  }

  return <ProjectDetailPage {...toProjectDetailProps(rawLocale, slug)} />;
}
