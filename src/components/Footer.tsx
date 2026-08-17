import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-16 px-6 md:px-12 bg-[#030303] border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <a href="#hero" className="font-space font-extrabold text-2xl text-white flex items-center space-x-2">
            <span>GOKUL NATRAJ</span>
            <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
          </a>
          <p className="text-xs font-mono text-slate-400 mt-2">
            Electronics &amp; IoT • Embedded Systems • AI / ML • Research
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-6 text-xs font-mono text-slate-400">
          <a href="#hero" className="hover:text-[#00f0ff] transition-colors">HOME</a>
          <a href="#about" className="hover:text-[#00f0ff] transition-colors">ABOUT</a>
          <a href="#projects" className="hover:text-[#00f0ff] transition-colors">PROJECTS</a>
          <a href="#research" className="hover:text-[#00f0ff] transition-colors">RESEARCH</a>
          <a href="#contact" className="hover:text-[#00f0ff] transition-colors">CONTACT</a>
        </nav>

        <div className="text-xs font-mono text-slate-500">
          © 2026 Gokul Natraj. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};
