import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { sound } from '../../utils/SoundEffects';

export const ExperienceSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string>(PORTFOLIO_DATA.experience[0].id);

  const toggleExpand = (id: string) => {
    sound.playClick();
    setExpandedId((prev) => (prev === id ? '' : id));
  };

  return (
    <section id="experience" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
          <Briefcase className="w-4 h-4 text-cyan-400" />
          Production Engineering &middot; Track Record
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight">
          Work Experience & Impact
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
          Track record in owning enterprise microservices, event-driven cloud migrations, database optimization, and high-velocity product engineering.
        </p>
      </div>

      {/* Experience Timeline */}
      <div className="space-y-6">
        {PORTFOLIO_DATA.experience.map((item) => {
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              className={`rounded-2xl glass-panel border transition-all duration-300 overflow-hidden ${
                isExpanded
                  ? 'border-cyan-500/40 shadow-[0_0_30px_rgba(0,240,255,0.1)] bg-slate-900/90'
                  : 'border-slate-800 hover:border-slate-700 bg-slate-900/60'
              }`}
            >
              {/* Header / Clickable Card summary */}
              <div
                onClick={() => toggleExpand(item.id)}
                className="p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <Briefcase className="w-6 h-6" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-white">{item.role}</h3>
                      <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        {item.type}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 font-mono">
                      <span className="text-purple-300 font-semibold">{item.company}</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {item.location}
                      </span>
                      <span className="flex items-center gap-1 text-cyan-400">
                        <Calendar className="w-3.5 h-3.5" /> {item.period}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Key Metrics & Accordion Toggle */}
                <div className="flex items-center gap-4 self-end md:self-center">
                  <div className="hidden sm:flex flex-wrap gap-1.5 justify-end">
                    {item.metrics.slice(0, 2).map((m, mIdx) => (
                      <span
                        key={mIdx}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                      >
                        ⚡ {m}
                      </span>
                    ))}
                  </div>

                  <button className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Content Body */}
              {isExpanded && (
                <div className="px-6 pb-7 pt-2 border-t border-slate-800/80 space-y-6">
                  {/* Metrics Badge Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2.5">
                    {item.metrics.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center"
                      >
                        <div className="text-xs font-mono font-bold text-emerald-400">{m}</div>
                      </div>
                    ))}
                  </div>

                  {/* Bullet Points */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
                      Architectural Deliverables & Core Responsibilities
                    </h4>
                    <div className="space-y-2.5">
                      {item.points.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies Used */}
                  <div className="pt-2">
                    <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2">
                      Technologies & Cloud Infrastructure
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-800/80 text-cyan-300 border border-slate-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
