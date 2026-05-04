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
    <SectionShell className="overflow-hidden bg-[#030712] py-16 text-white sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(circle at 16% 18%, ${product.accent}18, transparent 30%), linear-gradient(135deg, rgba(255,255,255,0.045), transparent 38%)`,
        }}
      />
      <div className="relative z-10 grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
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
              className="relative overflow-hidden rounded-[1.15rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.20)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.075]"
            >
              <span className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full blur-2xl" style={{ backgroundColor: `${product.accent}18` }} />
              <CheckCircle2 className="mb-5 text-cyan-200" size={24} aria-hidden="true" />
              <p className="text-base font-black leading-7 text-white">{feature}</p>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
