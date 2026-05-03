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
    <div className="min-h-screen overflow-hidden bg-white text-slate-950 transition-colors duration-500 dark:bg-black dark:text-white">
      <DocumentLocaleSync locale={locale} />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(0,194,255,0.16),transparent_34%),radial-gradient(circle_at_15%_22%,rgba(148,163,184,0.18),transparent_28%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(0,194,255,0.18),transparent_32%),radial-gradient(circle_at_12%_20%,rgba(255,255,255,0.08),transparent_28%),#000]" />
      <Navbar />
      {children}
      <Footer locale={locale} />
    </div>
  );
}
