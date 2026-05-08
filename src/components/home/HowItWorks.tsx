import { ChartNoAxesCombined, MousePointerClick, Workflow } from 'lucide-react';
import MotionReveal from '@/components/motion/MotionReveal';
import { SectionShell } from '@/components/ui/SectionShell';
import type { Dictionary } from '@/lib/i18n';

export default function HowItWorks({ dictionary }: { dictionary: Dictionary }) {
  const icons = [MousePointerClick, Workflow, ChartNoAxesCombined];
  const accents = ['#22d3ee', '#34d399', '#f59e0b'];

  return (
    <SectionShell className="bg-[#eef3f8] py-16 text-slate-950 dark:bg-[#050a13] dark:text-white sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <MotionReveal>
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.28em] text-cyan-700 dark:text-cyan-200">
            Traxle flow
          </p>
          <h2 className="text-3xl font-black leading-tight text-slate-950 dark:text-white sm:text-5xl">{dictionary.home.howTitle}</h2>
          <p className="mt-5 text-base leading-8 text-slate-700 dark:text-slate-300">{dictionary.home.howDescription}</p>
        </MotionReveal>

        <div className="grid gap-3">
          {dictionary.home.howSteps.map((step, index) => {
            const Icon = icons[index] ?? Workflow;
            const accent = accents[index % accents.length];

            return (
              <MotionReveal key={step.title} delay={index * 0.08} y={22}>
                <article className="grid gap-5 rounded-lg border border-slate-200 bg-white/82 p-5 shadow-[0_16px_70px_rgba(15,23,42,0.07)] dark:border-white/10 dark:bg-white/[0.05] sm:grid-cols-[auto_1fr_auto] sm:items-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-md border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.06]" style={{ color: accent }}>
                    <Icon size={19} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-mono text-xs font-black text-slate-400">{String(index + 1).padStart(2, '0')}</p>
                    <h3 className="mt-2 text-xl font-black text-slate-950 dark:text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{step.description}</p>
                  </div>
                  <span className="h-1.5 rounded-full sm:w-20" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
                </article>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
