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
    <SectionShell className="overflow-hidden bg-[#eef3f8] py-16 text-slate-950 dark:bg-[#050a13] dark:text-white sm:py-24">
      <div className="relative z-10 mb-8 max-w-2xl">
        <p className="mb-4 text-[11px] font-black uppercase tracking-[0.28em] text-slate-400">Use case matrix</p>
        <h2 className="text-3xl font-black text-slate-950 dark:text-white sm:text-5xl">{dictionary.productDetail.useCases}</h2>
      </div>
      <div className="relative z-10 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {product.useCases.map((useCase, index) => (
          <article
            key={useCase}
            className="relative min-h-40 overflow-hidden rounded-lg border border-slate-200 bg-white/86 p-5 shadow-[0_18px_70px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:border-slate-950 dark:border-white/10 dark:bg-white/[0.055] dark:hover:border-white/30"
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs font-black text-slate-400">{String(index + 1).padStart(2, '0')}</p>
              <ArrowUpRight size={17} className="text-slate-400" aria-hidden="true" />
            </div>
            <div className="mt-8 h-1 w-16 rounded-full" style={{ background: `linear-gradient(90deg, ${product.accent}, transparent)` }} />
            <p className="mt-8 text-lg font-black leading-7 text-slate-950 dark:text-white">{useCase}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
