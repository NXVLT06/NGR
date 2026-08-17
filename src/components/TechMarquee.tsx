import React from 'react';

export const TechMarquee: React.FC = () => {
  const techItems = [
    "ESP32", "Arduino", "Embedded C", "C++", "Python", "IoT", 
    "FreeRTOS", "PCB Design", "LoRa", "Sensors", "Signal Processing", 
    "MATLAB", "NumPy", "SciPy", "Git", "GitHub"
  ];

  const fullList = [...techItems, ...techItems, ...techItems];

  return (
    <div className="py-6 bg-[#050505] border-y border-white/10 overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex items-center space-x-8">
        {fullList.map((item, idx) => (
          <div key={idx} className="flex items-center space-x-8 flex-shrink-0">
            <span className="font-space font-bold text-lg md:text-xl text-slate-400 hover:text-[#00f0ff] transition-colors tracking-wide">
              {item}
            </span>
            <span className="text-[#00f0ff] text-xs opacity-70">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};
