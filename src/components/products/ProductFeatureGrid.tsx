import { CheckCircle2 } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n';
import type { Project } from '@/lib/projects';

export default function ProductFeatureGrid({
  dictionary,
  product,
}: {
  dictionary: Dictionary;
  product: Project;
}) {
  return (
    <section className="overflow-hidden bg-black px-5 py-24 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-[#ec008c]">{dictionary.productDetail.whatItDoes}</p>
          <h2 className="mx-auto mt-6 max-w-6xl text-[clamp(3.6rem,8vw,8rem)] font-light leading-[0.9] text-white">
            {product.detail}
          </h2>
        </div>

        <div className="mt-20 grid gap-4 md:grid-cols-2">
          {product.features.map((feature, index) => (
            <article
              key={feature}
              className="group relative min-h-64 overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-7 transition duration-300 hover:-translate-y-2 hover:bg-white/[0.075]"
            >
              <p className="font-mono text-sm font-black text-white/35">0{index + 1}</p>
              <CheckCircle2 className="mt-12" size={30} style={{ color: index % 2 ? product.accent : '#ec008c' }} aria-hidden="true" />
              <p className="mt-8 text-3xl font-black leading-tight text-white">{feature}</p>
              <div className="absolute inset-x-7 bottom-7 h-1 rounded-full bg-white/10">
                <span className="block h-full w-2/3 rounded-full bg-[#ec008c] transition group-hover:w-full" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
