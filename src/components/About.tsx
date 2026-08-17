import React from 'react';

export const About: React.FC = () => {
  const stats = [
    { label: "Verified Hardware Systems", value: "10+", detail: "Autonomous & IoT" },
    { label: "MCU Architectures", value: "6+", detail: "AVR, ESP32, ARM, 8051" },
    { label: "Hardware Sensors & ICs", value: "25+", detail: "IMUs, ToF, LoRa, GNSS" },
    { label: "Signal & AI Pipelines", value: "100%", detail: "Vectorized Python / DSP" }
  ];

  return (
    <section id="about" className="py-28 px-6 md:px-12 relative border-t border-white/5 bg-[#080808]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-3 mb-6">
          <span className="text-xs font-mono text-[#00f0ff] tracking-widest uppercase">// 01 • ABOUT GOKUL NATRAJ</span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-[#00f0ff]/30 to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <h2 className="font-space font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.05]">
              ENGINEERING IDEAS<br />
              <span className="text-gradient-cyan">INTO REAL SYSTEMS.</span>
            </h2>

            <div className="space-y-6 text-slate-300 font-sans text-base sm:text-lg leading-relaxed font-light">
              <p className="border-l-2 border-[#00f0ff]/50 pl-5 text-white/95">
                "I am Gokulraj Natarajan, an electronics and technology enthusiast focused on embedded systems, IoT, microcontroller firmware, hardware prototyping and experimental engineering."
              </p>
              <p className="text-slate-400">
                "I enjoy transforming technical concepts into working prototypes — combining electronics, microcontrollers, sensors, and robust firmware to create practical systems."
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-8 rounded-2xl bg-[#0a0d14] border border-[#00f0ff]/20 shadow-[0_10px_40px_rgba(0,0,0,0.6)] relative overflow-hidden">
              <span className="text-xs font-mono text-[#00f0ff] tracking-widest block mb-6 uppercase">// ENGINEERING METRICS</span>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="space-y-1">
                    <span className="font-space font-extrabold text-3xl sm:text-4xl text-white block">
                      {stat.value}
                    </span>
                    <span className="text-xs font-mono text-[#00f0ff] block font-semibold">
                      {stat.label}
                    </span>
                    <span className="text-[11px] font-sans text-slate-400 block">
                      {stat.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
