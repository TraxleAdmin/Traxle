import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LazyHomeHeroScene } from '@/components/three/LazyScenes';
import { Button } from '@/components/ui/Button';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { PageHeader } from '@/components/ui/PageHeader';
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
    <main className="pt-28">
      <section className="relative overflow-hidden">
        <LazyHomeHeroScene className="opacity-25" />
        <SectionShell className="relative z-10 grid min-h-[78vh] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <PageHeader
            eyebrow={dictionary.contact.eyebrow}
            title={dictionary.contact.title}
            description={dictionary.contact.description}
          />

          <GlassPanel className="p-6 sm:p-8">
            <form className="grid gap-5">
              <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                {dictionary.contact.name}
                <input
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="min-h-12 rounded-2xl border border-slate-200 bg-white px-4 text-slate-950 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/30 dark:border-white/10 dark:bg-black/40 dark:text-white"
                />
              </label>
              <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                {dictionary.contact.email}
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="min-h-12 rounded-2xl border border-slate-200 bg-white px-4 text-slate-950 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/30 dark:border-white/10 dark:bg-black/40 dark:text-white"
                />
              </label>
              <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                {dictionary.contact.message}
                <textarea
                  name="message"
                  required
                  rows={6}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/30 dark:border-white/10 dark:bg-black/40 dark:text-white"
                />
              </label>
              <Button type="submit" className="w-full sm:w-auto">
                {dictionary.contact.submit}
              </Button>
            </form>
          </GlassPanel>
        </SectionShell>
      </section>
    </main>
  );
}
