import { ArrowUpRight } from 'lucide-react';
import MotionReveal from '@/components/motion/MotionReveal';
import { Button } from '@/components/ui/Button';
import type { Dictionary, Locale } from '@/lib/i18n';
import { withLocale } from '@/lib/i18n';

export default function DemoCTA({ dictionary, locale }: { dictionary: Dictionary; locale: Locale }) {
  return (
    <section className="overflow-hidden bg-black px-5 pb-28 pt-8 text-white sm:px-8 lg:px-10">
      <MotionReveal>
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex overflow-hidden whitespace-nowrap text-[clamp(4rem,8vw,8rem)] font-black uppercase leading-none text-white">
            <div className="studio-marquee-track flex min-w-max gap-10">
              {Array.from({ length: 8 }).map((_, index) => (
                <span key={index}>let's build it.</span>
              ))}
            </div>
          </div>
          <div className="flex min-h-40 flex-col items-center justify-center gap-5 rounded-2xl bg-[#ec008c] px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h2 className="text-4xl font-light leading-tight sm:text-5xl">{dictionary.home.demoTitle}</h2>
              <p className="mt-3 max-w-2xl text-lg text-white/80">{dictionary.home.demoDescription}</p>
            </div>
            <Button href={withLocale(locale, '/contact')} className="gap-2 rounded-full border-white bg-white px-7 text-black hover:bg-[#f4e7ff]">
              {dictionary.home.demoLabel}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </MotionReveal>
    </section>
  );
}
