import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/panel/', // Yönetim paneli Google'da çıkmasın
    },
    // 🔥 Burası da www ile güncellendi
    sitemap: 'https://www.traxleapp.com/sitemap.xml', 
  };
}