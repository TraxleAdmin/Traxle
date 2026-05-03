import type { Metadata } from 'next';
import { defaultLocale, locales, type Locale, withLocale } from '@/lib/i18n';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://traxleapp.com';

export function getLocalizedAlternates(path = '') {
  const languages = locales.reduce<Record<string, string>>((acc, locale) => {
    acc[locale] = `${siteUrl}${withLocale(locale, path)}`;
    return acc;
  }, {});

  languages['x-default'] = `${siteUrl}${withLocale(defaultLocale, path)}`;
  return languages;
}

export function createPageMetadata({
  locale,
  path = '',
  title,
  description,
}: {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
}): Metadata {
  const canonical = `${siteUrl}${withLocale(locale, path)}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: getLocalizedAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Traxle',
      type: 'website',
      locale,
    },
  };
}
