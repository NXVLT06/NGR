/**
 * GOKULRAJ NATARAJAN — PREMIUM PORTFOLIO (WHITE THEME & BLACK FONT)
 * Liquid Glass Scroll-Morphing Taskbar (Top -> Side Dock) & Compact Small Cursor
 */

const { useState, useEffect, useRef, useMemo } = React;

// Subtle Web Audio Synthesizer for high-tech micro-interactions
class SoundFX {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }
  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }
  playClick() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch(e) {}
  }
  playHover() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, this.ctx.currentTime + 0.03);
      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch(e) {}
  }
  playModal() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(960, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch(e) {}
  }
}
const sfx = new SoundFX();

// ==========================================
// SCROLL PROGRESS BAR COMPONENT
// ==========================================
function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <div id="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />;
}

// ==========================================
// 1. BULLETPROOF SMALL CUSTOM CURSOR (18px)
// ==========================================
function CustomCursor() {
  const pointerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      if (pointerRef.current) {
        pointerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) scale(${isHovered ? 1.2 : 1})`;
      }

      const isClickable = e.target.closest("button, a, input, select, textarea, [role='button'], .cursor-pointer, [data-cursor]");
      setIsHovered(!!isClickable);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible, isHovered]);

  return (
    <div
      ref={pointerRef}
      className="custom-cursor-pointer hidden md:block"
      style={{
        opacity: isVisible ? 1 : 0
      }}
    >
      <img
        src="assets/images/icons/custom-cursor-small.png"
        alt="cursor"
        onError={(e) => {
          e.target.src = "assets/images/icons/custom-cursor-black-red.png";
        }}
      />
    </div>
  );
}

// ==========================================
// 2. BACKGROUND PARTICLES & GRID CANVAS
// ==========================================
function BackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const particles = [];
    const count = Math.min(Math.floor(window.innerWidth / 28), 45);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.8,
        alpha: Math.random() * 0.25 + 0.08
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, ${p1.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 0, 0, ${(1 - dist / 110) * 0.05})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40"
    />
  );
}

// ==========================================
// 3. LIQUID GLASS TASKBAR (TOP <-> SIDE DOCK ON SCROLL)
// ==========================================
function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const navLinks = [
    { label: "HOME", short: "01", icon: "⌂", href: "#hero", id: "hero" },
    { label: "ABOUT", short: "02", icon: "✦", href: "#about", id: "about" },
    { label: "DOMAINS", short: "03", icon: "▦", href: "#domains", id: "domains" },
    { label: "PROJECTS", short: "04", icon: "◫", href: "#projects", id: "projects" },
    { label: "JOURNEY", short: "05", icon: "⏳", href: "#journey", id: "journey" },
    { label: "CONTACT", short: "06", icon: "✉", href: "#contact", id: "contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setIsScrolled(scrollPos > 120);

      const offsetPos = scrollPos + 220;
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (offsetPos >= top && offsetPos < top + height) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSound = () => {
    sfx.muted = soundEnabled;
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) sfx.playClick();
  };

  return (
    <>
      {/* 1. TOP LIQUID GLASS FLOATING TASKBAR (Visible at top) */}
      <nav className={`liquid-glass-top-nav ${isScrolled ? "hidden-nav" : ""}`}>
        {/* Brand Name (No Dot) */}
        <a
          href="#hero"
          onClick={() => sfx.playClick()}
          className="font-space font-extrabold text-sm sm:text-base text-black pr-3 border-r border-slate-300/80 mr-1 tracking-wider"
        >
          <span>GOKULRAJ</span>
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => sfx.playClick()}
              onMouseEnter={() => sfx.playHover()}
              className={`liquid-nav-pill ${activeSection === link.id ? "active" : ""}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Let's Talk CTA */}
        <a
          href="#contact"
          onClick={() => sfx.playClick()}
          onMouseEnter={() => sfx.playHover()}
          className="liquid-cta-btn ml-1 hidden sm:flex"
        >
          <span>LET'S TALK</span>
          <span>↗</span>
        </a>

        {/* Audio Sound Toggle */}
        <button
          onClick={toggleSound}
          title={soundEnabled ? "Mute audio effects" : "Enable audio effects"}
          className="px-2.5 py-1 rounded-full border border-slate-300/80 bg-white/70 hover:bg-black hover:text-white text-black transition-all text-[11px] font-mono font-bold"
        >
          {soundEnabled ? "SFX" : "MUTE"}
        </button>

        {/* Mobile Hamburger */}
        <button
          onClick={() => {
            sfx.playClick();
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          aria-label="Toggle navigation menu"
          className="lg:hidden p-1.5 rounded-full text-black hover:bg-black/5 transition-colors"
        >
          <div className="w-4 h-3.5 flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-black transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`w-full h-0.5 bg-black transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`w-full h-0.5 bg-black transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </div>
        </button>
      </nav>

      {/* 2. SIDE LIQUID GLASS FLOATING DOCK (Slides in on scroll down) */}
      <nav className={`liquid-glass-side-dock hidden md:flex ${!isScrolled ? "hidden-dock" : ""}`}>
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => sfx.playClick()}
            onMouseEnter={() => sfx.playHover()}
            className={`side-dock-btn ${activeSection === link.id ? "active" : ""}`}
            aria-label={link.label}
          >
            <span>{link.short}</span>
            <div className="dock-tooltip">
              <span>{link.label}</span>
            </div>
          </a>
        ))}

        <div className="w-4 h-[1px] bg-slate-300 my-1" />

        {/* Quick Top Button */}
        <a
          href="#hero"
          onClick={() => sfx.playClick()}
          onMouseEnter={() => sfx.playHover()}
          className="side-dock-btn"
          title="Scroll back to top"
        >
          <span>↑</span>
          <div className="dock-tooltip">
            <span>TOP</span>
          </div>
        </a>
      </nav>

      {/* Mobile Drawer with Liquid Glass Theme */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-20 bg-white/95 backdrop-blur-2xl rounded-3xl border border-slate-200 shadow-2xl p-6 z-50 pointer-events-auto space-y-4 animate-scale-in">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-mono font-bold text-slate-600">// GOKULRAJ NATARAJAN</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-mono font-bold text-black border border-slate-300 px-2.5 py-1 rounded-full"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  sfx.playClick();
                  setMobileMenuOpen(false);
                }}
                className={`p-3 rounded-2xl text-xs font-mono font-bold text-center transition-all ${
                  activeSection === link.id
                    ? "bg-black text-white"
                    : "bg-slate-50 text-slate-800 hover:bg-slate-100"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// ==========================================
// 4. HERO SECTION (Gokulraj Natarajan)
// ==========================================
function Hero() {
  const [statVals, setStatVals] = useState({ systems: 0, telemetry: 0, mcus: 0, sensors: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (window.gsap) {
      const obj = { s: 0, t: 0, m: 0, se: 0 };
      window.gsap.to(obj, {
        s: 10,
        t: 98,
        m: 6,
        se: 25,
        duration: 2.0,
        ease: "power2.out",
        onUpdate: () => {
          setStatVals({
            systems: Math.round(obj.s),
            telemetry: Math.round(obj.t),
            mcus: Math.round(obj.m),
            sensors: Math.round(obj.se)
          });
        }
      });
    } else {
      setStatVals({ systems: 10, telemetry: 98, mcus: 6, sensors: 25 });
    }
  }, []);

  return (
    <section id="hero" className="hero-banner-section tech-grid-bg">
      {/* 1. Huge Typography Header: DEVELOPER */}
      <div
        className="w-full relative z-0 mt-2 px-4 overflow-hidden"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <h1 className="hero-giant-title">
          DEVELOPER
        </h1>
      </div>

      {/* 2. Hero Content Grid: Symmetrical & Sits Directly Below DEVELOPER */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch relative z-10 mt-1">
        
        {/* Left Side Info Card */}
        <div className="md:col-span-4 reveal-left-on-scroll flex flex-col">
          <div className="hero-left-card">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-2.5">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                  // PROFILE OVERVIEW
                </span>
                <span className="text-slate-700 font-bold text-xs font-mono">
                  ECE • EMBEDDED &amp; IOT
                </span>
              </div>
              <h2 className="font-space font-extrabold text-2xl text-black mb-1.5 leading-tight">
                HELLO! I'M GOKULRAJ NATARAJAN
              </h2>
              <p className="text-xs font-mono font-bold text-slate-600 uppercase tracking-wider mb-5">
                EMBEDDED SYSTEMS &amp; IOT HARDWARE ENGINEER.
              </p>

              <ul className="space-y-3 text-xs sm:text-sm font-sans text-slate-800 font-medium">
                <li className="flex items-center space-x-2.5">
                  <span className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center font-bold text-[9px]">✦</span>
                  <span>Embedded Firmware Development (C/C++)</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <span className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center font-bold text-[9px]">✦</span>
                  <span>IoT &amp; Wireless Telemetry (LoRa / GSM / ESP32)</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <span className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center font-bold text-[9px]">✦</span>
                  <span>Real-Time Sensor DSP &amp; Hardware Telemetry</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <span className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center font-bold text-[9px]">✦</span>
                  <span>PCB Layout, Circuit Design &amp; Prototyping</span>
                </li>
              </ul>
            </div>

            {/* Education, Location & Resume Download (Fills Card Space) */}
            <div className="pt-4 border-t border-slate-200 mt-4 space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-700">
                <span className="flex items-center gap-1.5 font-bold text-black">
                  <span>🏛</span>
                  <span>SIMATS UNIVERSITY</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 font-bold border border-slate-200 text-[10px]">
                  ECE (2025–2029) • CGPA 8.38
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-600">
                <span className="flex items-center gap-1.5">
                  <span>📍</span>
                  <span>CHENNAI, INDIA</span>
                </span>
                <span className="text-emerald-600 font-bold flex items-center gap-1 text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  AVAILABLE
                </span>
              </div>

              <a
                href="assets/Gokulraj_Natarajan_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Gokulraj_Natarajan_Resume.pdf"
                onClick={() => sfx.playClick()}
                onMouseEnter={() => sfx.playHover()}
                className="w-full py-2.5 px-4 rounded-xl bg-black text-white hover:bg-slate-800 transition-all font-mono font-bold text-xs flex items-center justify-center space-x-2 shadow-sm hover:shadow-md mt-1"
              >
                <span>DOWNLOAD RESUME / CV</span>
                <span>↓</span>
              </a>
            </div>
          </div>
        </div>

        {/* Center Column: Portrait Artwork BELOW DEVELOPER + Action Buttons */}
        <div className="md:col-span-4 flex flex-col items-center justify-between text-center reveal-scale-on-scroll">
          <div className="hero-center-portrait-container mb-4">
            <img
              src="assets/images/shapes/gokul-anime-portrait.png?v=2026"
              alt="Gokulraj Natarajan"
              className="hero-center-portrait-img"
              onError={(e) => {
                e.target.src = "assets/images/shapes/banner-three-man.png";
              }}
            />
          </div>

          <p className="text-xs sm:text-sm font-sans text-slate-700 font-medium max-w-sm mb-4 leading-relaxed">
            Electronics, embedded systems, IoT and intelligent technology — engineered from concept to working prototype.
          </p>

          <div className="flex items-center gap-3 w-full justify-center">
            <a
              href="#projects"
              onClick={() => sfx.playClick()}
              onMouseEnter={() => sfx.playHover()}
              className="px-6 py-3.5 rounded-xl bg-black text-white hover:bg-slate-800 transition-all duration-300 font-space font-bold text-xs sm:text-sm tracking-wider flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <span>VIEW PROJECTS</span>
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            </a>

            <a
              href="#journey"
              onClick={() => sfx.playClick()}
              onMouseEnter={() => sfx.playHover()}
              className="px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-black transition-all duration-300 font-space font-bold text-xs sm:text-sm tracking-wider flex items-center space-x-1.5"
            >
              <span>JOURNEY</span>
              <span>⏳</span>
            </a>
          </div>
        </div>

        {/* Right Side Column: Video + Quick Connect (Contact Me) + 10+ Projects Card */}
        <div className="md:col-span-4 flex flex-col items-end reveal-right-on-scroll">
          <div className="hero-right-container w-full">
            
            {/* 1. Video Player Showcase Card */}
            <div className="hero-video-card w-full">
              <div className="relative w-full aspect-video flex items-center justify-center bg-black">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="assets/videos/hero-video.mp4" type="video/mp4" />
                  <source src="assets/videos/hero-video.mov" type="video/quicktime" />
                  Your browser does not support video playback.
                </video>
              </div>
            </div>

            {/* 2. Quick Connect / Contact Me Card */}
            <div className="hero-social-card w-full">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                  // QUICK CONNECT &bull; CONTACT ME
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Available for Collaboration" />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/gokulraj-natarajan-41a2ba36b"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sfx.playClick()}
                  onMouseEnter={() => sfx.playHover()}
                  className="social-icon-btn"
                  aria-label="LinkedIn Profile"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v7.6H9.2v-7.6H6.46M7.83 6.64a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/>
                  </svg>
                  <span className="social-tooltip">LINKEDIN</span>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/NXVLT06/Hardware-Projects.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sfx.playClick()}
                  onMouseEnter={() => sfx.playHover()}
                  className="social-icon-btn"
                  aria-label="GitHub Profile"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/>
                  </svg>
                  <span className="social-tooltip">GITHUB</span>
                </a>

                {/* Gmail */}
                <a
                  href="mailto:gokulnatraj06@gmail.com"
                  onClick={() => sfx.playClick()}
                  onMouseEnter={() => sfx.playHover()}
                  className="social-icon-btn"
                  aria-label="Send Email"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z"/>
                  </svg>
                  <span className="social-tooltip">GMAIL</span>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/919345515852?text=Hello%20Gokulraj!"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sfx.playClick()}
                  onMouseEnter={() => sfx.playHover()}
                  className="social-icon-btn"
                  aria-label="WhatsApp Chat"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.3 3.8 2.53 1.09 2.53.73 2.99.68.46-.04 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.3Z"/>
                  </svg>
                  <span className="social-tooltip">WHATSAPP</span>
                </a>
              </div>
            </div>

            {/* 3. Metric Box: 10+ Projects */}
            <div className="hero-metric-card card-accent w-full text-center py-5">
              <div className="font-space font-black text-5xl sm:text-6xl text-white leading-none tracking-tight">
                10+
              </div>
              <p className="text-sm font-space font-bold uppercase tracking-widest text-slate-300 mt-2">
                PROJECTS
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// ==========================================
// 5. DOUBLE VELOCITY MARQUEE COMPONENT
// ==========================================
function TechMarquee() {
  const row1 = [
    "ESP32", "Arduino", "Embedded C", "C++", "Python", "IoT", 
    "FreeRTOS", "PCB Design", "LoRa", "Sensors", "Signal Processing"
  ];
  const row2 = [
    "MATLAB", "NumPy", "SciPy", "FreeRTOS", "SPI / I2C", 
    "UART Protocols", "Git", "GitHub", "Digital Logic", "Rapid Prototyping"
  ];

  return (
    <div className="py-8 bg-slate-50 border-y border-slate-200 overflow-hidden relative space-y-4 reveal-on-scroll">
      <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee-left flex items-center space-x-8">
        {[...row1, ...row1, ...row1].map((item, idx) => (
          <div key={idx} className="flex items-center space-x-8 flex-shrink-0">
            <span className="font-space font-extrabold text-lg md:text-xl text-black tracking-wider">
              {item}
            </span>
            <span className="text-black text-xs font-bold">✦</span>
          </div>
        ))}
      </div>

      <div className="animate-marquee-right flex items-center space-x-8">
        {[...row2, ...row2, ...row2].map((item, idx) => (
          <div key={idx} className="flex items-center space-x-8 flex-shrink-0">
            <span className="font-space font-extrabold text-lg md:text-xl text-outline tracking-wider">
              {item}
            </span>
            <span className="text-slate-400 text-xs font-bold">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 6. ABOUT SECTION COMPONENT
// ==========================================
function About() {
  return (
    <section id="about" className="py-28 px-6 md:px-12 relative border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-3 mb-6 reveal-left-on-scroll">
          <span className="text-xs font-mono font-bold text-black tracking-widest uppercase">// 01 • ABOUT GOKULRAJ NATARAJAN</span>
          <div className="h-[1px] flex-1 bg-slate-200" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-7 reveal-on-scroll">
            <h2 className="font-space font-extrabold text-4xl sm:text-5xl md:text-6xl text-black tracking-tight leading-[1.05]">
              ENGINEERING IDEAS<br />
              <span>INTO REAL SYSTEMS.</span>
            </h2>

            {/* Academic Credentials Card (College, ECE Dept, 2025-2029, CGPA 8.38) */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono shadow-xs">
              <div className="flex items-center space-x-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <span className="text-black font-extrabold text-sm block font-space">SIMATS UNIVERSITY, CHENNAI</span>
                  <span className="text-slate-700 font-semibold text-[11px]">B.E. ELECTRONICS &amp; COMMUNICATION ENGINEERING (ECE DEPT)</span>
                </div>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-bold border border-emerald-300 text-[11px]">
                  CGPA 8.38
                </span>
                <span className="px-3 py-1 rounded-md bg-black text-white font-bold text-[11px]">
                  2025 – 2029
                </span>
              </div>
            </div>

            <div className="space-y-5 text-slate-700 font-sans text-base sm:text-lg leading-relaxed">
              <p className="border-l-3 border-black pl-5 text-black font-medium">
                I am Gokulraj Natarajan, an electronics and technology enthusiast focused on embedded systems, IoT, microcontroller firmware, hardware prototyping and experimental engineering.
              </p>
              <p className="text-slate-600">
                I enjoy transforming technical concepts into working prototypes — combining electronics, microcontrollers, sensors, software and intelligent algorithms to create practical systems.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-2.5">
              {[
                "Embedded Firmware (C/C++)",
                "FreeRTOS Multitasking",
                "Sub-GHz LoRa Avionics",
                "PCB & Circuit Synthesis",
                "IoT Cloud Telemetry",
                "Hardware-in-the-Loop Testing"
              ].map((skill, idx) => (
                <span
                  key={skill}
                  className={`px-3.5 py-1.5 text-xs font-mono font-medium bg-slate-100 border border-slate-300 rounded-md text-slate-800 hover:border-black hover:text-black transition-colors reveal-scale-on-scroll delay-${(idx % 4) * 100}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Right Side: Clean Formal Portrait of Gokulraj Natarajan (No badges/portfolio text) */}
          <div className="lg:col-span-5 reveal-right-on-scroll delay-200">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-50 group">
              <img
                src="assets/images/shapes/gokulraj-formal.jpg?v=2026"
                alt="Gokulraj Natarajan"
                className="w-full h-auto max-h-[580px] object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 7. ENGINEERING DOMAINS SECTION
