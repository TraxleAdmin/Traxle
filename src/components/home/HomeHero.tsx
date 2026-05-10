import { ArrowDownRight } from 'lucide-react';
import MotionReveal from '@/components/motion/MotionReveal';
import NeednapObjects from '@/components/relaunch/NeednapObjects';
import { Button } from '@/components/ui/Button';
import type { Dictionary, Locale } from '@/lib/i18n';
import { withLocale } from '@/lib/i18n';
import type { Project } from '@/lib/projects';

export default function HomeHero({
  dictionary,
  locale,
  products,
}: {
  dictionary: Dictionary;
  locale: Locale;
  products: Project[];
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#080914] text-white">
      <div className="relative min-h-[1120px] overflow-hidden bg-[radial-gradient(circle_at_50%_16%,#1a1b2a_0%,#080914_42%,#000_100%)]">
        <NeednapObjects />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[860px] max-w-7xl items-center justify-center px-5 pt-28 text-center sm:px-8 lg:px-10">
          <MotionReveal className="w-full">
            <h1 className="mx-auto max-w-5xl text-[clamp(5.8rem,13vw,13.4rem)] font-black uppercase leading-[0.68] text-white">
              <span className="block text-[0.58em] normal-case">flow</span>
              <span className="block">HAPP</span>
              <span className="block">ENS</span>
            </h1>
          </MotionReveal>
        </div>
      </div>

      <div className="relative z-10 -mt-36 bg-black px-5 pb-20 text-center sm:px-8 lg:px-10">
        <MotionReveal className="mx-auto max-w-7xl">
          <h2 className="mx-auto max-w-6xl text-[clamp(4.6rem,10vw,10.2rem)] font-black uppercase leading-[0.76] text-white">
            OPEERATIONS
          </h2>
          <p className="neednap-outline-word mx-auto -mt-2 max-w-6xl text-[clamp(3.2rem,7.8vw,8rem)] font-light leading-[0.86]">
            are beautiful systems
          </p>
          <p className="mx-auto mt-10 max-w-4xl text-2xl leading-snug text-white sm:text-3xl">
            We create <span className="font-black text-[#ff4b23]">connections</span> for human-operation dialogue.
            We integrate BarkodX, Molatik, KünyeX and field processes.
          </p>

          <div className="mx-auto mt-10 flex max-w-xl flex-col justify-center gap-3 sm:flex-row">
            <Button href={withLocale(locale, '/projects')} className="min-h-12 rounded-full border-white bg-white px-7 text-black hover:bg-[#f0e9ff]">
              {dictionary.home.primaryCta}
            </Button>
            <Button href={withLocale(locale, '/contact')} variant="ghost" className="min-h-12 gap-2 rounded-full border border-white bg-transparent px-7 text-white hover:bg-white/10">
              {dictionary.home.secondaryCta}
              <ArrowDownRight size={17} aria-hidden="true" />
            </Button>
          </div>

          <div className="mx-auto mt-16 grid max-w-4xl gap-4 text-left md:grid-cols-3">
            {dictionary.home.proof.map((item, index) => (
              <div key={item} className="border-t border-white/20 pt-4">
                <p className="font-mono text-sm font-black text-[#ec008c]">0{index + 1}</p>
                <p className="mt-3 text-lg font-black leading-tight text-white">{item}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-16 flex max-w-5xl flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {products.map((product, index) => (
              <span
                key={product.slug}
                className="text-3xl font-light lowercase text-white"
                style={{ color: index === 0 ? '#ec008c' : undefined }}
              >
                {product.slug === 'lojistik' ? 'field' : product.slug}
              </span>
            ))}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
