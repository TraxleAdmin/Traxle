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
    <div className="min-h-screen overflow-hidden bg-[#f6f8fb] text-slate-950 transition-colors duration-500 dark:bg-[#030712] dark:text-white">
      <DocumentLocaleSync locale={locale} />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(180deg,#f6f8fb_0%,#eef3f8_100%)] bg-[size:48px_48px,48px_48px,auto] dark:bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(180deg,#030712_0%,#07111f_100%)]" />
      <Navbar />
      {children}
      <Footer locale={locale} />
    </div>
  );
}
