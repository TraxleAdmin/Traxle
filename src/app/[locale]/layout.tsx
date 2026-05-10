import { notFound } from 'next/navigation';
import DocumentLocaleSync from '@/components/layout/DocumentLocaleSync';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { isLocale, locales, type Locale } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale: Locale = rawLocale;

  return (
    <div className="min-h-screen overflow-hidden bg-white text-slate-950 transition-colors duration-500 dark:bg-[#05070b] dark:text-white">
      <DocumentLocaleSync locale={locale} />
      <Navbar />
      {children}
      <Footer locale={locale} />
    </div>
  );
}
