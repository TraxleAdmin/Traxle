import { ArrowUpRight } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n';
import type { Project } from '@/lib/projects';

export default function ProductUseCases({
  dictionary,
  product,
}: {
  dictionary: Dictionary;
  product: Project;
}) {
  return (
    <section className="overflow-hidden bg-black px-5 py-24 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-[clamp(4rem,8.5vw,9rem)] font-light leading-[0.86] text-white">
            use cases
            <span className="block font-black uppercase">HAPPILY</span>
            connected
          </h2>
          <p className="mt-8 text-2xl leading-snug text-white/75">{dictionary.productDetail.useCases}</p>
        </div>

        <div className="mt-20 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {product.useCases.map((useCase, index) => (
            <article
              key={useCase}
              className="relative min-h-64 overflow-hidden rounded-[1.35rem] border-[6px] bg-[#e8e8e8] p-6 text-black shadow-[0_24px_80px_rgba(0,0,0,0.42)]"
              style={{ borderColor: ['#ff5a24', '#ffe600', '#ec00ff', '#00d6c8'][index % 4] }}
            >
              <div className="flex items-center justify-between">
                <p className="font-mono text-sm font-black text-black/40">0{index + 1}</p>
                <ArrowUpRight size={18} className="text-black" aria-hidden="true" />
              </div>
              <p className="mt-24 text-2xl font-black leading-tight">{useCase}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
