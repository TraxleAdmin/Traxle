import { Button } from '@/components/ui/Button';
import { SectionShell } from '@/components/ui/SectionShell';
import type { Dictionary } from '@/lib/i18n';
import type { Project } from '@/lib/projects';

export default function ProductCTA({
  dictionary,
  product,
}: {
  dictionary: Dictionary;
  product: Project;
}) {
  return (
    <SectionShell className="overflow-hidden bg-[#030712] pb-24 pt-10 text-white">
      <div
        className="relative overflow-hidden rounded-[1.5rem] border border-cyan-300/20 bg-white/[0.06] p-6 shadow-[0_28px_110px_rgba(0,0,0,0.32)] backdrop-blur-2xl sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10"
        style={{ boxShadow: `0 28px 110px rgba(0,0,0,0.32), inset 0 0 0 1px ${product.accent}18` }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-80" style={{ background: `radial-gradient(circle at 84% 22%, ${product.accent}24, transparent 32%)` }} />
        <span className="pointer-events-none absolute -left-20 top-0 h-px w-80 rotate-[-12deg] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
        <div className="relative max-w-3xl">
          <h2 className="text-3xl font-black leading-tight text-white sm:text-5xl">{dictionary.productDetail.demoTitle}</h2>
          <p className="mt-5 text-base leading-8 text-slate-300">{dictionary.productDetail.demoDescription}</p>
        </div>
        <Button href={product.cta.href} className="mt-8 min-h-12 px-6 lg:mt-0">
          {dictionary.productDetail.demoLabel}
        </Button>
      </div>
    </SectionShell>
  );
}
