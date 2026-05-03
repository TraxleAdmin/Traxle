import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function SectionShell({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn('relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10', className)}>
      {children}
    </section>
  );
}
