import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Mail, MessageSquareText, UserRound } from 'lucide-react';
import NeednapObjects from '@/components/relaunch/NeednapObjects';
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
    <main className="bg-black text-white">
      <SectionShell className="max-w-none isolate min-h-screen overflow-hidden bg-black px-0 pb-20 pt-36 text-white sm:px-0 lg:px-0">
        <NeednapObjects className="opacity-35" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-10">
        <header className="max-w-4xl">
          <p className="mb-6 text-xs font-black uppercase tracking-[0.28em] text-[#ec008c]">
            {dictionary.contact.eyebrow}
          </p>
          <h1 className="text-[clamp(4.8rem,10vw,10rem)] font-black uppercase leading-[0.74] text-white">
            contact
            <span className="block">US</span>
          </h1>
          <p className="mt-10 max-w-3xl text-2xl leading-snug text-white/75">{dictionary.contact.description}</p>
        </header>

        <form className="grid gap-4 rounded-[1.35rem] border-[6px] border-[#ec008c] bg-[#e8e8e8] p-5 text-black shadow-[0_24px_80px_rgba(0,0,0,0.42)] sm:p-6">
          <label className="grid gap-2 text-sm font-black text-black">
            {dictionary.contact.name}
            <span className="relative">
              <UserRound size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" aria-hidden="true" />
              <input
                name="name"
                type="text"
                required
                autoComplete="name"
                className="min-h-12 w-full rounded-full border border-black/10 bg-white px-4 pl-11 text-black outline-none transition focus:border-[#ec008c] focus:ring-2 focus:ring-[#ec008c]/20"
              />
            </span>
          </label>
          <label className="grid gap-2 text-sm font-black text-black">
            {dictionary.contact.email}
            <span className="relative">
              <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" aria-hidden="true" />
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className="min-h-12 w-full rounded-full border border-black/10 bg-white px-4 pl-11 text-black outline-none transition focus:border-[#ec008c] focus:ring-2 focus:ring-[#ec008c]/20"
              />
            </span>
          </label>
          <label className="grid gap-2 text-sm font-black text-black">
            {dictionary.contact.message}
            <span className="relative">
              <MessageSquareText size={17} className="absolute left-4 top-4 text-black/40" aria-hidden="true" />
              <textarea
                name="message"
                required
                rows={7}
                className="w-full rounded-3xl border border-black/10 bg-white px-4 py-3 pl-11 text-black outline-none transition focus:border-[#ec008c] focus:ring-2 focus:ring-[#ec008c]/20"
              />
            </span>
          </label>
          <Button type="submit" className="w-full rounded-full border-black bg-black text-white hover:bg-[#ec008c] sm:w-auto">
            {dictionary.contact.submit}
          </Button>
        </form>
        </div>
      </SectionShell>
    </main>
  );
}
