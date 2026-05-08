import { CheckCircle2 } from 'lucide-react';
import { SectionShell } from '@/components/ui/SectionShell';
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
    <SectionShell className="overflow-hidden bg-[#f6f8fb] py-16 text-slate-950 dark:bg-[#030712] dark:text-white sm:py-24">
      <div className="relative z-10 grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-cyan-700 dark:text-cyan-200">
            {dictionary.productDetail.whatItDoes}
          </p>
          <h2 className="mt-4 text-3xl font-black leading-tight text-slate-950 dark:text-white sm:text-5xl">{product.detail}</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {product.features.map((feature) => (
            <article
              key={feature}
              className="relative overflow-hidden rounded-lg border border-slate-200 bg-white/86 p-5 shadow-[0_18px_70px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:border-slate-950 dark:border-white/10 dark:bg-white/[0.055] dark:hover:border-white/30"
            >
              <div className="mb-5 h-1 w-20 rounded-full" style={{ background: `linear-gradient(90deg, ${product.accent}, transparent)` }} />
              <CheckCircle2 className="mb-5" size={24} style={{ color: product.accent }} aria-hidden="true" />
              <p className="text-base font-black leading-7 text-slate-950 dark:text-white">{feature}</p>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
