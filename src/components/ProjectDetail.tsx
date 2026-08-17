import React, { useState, useEffect } from 'react';
import { Project } from '../data/projects';

interface ProjectDetailProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<"overview" | "components" | "workflow" | "code">("overview");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 modal-backdrop overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-5xl rounded-2xl bg-[#080b12] border border-[#00f0ff]/40 shadow-[0_0_80px_rgba(0,240,255,0.2)] overflow-hidden z-10 my-auto flex flex-col max-h-[90vh]">
        <div className="px-6 sm:px-8 py-5 border-b border-white/10 flex items-center justify-between bg-[#0a0f1a]">
          <div className="flex items-center space-x-4">
            <span className="font-mono font-extrabold text-2xl text-[#00f0ff]">{project.num}</span>
            <span className="h-4 w-[1px] bg-white/20" />
            <div>
              <span className="text-xs font-mono text-[#00f0ff] uppercase block tracking-wider">{project.category}</span>
              <h2 className="font-space font-bold text-lg sm:text-xl text-white">{project.title}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-[#00f0ff] transition-all bg-white/5 font-mono text-xs"
          >
            [ESC] CLOSE ✕
          </button>
        </div>

        <div className="px-6 sm:px-8 py-3 bg-[#0a0f1a]/80 border-b border-white/10 flex items-center space-x-4 sm:space-x-8 overflow-x-auto text-xs font-mono">
          {(["overview", "components", "workflow", "code"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 border-b-2 font-semibold uppercase ${
                activeTab === tab ? "border-[#00f0ff] text-[#00f0ff]" : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
                  <span className="text-xs font-mono text-[#00f0ff] uppercase block">// SYSTEM OVERVIEW</span>
                  <p className="text-sm font-sans text-slate-300 leading-relaxed font-light">{project.overview}</p>
                </div>
                <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
                  <span className="text-xs font-mono text-[#00f0ff] uppercase block">// SHORT ABSTRACT</span>
                  <p className="text-sm font-sans text-slate-300 leading-relaxed font-light italic">{project.abstract}</p>
                </div>
              </div>
              <div className="p-6 rounded-xl bg-[#051118] border border-[#00f0ff]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">PROJECT VERIFICATION STATUS</span>
                  <span className="text-base font-space font-bold text-white flex items-center space-x-2 mt-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff]" />
                    <span>{project.status}</span>
                  </span>
                  <p className="text-xs font-sans text-slate-400 mt-2 font-light">{project.result}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "components" && (
            <div className="space-y-4">
              <span className="text-xs font-mono text-[#00f0ff] uppercase block tracking-wider">// HARDWARE BILL OF MATERIALS</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.components.map((comp, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg bg-white/[0.02] border border-white/10 flex items-center space-x-3 text-xs font-mono text-slate-300">
                    <span className="w-5 h-5 rounded bg-[#00f0ff]/10 text-[#00f0ff] flex items-center justify-center text-[10px] font-bold">0{idx + 1}</span>
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "workflow" && (
            <div className="space-y-3">
              <span className="text-xs font-mono text-[#00f0ff] uppercase block tracking-wider">// EXECUTION WORKFLOW</span>
              {project.workflow.map((step, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-start space-x-4">
                  <span className="w-7 h-7 rounded-lg bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-sm font-sans text-slate-300 leading-relaxed font-light">{step}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "code" && (
            <pre className="p-6 rounded-xl bg-[#03060a] border border-[#00f0ff]/30 text-xs font-mono text-slate-300 overflow-x-auto">
              <code>{project.codeSnippet}</code>
            </pre>
          )}
        </div>

        <div className="px-6 sm:px-8 py-4 bg-[#0a0f1a] border-t border-white/10 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-500">SYSTEM ID: {project.id}</span>
          <button onClick={onClose} className="px-6 py-2.5 rounded-lg btn-cyan text-xs font-space font-bold tracking-wider">
            BACK TO PROJECTS →
          </button>
        </div>
      </div>
    </div>
  );
};
