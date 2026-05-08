import Link from 'next/link';
import { AlertCircle, Headphones, RefreshCw } from 'lucide-react';
import LaunchBackdrop from '@/components/relaunch/LaunchBackdrop';

export default function PaymentError() {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#f6f8fb] p-6 text-slate-950 dark:bg-[#030712] dark:text-white">
      <LaunchBackdrop label="PAYMENT STATUS" />
      <section className="relative z-10 w-full max-w-lg rounded-lg border border-slate-200 bg-white/90 p-8 text-center shadow-[0_24px_90px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-white/[0.055]">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-lg border border-red-300/30 bg-red-500/10 text-red-500">
          <AlertCircle size={34} aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-black">Ödeme alınamadı</h1>
        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
          İşlem tamamlanamadı. Kart bilgilerini kontrol edip tekrar deneyebilir veya destek ekibine ulaşabilirsin.
        </p>
        <div className="mt-8 grid gap-3">
          <Link href="/odeme?plan=starter" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-slate-950 px-6 text-sm font-black text-white dark:bg-white dark:text-slate-950">
            <RefreshCw size={16} aria-hidden="true" />
            Tekrar dene
          </Link>
          <Link href="/tr/iletisim" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-slate-200 px-6 text-sm font-black text-slate-700 dark:border-white/10 dark:text-slate-200">
            <Headphones size={16} aria-hidden="true" />
            Destekle iletişime geç
          </Link>
        </div>
      </section>
    </main>
  );
}
