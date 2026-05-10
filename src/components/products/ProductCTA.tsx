import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
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
    <section className="bg-black px-5 pb-28 pt-8 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex min-h-40 flex-col items-center justify-center gap-5 rounded-2xl bg-[#ec008c] px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="text-4xl font-light leading-tight sm:text-5xl">{dictionary.productDetail.demoTitle}</h2>
            <p className="mt-3 max-w-2xl text-lg text-white/80">{dictionary.productDetail.demoDescription}</p>
          </div>
          <Button href={product.cta.href} className="gap-2 rounded-full border-white bg-white px-7 text-black hover:bg-[#f4e7ff]">
            {dictionary.productDetail.demoLabel}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
