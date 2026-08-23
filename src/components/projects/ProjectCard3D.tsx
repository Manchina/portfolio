import React, { useRef, useState } from 'react';
import { Sparkles, Layers } from 'lucide-react';
import { GithubIcon } from '../icons/SocialIcons';
import type { ProjectItem } from '../../data/portfolioData';
import { sound } from '../../utils/SoundEffects';

interface ProjectCard3DProps {
  project: ProjectItem;
  onInspect: (project: ProjectItem) => void;
}

export const ProjectCard3D: React.FC<ProjectCard3DProps> = ({ project, onInspect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState<number>(0);
  const [rotY, setRotY] = useState<number>(0);
  const [glarePos, setGlarePos] = useState<{ x: number; y: number; opacity: number }>({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotX(rotateX);
    setRotY(rotateY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15,
    });
  };

  const handleMouseEnter = () => {
    sound.playHover();
  };

  const handleMouseLeave = () => {
    setRotX(0);
    setRotY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className="group relative h-full rounded-2xl glass-panel p-6 flex flex-col justify-between border border-slate-800 hover:border-cyan-500/40 transition-colors duration-300 shadow-xl overflow-hidden"
    >
      {/* Dynamic Cursor Glare Sheen */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-2xl"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(0, 240, 255, ${glarePos.opacity}), transparent 70%)`,
        }}
      />

      {/* Top Banner & Badges */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
            {project.category}
          </span>
          {project.featured && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-purple-400" /> Flagship
            </span>
          )}
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors tracking-tight">
          {project.title}
        </h3>
        <p className="text-xs font-mono text-purple-400 mt-1">{project.subtitle}</p>

        {/* Description */}
        <p className="text-xs text-slate-400 mt-3 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Metrics Strip */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-3 gap-2 my-4 pt-3 border-t border-slate-800/80">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/60 text-center">
                <div className="text-xs font-bold font-mono text-cyan-300">{m.value}</div>
                <div className="text-[9px] text-slate-400 uppercase tracking-wider mt-0.5 truncate">{m.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Footer & Tech Stack */}
      <div className="pt-4 border-t border-slate-800/80 mt-4 space-y-4">
        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/90 text-slate-300 border border-slate-800"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <button
            onClick={() => {
              sound.playClick();
              onInspect(project);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all border border-slate-700 hover:border-cyan-500/40"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            Inspect Architecture
          </button>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick()}
              className="p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all hover:scale-105"
              title="View on GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
