import { SectionShell } from '@/components/ui/SectionShell';
import type { Dictionary } from '@/lib/i18n';

export default function HowItWorks({ dictionary }: { dictionary: Dictionary }) {
  return (
    <SectionShell className="bg-[#030712] py-16 text-white sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <h2 className="text-3xl font-black leading-tight text-white sm:text-5xl">{dictionary.home.howTitle}</h2>
          <p className="mt-5 text-base leading-8 text-slate-300">{dictionary.home.howDescription}</p>
        </div>
        <div className="grid gap-4">
          {dictionary.home.howSteps.map((step, index) => (
            <article
              key={step.title}
              className="group relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl transition duration-500 hover:border-cyan-300/40 hover:bg-white/[0.075] sm:p-6"
            >
              <div className="absolute inset-y-5 start-5 w-px bg-gradient-to-b from-cyan-300 via-cyan-300/40 to-transparent" />
              <div className="relative ps-8">
                <p className="font-mono text-xs font-black text-cyan-200">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="mt-3 text-xl font-black text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
