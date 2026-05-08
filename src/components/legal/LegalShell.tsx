import type { ReactNode } from 'react';
import { ShieldCheck } from 'lucide-react';
import LaunchBackdrop from '@/components/relaunch/LaunchBackdrop';

export default function LegalShell({
  eyebrow,
  title,
  updated = 'Son güncelleme: 10 Şubat 2026',
  children,
}: {
  eyebrow: string;
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6f8fb] px-5 pb-20 pt-32 text-slate-950 dark:bg-[#030712] dark:text-white sm:px-8">
      <LaunchBackdrop label="LEGAL RECORD" />
      <div className="relative z-10 mx-auto max-w-4xl">
        <header className="mb-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white/86 px-3 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-slate-600 dark:border-white/10 dark:bg-white/[0.055] dark:text-cyan-100/70">
            <ShieldCheck size={15} aria-hidden="true" />
            {eyebrow}
          </div>
          <h1 className="text-4xl font-black leading-tight text-slate-950 dark:text-white sm:text-6xl">{title}</h1>
          <p className="mt-5 text-sm font-black text-slate-500 dark:text-slate-400">{updated}</p>
        </header>
        <article className="rounded-lg border border-slate-200 bg-white/90 p-6 shadow-[0_22px_90px_rgba(15,23,42,0.10)] dark:border-white/10 dark:bg-white/[0.055] sm:p-10">
          <div className="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-950 prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-slate-950 prose-a:text-cyan-700 dark:prose-invert dark:prose-p:text-slate-300 dark:prose-li:text-slate-300 dark:prose-a:text-cyan-200">
            {children}
          </div>
        </article>
      </div>
    </main>
  );
}
