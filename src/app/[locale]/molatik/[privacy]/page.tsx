import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { SectionShell } from '@/components/ui/SectionShell';
import {
  getDictionary,
  isLocale,
  isMolatikPrivacyPath,
  locales,
  localizedMolatikPrivacySlugs,
  type Locale,
  withLocale,
} from '@/lib/i18n';
import { createPageMetadata } from '@/lib/seo';

type PageProps = {
  params: Promise<{ locale: string; privacy: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
    privacy: localizedMolatikPrivacySlugs[locale],
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, privacy } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : 'tr';

  if (!isMolatikPrivacyPath(locale, 'molatik', privacy)) {
    return {};
  }

  const dictionary = getDictionary(locale);

  return createPageMetadata({
    locale,
    path: `/molatik/${localizedMolatikPrivacySlugs.tr}`,
    title: `Molatik | ${dictionary.privacy.title}`,
    description: dictionary.privacy.intro,
  });
}

export default async function MolatikPrivacyPage({ params }: PageProps) {
  const { locale: rawLocale, privacy } = await params;

  if (!isLocale(rawLocale) || !isMolatikPrivacyPath(rawLocale, 'molatik', privacy)) {
    notFound();
  }

  const locale: Locale = rawLocale;
  const dictionary = getDictionary(locale);
  const content = dictionary.privacy;

  return (
    <main className="bg-[#030712] pt-28 text-white">
      <SectionShell className="max-w-5xl py-16">
        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-10">
          <h1 className="mt-4 text-4xl font-black leading-tight text-white sm:text-6xl">{content.title}</h1>
          <p className="mt-4 text-sm font-black text-cyan-100">{content.lastUpdated}</p>
          <p className="mt-6 text-base leading-8 text-slate-300">{content.intro}</p>

          <div className="mt-10 grid gap-6">
            <PrivacySection title={content.collectedTitle} items={content.collectedItems} />
            <PrivacySection title={content.useTitle} items={content.useItems} />
            <PrivacySection title={content.sharingTitle} text={content.sharingText} />
            <PrivacySection title={content.retentionTitle} text={content.retentionText} />
            <PrivacySection title={content.securityTitle} text={content.securityText} />
            <PrivacySection title={content.rightsTitle} items={content.rightsItems} />
            <PrivacySection title={content.childrenTitle} text={content.childrenText} />
            <PrivacySection title={content.changesTitle} text={content.changesText} />
            <PrivacySection title={content.contactTitle} text={content.contactEmail} />
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href={withLocale(locale, '/projects/molatik')}>{dictionary.productDetail.backToProducts}</Button>
            <Button href={withLocale(locale, '/contact')} variant="secondary">
              {dictionary.productDetail.demoLabel}
            </Button>
          </div>
        </div>
      </SectionShell>
    </main>
  );
}

function PrivacySection({ title, text, items }: { title: string; text?: string; items?: string[] }) {
  return (
    <section className="rounded-[1.1rem] border border-white/10 bg-black/20 p-5">
      <h2 className="text-xl font-black text-white">{title}</h2>
      {text && <p className="mt-3 text-sm leading-7 text-slate-300">{text}</p>}
      {items && (
        <ul className="mt-4 grid gap-3">
          {items.map((item) => (
            <li key={item} className="rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm font-bold text-slate-200">
              {item}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
