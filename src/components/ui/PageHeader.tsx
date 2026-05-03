import { cn } from '@/lib/cn';

export function PageHeader({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <header className={cn('max-w-3xl', className)}>
      <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-cyan-600 dark:text-cyan-200">
        {eyebrow}
      </p>
      <h1 className="text-4xl font-black leading-[0.98] text-slate-950 dark:text-white sm:text-6xl">
        {title}
      </h1>
      <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">{description}</p>
    </header>
  );
}
