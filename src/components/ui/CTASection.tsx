import { Button } from '@/components/ui/Button';
import { GlassPanel } from '@/components/ui/GlassPanel';

export function CTASection({
  title,
  description,
  label,
  href,
}: {
  title: string;
  description: string;
  label: string;
  href: string;
}) {
  return (
    <GlassPanel className="overflow-hidden p-8 sm:p-10">
      <div className="relative">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-black text-slate-950 dark:text-white sm:text-4xl">{title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">{description}</p>
          </div>
          <Button href={href} className="shrink-0">
            {label}
          </Button>
        </div>
      </div>
    </GlassPanel>
  );
}
