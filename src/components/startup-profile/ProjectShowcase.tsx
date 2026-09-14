import React, { useState } from 'react';
import { ExternalLink, Github, Pin, Rocket } from 'lucide-react';
import { StartupProject } from '../../types';

interface ProjectShowcaseProps {
  projects?: StartupProject[];
}

const statusStyles: Record<StartupProject['status'], string> = {
  LIVE: 'bg-emerald-100 text-emerald-700',
  'IN PILOT': 'bg-amber-100 text-amber-700',
  COMPLETED: 'bg-sky-100 text-sky-700',
  'IN DEVELOPMENT': 'bg-violet-100 text-violet-700'
};

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects = [] }) => {
  const [projectFilter, setProjectFilter] = useState<'all' | 'pinned'>('all');
  const visibleProjects = projectFilter === 'pinned' ? projects.filter((project) => project.isPinned) : projects;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Build log</p>
          <h3 className="mt-1 text-xl font-black text-slate-900">Projects</h3>
        </div>
        {projects.length > 0 && (
          <div className="flex gap-2 rounded-xl bg-slate-100 p-1">
            {(['all', 'pinned'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setProjectFilter(filter)}
                aria-pressed={projectFilter === filter}
                className={`rounded-lg px-3 py-2 text-xs font-bold capitalize transition ${projectFilter === filter ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                {filter === 'all' ? 'All projects' : 'Pinned'}
              </button>
            ))}
          </div>
        )}
      </div>

      {projects.length === 0 || visibleProjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center">
          <Rocket className="mx-auto h-8 w-8 text-slate-400" />
          <h4 className="mt-3 text-sm font-black text-slate-800">No projects to show yet</h4>
          <p className="mt-1 text-xs text-slate-500">This startup has not published any projects in its showcase.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {visibleProjects.map((project) => (
            <article key={project.id} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-emerald-300">
                    <Rocket className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-black text-slate-900">{project.title}</h4>
                    {project.isPinned && <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold text-amber-700"><Pin className="h-3 w-3" /> Pinned project</span>}
                  </div>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-black uppercase ${statusStyles[project.status]}`}>{project.status}</span>
              </div>
              <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.technologies.map((technology) => <span key={technology} className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-700">{technology}</span>)}
              </div>
              {(project.demoUrl || project.githubUrl) && (
                <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                  {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-[11px] font-bold text-white hover:bg-slate-800"><ExternalLink className="h-3.5 w-3.5" /> Demo</a>}
                  {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-bold text-slate-700 hover:border-slate-400"><Github className="h-3.5 w-3.5" /> GitHub</a>}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
};