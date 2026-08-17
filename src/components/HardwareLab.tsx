import React, { useState } from 'react';
import { hardwareComponents, HardwareComponent } from '../data/hardware';

export const HardwareLab: React.FC = () => {
  const [activeChip, setActiveChip] = useState<HardwareComponent>(hardwareComponents[0]);

  return (
    <section id="hardware" className="py-28 px-6 md:px-12 relative bg-[#050505] tech-grid-bg">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-3 mb-6">
          <span className="text-xs font-mono text-[#00f0ff] tracking-widest uppercase">// 04 • HARDWARE BENCH</span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-[#00f0ff]/30 to-transparent" />
        </div>

        <div className="mb-16">
          <h2 className="font-space font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.05]">
            THE <span className="text-gradient-cyan">HARDWARE LAB</span>
          </h2>
          <p className="text-slate-400 font-sans text-base sm:text-lg mt-3 font-light max-w-2xl">
            Interactive silicon and sensor registry. Hover or click any component to inspect its pinouts, bus protocols, and hardware specifications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {hardwareComponents.map((hw) => (
              <div
                key={hw.id}
                onClick={() => setActiveChip(hw)}
                onMouseEnter={() => setActiveChip(hw)}
                className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between h-32 ${
                  activeChip?.id === hw.id
                    ? "bg-[#0e1726] border-[#00f0ff] shadow-[0_0_25px_rgba(0,240,255,0.25)] scale-[1.02]"
                    : "bg-[#0a0d14] border-white/10 hover:border-white/30"
                }`}
                data-cursor="open"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono text-[#00f0ff] uppercase">{hw.category.split('/')[0]}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]" />
                </div>
                <div>
                  <h4 className="font-space font-bold text-sm text-white">{hw.name}</h4>
                  <span className="text-[10px] font-mono text-slate-400 mt-1 block">{hw.badge}</span>
                </div>
              </div>
            ))}
          </div>

          {activeChip && (
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#0a0d14] border border-[#00f0ff]/40 shadow-[0_10px_50px_rgba(0,0,0,0.8)] relative overflow-hidden space-y-6">
              <div className="flex items-start justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono text-[#00f0ff] uppercase block">// SILICON INSPECTOR</span>
                  <h3 className="font-space font-bold text-2xl text-white mt-1">{activeChip.name}</h3>
                  <span className="text-xs font-mono text-slate-400 block mt-0.5">{activeChip.category}</span>
                </div>
                <span className="px-3 py-1 text-xs font-mono text-[#00f0ff] bg-[#00f0ff]/10 border border-[#00f0ff]/30 rounded-md">
                  {activeChip.badge}
                </span>
              </div>

              <p className="text-sm font-sans text-slate-300 font-light leading-relaxed">
                {activeChip.description}
              </p>

              <div className="space-y-2.5 p-4 rounded-xl bg-[#050810] border border-white/10 text-xs font-mono">
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-slate-400">VOLTAGE RANGE:</span>
                  <span className="text-[#00f0ff] font-semibold">{activeChip.specs.voltage}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-slate-400">BUS INTERFACE:</span>
                  <span className="text-white font-semibold">{activeChip.specs.interface}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-slate-400">PACKAGE FORM:</span>
                  <span className="text-white font-semibold">{activeChip.specs.package}</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase block tracking-wider">
                  PINOUT MATRIX PREVIEW
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeChip.pinoutPreview.map((pin, i) => (
                    <span key={i} className="px-2 py-0.5 text-[10px] font-mono bg-white/[0.04] text-slate-300 border border-white/10 rounded">
                      {pin}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
