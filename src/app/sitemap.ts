import { MetadataRoute } from 'next';
import { locales, withLocale } from '@/lib/i18n';
import { getProjectSlugs } from '@/lib/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.traxleapp.com';
  const lastModified = new Date();
  const localizedPages = ['', '/projects', '/about', '/services', '/contact'];
  const localizedEntries = locales.flatMap((locale) => [
    ...localizedPages.map((path) => ({
      url: `${baseUrl}${withLocale(locale, path)}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.8,
    })),
    ...getProjectSlugs().map((slug) => ({
      url: `${baseUrl}${withLocale(locale, `/projects/${slug}`)}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]);

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...localizedEntries,
    {
      url: `${baseUrl}/ozellikler`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/fiyatlandirma`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/giris`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/kunyex`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/molatik`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/barkodx`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/gizlilik-politikasi`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/kullanim-kosullari`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/iptal-iade`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
