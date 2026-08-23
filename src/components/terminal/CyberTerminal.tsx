import React, { useState, useRef, useEffect } from 'react';
import { Terminal, X, Maximize2, Minimize2, Sparkles, Send, CornerDownLeft } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { sound } from '../../utils/SoundEffects';
import confetti from 'canvas-confetti';

interface CyberTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
  type?: 'standard' | 'matrix' | 'success' | 'error';
}

export const CyberTerminal: React.FC<CyberTerminalProps> = ({ isOpen, onClose }) => {
  const [inputVal, setInputVal] = useState<string>('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      id: 'welcome',
      command: 'system.init',
      output: (
        <div className="space-y-1.5 text-xs text-slate-300">
          <p className="text-cyan-400 font-bold">
            ⚡ QUANTUM TERMINAL v3.8.2 [Online] &middot; Prem Manchina Architecture
          </p>
          <p className="text-slate-400">
            Type <span className="text-emerald-400 font-mono font-bold">help</span> to view available system commands or click the quick pills below.
          </p>
        </div>
      ),
    },
  ]);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [isMatrixMode, setIsMatrixMode] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      sound.playLaunch();
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        sound.playClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isMatrixMode]);

  if (!isOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00F0FF', '#8B5CF6', '#10B981', '#38BDF8'],
    });
  };

  const handleExecuteCommand = (cmdStr: string) => {
    const cleanCmd = cmdStr.trim().toLowerCase();
    if (!cleanCmd) return;

    sound.playClick();
    let responseNode: React.ReactNode = null;
    let cmdType: 'standard' | 'matrix' | 'success' | 'error' = 'standard';

    switch (cleanCmd) {
      case 'help':
        responseNode = (
          <div className="space-y-2 text-xs">
            <div className="text-cyan-400 font-semibold uppercase tracking-wider">Available Commands:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 font-mono">
              <div><span className="text-emerald-400 font-bold">about</span> : Summary & Core Specialty</div>
              <div><span className="text-emerald-400 font-bold">projects</span> : Flagship Curated Projects</div>
              <div><span className="text-emerald-400 font-bold">skills</span> : Tech Stack & Proficiency</div>
              <div><span className="text-emerald-400 font-bold">experience</span> : Wysbryx Technologies Track Record</div>
              <div><span className="text-emerald-400 font-bold">certifications</span> : Verified Cloud Credentials</div>
              <div><span className="text-emerald-400 font-bold">metrics</span> : Performance & Latency Telemetry</div>
              <div><span className="text-emerald-400 font-bold">contact</span> : Direct Uplink & Communication</div>
              <div><span className="text-emerald-400 font-bold">matrix</span> : Toggle Digital Stream Mode</div>
              <div><span className="text-emerald-400 font-bold">sudo hire prem</span> : Initiate Recruiter Golden Path</div>
              <div><span className="text-emerald-400 font-bold">clear</span> : Clear Terminal Screen</div>
            </div>
          </div>
        );
        break;

      case 'about':
      case 'whoami':
        responseNode = (
          <div className="space-y-2 text-xs text-slate-300">
            <p className="text-cyan-300 font-bold text-sm">{PORTFOLIO_DATA.personal.name} &mdash; {PORTFOLIO_DATA.personal.role}</p>
            <p>{PORTFOLIO_DATA.personal.bio}</p>
            <div className="text-emerald-400 font-mono text-[11px]">📍 {PORTFOLIO_DATA.personal.location} | ⚡ {PORTFOLIO_DATA.personal.availability}</div>
          </div>
        );
        break;

      case 'projects':
        responseNode = (
          <div className="space-y-3 text-xs">
            <div className="text-cyan-400 font-bold uppercase tracking-wider">Curated Flagship Projects:</div>
            {PORTFOLIO_DATA.projects.map((proj, idx) => (
              <div key={idx} className="p-2.5 rounded bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{proj.title}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {proj.category}
                  </span>
                </div>
                <p className="text-slate-400 text-[11px]">{proj.description}</p>
                <div className="text-purple-300 font-mono text-[10px]">Stack: {proj.techStack.join(', ')}</div>
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-cyan-400 underline text-[11px] hover:text-cyan-300"
                  >
                    View on GitHub &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        responseNode = (
          <div className="space-y-3 text-xs">
            <div className="text-cyan-400 font-bold uppercase tracking-wider">Technical Arsenal:</div>
            <div className="space-y-2">
              {PORTFOLIO_DATA.skillCategories.map((cat, idx) => (
                <div key={idx} className="p-2 rounded bg-slate-900/60 border border-slate-800">
                  <span className="text-emerald-400 font-mono font-semibold">{cat.title}:</span>
                  <div className="text-slate-300 mt-1 flex flex-wrap gap-1.5">
                    {cat.skills.map((s, sIdx) => (
                      <span
                        key={sIdx}
                        className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                          s.highlight
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                            : 'bg-slate-800/80 text-slate-300'
                        }`}
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'experience':
        responseNode = (
          <div className="space-y-3 text-xs">
            <div className="text-cyan-400 font-bold uppercase tracking-wider">Work History:</div>
            {PORTFOLIO_DATA.experience.map((exp, idx) => (
              <div key={idx} className="p-3 rounded bg-slate-900/80 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between font-bold text-white">
                  <span>{exp.role} @ {exp.company}</span>
                  <span className="text-cyan-400 font-mono text-[11px]">{exp.period}</span>
                </div>
                <div className="text-slate-400 text-[11px]">{exp.points[0]}</div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {exp.metrics.map((m, mIdx) => (
                    <span key={mIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      ⚡ {m}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'certifications':
        responseNode = (
          <div className="space-y-2 text-xs">
            <div className="text-cyan-400 font-bold uppercase tracking-wider">Verified Certifications:</div>
            {PORTFOLIO_DATA.certifications.map((cert, idx) => (
              <div key={idx} className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                <div className="font-bold text-white text-sm">{cert.name}</div>
                <div className="text-purple-400 font-mono text-[11px]">Issuer: {cert.issuer}</div>
                <div className="text-slate-400 text-[10px] mt-1">Domains: {cert.skills.join(', ')}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'metrics':
        responseNode = (
          <div className="space-y-2 text-xs">
            <div className="text-cyan-400 font-bold uppercase tracking-wider">Live System Metrics:</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PORTFOLIO_DATA.personal.stats.map((stat, idx) => (
                <div key={idx} className="p-2 rounded bg-slate-900/80 border border-slate-800 text-center">
                  <div className="text-emerald-400 font-mono font-bold text-base">{stat.value}</div>
                  <div className="text-slate-300 text-[11px] font-semibold">{stat.label}</div>
                  <div className="text-slate-400 text-[9px]">{stat.change}</div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'contact':
        responseNode = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="text-cyan-400 font-bold uppercase tracking-wider">Direct Uplink:</div>
            <p>📧 Email: <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="text-cyan-300 underline">{PORTFOLIO_DATA.personal.email}</a></p>
            <p>📱 Phone: <a href={`tel:${PORTFOLIO_DATA.personal.phone}`} className="text-cyan-300 underline">{PORTFOLIO_DATA.personal.phone}</a></p>
            <p>🐙 GitHub: <a href={PORTFOLIO_DATA.personal.github} target="_blank" rel="noreferrer" className="text-cyan-300 underline">{PORTFOLIO_DATA.personal.github}</a></p>
            <p>💼 LinkedIn: <a href={PORTFOLIO_DATA.personal.linkedin} target="_blank" rel="noreferrer" className="text-cyan-300 underline">{PORTFOLIO_DATA.personal.linkedin}</a></p>
          </div>
        );
        break;

      case 'sudo hire prem':
      case 'hire':
      case 'sudo hire':
        sound.playSuccess();
        triggerConfetti();
        cmdType = 'success';
        responseNode = (
          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-2 text-xs text-emerald-200">
            <div className="flex items-center gap-2 font-bold text-emerald-300 text-sm">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              ACCESS GRANTED: Candidate Evaluation Protocol Initialized!
            </div>
            <p>
              Prem Manchina is ready to bring high-velocity engineering, scalable AWS microservices, and AI-driven excellence to your team.
            </p>
            <div className="pt-1 flex gap-3">
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}?subject=Exciting%20Opportunity%20at%20Our%20Company`}
                className="px-3 py-1.5 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs inline-flex items-center gap-1.5"
              >
                <Send className="w-3 h-3" /> Email Prem Directly
              </a>
            </div>
          </div>
        );
        break;

      case 'matrix':
        setIsMatrixMode(!isMatrixMode);
        responseNode = (
          <div className="text-emerald-400 font-mono text-xs">
            {isMatrixMode ? 'Matrix Mode Disengaged.' : 'Matrix Mode Engaged. Welcome to the construct.'}
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        sound.playError();
        cmdType = 'error';
        responseNode = (
          <div className="text-red-400 text-xs">
            Command not recognized: <span className="font-mono text-red-300">"{cmdStr}"</span>. Type <span className="text-cyan-400 font-mono font-bold">help</span> to view valid commands.
          </div>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: cmdStr,
        output: responseNode,
        type: cmdType,
      },
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    sound.playTerminalKey();
    if (e.key === 'Enter') {
      handleExecuteCommand(inputVal);
    }
  };

  const QUICK_COMMANDS = ['help', 'projects', 'skills', 'experience', 'metrics', 'sudo hire prem', 'clear'];

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 pt-20 sm:pt-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sound.playClick();
          onClose();
        }
      }}
    >
      <div
        className={`w-full ${
          isMaximized ? 'h-[90vh] max-w-[96vw]' : 'h-[600px] max-w-3xl'
        } bg-[#080b12] border border-cyan-500/40 rounded-2xl shadow-[0_0_60px_rgba(0,240,255,0.25)] flex flex-col overflow-hidden transition-all duration-300 relative animate-in zoom-in-95 duration-200`}
      >
        {/* Terminal Titlebar */}
        <div className="px-4 py-3 bg-[#0f1422] border-b border-slate-800 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" onClick={onClose} title="Close" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 cursor-pointer" onClick={() => handleExecuteCommand('clear')} title="Clear Screen" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 cursor-pointer" onClick={() => setIsMaximized(!isMaximized)} title="Maximize / Restore" />
            <span className="text-xs font-mono text-slate-400 ml-2 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              prem@quantum-engine:~ (bash)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Command Navigation Pills */}
        <div className="px-4 py-2 bg-[#0b0f19] border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-[11px] font-mono scrollbar-none">
          <span className="text-slate-400 shrink-0">Quick Commands:</span>
          {QUICK_COMMANDS.map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleExecuteCommand(cmd)}
              className={`px-2.5 py-0.5 rounded-full border transition-all shrink-0 ${
                cmd.includes('hire')
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                  : 'bg-slate-800/60 text-cyan-300 border-slate-700/80 hover:border-cyan-500/50 hover:bg-slate-800'
              }`}
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Output Body */}
        <div
          className={`flex-1 p-4 overflow-y-auto font-mono text-xs space-y-3.5 ${
            isMatrixMode ? 'text-emerald-400 bg-black/95' : 'text-slate-200'
          }`}
        >
          {history.map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <span className="text-cyan-400">prem@quantum:~$</span>
                <span className="text-white font-semibold">{item.command}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Command Input Prompt Bar */}
        <div className="p-3 bg-[#0f1422] border-t border-slate-800 flex items-center gap-2">
          <span className="text-cyan-400 font-mono text-xs shrink-0">prem@quantum:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type command ('help', 'projects', 'sudo hire prem')..."
            className="flex-1 bg-transparent border-none text-white font-mono text-xs focus:outline-none focus:ring-0 placeholder:text-slate-400"
          />
          <button
            onClick={() => handleExecuteCommand(inputVal)}
            className="p-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all shrink-0"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
