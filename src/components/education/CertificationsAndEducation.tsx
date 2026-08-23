import React from 'react';
import { Award, GraduationCap, CheckCircle, ShieldCheck } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const CertificationsAndEducation: React.FC = () => {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Certifications (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <Award className="w-4 h-4 text-cyan-400" />
            Verified Cloud & AI Credentials
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            Industry Certifications
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PORTFOLIO_DATA.certifications.map((cert, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl glass-panel border bg-gradient-to-br transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between ${cert.badgeColor}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300">
                      {cert.issuer}
                    </span>
                    <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  </div>

                  <h4 className="font-bold text-base text-white tracking-tight leading-snug">
                    {cert.name}
                  </h4>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800/80">
                  <div className="text-[11px] font-mono text-slate-400 mb-2">Verified Competencies:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((s, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/90 text-slate-300 border border-slate-800"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Education (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-widest">
            <GraduationCap className="w-4 h-4 text-purple-400" />
            Academic Foundations
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            Education
          </h3>

          <div className="p-6 rounded-2xl glass-panel border border-slate-800 bg-slate-900/60 hover:border-purple-500/40 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-cyan-400 font-semibold">{PORTFOLIO_DATA.education.period}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Graduated
              </span>
            </div>

            <h4 className="text-lg font-bold text-white font-display">
              {PORTFOLIO_DATA.education.degree}
            </h4>
            <div className="text-sm font-semibold text-purple-300 mt-0.5">
              {PORTFOLIO_DATA.education.field}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {PORTFOLIO_DATA.education.institution}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              📍 {PORTFOLIO_DATA.education.location}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
              {PORTFOLIO_DATA.education.highlights.map((h, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
