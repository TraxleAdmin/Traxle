import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { SectionShell } from '@/components/ui/SectionShell';
import { getBarkodXPrivacyContent } from '@/lib/barkodxPrivacy';
import {
  getDictionary,
  isBarkodXPrivacyPath,
  isLocale,
  locales,
  localizedBarkodXPrivacySlugs,
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
    privacy: localizedBarkodXPrivacySlugs[locale],
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, privacy } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : 'tr';

  if (!isBarkodXPrivacyPath(locale, 'barkodx', privacy)) {
    return {};
  }

  const content = getBarkodXPrivacyContent(locale);

  return createPageMetadata({
    locale,
    path: `/barkodx/${localizedBarkodXPrivacySlugs.tr}`,
    title: `BarkodX | ${content.title}`,
    description: content.intro,
  });
}

export default async function BarkodXPrivacyPage({ params }: PageProps) {
  const { locale: rawLocale, privacy } = await params;

  if (!isLocale(rawLocale) || !isBarkodXPrivacyPath(rawLocale, 'barkodx', privacy)) {
    notFound();
  }

  const locale: Locale = rawLocale;
  const dictionary = getDictionary(locale);
  const content = getBarkodXPrivacyContent(locale);

  return (
    <main className="bg-[#030712] pt-28 text-white">
      <SectionShell className="max-w-5xl py-16">
        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-10">
          <p className="font-mono text-[11px] font-black uppercase tracking-[0.28em] text-cyan-200">
            BarkodX
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-white sm:text-6xl">{content.title}</h1>
          <p className="mt-4 text-sm font-black text-cyan-100">{content.lastUpdated}</p>
          <p className="mt-6 text-base leading-8 text-slate-300">{content.intro}</p>

          <div className="mt-10 grid gap-6">
            {content.sections.map((section) => (
              <PrivacySection
                key={section.title}
                title={section.title}
                text={section.text}
                items={section.items}
              />
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href={withLocale(locale, '/projects/barkodx')}>{dictionary.productDetail.backToProducts}</Button>
            <Button href={withLocale(locale, '/contact')} variant="secondary">
              {dictionary.productDetail.demoLabel}
            </Button>
          </div>
        </div>
      </SectionShell>
    </main>
  );
}

function PrivacySection({
  title,
  text,
  items,
}: {
  title: string;
  text?: string;
  items?: string[];
}) {
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
