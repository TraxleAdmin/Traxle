'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import LaunchBackdrop from '@/components/relaunch/LaunchBackdrop';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('siparisNo') || '#TRX-2026-8842';

  return (
    <section className="relative z-10 w-full max-w-lg rounded-lg border border-slate-200 bg-white/90 p-8 text-center shadow-[0_24px_90px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-white/[0.055]">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-lg border border-emerald-300/30 bg-emerald-500/10 text-emerald-500">
        <CheckCircle2 size={34} aria-hidden="true" />
      </div>
      <h1 className="text-3xl font-black text-slate-950 dark:text-white">Ödeme başarılı</h1>
      <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
        Aboneliğin başlatıldı. Sipariş kaydı oluşturuldu ve panel akışın hazırlandı.
      </p>
      <div className="mt-8 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-white/10 dark:bg-black/22 dark:text-slate-300">
        <p>
          Sipariş numarası: <span className="font-mono font-black text-slate-950 dark:text-white">{orderId}</span>
        </p>
      </div>
      <div className="mt-8 grid gap-3">
        <Link href="/panel" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-cyan-400 px-6 text-sm font-black text-slate-950">
          Yönetim paneline git
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <Link href="/tr" className="inline-flex min-h-12 items-center justify-center rounded-md border border-slate-200 px-6 text-sm font-black text-slate-700 dark:border-white/10 dark:text-slate-200">
          Ana sayfaya dön
        </Link>
      </div>
    </section>
  );
}

export default function PaymentSuccess() {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#f6f8fb] p-6 text-slate-950 dark:bg-[#030712] dark:text-white">
      <LaunchBackdrop label="PAYMENT STATUS" />
      <Suspense fallback={<div className="relative z-10 font-black">Yükleniyor...</div>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
