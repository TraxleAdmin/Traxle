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
    <SectionShell className="bg-[#030712] pb-24 pt-10 text-white">
      <div className="rounded-[1.5rem] border border-cyan-300/20 bg-white/[0.06] p-6 backdrop-blur-2xl sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-3xl">
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
