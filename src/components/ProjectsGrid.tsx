import { motion } from 'framer-motion';
import { useState } from 'react';

interface ProjectCard {
  title: string;
  company: string;
  period: string;
  description: string;
  impact: string[];
  technologies: string[];
  category: string;
  icon: string;
  demo_url?: string | null;
  repo_url?: string | null;
}

interface Props {
  projects: ProjectCard[];
}

const CATEGORY_COLORS: Record<string, string> = {
  'Financial Crime Detection': '#f43f5e',
  'Data Engineering': '#60a5fa',
  'Business Intelligence': '#fbbf24',
  'Risk Analytics': '#34d399',
  'Machine Learning': '#c084fc',
  'Data Collection': '#22d3ee',
};

function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] ?? '#22d3ee';
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0,0,0';
  return `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

function ProjectCard({
  project,
  index,
}: {
  project: ProjectCard;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const color = getCategoryColor(project.category);
  const rgb = hexToRgb(color);
  const isFirstCard = index === 0;
  const cardNumber = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`relative flex flex-col overflow-hidden rounded-2xl${isFirstCard ? ' lg:col-span-2' : ''}`}
      style={{
        minHeight: '280px',
        borderLeft: `4px solid ${color}`,
        background: `linear-gradient(135deg, rgba(${rgb},0.04) 0%, #0d0d0f 60%, #0a0a0c 100%)`,
        border: `1px solid rgba(${rgb},0.18)`,
        borderLeftWidth: '4px',
        borderLeftColor: color,
        boxShadow: hovered
          ? `0 20px 60px rgba(${rgb},0.18), 0 4px 20px rgba(${rgb},0.12)`
          : '0 2px 16px rgba(0,0,0,0.4)',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {/* Large background number watermark */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-0.5rem',
          right: '0.75rem',
          fontSize: '7rem',
          fontWeight: 900,
          color: 'white',
          opacity: 0.05,
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {cardNumber}
      </span>

      {/* Bottom accent line */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: `linear-gradient(90deg, ${color}, transparent)`,
          opacity: hovered ? 1 : 0.3,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Card body */}
      <div className="relative flex flex-col flex-1 p-5">
        {/* Top row: category badge + icon */}
        <div className="flex items-start justify-between mb-4">
          <span
            className="inline-block px-2.5 py-1 text-[0.65rem] font-mono rounded-full tracking-wide"
            style={{
              background: `rgba(${rgb},0.12)`,
              color: color,
              border: `1px solid rgba(${rgb},0.25)`,
            }}
          >
            {project.category}
          </span>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-md flex-shrink-0"
            style={{
              background: `rgba(${rgb},0.15)`,
              border: `1px solid rgba(${rgb},0.2)`,
              boxShadow: `0 4px 12px rgba(${rgb},0.15)`,
            }}
          >
            {project.icon}
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-base font-bold mb-1 leading-tight transition-colors duration-300"
          style={{ color: hovered ? color : '#f1f5f9' }}
        >
          {project.title}
        </h3>

        {/* Company + period */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-semibold text-xs" style={{ color }}>
            {project.company}
          </span>
          <span style={{ color: '#334155' }}>·</span>
          <span className="text-xs font-mono" style={{ color: '#475569' }}>
            {project.period}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: '#64748b' }}>
          {project.description}
        </p>

        {/* Impact bullets */}
        {project.impact.length > 0 && (
          <ul className="mb-4 space-y-1.5">
            {project.impact.slice(0, 3).map((item, i) => (
              <li key={i} className="text-xs flex items-start gap-2" style={{ color: '#64748b' }}>
                <span
                  className="mt-0.5 flex-shrink-0 font-bold"
                  style={{ color }}
                >
                  ▸
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Technologies */}
        <div
          className="flex flex-wrap gap-1.5 pt-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {project.technologies.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: hovered ? i * 0.04 : 0, duration: 0.2 }}
              className="px-2 py-0.5 text-[0.65rem] rounded font-mono transition-colors duration-200"
              style={{
                background: hovered ? `rgba(${rgb},0.1)` : 'rgba(15,15,20,0.8)',
                color: hovered ? color : '#475569',
                border: `1px solid ${hovered ? `rgba(${rgb},0.25)` : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Demo / Repo links */}
        {(project.demo_url || project.repo_url) && (
          <div className="flex gap-3 mt-4">
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono px-3 py-1.5 rounded-lg transition-all duration-200"
                style={{
                  color,
                  border: `1px solid rgba(${rgb},0.3)`,
                  background: `rgba(${rgb},0.06)`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = `rgba(${rgb},0.14)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = `rgba(${rgb},0.06)`;
                }}
              >
                ↗ Demo
              </a>
            )}
            {project.repo_url && (
              <a
                href={project.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono px-3 py-1.5 rounded-lg transition-all duration-200"
                style={{
                  color: '#64748b',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.03)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = '#cbd5e1';
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.2)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = '#64748b';
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.08)';
                }}
              >
                ⌥ Repo
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function ProjectsGrid({ projects }: Props) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      {projects.map((project, index) => (
        <ProjectCard key={`${project.title}-${index}`} project={project} index={index} />
      ))}
    </motion.div>
  );
}
