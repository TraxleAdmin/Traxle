import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Mail, MessageSquareText, UserRound } from 'lucide-react';
import LaunchBackdrop from '@/components/relaunch/LaunchBackdrop';
import { Button } from '@/components/ui/Button';
import { SectionShell } from '@/components/ui/SectionShell';
import { getDictionary, isLocale, type Locale } from '@/lib/i18n';
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
    path: '/contact',
    title: `Traxle | ${dictionary.nav.contact}`,
    description: dictionary.contact.description,
  });
}

export default async function ContactPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale: Locale = rawLocale;
  const dictionary = getDictionary(locale);

  return (
    <main className="bg-[#f6f8fb] pt-24 text-slate-950 dark:bg-[#030712] dark:text-white">
      <SectionShell className="isolate grid min-h-[calc(100vh-6rem)] gap-10 overflow-hidden pt-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <LaunchBackdrop label="CONTACT CHANNEL" />
        <header className="relative z-10 max-w-4xl">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-cyan-700 dark:text-cyan-200">
            {dictionary.contact.eyebrow}
          </p>
          <h1 className="text-5xl font-black leading-[0.94] text-slate-950 dark:text-white sm:text-7xl">{dictionary.contact.title}</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-300 sm:text-lg">{dictionary.contact.description}</p>
        </header>

        <form className="relative z-10 grid gap-4 rounded-lg border border-slate-200 bg-white/88 p-5 shadow-[0_24px_90px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-white/[0.055] sm:p-6">
          <label className="grid gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
            {dictionary.contact.name}
            <span className="relative">
              <UserRound size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input
                name="name"
                type="text"
                required
                autoComplete="name"
                className="min-h-12 w-full rounded-md border border-slate-200 bg-white px-4 pl-11 text-slate-950 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/30 dark:border-white/10 dark:bg-black/35 dark:text-white"
              />
            </span>
          </label>
          <label className="grid gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
            {dictionary.contact.email}
            <span className="relative">
              <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className="min-h-12 w-full rounded-md border border-slate-200 bg-white px-4 pl-11 text-slate-950 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/30 dark:border-white/10 dark:bg-black/35 dark:text-white"
              />
            </span>
          </label>
          <label className="grid gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
            {dictionary.contact.message}
            <span className="relative">
              <MessageSquareText size={17} className="absolute left-4 top-4 text-slate-400" aria-hidden="true" />
              <textarea
                name="message"
                required
                rows={7}
                className="w-full rounded-md border border-slate-200 bg-white px-4 py-3 pl-11 text-slate-950 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/30 dark:border-white/10 dark:bg-black/35 dark:text-white"
              />
            </span>
          </label>
          <Button type="submit" className="w-full rounded-md sm:w-auto">
            {dictionary.contact.submit}
          </Button>
        </form>
      </SectionShell>
    </main>
  );
}
