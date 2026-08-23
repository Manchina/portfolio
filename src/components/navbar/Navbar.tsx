import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Volume2, 
  VolumeX, 
  FileText, 
  Menu, 
  X, 
  Clock 
} from 'lucide-react';
import { sound } from '../../utils/SoundEffects';

interface NavbarProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal, onOpenResume }) => {
  const [isMuted, setIsMuted] = useState<boolean>(sound.isMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [scrolled, setScrolled] = useState<boolean>(false);

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setCurrentTime(`${timeStr} IST`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll listener for border styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const active = sound.toggleSound();
    setIsMuted(!active);
  };

  const navLinks = [
    { label: 'System Architecture', href: '#architecture' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills Radar', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07090e]/85 backdrop-blur-xl border-b border-cyan-500/15 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a
          href="#"
          onClick={() => sound.playClick()}
          className="flex items-center gap-3 group select-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 glow-cyan transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-[#07090e] rounded-[10px] flex items-center justify-center">
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-display text-base">
                PM
              </span>
            </div>
          </div>
          <div>
            <div className="font-extrabold text-sm sm:text-base font-display text-white tracking-tight group-hover:text-cyan-300 transition-colors">
              Prem Manchina
            </div>
            <div className="text-[10px] font-mono text-cyan-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Product Engineer &middot; Full Stack Systems
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => sound.playClick()}
              className="px-3.5 py-1.5 rounded-full text-xs font-mono text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Tools: Time, Sound, Terminal, Resume */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Live Clock */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-400">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{currentTime}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            className={`p-2 rounded-xl border transition-all ${
              isMuted
                ? 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
                : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30 glow-cyan'
            }`}
            title={isMuted ? 'Unmute UI Audio SFX' : 'Mute UI Audio SFX'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Terminal Launcher */}
          <button
            onClick={() => {
              sound.playLaunch();
              onOpenTerminal();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 text-xs font-mono transition-all hover:scale-105"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Terminal</span>
          </button>

          {/* Resume Modal Launcher */}
          <button
            onClick={() => {
              sound.playLaunch();
              onOpenResume();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono transition-all shadow-md hover:shadow-cyan-500/25 active:scale-95"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={handleSoundToggle}
            className="p-2 rounded-lg bg-slate-900 text-cyan-400 border border-slate-800"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-4 pb-6 bg-[#090c15]/95 backdrop-blur-2xl border-b border-slate-800 space-y-3 animate-in slide-in-from-top-4">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2.5 rounded-xl text-xs font-mono text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 text-cyan-300 font-mono text-xs border border-slate-700"
            >
              <Terminal className="w-4 h-4" /> Terminal
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold font-mono text-xs"
            >
              <FileText className="w-4 h-4" /> Resume
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
