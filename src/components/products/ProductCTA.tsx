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
    <SectionShell className="overflow-hidden bg-[#f6f8fb] pb-24 pt-10 text-slate-950 dark:bg-[#030712] dark:text-white">
      <div
        className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_28px_100px_rgba(15,23,42,0.18)] sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10 dark:border-white/10"
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.075)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.075)_1px,transparent_1px)] bg-[size:36px_36px] opacity-45" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${product.accent}, transparent)` }} />
        <div className="relative max-w-3xl">
          <h2 className="text-3xl font-black leading-tight sm:text-5xl">{dictionary.productDetail.demoTitle}</h2>
          <p className="mt-5 text-base leading-8 text-slate-300">{dictionary.productDetail.demoDescription}</p>
        </div>
        <Button href={product.cta.href} className="relative mt-8 min-h-12 rounded-md px-6 lg:mt-0">
          {dictionary.productDetail.demoLabel}
        </Button>
      </div>
    </SectionShell>
  );
}
