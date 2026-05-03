import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { StatusBadge } from '@/components/ui/StatusBadge';
import type { Project } from '@/lib/projects';

export function ProjectCard({
  project,
  statusLabel,
  openLabel,
  href,
}: {
  project: Project;
  statusLabel: string;
  openLabel: string;
  href: string;
}) {
  return (
    <Link href={href} className="group block focus-visible:outline-none">
      <GlassPanel className="h-full overflow-hidden p-5 transition duration-300 group-hover:-translate-y-1 group-hover:border-cyan-300/40 group-hover:shadow-[0_24px_80px_rgba(0,194,255,0.16)] group-focus-visible:ring-2 group-focus-visible:ring-cyan-300">
        <div className="mb-6 flex items-start justify-between gap-4">
          <StatusBadge status={project.status} label={statusLabel} />
          <span
            className="h-10 w-10 rounded-full border border-slate-200 bg-white shadow-inner dark:border-white/10 dark:bg-white/10"
            style={{ boxShadow: `inset 0 0 24px ${project.accent}55` }}
            aria-hidden="true"
          />
        </div>
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-700 dark:text-cyan-200">
          {project.category}
        </p>
        <h3 className="mt-3 text-2xl font-black text-slate-950 dark:text-white">{project.title}</h3>
        <p className="mt-4 min-h-20 text-sm leading-7 text-slate-600 dark:text-slate-300">
          {project.shortDescription}
        </p>
        <div className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-slate-950 dark:text-white">
          {openLabel}
          <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </GlassPanel>
    </Link>
  );
}
