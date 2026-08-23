import React, { useEffect } from 'react';
import { X, ExternalLink, Cpu, CheckCircle, Layers, Sparkles } from 'lucide-react';
import { GithubIcon } from '../icons/SocialIcons';
import type { ProjectItem } from '../../data/portfolioData';
import { sound } from '../../utils/SoundEffects';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && project) {
        sound.playClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

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
      <div className="w-full max-w-2xl bg-[#0b0f19] border border-cyan-500/40 rounded-2xl shadow-[0_0_60px_rgba(0,240,255,0.25)] overflow-hidden flex flex-col max-h-[85vh] relative animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-[#101726] to-slate-900 border-b border-slate-800 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-400" /> Flagship
                </span>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">{project.title}</h3>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">{project.subtitle}</p>
          </div>

          {/* Close button with high-contrast pill styling */}
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 sm:p-2.5 rounded-xl bg-slate-800/90 hover:bg-red-500/20 text-slate-300 hover:text-red-400 hover:border-red-500/40 transition-all border border-slate-700 shrink-0 shadow-md"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Key Metrics Strip */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                  <div className="text-sm sm:text-base font-bold font-mono text-cyan-300">{m.value}</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5 truncate">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Deep Dive Description */}
          <div>
            <h4 className="text-xs font-mono uppercase text-cyan-400 tracking-wider mb-2 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" /> Project Overview & Objective
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{project.longDescription}</p>
          </div>

          {/* Architecture Notes */}
          {project.architectureNotes && (
            <div className="p-4 rounded-xl bg-slate-900/60 border border-cyan-500/20 space-y-1">
              <h4 className="text-xs font-mono uppercase text-purple-400 tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" /> Architectural Pipeline
              </h4>
              <p className="text-xs font-mono text-slate-300">{project.architectureNotes}</p>
            </div>
          )}

          {/* Engineering Highlights */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono uppercase text-emerald-400 tracking-wider">
              Key Engineering Accomplishments
            </h4>
            <div className="space-y-2">
              {project.highlights.map((h, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div>
            <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2">Technologies Used</h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-800 text-cyan-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#0d121f] border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400 font-mono text-center sm:text-left">
            {project.githubUrl ? 'Source verified on GitHub' : 'Internal Enterprise System'}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick()}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-all border border-slate-700 hover:border-cyan-500/40"
              >
                <GithubIcon className="w-4 h-4" /> View GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick()}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-lg hover:shadow-cyan-500/25"
              >
                <ExternalLink className="w-4 h-4" /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
