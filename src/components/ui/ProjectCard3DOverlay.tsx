import React from 'react';
import type { PortfolioProject } from '@/types/portfolio';

type ProjectCard3DOverlayProps = {
  project: PortfolioProject;
  onSelect: () => void;
};

export default function ProjectCard3DOverlay({ project, onSelect }: ProjectCard3DOverlayProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="pointer-events-auto w-[260px] rounded-2xl border border-white/10 bg-black/70 p-4 text-left shadow-[0_0_40px_rgba(0,194,255,0.16)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200/30 hover:bg-black/80"
    >
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
      <span className="mt-4 inline-flex text-[10px] font-black uppercase tracking-[0.24em] text-cyan-100/70">
        Open system
      </span>
    </button>
  );
}
