import { SectionShell } from '@/components/ui/SectionShell';
import type { Dictionary } from '@/lib/i18n';

export default function HowItWorks({ dictionary }: { dictionary: Dictionary }) {
  return (
    <SectionShell className="bg-slate-50 py-16 text-slate-950 transition-colors duration-500 dark:bg-[#030712] dark:text-white sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <h2 className="text-3xl font-black leading-tight text-slate-950 dark:text-white sm:text-5xl">{dictionary.home.howTitle}</h2>
          <p className="mt-5 text-base leading-8 text-slate-700 dark:text-slate-300">{dictionary.home.howDescription}</p>
        </div>
        <div className="grid gap-4">
          {dictionary.home.howSteps.map((step, index) => (
            <article
              key={step.title}
              className="premium-motion-card group relative overflow-hidden rounded-[1.25rem] border border-slate-200/80 bg-white/[0.84] p-5 shadow-[0_18px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl transition duration-500 hover:border-cyan-300/50 hover:bg-white sm:p-6 dark:border-white/10 dark:bg-white/[0.055] dark:hover:border-cyan-300/40 dark:hover:bg-white/[0.075]"
            >
              <div className="absolute inset-y-5 start-5 w-px bg-gradient-to-b from-cyan-300 via-cyan-300/40 to-transparent" />
              <div className="relative ps-8">
                <p className="font-mono text-xs font-black text-cyan-200">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="mt-3 text-xl font-black text-slate-950 dark:text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
