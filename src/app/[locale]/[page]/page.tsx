import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AboutPage, { generateMetadata as generateAboutMetadata } from '@/app/[locale]/about/page';
import ContactPage, { generateMetadata as generateContactMetadata } from '@/app/[locale]/contact/page';
import ProjectsPage, { generateMetadata as generateProjectsMetadata } from '@/app/[locale]/projects/page';
import ServicesPage, { generateMetadata as generateServicesMetadata } from '@/app/[locale]/services/page';
import {
  isLocale,
  localizedRouteSlugs,
  locales,
  resolveLocalizedRouteKey,
  routeKeys,
  type Locale,
  type RouteKey,
} from '@/lib/i18n';

type PageProps = {
  params: Promise<{ locale: string; page: string }>;
};

type LocaleOnlyPageProps = {
  params: Promise<{ locale: string }>;
};

const canonicalStaticSlugs = new Set<RouteKey>(routeKeys);

function toLocaleOnlyProps(locale: Locale): LocaleOnlyPageProps {
  return {
    params: Promise.resolve({ locale }),
  };
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    routeKeys
      .map((routeKey) => ({ locale, page: localizedRouteSlugs[routeKey][locale] }))
      .filter(({ page }) => !canonicalStaticSlugs.has(page as RouteKey)),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, page } = await params;

  if (!isLocale(rawLocale)) {
    return {};
  }

  const routeKey = resolveLocalizedRouteKey(rawLocale, page);

  if (routeKey === 'about') return generateAboutMetadata(toLocaleOnlyProps(rawLocale));
  if (routeKey === 'projects') return generateProjectsMetadata(toLocaleOnlyProps(rawLocale));
  if (routeKey === 'services') return generateServicesMetadata(toLocaleOnlyProps(rawLocale));
  if (routeKey === 'contact') return generateContactMetadata(toLocaleOnlyProps(rawLocale));

  return {};
}

export default async function LocalizedPage({ params }: PageProps) {
  const { locale: rawLocale, page } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const routeKey = resolveLocalizedRouteKey(rawLocale, page);
  const props = toLocaleOnlyProps(rawLocale);

  if (routeKey === 'about') return <AboutPage {...props} />;
  if (routeKey === 'projects') return <ProjectsPage {...props} />;
  if (routeKey === 'services') return <ServicesPage {...props} />;
  if (routeKey === 'contact') return <ContactPage {...props} />;

  notFound();
}