// ==========================================
function EngineeringDomains() {
  const domains = [
    {
      num: "01",
      title: "Embedded Systems & Firmware",
      desc: "Low-level register programming, deterministic finite state machines, interrupt-driven peripherals, and real-time task scheduling on AVR, ARM, and ESP32 architectures.",
      tags: ["Embedded C/C++", "FreeRTOS", "UART / SPI / I2C", "Timers & Interrupts"]
    },
    {
      num: "02",
      title: "Edge IoT & Wireless Telemetry",
      desc: "Long-range sub-GHz LoRa communication nodes, autonomous GSM/GPS emergency dispatch nodes, and Wi-Fi cloud telemetry bridges for remote physical monitoring.",
      tags: ["LoRa 433/868MHz", "SIM800L / GPS", "MQTT & TLS", "Blynk IoT Cloud"]
    },
    {
      num: "03",
      title: "Hardware Prototyping & PCB Logic",
      desc: "Circuit synthesis from discrete transistor saturation switching and timer ICs to high-reliability microcontroller test benches and optical safety shields.",
      tags: ["Discrete NE555/CD4017", "Opto-Isolation", "Relay Actuation", "Rapid Prototyping"]
    }
  ];

  return (
    <section id="domains" className="py-28 px-6 md:px-12 relative bg-slate-50 tech-grid-bg border-t border-slate-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-3 mb-6 reveal-left-on-scroll">
          <span className="text-xs font-mono font-bold text-black tracking-widest uppercase">// 02 • ENGINEERING CAPABILITIES</span>
          <div className="h-[1px] flex-1 bg-slate-200" />
        </div>

        <div className="mb-16 reveal-on-scroll">
          <h2 className="font-space font-extrabold text-4xl sm:text-5xl md:text-6xl text-black tracking-tight leading-[1.05]">
            TECHNICAL <span>DOMAINS</span>
          </h2>
          <p className="text-slate-600 font-sans text-base sm:text-lg mt-3 max-w-2xl">
            Specialized engineering disciplines spanning hardware design, firmware development, and connected embedded systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {domains.map((dom, i) => (
            <div
              key={i}
              className={`domain-card flex flex-col justify-between reveal-scale-on-scroll delay-${(i % 2) * 200}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono font-extrabold text-2xl text-black">{dom.num}</span>
                  <span className="w-2 h-2 rounded-full bg-black" />
                </div>
                <h3 className="font-space font-bold text-2xl text-black mb-3">{dom.title}</h3>
                <p className="text-sm font-sans text-slate-700 leading-relaxed mb-6">
                  {dom.desc}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200">
                {dom.tags.map((t, idx) => (
                  <span key={idx} className="px-2.5 py-1 text-[11px] font-mono font-medium bg-slate-100 text-slate-800 border border-slate-300 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 8. PROJECT TECHNICAL SVG VISUALIZER
// ==========================================
function ProjectCircuitVisual({ type }) {
  switch (type) {
    case 'rocket':
      return (
        <svg viewBox="0 0 400 220" className="w-full h-full object-contain p-4">
          <rect width="400" height="220" fill="#f8fafc" rx="8" />
          <path d="M40 110 H100 M180 110 H240 M320 80 H360 M320 140 H360" stroke="#000000" strokeWidth="1.5" strokeDasharray="4 2" />
          <rect x="100" y="70" width="80" height="80" fill="#ffffff" stroke="#000000" strokeWidth="1.5" rx="4" />
          <text x="140" y="105" fill="#000000" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">ATmega328P</text>
          <text x="140" y="125" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle">16MHz FSM</text>
          <rect x="240" y="40" width="80" height="45" fill="#ffffff" stroke="#334155" strokeWidth="1" rx="3" />
          <text x="280" y="65" fill="#000000" fontSize="9" fontFamily="monospace" textAnchor="middle">DFPlayer MP3</text>
          <rect x="240" y="120" width="80" height="60" fill="#ffffff" stroke="#d97706" strokeWidth="1" rx="3" />
          <text x="280" y="145" fill="#d97706" fontSize="9" fontFamily="monospace" textAnchor="middle">Dual Relay 5V</text>
          <circle cx="40" cy="110" r="10" fill="#e2e8f0" stroke="#ef4444" strokeWidth="2" />
          <text x="40" y="135" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle">TRIGGER</text>
        </svg>
      );
    case 'iot':
      return (
        <svg viewBox="0 0 400 220" className="w-full h-full object-contain p-4">
          <rect width="400" height="220" fill="#f8fafc" rx="8" />
          <rect x="150" y="60" width="100" height="100" fill="#ffffff" stroke="#000000" strokeWidth="1.5" rx="6" />
          <text x="200" y="105" fill="#000000" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">ESP32 SoC</text>
          <text x="200" y="125" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle">Dual-Core Kinematics</text>
          <rect x="30" y="45" width="80" height="50" fill="#ffffff" stroke="#0284c7" strokeWidth="1" rx="4" />
          <text x="70" y="70" fill="#0284c7" fontSize="9" fontFamily="monospace" textAnchor="middle">MPU-6050</text>
          <rect x="30" y="125" width="80" height="50" fill="#ffffff" stroke="#16a34a" strokeWidth="1" rx="4" />
          <text x="70" y="150" fill="#16a34a" fontSize="9" fontFamily="monospace" textAnchor="middle">Neo-6M GPS</text>
          <rect x="290" y="85" width="80" height="55" fill="#ffffff" stroke="#e11d48" strokeWidth="1" rx="4" />
          <text x="330" y="112" fill="#e11d48" fontSize="9" fontFamily="monospace" textAnchor="middle">SIM800L GSM</text>
        </svg>
      );
    case 'security':
      return (
        <svg viewBox="0 0 400 220" className="w-full h-full object-contain p-4">
          <rect width="400" height="220" fill="#f8fafc" rx="8" />
          <rect x="30" y="60" width="70" height="100" fill="#ffffff" stroke="#64748b" strokeWidth="1" rx="4" />
          <text x="65" y="105" fill="#334155" fontSize="9" fontFamily="monospace" textAnchor="middle">4x4 Keypad</text>
          <rect x="140" y="60" width="100" height="100" fill="#ffffff" stroke="#000000" strokeWidth="1.5" rx="4" />
          <text x="190" y="105" fill="#000000" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">ATmega328P</text>
          <rect x="280" y="80" width="90" height="60" fill="#ffffff" stroke="#6366f1" strokeWidth="1" rx="4" />
          <text x="325" y="105" fill="#6366f1" fontSize="9" fontFamily="monospace" textAnchor="middle">12V Solenoid</text>
        </svg>
      );
    case 'discrete':
      return (
        <svg viewBox="0 0 400 220" className="w-full h-full object-contain p-4">
          <rect width="400" height="220" fill="#f8fafc" rx="8" />
          <rect x="40" y="70" width="80" height="80" fill="#ffffff" stroke="#000000" strokeWidth="1.5" rx="4" />
          <text x="80" y="105" fill="#000000" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">NE555</text>
          <rect x="160" y="60" width="90" height="100" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" rx="4" />
          <text x="205" y="105" fill="#0284c7" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">CD4017</text>
          <circle cx="320" cy="70" r="14" fill="#ef4444" stroke="#dc2626" strokeWidth="1.5" />
          <circle cx="320" cy="110" r="14" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
          <circle cx="320" cy="150" r="14" fill="#22c55e" stroke="#16a34a" strokeWidth="1.5" />
        </svg>
      );
    case 'satellite':
      return (
        <svg viewBox="0 0 400 220" className="w-full h-full object-contain p-4">
          <rect width="400" height="220" fill="#f8fafc" rx="8" />
          <rect x="140" y="60" width="110" height="100" fill="#ffffff" stroke="#000000" strokeWidth="1.5" rx="6" />
          <text x="195" y="105" fill="#000000" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">CanSat OBC</text>
          <rect x="30" y="45" width="80" height="50" fill="#ffffff" stroke="#0284c7" strokeWidth="1" rx="4" />
          <text x="70" y="70" fill="#0284c7" fontSize="9" fontFamily="monospace" textAnchor="middle">BMP280</text>
          <rect x="30" y="125" width="80" height="50" fill="#ffffff" stroke="#9333ea" strokeWidth="1" rx="4" />
          <text x="70" y="150" fill="#9333ea" fontSize="9" fontFamily="monospace" textAnchor="middle">VL53L0X ToF</text>
          <rect x="280" y="85" width="90" height="60" fill="#ffffff" stroke="#000000" strokeWidth="1.5" rx="4" />
          <text x="325" y="112" fill="#000000" fontSize="9" fontFamily="monospace" textAnchor="middle">SX1278 LoRa</text>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 400 220" className="w-full h-full object-contain p-4">
          <rect width="400" height="220" fill="#f8fafc" rx="8" />
          <path d="M30 110 L100 110 L130 50 L160 170 L190 110 L370 110" fill="none" stroke="#000000" strokeWidth="2" />
          <circle cx="145" cy="110" r="18" fill="rgba(0, 0, 0, 0.08)" stroke="#000000" strokeWidth="1" />
          <text x="145" y="185" fill="#000000" fontSize="9" fontFamily="monospace" textAnchor="middle">dI/dt Signal Spike</text>
        </svg>
      );
  }
}

// ==========================================
// 9. PROJECT CARD COMPONENT
// ==========================================
function ProjectCard({ project, onSelect, index = 0 }) {
  return (
    <div
      onClick={() => {
        sfx.playClick();
        onSelect(project, "default");
      }}
      onMouseEnter={() => sfx.playHover()}
      className="group relative rounded-2xl bg-white border border-slate-200 hover:border-black transition-all duration-300 overflow-hidden flex flex-col justify-between p-6 sm:p-8 hover:shadow-xl cursor-pointer"
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <span className="font-mono font-extrabold text-2xl text-black tracking-wider">
              {project.num}
            </span>
            <span className="h-4 w-[1px] bg-slate-300" />
            <span className="text-[11px] font-mono font-bold tracking-wider text-slate-500 uppercase">
              {project.category}
            </span>
          </div>
          <span className="text-xs font-mono font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
            {project.year}
          </span>
        </div>

        <h3 className="font-space font-bold text-xl sm:text-2xl text-black group-hover:text-slate-700 transition-colors leading-snug mb-2">
          {project.title}
        </h3>
        {project.subtitle && (
          <p className="text-xs font-mono font-bold text-slate-500 mb-3 tracking-wide">
            // {project.subtitle}
          </p>
        )}

        {project.hasVR && (
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={(e) => {
                e.stopPropagation();
                sfx.playClick();
                onSelect(project, "vr");
              }}
              className="px-3.5 py-1.5 rounded-lg bg-purple-700 text-white hover:bg-purple-800 transition-all text-xs font-mono font-bold flex items-center space-x-2 shadow-sm hover:shadow-md cursor-pointer border border-purple-500"
              title="Play VR Sim Racing Demo Video"
            >
              <span className="text-sm">🥽</span>
              <span>VR MODE</span>
              <span className="text-[10px] text-purple-200">▶ PLAY VR</span>
            </button>
            <span className="text-[10px] font-mono text-purple-700 font-bold bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200 flex items-center space-x-1">
              <span>🥽</span>
              <span>VR READY</span>
            </span>
          </div>
        )}

        {project.award && (
          <div className="mb-4 px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 flex items-center justify-between text-xs font-mono font-bold shadow-xs">
            <span className="flex items-center space-x-2">
              <span className="text-base">🏆</span>
              <span>BEST CAPSTONE PROJECT AWARD</span>
            </span>
            <span className="text-[10px] bg-amber-200 text-amber-950 px-2 py-0.5 rounded font-mono font-bold">
              CERTIFICATE 📜
            </span>
          </div>
        )}

        <p className="text-sm font-sans text-slate-700 line-clamp-3 leading-relaxed mb-6 font-normal">
          {project.abstract}
        </p>

        {/* Project Video / Media Box */}
        <div className="w-full h-48 rounded-xl bg-black border border-slate-200 group-hover:border-black transition-all overflow-hidden mb-6 relative shadow-inner flex items-center justify-center">
          {project.video ? (
            <div className="relative w-full h-full group/video flex items-center justify-center">
              <video
                src={project.defaultVideo || project.video}
                poster={project.poster}
                preload="metadata"
                muted
                playsInline
                loop
                onMouseEnter={(e) => e.target.play().catch(() => {})}
                onMouseLeave={(e) => {
                  e.target.pause();
                  e.target.currentTime = 0;
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-md text-black flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-white transition-all">
                  <span className="ml-1 text-sm font-bold">▶</span>
                </div>
              </div>
              <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/20 text-[9px] font-mono font-bold text-white flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span>VIDEO DEMO</span>
              </div>
            </div>
          ) : project.image || (project.gallery && project.gallery.length > 0) ? (
            <div className="relative w-full h-full group/img flex items-center justify-center bg-slate-950 overflow-hidden">
              <img
                src={project.image || project.gallery[0].url}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/20 text-[9px] font-mono font-bold text-white flex items-center space-x-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    <span>HARDWARE RIG &amp; TELEMETRY</span>
                  </span>
                  {project.gallery && project.gallery.length > 1 && (
                    <span className="px-2 py-0.5 rounded-md bg-black/75 border border-white/20 text-[9px] font-mono font-bold text-white">
                      📸 {project.gallery.length} PHOTOS
                    </span>
                  )}
                </div>
                <div className="text-[11px] font-mono font-bold text-white truncate drop-shadow">
                  {project.gallery ? project.gallery[0].title : project.title}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-black p-4 flex flex-col justify-between text-white">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>// HARDWARE ARCHIVE</span>
                <span className="px-2 py-0.5 rounded bg-white/10">{project.year}</span>
              </div>
              <div className="text-center py-2">
                <div className="text-3xl mb-1">⚡</div>
                <span className="text-xs font-mono font-bold tracking-wider text-slate-300">{project.category}</span>
              </div>
              <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 border-t border-white/10 pt-1.5">
                <span>{project.components.length} HARDWARE MODULES</span>
                <span>VERIFIED ✓</span>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2 mb-6">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block tracking-wider">
            KEY COMPONENTS
          </span>
          <div className="flex flex-wrap gap-1.5">
            {project.components.slice(0, 4).map((comp, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-[11px] font-mono font-medium bg-slate-100 text-slate-800 border border-slate-200 rounded"
              >
                {comp.split('(')[0].trim()}
              </span>
            ))}
            {project.components.length > 4 && (
              <span className="px-2 py-1 text-[10px] font-mono font-bold text-black bg-slate-200 rounded">
                +{project.components.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-space font-bold text-black group-hover:opacity-70 transition-opacity">
        <span className="tracking-wider">{project.video ? "PLAY VIDEO & DETAILS" : project.gallery ? "VIEW GALLERY & DETAILS" : "VIEW PROJECT DETAILS"}</span>
        <span className="font-mono text-base transform group-hover:translate-x-2 transition-transform duration-300">
          →
        </span>
      </div>
    </div>
  );
}

// ==========================================
// 10. PROJECT DETAIL MODAL
// ==========================================
function ProjectDetailModal({ project, initialVideoMode = "default", onClose }) {
  const hasVideo = Boolean(project?.video || project?.defaultVideo || project?.vrVideo);
  const hasGallery = Boolean(project?.gallery && project.gallery.length > 0);
  const [selectedVideoMode, setSelectedVideoMode] = useState(initialVideoMode || "default");

  useEffect(() => {
    setSelectedVideoMode(initialVideoMode || "default");
  }, [project, initialVideoMode]);

  const activeVideoUrl = (selectedVideoMode === "vr" && project?.vrVideo)
    ? project.vrVideo
    : project?.defaultVideo || project?.video;

  const availableTabs = [
    ...(hasVideo ? [{ id: "video", label: project?.hasVR ? "01 // VIDEO DEMOS (RIG & VR) 🎥" : "01 // VIDEO DEMO 🎥" }] : []),
    ...(hasGallery ? [{ id: "gallery", label: hasVideo ? "02 // HARDWARE & TELEMETRY GALLERY 📸" : "01 // HARDWARE & TELEMETRY GALLERY 📸" }] : []),
    { id: "overview", label: `${hasVideo && hasGallery ? "03" : hasVideo || hasGallery ? "02" : "01"} // OVERVIEW & CONCEPT` },
    { id: "components", label: `${hasVideo && hasGallery ? "04" : hasVideo || hasGallery ? "03" : "02"} // HARDWARE & STACK` },
    { id: "workflow", label: `${hasVideo && hasGallery ? "05" : hasVideo || hasGallery ? "04" : "03"} // EXECUTION WORKFLOW` }
  ];

  const defaultTab = hasVideo ? "video" : hasGallery ? "gallery" : "overview";
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 modal-backdrop overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-5xl rounded-2xl bg-white border border-slate-300 shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[90vh] animate-scale-in">
        {/* Top Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-4">
            <span className="font-mono font-extrabold text-2xl text-black">{project.num}</span>
            <span className="h-4 w-[1px] bg-slate-300" />
            <div>
              <span className="text-xs font-mono font-bold text-slate-600 uppercase block tracking-wider">{project.category}</span>
              <h2 className="font-space font-bold text-lg sm:text-xl text-black">{project.title}</h2>
            </div>
          </div>
          <button
            onClick={() => {
              sfx.playClick();
              onClose();
            }}
            className="p-2.5 rounded-lg border border-slate-300 text-slate-700 hover:text-black hover:border-black transition-all bg-white font-mono text-xs font-bold"
          >
            [ESC] CLOSE ✕
          </button>
        </div>

        {/* Top Task Bar Tabs: VIDEO, GALLERY, OVERVIEW, HARDWARE, WORKFLOW */}
        <div className="px-6 sm:px-8 py-3 bg-white border-b border-slate-200 flex items-center space-x-4 sm:space-x-8 overflow-x-auto text-xs font-mono shadow-xs">
          {availableTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sfx.playClick();
                setActiveTab(tab.id);
              }}
              className={`pb-2 border-b-2 font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-black text-black"
                  : "border-transparent text-slate-500 hover:text-black"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body based on selected Task Bar Tab */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          {/* TAB: VIDEO DEMO */}
          {activeTab === "video" && activeVideoUrl && (
            <div className="space-y-6">
              {/* Dual Video Stream Switcher for Project 1 */}
              {project.hasVR && project.vrVideo && project.defaultVideo && (
                <div className="flex flex-wrap items-center justify-between p-3.5 rounded-xl bg-slate-100 border border-slate-300 gap-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-slate-700 uppercase">// SELECT DEMO STREAM:</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        sfx.playClick();
                        setSelectedVideoMode("default");
                      }}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                        selectedVideoMode === "default"
                          ? "bg-black text-white shadow-md"
                          : "bg-white text-slate-700 border border-slate-300 hover:border-black"
                      }`}
                    >
                      <span>📹</span>
                      <span>HARDWARE RIG DEMO</span>
                    </button>
                    <button
                      onClick={() => {
                        sfx.playClick();
                        setSelectedVideoMode("vr");
                      }}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                        selectedVideoMode === "vr"
                          ? "bg-purple-700 text-white shadow-md ring-2 ring-purple-400"
                          : "bg-purple-50 text-purple-900 border border-purple-300 hover:bg-purple-100"
                      }`}
                    >
                      <span>🥽</span>
                      <span>VR SIMULATION DEMO</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl space-y-3 p-3 sm:p-4">
                <div className="flex items-center justify-between px-2 pt-1 text-xs font-mono text-white">
                  <span className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                    <span className="font-bold">
                      {selectedVideoMode === "vr"
                        ? "🥽 LIVE VIRTUAL REALITY (VR) RACING SIMULATION DEMO"
                        : "📹 LIVE HARDWARE STEERING & SHIFTER RIG DEMO"}
                    </span>
                  </span>
                  <span className="text-slate-400 text-[11px]">// 1080P HD STREAM</span>
                </div>
                <div className="w-full rounded-xl overflow-hidden bg-black flex items-center justify-center max-h-[460px] shadow-2xl border border-slate-800">
                  <video
                    key={activeVideoUrl}
                    src={activeVideoUrl}
                    poster={project.poster}
                    controls
                    autoPlay
                    playsInline
                    loop
                    className="w-full max-h-[440px] rounded-lg object-contain"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono">
                  <span className="text-slate-500 block">CURRENT VIEW:</span>
                  <span className="text-black font-bold text-sm">
                    {selectedVideoMode === "vr" ? "VR Cockpit Simulation (1.MP4)" : "Physical Hardware Rig (Steering)"}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono">
                  <span className="text-slate-500 block">SYSTEM STATUS:</span>
                  <span className="text-emerald-600 font-bold text-sm">Active Stream</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono">
                  <span className="text-slate-500 block">INPUT PROTOCOL:</span>
                  <span className="text-black font-bold text-sm">1000Hz HID USB</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB: GALLERY */}
          {activeTab === "gallery" && project.gallery && project.gallery.length > 0 && (
            <div className="space-y-6">
              <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl p-3 sm:p-4 space-y-4">
                <div className="flex items-center justify-between px-2 pt-1 text-xs font-mono text-white">
                  <span className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                    <span className="font-bold">
                      {project.gallery[selectedPhotoIndex]?.title || "HARDWARE PHOTO RIG"}
                    </span>
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    PHOTO {selectedPhotoIndex + 1} OF {project.gallery.length}
                  </span>
                </div>

                {/* Main Large Image Display */}
                <div className="w-full rounded-xl overflow-hidden bg-black flex items-center justify-center max-h-[500px] shadow-2xl border border-slate-800 relative group/photo">
                  <img
                    src={project.gallery[selectedPhotoIndex]?.url}
                    alt={project.gallery[selectedPhotoIndex]?.title}
                    className="w-full max-h-[480px] object-contain rounded-lg transition-transform duration-300"
                  />
                  {project.gallery.length > 1 && (
                    <>
                      <button
                        onClick={() => {
                          sfx.playClick();
                          setSelectedPhotoIndex((prev) => (prev > 0 ? prev - 1 : project.gallery.length - 1));
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center font-mono font-bold text-lg border border-white/20 transition-all opacity-80 hover:opacity-100"
                        title="Previous Photo"
                      >
                        ‹
                      </button>
                      <button
                        onClick={() => {
                          sfx.playClick();
                          setSelectedPhotoIndex((prev) => (prev < project.gallery.length - 1 ? prev + 1 : 0));
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center font-mono font-bold text-lg border border-white/20 transition-all opacity-80 hover:opacity-100"
                        title="Next Photo"
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>

                {/* Photo Caption */}
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 text-xs sm:text-sm font-sans leading-relaxed">
                  <span className="font-mono font-bold text-blue-400 block text-xs mb-1 uppercase tracking-wider">
                    // TECHNICAL DESCRIPTION &amp; TELEMETRY:
                  </span>
                  {project.gallery[selectedPhotoIndex]?.caption}
                </div>
              </div>

              {/* Thumbnails Row */}
              {project.gallery.length > 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {project.gallery.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        sfx.playClick();
                        setSelectedPhotoIndex(idx);
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all flex items-center space-x-3 cursor-pointer ${
                        selectedPhotoIndex === idx
                          ? "bg-slate-900 border-black text-white shadow-md ring-2 ring-blue-500"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-400"
                      }`}
                    >
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-14 h-14 rounded-lg object-cover flex-shrink-0 border border-slate-300"
                      />
                      <div className="overflow-hidden">
                        <span className="text-[10px] font-mono block text-slate-400">0{idx + 1} //</span>
                        <span className="text-xs font-space font-bold truncate block">
                          {item.title}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Award Certificate Showcase Banner */}
              {project.award && (
                <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border-2 border-amber-300 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200 pb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">🏆</span>
                      <div>
                        <span className="text-[10px] font-mono font-bold text-amber-800 uppercase tracking-widest block">
                          ACADEMIC EXCELLENCE &amp; CAPSTONE AWARD
                        </span>
                        <h4 className="font-space font-bold text-lg sm:text-xl text-amber-950">
                          {project.award.title}
                        </h4>
                      </div>
                    </div>
                    <span className="px-3.5 py-1.5 rounded-full bg-amber-200/90 text-amber-950 font-mono text-xs font-bold self-start sm:self-auto border border-amber-300">
                      {project.award.organization}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-sans text-amber-900 leading-relaxed font-normal">
                    {project.award.citation}
                  </p>

                  <div className="rounded-xl overflow-hidden border-2 border-amber-300 shadow-lg max-w-xl mx-auto bg-white p-2">
                    <img
                      src={project.award.certificateImage}
                      alt="Best Capstone Project Award Certificate"
                      className="w-full h-auto rounded-lg object-contain"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-xs font-mono text-amber-900 font-semibold flex items-center space-x-1.5">
                      <span>✓</span>
                      <span>Verified Official Capstone Project Award 2025</span>
                    </span>
                    <a
                      href={project.award.certificateImage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-950 hover:bg-black text-white font-space font-bold text-xs tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md"
                    >
                      <span>VIEW HIGH-RES CERTIFICATE 📜</span>
                      <span className="font-mono">↗</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Real World Telemetry Proof Banner for projects with photos like ElderGuard or Satellite */}
              {project.gallery && project.gallery.length > 0 && !project.award && (
                <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xl">
                      📡
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block font-bold">
                        VERIFIED HARDWARE &amp; TELEMETRY LOGS
                      </span>
                      <span className="text-sm font-space font-bold text-white">
                        {project.gallery.length} High-Resolution Hardware / Field Telemetry Recordings Available
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      sfx.playClick();
                      setActiveTab("gallery");
                    }}
                    className="px-4 py-2 rounded-xl bg-white text-black text-xs font-mono font-bold hover:bg-slate-200 transition-colors flex items-center space-x-1.5 whitespace-nowrap self-stretch sm:self-auto justify-center"
                  >
                    <span>OPEN PHOTO GALLERY 📸</span>
                    <span>→</span>
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <span className="text-xs font-mono font-bold text-black uppercase block">// SYSTEM OVERVIEW</span>
                  <p className="text-sm font-sans text-slate-700 leading-relaxed font-normal">{project.overview}</p>
                </div>
                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <span className="text-xs font-mono font-bold text-black uppercase block">// SHORT ABSTRACT</span>
                  <p className="text-sm font-sans text-slate-700 leading-relaxed font-normal italic">{project.abstract}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-red-50 border border-red-200 space-y-3">
                  <span className="text-xs font-mono font-bold text-red-700 uppercase block">// PROBLEM STATEMENT</span>
                  <p className="text-sm font-sans text-slate-800 leading-relaxed font-normal">{project.problem}</p>
                </div>
                <div className="p-6 rounded-xl bg-blue-50 border border-blue-200 space-y-3">
                  <span className="text-xs font-mono font-bold text-blue-700 uppercase block">// ENGINEERING OBJECTIVE</span>
                  <p className="text-sm font-sans text-slate-800 leading-relaxed font-normal">{project.objective}</p>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-slate-100 border border-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-600 uppercase block">PROJECT STATUS</span>
                  <span className="text-base font-space font-bold text-black flex items-center space-x-2 mt-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span>{project.status}</span>
                  </span>
                  <p className="text-xs font-sans text-slate-700 mt-2">{project.result}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "components" && (
            <div className="space-y-6">
              <span className="text-xs font-mono font-bold text-black uppercase block tracking-wider">// HARDWARE BILL OF MATERIALS (BOM)</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.components.map((comp, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center space-x-3 text-xs font-mono text-slate-800">
                    <span className="w-5 h-5 rounded bg-black text-white flex items-center justify-center text-[10px] font-bold">0{idx + 1}</span>
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "workflow" && (
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-black uppercase block tracking-wider">// EXECUTION WORKFLOW &amp; SEQUENCE</span>
              <div className="space-y-3">
                {project.workflow.map((step, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-4">
                    <span className="w-7 h-7 rounded-lg bg-black text-white font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-sm font-sans text-slate-800 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-500">SYSTEM ID: {project.id}</span>
          <button
            onClick={() => {
              sfx.playClick();
              onClose();
            }}
            className="px-6 py-2.5 rounded-lg bg-black text-white text-xs font-space font-bold tracking-wider hover:bg-slate-800 transition-colors"
          >
            BACK TO PROJECTS →
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 11. PROJECTS SECTION (5 INITIAL + LIQUID GLASS EXPANDABLE)
// ==========================================
function ProjectsSection({ onSelectProject }) {
  const [showAll, setShowAll] = useState(false);
  const allProjects = useMemo(() => window.PORTFOLIO_DATA?.projects || [], []);
  
  const displayedProjects = showAll ? allProjects : allProjects.slice(0, 5);

  const toggleExpand = () => {
    sfx.playClick();
    setShowAll(prev => !prev);
  };

  return (
    <section id="projects" className="py-28 px-6 md:px-12 relative bg-white border-t border-slate-200 tech-grid-bg">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-3 mb-6 reveal-left-on-scroll">
          <span className="text-xs font-mono font-bold text-black tracking-widest uppercase">// 03 • SYSTEM ARCHIVE</span>
          <div className="h-[1px] flex-1 bg-slate-200" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 reveal-on-scroll">
          <div>
            <h2 className="font-space font-extrabold text-4xl sm:text-5xl md:text-6xl text-black tracking-tight leading-[1.05]">
              SELECTED <span>PROJECTS</span>
            </h2>
            <p className="text-slate-600 font-sans text-base sm:text-lg mt-3 max-w-xl">
              Hardware, embedded firmware and IoT systems built through experimentation.
            </p>
          </div>
          <div className="text-xs font-mono font-bold text-black bg-slate-100 border border-slate-300 px-4 py-2 rounded-lg flex items-center space-x-2 self-start md:self-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>SHOWING {displayedProjects.length} OF {allProjects.length} ARCHIVED SYSTEMS</span>
          </div>
        </div>

        {/* Responsive Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={onSelectProject}
              index={idx}
            />
          ))}
        </div>

        {/* Small Liquid Glass View More Button with Microcontroller Icon */}
        <div className="mt-14 flex justify-center">
          <button
            onClick={toggleExpand}
            onMouseEnter={() => sfx.playHover()}
            className="liquid-glass-btn px-6 py-3 rounded-2xl flex items-center space-x-3.5 group shadow-sm hover:shadow-lg"
          >
            {/* Microcontroller Silicon Badge */}
            <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center shadow-md group-hover:rotate-12 transition-transform">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <rect x="9" y="9" width="6" height="6" fill="#ffffff" />
                <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
              </svg>
            </div>

            <div className="flex flex-col text-left pr-1">
              <span className="font-space font-extrabold text-xs tracking-wider text-black">
                {showAll ? "SHOW LESS" : "VIEW MORE PROJECTS"}
              </span>
              <span className="text-[10px] font-mono text-slate-500 font-semibold">
                {showAll ? "COLLAPSE ARCHIVE ↑" : `REVEAL PROJECTS 06–${allProjects.length} ↓`}
              </span>
            </div>

            <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 text-black flex items-center justify-center font-mono text-xs font-bold group-hover:translate-y-0.5 transition-transform">
              {showAll ? "▲" : "▼"}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 12. MY JOURNEY SECTION
// ==========================================
function Journey() {
  const milestones = useMemo(() => window.PORTFOLIO_DATA?.journeyMilestones || [], []);
  const [activeChapter, setActiveChapter] = useState(0);

  return (
    <section id="journey" className="py-28 px-6 md:px-12 relative bg-slate-50 border-t border-slate-200">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center space-x-3 mb-6 reveal-left-on-scroll">
          <span className="text-xs font-mono font-bold text-black tracking-widest uppercase">// 04 • MY JOURNEY</span>
          <div className="h-[1px] flex-1 bg-slate-200" />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4 reveal-on-scroll">
          <div>
            <h2 className="font-space font-extrabold text-4xl sm:text-5xl md:text-6xl text-black tracking-tight leading-[1.05]">
              EVOLUTION <span>CHRONICLES</span>
            </h2>
            <p className="text-slate-600 font-sans text-base sm:text-lg mt-3">
              From discrete logic circuits to embedded firmware, edge IoT, and autonomous hardware systems.
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono font-bold bg-white border border-slate-300 px-4 py-2 rounded-lg self-start sm:self-auto shadow-xs">
            <span className="text-black">0{activeChapter + 1}</span>
            <span className="text-slate-400">/</span>
            <span className="text-slate-600">0{milestones.length}</span>
          </div>
        </div>

        <div className="space-y-8">
          {milestones.map((m, idx) => (
            <article
              key={idx}
              onMouseEnter={() => setActiveChapter(idx)}
              className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                activeChapter === idx
                  ? "bg-white border-black shadow-lg scale-[1.01]"
                  : "bg-white/80 border-slate-200 hover:border-slate-400"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 rounded bg-black text-white font-mono text-xs font-bold">
                    {m.year}
                  </span>
                  <h3 className="font-space font-bold text-xl sm:text-2xl text-black">
                    {m.title}
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-slate-600">// {m.badge}</span>
              </div>

              <p className="text-xs font-mono text-slate-500 mb-4">
                DOMAIN: {m.focus}
              </p>

              <p className="text-sm sm:text-base font-sans text-slate-700 leading-relaxed mb-6 font-normal">
                {m.description}
              </p>

              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 mb-4 text-xs font-mono font-bold text-slate-800 flex items-center space-x-2">
                <span>→</span>
                <span>Bridging theoretical mathematics with deterministic physical silicon.</span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex flex-wrap gap-2">
                {m.deliverables.map((item, i) => (
                  <span key={i} className="px-2.5 py-1 text-[11px] font-mono font-medium bg-slate-100 text-slate-800 border border-slate-300 rounded">
                    ✓ {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 13. CONTACT SECTION
// ==========================================
function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "gokulraj.ece.tech@gmail.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    sfx.playClick();
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-28 px-6 md:px-12 relative bg-white border-t border-slate-200 tech-grid-cyan">
      <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-slate-300 bg-slate-100 mb-8 reveal-on-scroll">
          <span className="w-2 h-2 rounded-full bg-black animate-ping" />
          <span className="text-xs font-mono font-bold text-black uppercase tracking-widest">
            COMMUNICATION PORTAL
          </span>
        </div>

        <h2 className="font-space font-extrabold text-5xl sm:text-7xl md:text-8xl text-black tracking-tight leading-[0.95] mb-8 reveal-scale-on-scroll">
          LET'S BUILD<br />
          <span>SOMETHING</span><br />
          INTELLIGENT.
        </h2>

        <p className="max-w-xl text-base sm:text-lg text-slate-700 font-sans leading-relaxed mb-12 reveal-on-scroll delay-100">
          Have an idea, embedded project, hardware challenge or technology concept? Let's connect.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-16 reveal-on-scroll delay-200">
          <a
            href={`mailto:${email}`}
            onClick={() => sfx.playClick()}
            onMouseEnter={() => sfx.playHover()}
            className="px-8 py-4 rounded-xl bg-black text-white font-space font-bold text-sm tracking-wider hover:bg-slate-800 transition-all shadow-lg flex items-center space-x-2"
          >
            <span>EMAIL ME</span>
            <span className="font-mono">→</span>
          </a>

          <a
            href="https://wa.me/919345515852?text=Hello%20Gokulraj!"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sfx.playClick()}
            onMouseEnter={() => sfx.playHover()}
            className="px-8 py-4 rounded-xl btn-outline-dark font-space font-bold text-sm tracking-wider flex items-center space-x-2 bg-emerald-50 hover:bg-emerald-100 border-emerald-500 text-emerald-950"
          >
            <span>WHATSAPP</span>
            <span className="font-mono">↗</span>
          </a>

          <a
            href="https://github.com/NXVLT06/Hardware-Projects.git"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sfx.playClick()}
            onMouseEnter={() => sfx.playHover()}
            className="px-6 py-4 rounded-xl bg-slate-100 border border-slate-300 hover:border-black text-slate-800 hover:text-black font-mono text-xs font-bold tracking-wider transition-all"
          >
            GITHUB ↗
          </a>

          <a
            href="https://www.linkedin.com/in/gokulraj-natarajan-41a2ba36b"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sfx.playClick()}
            onMouseEnter={() => sfx.playHover()}
            className="px-6 py-4 rounded-xl bg-slate-100 border border-slate-300 hover:border-black text-slate-800 hover:text-black font-mono text-xs font-bold tracking-wider transition-all"
          >
            LINKEDIN ↗
          </a>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 14. FOOTER COMPONENT
// ==========================================
function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    sfx.playClick();
  };

  return (
    <footer className="py-16 px-6 md:px-12 bg-slate-900 text-white border-t border-slate-800 relative">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <a href="#hero" className="font-space font-extrabold text-2xl text-white flex items-center space-x-2">
            <span>GOKULRAJ NATARAJAN</span>
          </a>
          <p className="text-xs font-mono text-slate-400 mt-2">
            Electronics &amp; IoT • Embedded Systems • Firmware &amp; Hardware Prototyping
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-6 text-xs font-mono text-slate-300">
          <a href="#hero" className="hover:text-white transition-colors">HOME</a>
          <a href="#about" className="hover:text-white transition-colors">ABOUT</a>
          <a href="#domains" className="hover:text-white transition-colors">DOMAINS</a>
          <a href="#projects" className="hover:text-white transition-colors">PROJECTS</a>
          <a href="#journey" className="hover:text-white transition-colors">JOURNEY</a>
          <a href="#contact" className="hover:text-white transition-colors">CONTACT</a>
        </nav>

        <div className="text-xs font-mono text-slate-400">
          © 2026 Gokulraj Natarajan. All Rights Reserved.
        </div>
      </div>

      {/* Back to top floating button */}
      <button
        onClick={scrollToTop}
        className="back-to-top-btn"
        title="Scroll back to top"
      >
        <span className="font-mono text-lg font-bold">↑</span>
      </button>
    </footer>
  );
}

// ==========================================
// MAIN APP COMPONENT WITH SCROLL OBSERVER
// ==========================================
function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [initialVideoMode, setInitialVideoMode] = useState("default");

  // Global Intersection Observer for Scroll Animations
  useEffect(() => {
    const observerCallback = (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px 0px -60px 0px",
      threshold: 0.12
    });

    const elements = document.querySelectorAll(
      ".reveal-on-scroll, .reveal-scale-on-scroll, .reveal-left-on-scroll, .reveal-right-on-scroll"
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white relative">
      <ScrollProgressBar />
      <CustomCursor />
      <BackgroundCanvas />
      <Navbar />
      
      <main>
        <Hero />
        <TechMarquee />
        <About />
        <EngineeringDomains />
        <ProjectsSection onSelectProject={(p, mode = "default") => {
          setSelectedProject(p);
          setInitialVideoMode(mode);
        }} />
        <Journey />
        <Contact />
      </main>

      <Footer />

      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          initialVideoMode={initialVideoMode}
          onClose={() => {
            setSelectedProject(null);
            setInitialVideoMode("default");
          }}
        />
      )}
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
