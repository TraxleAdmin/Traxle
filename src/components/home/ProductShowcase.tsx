import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import ProductCard from '@/components/home/ProductCard';
import ProductGlyph from '@/components/home/ProductGlyph';
import MotionReveal from '@/components/motion/MotionReveal';
import { Button } from '@/components/ui/Button';
import type { Dictionary, Locale } from '@/lib/i18n';
import { withLocale } from '@/lib/i18n';
import type { Project } from '@/lib/projects';

export default function ProductShowcase({
  dictionary,
  locale,
  products,
}: {
  dictionary: Dictionary;
  locale: Locale;
  products: Project[];
}) {
  const lead = products[0];

  return (
    <section id="products" className="relative overflow-hidden bg-black px-5 py-24 text-white sm:px-8 lg:px-10">
      <MotionReveal className="mx-auto max-w-7xl text-center">
        <p className="mx-auto max-w-4xl text-2xl leading-snug text-white sm:text-3xl">
          We create <span className="font-black text-[#ff4b23]">connections</span> for teams, stock, documents and field operations.
          We integrate systems, products and processes.
        </p>
      </MotionReveal>

      <div className="mx-auto mt-20 grid max-w-7xl gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
        <MotionReveal className="relative min-h-[620px]">
          <div className="absolute left-[4%] top-[18%] h-[360px] w-[46%] bg-[#ec008c]" />
          <div className="absolute left-[4%] top-[18%] h-[360px] w-[46%] bg-[repeating-radial-gradient(circle_at_0_50%,transparent_0_28px,rgba(255,255,255,0.12)_29px_34px)]" />
          <div className="absolute left-[30%] top-[8%] h-[430px] w-[54%] rotate-[16deg] rounded-3xl border-[14px] border-[#252525] bg-[#dfe3df] shadow-[0_34px_90px_rgba(0,0,0,0.55)]">
            <div className="absolute inset-5 overflow-hidden rounded-2xl bg-[#151515]">
              <ProductGlyph kind={lead.visualKind} accent={lead.accent} className="h-full rounded-none border-0" />
              <div className="absolute left-8 top-8">
                <p className="text-6xl font-black uppercase leading-none text-white">{lead.title}</p>
                <p className="mt-2 text-2xl font-black text-white/70">01/04</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-[4%] max-w-3xl">
            <p className="text-[clamp(4.8rem,10vw,9rem)] font-light lowercase leading-none text-[#ec008c]">{lead.slug}</p>
            <p className="mt-5 max-w-4xl text-2xl leading-snug text-white">{lead.detail}</p>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.08} className="grid gap-5 text-right">
          {products.map((product, index) => (
            <Link
              key={product.slug}
              href={withLocale(locale, `/projects/${product.slug}`)}
              className="text-4xl font-light lowercase text-white transition hover:text-[#ec008c]"
              style={{ color: index === 0 ? '#ec008c' : undefined }}
            >
              {product.slug === 'lojistik' ? 'field' : product.slug}
            </Link>
          ))}
        </MotionReveal>
      </div>

      <MotionReveal className="mx-auto mt-28 max-w-7xl text-center">
        <h2 className="text-[clamp(3.8rem,8.5vw,9rem)] font-light leading-[0.86] text-white">
          and they run
          <span className="block font-black uppercase">HAPPILY</span>
          ever after
        </h2>
        <p className="mx-auto mt-8 max-w-4xl text-2xl leading-snug text-white">
          We work with <span className="font-black text-[#ec008c]">stores, operations teams and product owners</span>.
          For every need, Traxle develops a tailored product layer.
        </p>
      </MotionReveal>

      <MotionReveal delay={0.12} className="mx-auto mt-20 grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard
            key={product.slug}
            product={product}
            statusLabel={dictionary.status[product.status]}
            href={withLocale(locale, `/projects/${product.slug}`)}
            index={index}
          />
        ))}
      </MotionReveal>

      <MotionReveal className="mx-auto mt-20 max-w-7xl">
        <div className="flex min-h-36 flex-col items-center justify-center gap-5 rounded-2xl bg-[#ec008c] px-6 py-8 text-center text-white sm:flex-row sm:justify-between sm:text-left">
          <p className="text-3xl font-light sm:text-4xl">Got an idea? We'll build it.</p>
          <Button href={withLocale(locale, '/contact')} className="gap-2 rounded-full border-white bg-white px-7 text-black hover:bg-[#f4e7ff]">
            Contact us now
            <ArrowUpRight size={16} aria-hidden="true" />
          </Button>
        </div>
      </MotionReveal>
    </section>
  );
}
