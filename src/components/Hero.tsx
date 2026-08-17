import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-12 pt-28 pb-16 overflow-hidden tech-grid-bg"
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[750px] h-[300px] md:h-[450px] bg-[#00f0ff]/8 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full text-center relative z-10 flex flex-col items-center">
        <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full border border-[#00f0ff]/30 bg-[#00f0ff]/5 backdrop-blur-md mb-8 animate-pulse-glow">
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
          <span className="text-xs font-mono tracking-widest text-[#00f0ff] uppercase">
            GOKUL NATRAJ // EMBEDDED SYSTEMS &amp; HARDWARE RESEARCH
          </span>
        </div>

        <h1 className="font-space font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.95] mb-8 text-white">
          <span className="block text-gradient">BUILDING</span>
          <span className="block text-gradient-cyan">INTELLIGENT</span>
          <span className="block text-gradient">SYSTEMS.</span>
        </h1>

        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-slate-300 font-sans font-light leading-relaxed mb-12">
          Electronics, embedded systems, IoT and intelligent technology — engineered from concept to working prototype.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full max-w-md">
          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-4 rounded-lg bg-[#00f0ff] text-[#050505] font-space font-bold text-sm tracking-wider hover:bg-white transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.4)] flex items-center justify-center space-x-2 group"
            data-cursor="open"
          >
            <span>EXPLORE PROJECTS</span>
            <span className="group-hover:translate-x-1.5 transition-transform duration-300 font-mono">→</span>
          </a>

          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 rounded-lg btn-cyan font-space font-semibold text-sm tracking-wider flex items-center justify-center space-x-2 group"
            data-cursor="open"
          >
            <span>CONTACT ME</span>
            <span className="group-hover:translate-x-1.5 transition-transform duration-300 font-mono">→</span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 text-slate-500 hover:text-[#00f0ff] transition-colors cursor-pointer">
        <span className="text-[10px] font-mono tracking-widest uppercase">SCROLL TO EXPLORE</span>
        <div className="w-5 h-8 rounded-full border border-slate-600 flex items-start justify-center p-1">
          <span className="w-1 h-2 rounded-full bg-[#00f0ff] animate-bounce" />
        </div>
      </div>
    </section>
  );
};
