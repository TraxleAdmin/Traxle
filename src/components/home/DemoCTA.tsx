import { ArrowUpRight, MessageSquareText } from 'lucide-react';
import MotionReveal from '@/components/motion/MotionReveal';
import { Button } from '@/components/ui/Button';
import { SectionShell } from '@/components/ui/SectionShell';
import type { Dictionary, Locale } from '@/lib/i18n';
import { withLocale } from '@/lib/i18n';

export default function DemoCTA({ dictionary, locale }: { dictionary: Dictionary; locale: Locale }) {
  return (
    <SectionShell className="bg-[#f6f8fb] pb-24 pt-10 text-slate-950 dark:bg-[#030712] dark:text-white">
      <MotionReveal>
        <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_28px_100px_rgba(15,23,42,0.18)] dark:border-white/10 sm:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.075)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.075)_1px,transparent_1px)] bg-[size:36px_36px] opacity-50" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-300 via-emerald-300 to-amber-300" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.08] px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-100/70">
                <MessageSquareText size={14} aria-hidden="true" />
                Demo channel
              </div>
              <h2 className="text-3xl font-black leading-tight sm:text-5xl">{dictionary.home.demoTitle}</h2>
              <p className="mt-5 text-base leading-8 text-slate-300">{dictionary.home.demoDescription}</p>
            </div>
            <Button href={withLocale(locale, '/contact')} className="min-h-12 gap-2 rounded-md px-6">
              {dictionary.home.demoLabel}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </MotionReveal>
    </SectionShell>
  );
}
