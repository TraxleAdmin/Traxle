import type { CSSProperties } from 'react';
import { cn } from '@/lib/cn';

type PremiumLightFieldProps = {
  accent?: string;
  className?: string;
  density?: 'quiet' | 'rich';
};

export default function PremiumLightField({
  accent = '#22d3ee',
  className,
  density = 'rich',
}: PremiumLightFieldProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      style={{ '--premium-accent': accent } as CSSProperties}
    >
      <div className="premium-depth-grid absolute inset-0 opacity-70" />
      <div className="premium-aurora absolute -left-[14%] top-[8%] h-[48rem] w-[48rem] opacity-55" />
      <div className="premium-aurora premium-aurora-alt absolute right-[-16%] top-[4%] h-[42rem] w-[42rem] opacity-45" />
      <div className="premium-light-curtain absolute inset-x-[-18%] top-[-22%] h-[46rem] opacity-70" />
      <span className="premium-flare absolute left-[12%] top-[24%] h-40 w-40" />
      <span className="premium-flare premium-flare-alt absolute right-[12%] top-[18%] h-52 w-52" />
      <span className="premium-sweep premium-sweep-a absolute left-[-20%] top-[28%] h-px w-[38rem]" />
      <span className="premium-sweep premium-sweep-b absolute left-[-28%] top-[58%] h-px w-[46rem]" />
      {density === 'rich' && (
        <>
          <span className="premium-circuit absolute left-[9%] top-[68%] h-28 w-80" />
          <span className="premium-circuit premium-circuit-alt absolute right-[7%] top-[42%] h-36 w-96" />
          <span className="premium-glint absolute left-[44%] top-[16%]" />
          <span className="premium-glint premium-glint-delayed absolute left-[72%] top-[72%]" />
          <span className="premium-glint premium-glint-slow absolute left-[20%] top-[48%]" />
        </>
      )}
    </div>
  );
}
