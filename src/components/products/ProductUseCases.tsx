import { ArrowUpRight } from 'lucide-react';
import { SectionShell } from '@/components/ui/SectionShell';
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
    <SectionShell className="bg-[#030712] py-16 text-white sm:py-24">
      <div className="mb-8 max-w-2xl">
        <h2 className="text-3xl font-black text-white sm:text-5xl">{dictionary.productDetail.useCases}</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {product.useCases.map((useCase, index) => (
          <article
            key={useCase}
            className="relative min-h-40 overflow-hidden rounded-[1.15rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-cyan-300/40"
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs font-black text-cyan-200">{String(index + 1).padStart(2, '0')}</p>
              <ArrowUpRight size={17} className="text-white/60" aria-hidden="true" />
            </div>
            <p className="mt-10 text-lg font-black leading-7 text-white">{useCase}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
