import React from 'react';
import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(project)}
      className="group relative rounded-2xl bg-[#0a0d14] border border-white/10 hover:border-[#00f0ff]/50 transition-all duration-500 overflow-hidden flex flex-col justify-between p-6 sm:p-8 hover:shadow-[0_10px_40px_rgba(0,240,255,0.12)] cursor-pointer"
      data-cursor="view"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#00f0ff]/5 group-hover:bg-[#00f0ff]/10 blur-3xl rounded-full transition-all duration-500 pointer-events-none" />

      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <span className="font-mono font-extrabold text-2xl text-[#00f0ff] tracking-wider">
              {project.num}
            </span>
            <span className="h-4 w-[1px] bg-white/20" />
            <span className="text-[11px] font-mono tracking-wider text-slate-400 uppercase">
              {project.category}
            </span>
          </div>
          <span className="text-xs font-mono text-slate-500 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
            {project.year}
          </span>
        </div>

        <h3 className="font-space font-bold text-xl sm:text-2xl text-white group-hover:text-[#00f0ff] transition-colors duration-300 leading-snug mb-2">
          {project.title}
        </h3>
        {project.subtitle && (
          <p className="text-xs font-mono text-cyan-300/80 mb-4 tracking-wide">
            // {project.subtitle}
          </p>
        )}

        <p className="text-sm font-sans text-slate-300 line-clamp-3 leading-relaxed mb-6 font-light">
          {project.abstract}
        </p>

        <div className="space-y-2 mb-6">
          <span className="text-[10px] font-mono text-slate-500 uppercase block tracking-wider">
            KEY COMPONENTS
          </span>
          <div className="flex flex-wrap gap-1.5">
            {project.components.slice(0, 4).map((comp, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-[11px] font-mono bg-white/[0.03] text-slate-300 border border-white/10 rounded group-hover:border-[#00f0ff]/20 transition-colors"
              >
                {comp.split('(')[0].trim()}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-space font-semibold text-slate-300 group-hover:text-[#00f0ff] transition-colors">
        <span className="tracking-wider">VIEW PROJECT</span>
        <span className="font-mono text-base transform group-hover:translate-x-2 transition-transform duration-300">
          →
        </span>
      </div>
    </div>
  );
};
