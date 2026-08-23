import { useState } from 'react';
import { 
  Terminal, 
  Layers, 
  Code2, 
  ShieldCheck, 
  Activity, 
  Award 
} from 'lucide-react';
import { PORTFOLIO_DATA } from './data/portfolioData';
import type { ProjectItem } from './data/portfolioData';
import { sound } from './utils/SoundEffects';
import { QuantumReactor3D } from './components/canvas/QuantumReactor3D';
import { EventArchitectureDiagram } from './components/architecture/EventArchitectureDiagram';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { ProjectModal } from './components/projects/ProjectModal';
import { SkillsSection } from './components/skills/SkillsSection';
import { ExperienceSection } from './components/experience/ExperienceSection';
import { CertificationsAndEducation } from './components/education/CertificationsAndEducation';
import { ContactSection } from './components/contact/ContactSection';
import { CyberTerminal } from './components/terminal/CyberTerminal';
import { ResumeModal } from './components/resume/ResumeModal';
import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/footer/Footer';

export function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [inspectedProject, setInspectedProject] = useState<ProjectItem | null>(null);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden">
      {/* Background Cyber Grid */}
      <div className="fixed inset-0 cyber-grid opacity-30 pointer-events-none z-0" />
      
      {/* Ambient Gradient Flares */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed top-1/3 right-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-10 left-10 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Floating Navigation Bar */}
      <Navbar
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
      />

      <main className="relative pt-24 sm:pt-28">
        {/* ===================== HERO SECTION ===================== */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-6 pb-20 sm:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Headline & Actions (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* System status pill */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.15)]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-semibold">ENGINEERING PRODUCTION SYSTEMS &middot; 99.9% UPTIME</span>
              </div>

              {/* Title & Name */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading tracking-tight leading-[1.08] text-white">
                  Prem <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Manchina</span>
                </h1>
                <div className="text-xl sm:text-2xl font-bold font-display text-slate-300">
                  Product Engineer &amp; Distributed Cloud Architect
                </div>
              </div>

              {/* Lead Bio Description */}
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
                Specializing in high-throughput enterprise notification microservices, event-driven AWS cloud pipelines (<code className="text-cyan-300">SNS → Lambda → SQS/SES</code>), Fastify v5 REST APIs, type-safe database architectures with Drizzle ORM + Aurora PostgreSQL, and self-healing autonomous AI agents.
              </p>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  href="#architecture"
                  onClick={() => sound.playLaunch()}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold font-mono text-xs tracking-wider transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 flex items-center gap-2 active:scale-95 glow-cyan"
                >
                  <Layers className="w-4 h-4" />
                  View System Architecture
                </a>

                <a
                  href="#projects"
                  onClick={() => sound.playClick()}
                  className="px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-cyan-500/40 font-mono text-xs font-semibold transition-all flex items-center gap-2"
                >
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  Flagship Projects
                </a>

                <button
                  onClick={() => {
                    sound.playLaunch();
                    setTerminalOpen(true);
                  }}
                  className="px-4 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 font-mono text-xs transition-all flex items-center gap-2"
                  title="Open Interactive Cyber Terminal"
                >
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="hidden sm:inline">Cyber HUD</span>
                </button>
              </div>

              {/* Quick Credentials Badge Strip */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 border-t border-slate-800 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Google Cloud Certified (ACE)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-purple-400" />
                  <span>Microsoft Azure AI Certified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>Product Engineer @ Wysbryx</span>
                </div>
              </div>
            </div>

            {/* Right: Interactive 3D Quantum Reactor Canvas (5 cols) */}
            <div className="lg:col-span-5 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px]">
              {/* 3D WebGL Canvas */}
              <div className="w-full h-[380px] sm:h-[460px] rounded-3xl glass-panel border border-cyan-500/30 shadow-[0_0_60px_rgba(0,240,255,0.15)] relative overflow-hidden flex items-center justify-center group">
                <QuantumReactor3D />

                {/* Corner Accents */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 flex items-center gap-1.5 pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  3D Quantum Core &middot; WebGL
                </div>

                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-slate-400 pointer-events-none">
                  Click core for shockwave pulse
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics Stats Banner Strip */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mt-16 pt-10 border-t border-slate-800">
            {PORTFOLIO_DATA.personal.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 text-center group"
              >
                <div className="text-xl sm:text-2xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 group-hover:scale-105 transition-transform">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-white mt-1">{stat.label}</div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">{stat.change}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ===================== ARCHITECTURE VISUALIZER ===================== */}
        <section id="architecture" className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <EventArchitectureDiagram />
        </section>

        {/* ===================== FLAGSHIP PROJECTS ===================== */}
        <ProjectsSection onInspectProject={(proj) => setInspectedProject(proj)} />

        {/* ===================== TECHNICAL RADAR / SKILLS ===================== */}
        <SkillsSection />

        {/* ===================== WORK EXPERIENCE & IMPACT ===================== */}
        <ExperienceSection />

        {/* ===================== CERTIFICATIONS & EDUCATION ===================== */}
        <CertificationsAndEducation />

        {/* ===================== DIRECT CONTACT UPLINK ===================== */}
        <ContactSection />
      </main>

      {/* Floating Footer */}
      <Footer />

      {/* Deep-Dive Project Modal Overlay (Rendered at root with z-[100]) */}
      <ProjectModal
        project={inspectedProject}
        onClose={() => setInspectedProject(null)}
      />

      {/* Cyber Terminal Modal Overlay */}
      <CyberTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      {/* Printable Executive Resume Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
}

export default App;
