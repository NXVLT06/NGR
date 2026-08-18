import React, { useState } from 'react';
import { projects, featuredProjects, additionalProjects, Project } from '../data/projects';
import { ProjectCard } from './ProjectCard';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="projects" className="py-28 px-6 md:px-12 relative bg-[#050505] tech-grid-bg">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-3 mb-6">
          <span className="text-xs font-mono text-[#00f0ff] tracking-widest uppercase">02 • SYSTEM ARCHIVE</span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-[#00f0ff]/30 to-transparent" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="font-space font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.05]">
              SELECTED <span className="text-gradient-cyan">PROJECTS</span>
            </h2>
            <p className="text-slate-400 font-sans text-base sm:text-lg mt-3 font-light max-w-xl">
              "Hardware, embedded firmware and IoT systems built through experimentation."
            </p>
          </div>
          <div className="text-xs font-mono text-slate-400 bg-white/5 border border-white/10 px-4 py-2 rounded-lg flex items-center space-x-2 self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
            <span>SHOWING {showAll ? "11 OF 11" : "5 OF 11"} ARCHIVED PROJECTS</span>
          </div>
        </div>

        {/* Initial 5 Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onSelect={onSelectProject}
            />
          ))}
        </div>

        {/* Additional 5 Projects */}
        {showAll && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 transition-all duration-700">
            {additionalProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx + 5}
                onSelect={onSelectProject}
              />
            ))}
          </div>
        )}

        {/* Cinematic View More / Show Less Toggle Button */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="group relative px-10 py-5 rounded-xl bg-[#0a0f1c] border border-[#00f0ff]/40 hover:border-[#00f0ff] transition-all duration-500 shadow-[0_0_30px_rgba(0,240,255,0.15)] hover:shadow-[0_0_50px_rgba(0,240,255,0.35)] flex items-center space-x-4"
            data-cursor="open"
          >
            <div className="flex flex-col text-left">
              <span className="font-space font-extrabold text-sm sm:text-base text-white group-hover:text-[#00f0ff] transition-colors tracking-wider">
                {showAll ? "SHOW LESS" : "VIEW MORE PROJECTS"}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {showAll ? "COLLAPSE ARCHIVE ↑" : "REVEAL PROJECTS 06–10 ↓"}
              </span>
            </div>
            <span className="w-9 h-9 rounded-lg bg-[#00f0ff]/10 text-[#00f0ff] flex items-center justify-center font-mono font-bold text-lg group-hover:scale-110 transition-transform">
              {showAll ? "↑" : "↓"}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
