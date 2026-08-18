import React from 'react';
import { journeyMilestones } from '../data/journey';

export const Journey: React.FC = () => {
  return (
    <section id="journey" className="py-28 px-6 md:px-12 relative bg-[#080808] border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 mb-6">
          <span className="text-xs font-mono text-[#00f0ff] tracking-widest uppercase">04 • EVOLUTION TIMELINE</span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-[#00f0ff]/30 to-transparent" />
        </div>

        <div className="mb-16">
          <h2 className="font-space font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.05]">
            MY <span className="text-gradient-cyan">JOURNEY</span>
          </h2>
          <p className="text-slate-400 font-sans text-base sm:text-lg mt-3 font-light">
            Progression across electronics, embedded systems, IoT telemetry, artificial intelligence, and autonomous prototyping.
          </p>
        </div>

        <div className="relative border-l-2 border-[#00f0ff]/20 ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10">
          {journeyMilestones.map((m, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#050505] border-2 border-[#00f0ff] group-hover:bg-[#00f0ff] transition-colors shadow-[0_0_12px_#00f0ff]" />

              <div className="p-6 sm:p-8 rounded-2xl bg-[#0a0d14] border border-white/10 group-hover:border-[#00f0ff]/40 transition-all duration-300 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 rounded bg-[#00f0ff]/10 border border-[#00f0ff]/30 font-mono text-xs text-[#00f0ff] font-bold">
                      {m.year}
                    </span>
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                      {m.stage}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-cyan-300/80 px-2 py-0.5 rounded bg-white/5 border border-white/10">{m.badge}</span>
                </div>

                <h3 className="font-space font-bold text-xl sm:text-2xl text-white">{m.title}</h3>
                <span className="text-xs font-mono text-slate-400 block font-semibold">FOCUS: {m.focus}</span>
                <p className="text-sm font-sans text-slate-300 font-light leading-relaxed">{m.description}</p>

                <div className="pt-3 border-t border-white/10 flex flex-wrap gap-2">
                  {m.deliverables.map((item, i) => (
                    <span key={i} className="px-2.5 py-1 text-[11px] font-mono bg-white/[0.03] text-slate-300 border border-white/10 rounded">
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
