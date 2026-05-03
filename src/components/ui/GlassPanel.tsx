import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function GlassPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-[1.5rem] border border-slate-200/80 bg-white/72 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.055] dark:shadow-[0_24px_80px_rgba(0,0,0,0.34)]',
        className,
      )}
    >
      {children}
    </div>
  );
}
