'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown, FiCpu, FiDatabase, FiLayers, FiRadio } from 'react-icons/fi';
import { useProjectData } from '@/hooks/useProjectData';
import { useTransitionManager } from '@/components/animations/TransitionManager';

export default function TraxleLandingPage() {
  const { projects, loading, error } = useProjectData();
  const { startProjectTransition } = useTransitionManager();

  const metrics = useMemo(() => {
    const techCount = new Set(projects.flatMap((project) => project.techStack)).size;
    const productionCount = projects.filter((project) => project.status === 'production').length;
    const developmentCount = projects.filter((project) => project.status === 'development').length;

    return [
      { label: 'Live Firestore nodes', value: projects.length.toString() },
      { label: 'Production systems', value: productionCount.toString() },
      { label: 'Development systems', value: developmentCount.toString() },
      { label: 'Connected stack items', value: techCount.toString() },
    ];
  }, [projects]);

  return (
    <div id="ecosystem-scroll" className="relative min-h-[440vh] overflow-hidden bg-transparent text-white selection:bg-cyan-400/30">
      <section className="relative z-10 flex min-h-screen items-center px-5 pt-28">
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 28, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl"
          >
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-white/[0.04] px-5 py-2 text-xs font-black uppercase tracking-[0.28em] text-cyan-100 shadow-[0_0_40px_rgba(0,194,255,0.14)] backdrop-blur-xl">
              <FiRadio className="text-cyan-300" /> Firebase connected engineering ecosystem
            </div>

            <h1 className="max-w-5xl text-6xl font-black leading-[0.94] tracking-tight text-white md:text-8xl lg:text-9xl">
              Software systems shaped around a digital core.
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/62 md:text-2xl">
              Traxle builds mobile and desktop-grade engineering products. This landing surface renders the portfolio directly from Firestore and turns each live project record into a spatial device inside the ecosystem.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-12 grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4"
          >
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl">
                <p className="text-3xl font-black text-white">{metric.value}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-widest text-white/42">{metric.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="mt-16 inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.26em] text-white/42"
          >
            Scroll to split the core <FiArrowDown className="animate-bounce text-cyan-300" />
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 min-h-[150vh] px-5 py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="sticky top-32 rounded-[2rem] border border-white/10 bg-black/55 p-8 shadow-[0_0_70px_rgba(0,194,255,0.08)] backdrop-blur-2xl">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-2xl text-cyan-200">
                <FiCpu />
              </div>
              <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">Live portfolio stream</h2>
              <p className="mt-5 leading-relaxed text-white/58">
                Every visible device is generated from `portfolio_projects`. Add or update a document in Firestore and the 3D ecosystem receives it through `onSnapshot` without redeploying the interface.
              </p>
              {error && (
                <p className="mt-5 rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm font-bold text-red-100">
                  {error}
                </p>
              )}
            </div>
          </motion.div>

          <div className="space-y-4 lg:col-span-7">
            {loading && (
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 backdrop-blur-xl">
                <div className="mb-5 h-3 w-40 rounded-full bg-cyan-200/15" />
                <div className="h-8 w-3/4 rounded-full bg-white/10" />
                <div className="mt-4 h-4 w-full rounded-full bg-white/5" />
                <div className="mt-3 h-4 w-2/3 rounded-full bg-white/5" />
              </div>
            )}

            {!loading && projects.length === 0 && !error && (
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 backdrop-blur-xl">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-2xl text-cyan-200">
                  <FiDatabase />
                </div>
                <h3 className="text-2xl font-black text-white">Firestore collection waiting</h3>
                <p className="mt-3 leading-relaxed text-white/56">
                  No valid `portfolio_projects` documents were received. The interface is intentionally empty until production data arrives.
                </p>
              </div>
            )}

            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                role="button"
                tabIndex={0}
                onClick={() => startProjectTransition(project.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    startProjectTransition(project.id);
                  }
                }}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.55, delay: index * 0.04 }}
                className="cursor-pointer rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 text-left backdrop-blur-xl transition-colors hover:border-cyan-300/25 focus:outline-none focus:ring-2 focus:ring-cyan-300/40"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-cyan-200/70">{project.platform}</p>
                    <h3 className="text-3xl font-black tracking-tight text-white">{project.title}</h3>
                    <p className="mt-3 max-w-2xl leading-relaxed text-white/58">{project.description}</p>
                  </div>
                  <span className="w-fit rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-black uppercase tracking-widest text-white/70">
                    {project.status}
                  </span>
                </div>
                {project.techStack.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="rounded-full border border-cyan-300/10 bg-cyan-300/10 px-3 py-1.5 text-xs font-bold text-cyan-50/70">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 flex min-h-screen items-end px-5 pb-24">
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl rounded-[2rem] border border-white/10 bg-black/55 p-8 backdrop-blur-2xl"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-2xl text-cyan-200">
              <FiLayers />
            </div>
            <h2 className="text-4xl font-black text-white md:text-5xl">Production-ready by data contract.</h2>
            <p className="mt-5 leading-relaxed text-white/58">
              The landing page has no local project inventory. Firestore is the source of truth, `onSnapshot` powers updates, and 3D placement is calculated mathematically so the ecosystem expands as new projects are added.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
