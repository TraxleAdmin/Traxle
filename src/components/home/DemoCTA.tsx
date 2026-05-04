import { Button } from '@/components/ui/Button';
import { SectionShell } from '@/components/ui/SectionShell';
import type { Dictionary, Locale } from '@/lib/i18n';
import { withLocale } from '@/lib/i18n';

export default function DemoCTA({ dictionary, locale }: { dictionary: Dictionary; locale: Locale }) {
  return (
    <SectionShell className="bg-[#030712] pb-24 pt-10 text-white">
      <div className="relative overflow-hidden rounded-[1.6rem] border border-cyan-300/20 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.22),transparent_36%),rgba(255,255,255,0.06)] p-6 shadow-[0_28px_100px_rgba(0,0,0,0.32)] backdrop-blur-2xl sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-black leading-tight text-white sm:text-5xl">{dictionary.home.demoTitle}</h2>
          <p className="mt-5 text-base leading-8 text-slate-300">{dictionary.home.demoDescription}</p>
        </div>
        <Button href={withLocale(locale, '/contact')} className="mt-8 min-h-12 px-6 lg:mt-0">
          {dictionary.home.demoLabel}
        </Button>
      </div>
    </SectionShell>
  );
}
