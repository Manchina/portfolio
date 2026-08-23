import React, { useEffect } from 'react';
import { X, Printer, Copy, Check, Sparkles, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { sound } from '../../utils/SoundEffects';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

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

  if (!isOpen) return null;

  const handlePrint = () => {
    sound.playLaunch();
    window.print();
  };

  const handleCopyText = () => {
    sound.playSuccess();
    const text = `
Prem Manchina
Product Engineer
Location: ${PORTFOLIO_DATA.personal.location}
Email: ${PORTFOLIO_DATA.personal.email} | Phone: ${PORTFOLIO_DATA.personal.phone}
GitHub: ${PORTFOLIO_DATA.personal.github} | LinkedIn: ${PORTFOLIO_DATA.personal.linkedin}

WORK EXPERIENCE:
${PORTFOLIO_DATA.experience.map(e => `${e.role} @ ${e.company} (${e.period})\n${e.points.map(p => `• ${p}`).join('\n')}`).join('\n\n')}

PROJECTS:
${PORTFOLIO_DATA.projects.map(p => `${p.title} (${p.category})\n${p.description}\nTech: ${p.techStack.join(', ')}`).join('\n\n')}

CERTIFICATIONS:
${PORTFOLIO_DATA.certifications.map(c => `• ${c.name} (${c.issuer})`).join('\n')}

EDUCATION:
${PORTFOLIO_DATA.education.degree} in ${PORTFOLIO_DATA.education.field}
${PORTFOLIO_DATA.education.institution} (${PORTFOLIO_DATA.education.period})
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
      <div className="w-full max-w-4xl max-h-[85vh] bg-[#0c101b] border border-cyan-500/40 rounded-2xl shadow-[0_0_60px_rgba(0,240,255,0.25)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-[#0f1422] border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-sm text-white font-display">Executive Resume &middot; Prem Manchina</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-all border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-all shadow-md hover:shadow-cyan-500/25"
            >
              <Printer className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Resume Sheet */}
        <div className="flex-1 p-6 sm:p-10 overflow-y-auto bg-[#090c15] text-slate-200 font-sans space-y-6 print:bg-white print:text-black">
          {/* Header */}
          <div className="border-b border-slate-800 pb-6 print:border-black">
            <h1 className="text-3xl font-extrabold font-display text-white print:text-black tracking-tight">
              {PORTFOLIO_DATA.personal.name}
            </h1>
            <p className="text-cyan-400 print:text-blue-700 font-semibold text-sm mt-1">
              {PORTFOLIO_DATA.personal.role}
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-slate-400 print:text-gray-700 mt-2.5 font-mono">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-cyan-400" /> {PORTFOLIO_DATA.personal.location}
              </span>
              <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="flex items-center gap-1 text-cyan-300 hover:underline">
                <Mail className="w-3 h-3" /> {PORTFOLIO_DATA.personal.email}
              </a>
              <a href={`tel:${PORTFOLIO_DATA.personal.phone}`} className="flex items-center gap-1 text-cyan-300 hover:underline">
                <Phone className="w-3 h-3" /> {PORTFOLIO_DATA.personal.phone}
              </a>
              <a href={PORTFOLIO_DATA.personal.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-cyan-300 hover:underline">
                <Globe className="w-3 h-3" /> GitHub
              </a>
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 print:text-blue-800 border-b border-cyan-500/20 pb-1">
              Work Experience
            </h2>

            <div className="space-y-6">
              {PORTFOLIO_DATA.experience.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between font-display font-bold text-white print:text-black">
                    <span className="text-base">{exp.role} &mdash; <span className="text-cyan-300 print:text-blue-600">{exp.company}</span></span>
                    <span className="text-xs font-mono text-slate-400 print:text-gray-600">{exp.period} | {exp.location}</span>
                  </div>

                  <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-300 print:text-gray-800 leading-relaxed pl-1">
                    {exp.points.map((pt, pIdx) => (
                      <li key={pIdx} className="leading-normal">{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Key Projects */}
          <div className="space-y-4 pt-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 print:text-blue-800 border-b border-cyan-500/20 pb-1">
              Flagship Technical Projects
            </h2>

            <div className="space-y-4">
              {PORTFOLIO_DATA.projects.slice(0, 4).map((proj) => (
                <div key={proj.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white print:text-black font-display">{proj.title}</span>
                    <span className="text-[10px] font-mono text-cyan-400 print:text-blue-600">{proj.category}</span>
                  </div>
                  <p className="text-xs text-slate-300 print:text-gray-800 leading-relaxed">{proj.description}</p>
                  <div className="text-[11px] font-mono text-purple-400 print:text-purple-700">
                    Stack: {proj.techStack.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Education */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 print:text-blue-800 border-b border-cyan-500/20 pb-1">
                Certifications
              </h2>
              {PORTFOLIO_DATA.certifications.map((cert, idx) => (
                <div key={idx} className="text-xs text-slate-300 print:text-gray-800">
                  <div className="font-semibold text-white print:text-black">• {cert.name}</div>
                  <div className="text-[11px] text-slate-400 print:text-gray-600 pl-2.5">{cert.issuer}</div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 print:text-blue-800 border-b border-cyan-500/20 pb-1">
                Education
              </h2>
              <div className="text-xs text-slate-300 print:text-gray-800">
                <div className="font-semibold text-white print:text-black">{PORTFOLIO_DATA.education.degree}</div>
                <div className="text-purple-300 print:text-purple-700">{PORTFOLIO_DATA.education.field}</div>
                <div className="text-slate-400 print:text-gray-600">{PORTFOLIO_DATA.education.institution} ({PORTFOLIO_DATA.education.period})</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
