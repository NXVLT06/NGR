import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "HOME", href: "#hero" },
    { label: "ABOUT", href: "#about" },
    { label: "PROJECTS", href: "#projects" },
    { label: "RESEARCH", href: "#research" },
    { label: "HARDWARE", href: "#hardware" },
    { label: "JOURNEY", href: "#journey" },
    { label: "CONTACT", href: "#contact" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050505]/85 backdrop-blur-md border-b border-[#00f0ff]/15 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <a
          href="#hero"
          className="group flex items-center space-x-2 text-white font-space font-bold text-xl tracking-wider"
          data-cursor="open"
        >
          <span className="text-white group-hover:text-[#00f0ff] transition-colors duration-300">
            GOKUL
          </span>
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse shadow-[0_0_8px_#00f0ff]" />
        </a>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-mono tracking-widest text-slate-300 hover:text-[#00f0ff] transition-colors duration-300 relative py-1 group"
              data-cursor="open"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#00f0ff] group-hover:w-full transition-all duration-300 shadow-[0_0_8px_#00f0ff]" />
            </a>
          ))}
        </nav>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="md:hidden p-2.5 text-white hover:text-[#00f0ff] border border-white/10 rounded-lg bg-black/50 backdrop-blur-sm"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2 text-[#00f0ff]" : ""}`} />
            <span className={`w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2 text-[#00f0ff]" : ""}`} />
          </div>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] bg-[#050505]/98 backdrop-blur-2xl z-40 flex flex-col justify-between p-8 border-t border-[#00f0ff]/20">
          <div className="space-y-6 pt-6">
            <p className="text-xs font-mono tracking-widest text-[#00f0ff]">// NAVIGATION MATRIX</p>
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, idx) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-space font-bold text-white hover:text-[#00f0ff] transition-colors flex items-center justify-between border-b border-white/10 pb-3"
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-mono text-slate-500">0{idx + 1}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="pt-6 border-t border-white/10 text-xs font-mono text-slate-400">
            <span>© 2026 GOKUL NATRAJ</span>
          </div>
        </div>
      )}
    </header>
  );
};
