import Link from 'next/link';
import { ArrowLeft, SearchX } from 'lucide-react';
import LaunchBackdrop from '@/components/relaunch/LaunchBackdrop';

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-screen items-center overflow-hidden bg-[#f6f8fb] px-5 text-center text-slate-950 dark:bg-[#030712] dark:text-white">
      <LaunchBackdrop label="ROUTE NOT FOUND" />
      <div className="relative z-10 mx-auto max-w-2xl">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-lg border border-slate-200 bg-white/86 shadow-[0_18px_60px_rgba(15,23,42,0.10)] dark:border-white/10 dark:bg-white/[0.055]">
          <SearchX size={24} aria-hidden="true" />
        </div>
        <p className="mb-4 font-mono text-xs font-black uppercase tracking-[0.3em] text-cyan-700 dark:text-cyan-200">
          404 / route missing
        </p>
        <h1 className="text-5xl font-black leading-tight sm:text-7xl">Bu rota yayında değil.</h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">
          Aradığın sayfa taşınmış olabilir. Ürün kartlarına dönüp Traxle ekosistemini yeniden açabilirsin.
        </p>
        <Link
          href="/tr/urunler"
          className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-md border border-cyan-300/40 bg-cyan-400 px-6 text-sm font-black text-slate-950 shadow-[0_0_34px_rgba(0,194,255,0.28)] transition hover:bg-cyan-300"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Ürünlere dön
        </Link>
      </div>
    </main>
  );
}
