import React, { useState } from 'react';
import { researchTopics, ResearchTopic } from '../data/research';

export const Research: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<ResearchTopic>(researchTopics[0]);

  return (
    <section id="research" className="py-28 px-6 md:px-12 relative bg-[#080808] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-3 mb-6">
          <span className="text-xs font-mono text-[#00f0ff] tracking-widest uppercase">// 03 • COMPUTATIONAL RESEARCH</span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-[#00f0ff]/30 to-transparent" />
        </div>

        <div className="mb-16">
          <h2 className="font-space font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.05]">
            RESEARCH <span className="text-gradient-cyan">LAB</span>
          </h2>
          <p className="text-slate-400 font-sans text-base sm:text-lg mt-3 font-light max-w-2xl">
            Mathematical modeling, bio-signal decoding, derivative gradient DSP, and machine learning models for real-time edge hardware.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-3">
            {researchTopics.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTopic(t)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                  selectedTopic?.id === t.id
                    ? "bg-[#0f172a] border-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                    : "bg-[#0a0d14] border-white/10 hover:border-white/20"
                }`}
                data-cursor="open"
              >
                <div>
                  <span className="text-[10px] font-mono text-[#00f0ff] uppercase block">
                    {t.num} // {t.focus}
                  </span>
                  <h4 className="font-space font-bold text-sm sm:text-base text-white mt-0.5">{t.title}</h4>
                </div>
                <span className="font-mono text-slate-400">→</span>
              </button>
            ))}
          </div>

          {selectedTopic && (
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#0a0d14] border border-[#00f0ff]/30 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono text-[#00f0ff] uppercase block">RESEARCH FORMULATION</span>
                  <h3 className="font-space font-bold text-2xl text-white mt-1">{selectedTopic.title}</h3>
                </div>
                <span className="text-xs font-mono text-slate-400 bg-white/5 px-3 py-1.5 rounded-md border border-white/10">
                  {selectedTopic.focus}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#03060a] border border-cyan-500/20 text-center font-mono text-xs sm:text-sm text-[#00f0ff] overflow-x-auto py-5">
                <code>{selectedTopic.mathNotation}</code>
              </div>

              <p className="text-sm font-sans text-slate-300 leading-relaxed font-light">
                {selectedTopic.abstract}
              </p>

              <div className="space-y-2.5">
                <span className="text-[10px] font-mono text-slate-500 uppercase block tracking-wider">
                  KEY RESEARCH INSIGHTS
                </span>
                {selectedTopic.keyInsights.map((insight, i) => (
                  <div key={i} className="flex items-start space-x-3 text-xs font-sans text-slate-300">
                    <span className="text-[#00f0ff] font-mono font-bold mt-0.5">›</span>
                    <span>{insight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
