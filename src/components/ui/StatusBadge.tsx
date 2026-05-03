import { cn } from '@/lib/cn';
import type { ProjectStatus } from '@/lib/projects';

const statusClasses: Record<ProjectStatus, string> = {
  active: 'border-emerald-400/40 bg-emerald-400/12 text-emerald-600 dark:text-emerald-200',
  development: 'border-cyan-400/40 bg-cyan-400/12 text-cyan-700 dark:text-cyan-100',
  concept: 'border-violet-400/40 bg-violet-400/12 text-violet-700 dark:text-violet-100',
};

export function StatusBadge({
  status,
  label,
  className,
}: {
  status: ProjectStatus;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.18em]',
        statusClasses[status],
        className,
      )}
    >
      {label}
    </span>
  );
}
