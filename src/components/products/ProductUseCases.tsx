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
    <SectionShell className="overflow-hidden bg-[#030712] py-16 text-white sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent"
      />
      <div className="relative z-10 mb-8 max-w-2xl">
        <h2 className="text-3xl font-black text-white sm:text-5xl">{dictionary.productDetail.useCases}</h2>
      </div>
      <div className="relative z-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {product.useCases.map((useCase, index) => (
          <article
            key={useCase}
            className="relative min-h-40 overflow-hidden rounded-[1.15rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-cyan-300/40"
          >
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            <span className="pointer-events-none absolute -bottom-14 right-0 h-24 w-24 rounded-full blur-2xl" style={{ backgroundColor: `${product.accent}18` }} />
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
