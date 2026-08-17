import React, { useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { TechMarquee } from './components/TechMarquee';
import { Projects } from './components/Projects';
import { ProjectDetail } from './components/ProjectDetail';
import { Research } from './components/Research';
import { HardwareLab } from './components/HardwareLab';
import { Journey } from './components/Journey';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Project } from './data/projects';

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00f0ff]/30 selection:text-white relative">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechMarquee />
        <Projects onSelectProject={(p) => setSelectedProject(p)} />
        <Research />
        <HardwareLab />
        <Journey />
        <Contact />
      </main>
      <Footer />
      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};
