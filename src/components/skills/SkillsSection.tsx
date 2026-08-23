import React, { useState } from 'react';
import { 
  Cpu, 
  Server, 
  Cloud, 
  Database, 
  Layout, 
  Zap
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { sound } from '../../utils/SoundEffects';

export const SkillsSection: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Server': return Server;
      case 'Cloud': return Cloud;
      case 'Database': return Database;
      case 'Layout': return Layout;
      default: return Cpu;
    }
  };

  const activeCategory = PORTFOLIO_DATA.skillCategories[activeCategoryIndex];

  return (
    <section id="skills" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
          <Cpu className="w-4 h-4 text-cyan-400" />
          Technical Competence &middot; Systems Radar
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight">
          Core Technical Arsenal
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
          Deep specialization across high-throughput distributed microservices, serverless cloud architectures, vector search, and type-safe database schemas.
        </p>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Category Switcher (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          {PORTFOLIO_DATA.skillCategories.map((cat, idx) => {
            const Icon = getCategoryIcon(cat.iconName);
            const isSelected = idx === activeCategoryIndex;

            return (
              <button
                key={idx}
                onClick={() => {
                  sound.playClick();
                  setActiveCategoryIndex(idx);
                }}
                className={`w-full p-4 rounded-2xl border text-left flex items-center gap-4 transition-all duration-300 ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-950/40 via-slate-900/80 to-slate-900 border-cyan-400/80 shadow-[0_0_25px_rgba(0,240,255,0.15)] scale-[1.02]'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 glow-cyan'
                      : 'bg-slate-800/80 text-slate-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-mono text-slate-400">Category {idx + 1}</div>
                  <div className={`font-bold text-sm sm:text-base ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {cat.title}
                  </div>
                </div>
              </button>
            );
          })}

          {/* Quick Stats Highlight Card */}
          <div className="p-5 rounded-2xl glass-panel border border-cyan-500/20 mt-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase font-semibold">
              <Zap className="w-4 h-4 text-cyan-400" />
              Philosophy: Production Readiness
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every system is built with strict TypeScript type-safety (0 <code className="text-cyan-300">any</code>), automated Vitest suites, dead-letter queue isolation, and Pino structured logging.
            </p>
          </div>
        </div>

        {/* Right: Skills Detail Grid & Proficiency Bars (8 cols) */}
        <div className="lg:col-span-8 glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800/80 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-xl font-bold font-display text-white">{activeCategory.title}</h3>
              <p className="text-xs text-slate-400 mt-0.5">Key proficiencies, tools, and production runtimes</p>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              {activeCategory.skills.length} Technologies
            </span>
          </div>

          {/* Skills Proficiency List */}
          <div className="space-y-4">
            {activeCategory.skills.map((skill, idx) => (
              <div key={idx} className="space-y-1.5 group">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-medium">
                    <span className="text-white group-hover:text-cyan-300 transition-colors font-mono">
                      {skill.name}
                    </span>
                    {skill.tag && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        {skill.tag}
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-cyan-400 font-bold">{skill.level}%</span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-all duration-700 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Technology Constellation Tags */}
          <div className="pt-6 border-t border-slate-800 space-y-3">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Tooling & Ecosystem Integrations:
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                'AWS Lambda', 'AWS SNS', 'AWS SQS', 'AWS SES', 'Fastify v5', 'Drizzle ORM', 
                'PostgreSQL', 'pgvector', 'ONNX Embeddings', 'Model Context Protocol (MCP)', 
                'Docker', 'GitHub Actions', 'Vitest', 'Pino Logger', 'CloudWatch', 'React 19'
              ].map((tool, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-all cursor-default"
                >
                  #{tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
