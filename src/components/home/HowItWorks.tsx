import type { CSSProperties } from 'react';
import { ChartNoAxesCombined, MousePointerClick, Workflow } from 'lucide-react';
import MotionReveal from '@/components/motion/MotionReveal';
import { SectionShell } from '@/components/ui/SectionShell';
import type { Dictionary } from '@/lib/i18n';

export default function HowItWorks({ dictionary }: { dictionary: Dictionary }) {
  const accents = ['#22d3ee', '#34d399', '#f59e0b'];
  const icons = [MousePointerClick, Workflow, ChartNoAxesCombined];

  return (
    <SectionShell className="bg-slate-50 py-16 text-slate-950 transition-colors duration-500 dark:bg-[#030712] dark:text-white sm:py-24">
      <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-white/[0.12] sm:inset-x-8 lg:inset-x-10" />
      <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <MotionReveal>
          <p className="premium-eyebrow mb-4 text-[11px] font-black uppercase tracking-[0.28em] text-cyan-700 dark:text-cyan-200">
            Traxle flow
          </p>
          <h2 className="text-3xl font-black leading-tight text-slate-950 dark:text-white sm:text-5xl">{dictionary.home.howTitle}</h2>
          <p className="mt-5 text-base leading-8 text-slate-700 dark:text-slate-300">{dictionary.home.howDescription}</p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {accents.map((accent, index) => (
              <span key={accent} className="premium-orbit-dot h-16 rounded-2xl border border-slate-200/80 bg-white/80 shadow-[0_16px_50px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/[0.055]" style={{ '--card-accent': accent, animationDelay: `${index * 0.28}s` } as CSSProperties} />
            ))}
          </div>
        </MotionReveal>
        <div className="grid gap-4">
          {dictionary.home.howSteps.map((step, index) => {
            const Icon = icons[index] ?? Workflow;

            return (
              <MotionReveal key={step.title} delay={index * 0.08} y={22}>
                <article
                  className="premium-motion-card premium-process-card group relative overflow-hidden rounded-[1.25rem] border border-slate-200/80 bg-white/[0.84] p-5 shadow-[0_18px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl transition duration-500 hover:border-cyan-300/50 hover:bg-white sm:p-6 dark:border-white/10 dark:bg-white/[0.055] dark:hover:border-cyan-300/40 dark:hover:bg-white/[0.075]"
                  style={{ '--card-accent': accents[index % accents.length] } as CSSProperties}
                >
                  <div className="absolute inset-y-5 start-5 w-px bg-gradient-to-b from-cyan-300 via-emerald-300/60 to-transparent" />
                  <div className="relative grid gap-5 ps-8 sm:grid-cols-[auto_1fr] sm:items-start">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-900/10 bg-slate-950 text-white shadow-[0_18px_50px_rgba(15,23,42,0.14)] dark:border-white/10 dark:bg-white/[0.08]">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-mono text-xs font-black text-cyan-700 dark:text-cyan-200">{String(index + 1).padStart(2, '0')}</p>
                      <h3 className="mt-3 text-xl font-black text-slate-950 dark:text-white">{step.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{step.description}</p>
                    </div>
                  </div>
                </article>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
