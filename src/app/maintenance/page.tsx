import { AlertTriangle, Clock } from 'lucide-react';
import LaunchBackdrop from '@/components/relaunch/LaunchBackdrop';

export default function MaintenancePage() {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#030712] p-5 text-white">
      <LaunchBackdrop label="MAINTENANCE MODE" />
      <section className="relative z-10 w-full max-w-lg rounded-lg border border-white/10 bg-white/[0.055] p-8 text-center shadow-[0_28px_100px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-lg border border-amber-300/30 bg-amber-300/10 text-amber-300">
          <AlertTriangle size={26} aria-hidden="true" />
        </div>
        <p className="mb-4 font-mono text-xs font-black uppercase tracking-[0.26em] text-amber-200/80">System upgrade</p>
        <h1 className="text-3xl font-black">Bakım çalışması</h1>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          Sistemlerimizde planlı bir geliştirme yapıyoruz. Daha hızlı ve daha temiz bir Traxle deneyimiyle geri döneceğiz.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3 rounded-md border border-white/10 bg-black/24 p-4">
          <Clock size={18} className="text-cyan-200" aria-hidden="true" />
          <span className="font-mono text-sm font-black text-slate-300">Tahmini dönüş: çok yakında</span>
        </div>
      </section>
    </main>
  );
}
