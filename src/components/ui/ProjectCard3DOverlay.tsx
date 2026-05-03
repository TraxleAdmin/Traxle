import React from 'react';
import type { PortfolioProject } from '@/types/portfolio';

type ProjectCard3DOverlayProps = {
  project: PortfolioProject;
};

export default function ProjectCard3DOverlay({ project }: ProjectCard3DOverlayProps) {
  return (
    <div className="w-[260px] rounded-2xl border border-white/10 bg-black/70 p-4 text-left shadow-[0_0_40px_rgba(0,194,255,0.16)] backdrop-blur-2xl">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="truncate text-xs font-bold uppercase tracking-[0.24em] text-cyan-200/80">{project.platform}</p>
        <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-cyan-100">
          {project.status}
        </span>
      </div>
      <h3 className="mb-2 text-xl font-black tracking-tight text-white">{project.title}</h3>
      <p className="line-clamp-3 text-xs leading-relaxed text-white/62">{project.description}</p>
      {project.techStack.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span key={tech} className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold text-white/70">
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
