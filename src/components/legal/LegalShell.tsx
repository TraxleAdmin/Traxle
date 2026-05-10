import type { ReactNode } from 'react';
import { ShieldCheck } from 'lucide-react';
import NeednapObjects from '@/components/relaunch/NeednapObjects';

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
    <main className="relative min-h-screen overflow-hidden bg-black px-5 pb-20 pt-32 text-white sm:px-8">
      <NeednapObjects className="h-[36rem] opacity-25" />
      <div className="relative z-10 mx-auto max-w-4xl">
        <header className="mb-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white bg-transparent px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white">
            <ShieldCheck size={15} aria-hidden="true" />
            {eyebrow}
          </div>
          <h1 className="text-[clamp(4rem,8vw,7rem)] font-black uppercase leading-[0.8] text-white">{title}</h1>
          <p className="mt-5 text-sm font-black text-[#ec008c]">{updated}</p>
        </header>
        <article className="rounded-[1.35rem] border-[6px] border-[#ec008c] bg-[#e8e8e8] p-6 text-black shadow-[0_24px_80px_rgba(0,0,0,0.42)] sm:p-10">
          <div className="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-950 prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-slate-950 prose-a:text-[#ec008c]">
            {children}
          </div>
        </article>
      </div>
    </main>
  );
}
