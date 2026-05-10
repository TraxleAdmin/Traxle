import { ChartNoAxesCombined, MousePointerClick, Workflow } from 'lucide-react';
import MotionReveal from '@/components/motion/MotionReveal';
import type { Dictionary } from '@/lib/i18n';

export default function HowItWorks({ dictionary }: { dictionary: Dictionary }) {
  const icons = [MousePointerClick, Workflow, ChartNoAxesCombined];
  const accents = ['#ec008c', '#ff5a24', '#00d6c8'];

  return (
    <section className="overflow-hidden bg-black px-5 py-24 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <MotionReveal className="mx-auto max-w-6xl text-center">
          <h2 className="text-[clamp(4rem,8.5vw,9rem)] font-light leading-[0.86] text-white">
            We bridge data,
            <span className="block">we expand</span>
            <span className="block font-black uppercase">HOORIZONS</span>
          </h2>
          <p className="mx-auto mt-8 max-w-4xl text-2xl leading-snug text-white/75">{dictionary.home.howDescription}</p>
        </MotionReveal>

        <div className="mt-20 grid gap-4 md:grid-cols-3">
          {dictionary.home.howSteps.map((step, index) => {
            const Icon = icons[index] ?? Workflow;
            const accent = accents[index % accents.length];

            return (
              <MotionReveal key={step.title} delay={index * 0.08} y={22}>
                <article className="min-h-80 rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-7 transition duration-300 hover:-translate-y-2 hover:bg-white/[0.075]">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-sm font-black text-white/40">0{index + 1}</p>
                    <Icon size={28} style={{ color: accent }} aria-hidden="true" />
                  </div>
                  <h3 className="mt-24 text-3xl font-black leading-tight text-white">{step.title}</h3>
                  <p className="mt-5 text-base leading-7 text-white/60">{step.description}</p>
                </article>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
