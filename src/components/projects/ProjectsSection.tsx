import React, { useState } from 'react';
import { Code2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import type { ProjectItem } from '../../data/portfolioData';
import { ProjectCard3D } from './ProjectCard3D';
import { sound } from '../../utils/SoundEffects';

type FilterCategory = 'All' | 'AI & Systems' | 'Cloud & Backend' | 'Full Stack';

interface ProjectsSectionProps {
  onInspectProject: (project: ProjectItem) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onInspectProject }) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');

  const categories: FilterCategory[] = ['All', 'AI & Systems', 'Cloud & Backend', 'Full Stack'];

  const filteredProjects = PORTFOLIO_DATA.projects.filter((p) => {
    if (activeFilter === 'All') return true;
    return p.category === activeFilter;
  });

  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
            <Code2 className="w-4 h-4 text-cyan-400" />
            Curated Repositories &middot; Production Systems
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight">
            Flagship Engineering Projects
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
            Autonomous AI agent swarms, vector RAG crawlers with MCP, enterprise event-driven pipelines, and high-performance full-stack platforms.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setActiveFilter(cat);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap ${
                activeFilter === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25 glow-cyan'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects 3D Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard3D
            key={project.id}
            project={project}
            onInspect={onInspectProject}
          />
        ))}
      </div>
    </section>
  );
};
