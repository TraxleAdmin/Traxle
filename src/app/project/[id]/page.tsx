'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiDatabase, FiShield, FiTerminal } from 'react-icons/fi';
import { useProjectData } from '@/hooks/useProjectData';

function getParamId(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0];
  return value;
}

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const projectId = getParamId(params.id);
  const { project, loading, error } = useProjectData(projectId);

  if (loading) {
    return (
      <main className="relative flex min-h-screen items-center justify-center px-5 text-white">
        <div className="rounded-full border border-cyan-300/15 bg-black/60 px-6 py-3 text-xs font-black uppercase tracking-[0.28em] text-cyan-100/80 shadow-[0_0_28px_rgba(0,194,255,0.18)] backdrop-blur-xl">
          Decrypting Data...
        </div>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="relative flex min-h-screen items-center justify-center px-5 text-white">
        <div className="max-w-lg rounded-[2rem] border border-red-400/20 bg-red-500/10 p-8 text-center backdrop-blur-2xl">
          <FiDatabase className="mx-auto mb-4 text-3xl text-red-100" />
          <h1 className="text-2xl font-black">Project stream unavailable</h1>
          <p className="mt-3 text-sm leading-relaxed text-red-100/70">
            {error || 'No valid Firestore document was received for this route.'}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen px-5 pt-32 pb-24 text-white">
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:min-h-screen lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-white/[0.04] px-5 py-2 text-xs font-black uppercase tracking-[0.25em] text-cyan-100 shadow-[0_0_40px_rgba(0,194,255,0.14)] backdrop-blur-xl">
            <FiShield /> {project.status}
          </div>

          <h1 className="text-6xl font-black leading-[0.96] tracking-tight md:text-8xl">{project.title}</h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/62 md:text-2xl">{project.description}</p>

          {project.techStack.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="rounded-full border border-cyan-300/10 bg-cyan-300/10 px-3 py-1.5 text-xs font-bold text-cyan-50/70">
                  {tech}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <div className="rounded-[2rem] border border-white/10 bg-black/55 p-6 shadow-[0_0_70px_rgba(0,194,255,0.08)] backdrop-blur-2xl">
            <div className="mb-5 flex items-center gap-3">
              <FiTerminal className="text-2xl text-cyan-200" />
              <h2 className="text-2xl font-black">Live document</h2>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between gap-4 rounded-2xl bg-white/[0.04] p-4">
                <span className="font-bold text-white/45">Document ID</span>
                <span className="font-black text-white">{project.id}</span>
              </div>
              <div className="flex justify-between gap-4 rounded-2xl bg-white/[0.04] p-4">
                <span className="font-bold text-white/45">Platform</span>
                <span className="font-black text-white">{project.platform}</span>
              </div>
              <div className="flex justify-between gap-4 rounded-2xl bg-white/[0.04] p-4">
                <span className="font-bold text-white/45">Scene</span>
                <span className="font-black text-white">{project.sceneType}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 pb-20 md:grid-cols-2">
        <div className="rounded-[2rem] border border-white/10 bg-black/55 p-8 backdrop-blur-2xl">
          <h2 className="text-3xl font-black">Feature records</h2>
          {project.features.length > 0 ? (
            <div className="mt-6 space-y-3">
              {project.features.map((feature) => (
                <div key={feature} className="rounded-2xl bg-white/[0.04] p-4 text-sm font-bold leading-relaxed text-white/70">
                  {feature}
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-5 text-sm leading-relaxed text-white/45">No feature records were received from Firestore.</p>
          )}
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-black/55 p-8 backdrop-blur-2xl">
          <h2 className="text-3xl font-black">System metrics</h2>
          {project.metrics.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {project.metrics.map((metric) => (
                <div key={`${metric.label}-${metric.value}`} className="rounded-2xl bg-white/[0.04] p-4">
                  <p className="text-3xl font-black">{metric.value}</p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-widest text-white/42">{metric.label}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-5 text-sm leading-relaxed text-white/45">No metric records were received from Firestore.</p>
          )}
        </div>
      </section>
    </main>
  );
}
