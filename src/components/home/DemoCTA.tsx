import { ArrowUpRight, MessageSquareText, RadioTower } from 'lucide-react';
import MotionReveal from '@/components/motion/MotionReveal';
import { Button } from '@/components/ui/Button';
import { SectionShell } from '@/components/ui/SectionShell';
import type { Dictionary, Locale } from '@/lib/i18n';
import { withLocale } from '@/lib/i18n';

export default function DemoCTA({ dictionary, locale }: { dictionary: Dictionary; locale: Locale }) {
  return (
    <SectionShell className="bg-slate-50 pb-24 pt-10 text-slate-950 transition-colors duration-500 dark:bg-[#030712] dark:text-white">
      <MotionReveal>
        <div className="premium-cta-panel relative overflow-hidden rounded-[1.6rem] border border-cyan-300/30 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.20),transparent_36%),rgba(255,255,255,0.84)] p-6 shadow-[0_28px_100px_rgba(15,23,42,0.14)] backdrop-blur-2xl dark:border-cyan-300/20 dark:bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.22),transparent_36%),rgba(255,255,255,0.06)] dark:shadow-[0_28px_100px_rgba(0,0,0,0.32)] sm:p-10">
          <div className="pointer-events-none absolute inset-0 premium-data-grid opacity-25" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/80 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-600 shadow-[0_12px_40px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/[0.08] dark:text-cyan-100/70">
                <RadioTower size={14} aria-hidden="true" />
                Demo channel
              </div>
              <h2 className="text-3xl font-black leading-tight text-slate-950 dark:text-white sm:text-5xl">{dictionary.home.demoTitle}</h2>
              <p className="mt-5 text-base leading-8 text-slate-700 dark:text-slate-300">{dictionary.home.demoDescription}</p>
            </div>
            <div className="grid gap-3 sm:min-w-64">
              <div className="premium-motion-card rounded-2xl border border-slate-200/80 bg-white/[0.86] p-4 shadow-[0_20px_70px_rgba(15,23,42,0.1)] dark:border-white/10 dark:bg-white/[0.065]">
                <MessageSquareText size={18} className="text-cyan-500" aria-hidden="true" />
                <p className="mt-3 text-sm font-black text-slate-950 dark:text-white">Traxle demo</p>
                <p className="mt-1 text-xs font-bold leading-5 text-slate-500 dark:text-slate-300">BarkodX / Molatik / KünyeX / Lojistik</p>
              </div>
              <Button href={withLocale(locale, '/contact')} className="min-h-12 gap-2 px-6">
                {dictionary.home.demoLabel}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </MotionReveal>
    </SectionShell>
  );
}
