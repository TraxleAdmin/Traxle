import type { CSSProperties } from 'react';
import { cn } from '@/lib/cn';

export default function LaunchBackdrop({
  accent = '#22d3ee',
  label = 'TRAXLE OPERATIONS OS',
  className,
}: {
  accent?: string;
  label?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      style={{ '--launch-accent': accent } as CSSProperties}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.055)_1px,transparent_1px)] bg-[size:42px_42px] opacity-70 dark:bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(115deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.76) 36%, rgba(255,255,255,0.18) 100%)',
        }}
      />
      <div className="absolute inset-0 hidden dark:block bg-[linear-gradient(115deg,#030712_0%,rgba(3,7,18,0.88)_40%,rgba(3,7,18,0.22)_100%)]" />
      <div
        className="absolute left-[6%] top-[18%] h-px w-[88%] rotate-[-8deg]"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}88, rgba(255,255,255,0.86), transparent)`,
          boxShadow: `0 0 34px ${accent}44`,
        }}
      />
      <div
        className="absolute bottom-[19%] right-[-8%] h-px w-[70%] rotate-[-8deg]"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}66, transparent)`,
        }}
      />
      <div className="absolute left-5 top-36 hidden -rotate-90 font-mono text-[10px] font-black uppercase tracking-[0.34em] text-slate-400 dark:text-white/30 sm:block">
        {label}
      </div>
      <div className="absolute bottom-8 right-8 hidden grid-cols-3 gap-2 font-mono text-[10px] font-black uppercase tracking-[0.16em] text-slate-400 dark:text-white/30 sm:grid">
        {['SYNC', 'DATA', 'LIVE'].map((item) => (
          <span key={item} className="border-t border-slate-300 pt-2 dark:border-white/15">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
