import { ArrowUpRight } from 'lucide-react';
import type { CSSProperties } from 'react';
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
    <SectionShell className="overflow-hidden bg-slate-50 py-16 text-slate-950 transition-colors duration-500 dark:bg-[#030712] dark:text-white sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent"
      />
      <div className="relative z-10 mb-8 max-w-2xl">
        <h2 className="text-3xl font-black text-slate-950 dark:text-white sm:text-5xl">{dictionary.productDetail.useCases}</h2>
      </div>
      <div className="relative z-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {product.useCases.map((useCase, index) => (
          <article
            key={useCase}
            className="premium-motion-card relative min-h-40 overflow-hidden rounded-[1.15rem] border border-slate-200/80 bg-white/[0.84] p-5 shadow-[0_20px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl transition duration-500 hover:border-cyan-300/40 dark:border-white/10 dark:bg-white/[0.055]"
            style={{ '--card-accent': product.accent } as CSSProperties}
          >
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            <span className="pointer-events-none absolute -bottom-14 right-0 h-24 w-24 rounded-full blur-2xl" style={{ backgroundColor: `${product.accent}18` }} />
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs font-black text-cyan-200">{String(index + 1).padStart(2, '0')}</p>
              <ArrowUpRight size={17} className="text-white/60" aria-hidden="true" />
            </div>
            <p className="mt-10 text-lg font-black leading-7 text-slate-950 dark:text-white">{useCase}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
