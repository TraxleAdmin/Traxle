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
    <SectionShell className="bg-[#030712] py-16 text-white sm:py-24">
      <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-cyan-200">
            {dictionary.productDetail.whatItDoes}
          </p>
          <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-5xl">{product.detail}</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {product.features.map((feature) => (
            <article
              key={feature}
              className="rounded-[1.15rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl transition duration-500 hover:border-cyan-300/40 hover:bg-white/[0.075]"
            >
              <CheckCircle2 className="mb-5 text-cyan-200" size={24} aria-hidden="true" />
              <p className="text-base font-black leading-7 text-white">{feature}</p>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
