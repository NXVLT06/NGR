import React, { useState } from 'react';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = "gokulraj.ece.tech@gmail.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-28 px-6 md:px-12 relative bg-[#050505] tech-grid-cyan">
      <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/30 bg-[#00f0ff]/5 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
          <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-widest">
            COMMUNICATION PORTAL
          </span>
        </div>

        <h2 className="font-space font-extrabold text-5xl sm:text-7xl md:text-8xl text-white tracking-tight leading-[0.95] mb-8">
          LET'S BUILD<br />
          <span className="text-gradient-cyan">SOMETHING</span><br />
          INTELLIGENT.
        </h2>

        <p className="max-w-xl text-base sm:text-lg text-slate-300 font-sans font-light leading-relaxed mb-12">
          "Have an idea, embedded project, hardware challenge or technology concept? Let's connect."
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a
            href={`mailto:${email}`}
            className="px-8 py-4 rounded-xl bg-[#00f0ff] text-[#050505] font-space font-bold text-sm tracking-wider hover:bg-white transition-all shadow-[0_0_30px_rgba(0,240,255,0.4)] flex items-center space-x-2"
            data-cursor="open"
          >
            <span>EMAIL ME</span>
            <span className="font-mono">→</span>
          </a>

          <button
            onClick={copyEmail}
            className="px-8 py-4 rounded-xl btn-cyan font-space font-semibold text-sm tracking-wider flex items-center space-x-2"
            data-cursor="open"
          >
            <span>{copied ? "COPIED TO CLIPBOARD!" : "COPY EMAIL"}</span>
            <span className="font-mono">{copied ? "✓" : "❐"}</span>
          </button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4 rounded-xl bg-[#0a0d14] border border-white/10 hover:border-[#00f0ff]/40 text-slate-300 hover:text-white font-mono text-xs tracking-wider transition-all"
            data-cursor="open"
          >
            GITHUB ↗
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4 rounded-xl bg-[#0a0d14] border border-white/10 hover:border-[#00f0ff]/40 text-slate-300 hover:text-white font-mono text-xs tracking-wider transition-all"
            data-cursor="open"
          >
            LINKEDIN ↗
          </a>
        </div>
      </div>
    </section>
  );
};
