import { motion } from 'framer-motion';

interface Job {
  date: string;
  title: string;
  company: string;
  description: string;
  tags: string[];
  current?: boolean;
}

interface Props {
  jobs: Job[];
}

const cardVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.1 },
  }),
};

export default function ExperienceTimeline({ jobs }: Props) {
  // Separate current from past so current always shows first as "pinned"
  const current = jobs.filter(j => j.current);
  const past = jobs.filter(j => !j.current);
  const ordered = [...current, ...past];

  return (
    <div className="relative max-w-3xl mx-auto">

      {/* Vertical timeline line */}
      <div
        style={{
          position: 'absolute',
          left: '1.75rem',
          top: 0,
          bottom: 0,
          width: '1px',
          background: 'linear-gradient(to bottom, rgba(34,211,238,0.5), rgba(71,85,105,0.3), transparent)',
          pointerEvents: 'none',
        }}
      />

      {ordered.map((job, i) => (
        <motion.div
          key={`${job.company}-${i}`}
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={cardVariants}
          style={{ position: 'relative', paddingLeft: '5rem', marginBottom: '1.5rem' }}
        >
          {/* Timeline dot */}
          <div
            style={{
              position: 'absolute',
              left: '1.25rem',
              top: '1.5rem',
              width: '1rem',
              height: '1rem',
              borderRadius: '50%',
              border: job.current ? '2px solid #22d3ee' : '2px solid #334155',
              background: job.current ? 'rgba(34,211,238,0.15)' : '#0d1117',
              zIndex: 1,
            }}
          >
            {job.current && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: '#22d3ee',
                  opacity: 0.4,
                  animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite',
                }}
              />
            )}
          </div>

          {/* Card */}
          <motion.div
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            style={{
              padding: '1.25rem 1.5rem',
              borderRadius: '14px',
              border: job.current
                ? '1px solid rgba(34,211,238,0.22)'
                : '1px solid rgba(51,65,85,0.6)',
              background: job.current
                ? 'rgba(34,211,238,0.03)'
                : 'rgba(15,17,24,0.6)',
              backdropFilter: 'blur(8px)',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              cursor: 'default',
            }}
            onHoverStart={(e) => {
              (e.target as HTMLElement).style.borderColor = 'rgba(34,211,238,0.35)';
              (e.target as HTMLElement).style.boxShadow = '0 8px 30px rgba(34,211,238,0.07)';
            }}
            onHoverEnd={(e) => {
              (e.target as HTMLElement).style.borderColor = job.current
                ? 'rgba(34,211,238,0.22)'
                : 'rgba(51,65,85,0.6)';
              (e.target as HTMLElement).style.boxShadow = 'none';
            }}
          >
            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem', gap: '1rem', flexWrap: 'wrap' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#f1f5f9', lineHeight: 1.3 }}>
                  {job.title}
                </h3>
                <p style={{ margin: '3px 0 0', fontSize: '0.8rem', color: '#22d3ee', fontFamily: 'monospace', fontWeight: 500 }}>
                  {job.company}
                </p>
              </div>

              <span style={{
                flexShrink: 0,
                fontSize: '0.68rem',
                fontFamily: 'monospace',
                padding: '3px 10px',
                borderRadius: '999px',
                border: job.current ? '1px solid rgba(34,211,238,0.3)' : '1px solid #1e293b',
                color: job.current ? '#67e8f9' : '#475569',
                background: job.current ? 'rgba(34,211,238,0.06)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}>
                {job.current && (
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22d3ee', display: 'inline-block' }} />
                )}
                {job.date}
              </span>
            </div>

            {/* Description */}
            <p style={{ margin: '0.5rem 0 0.75rem', fontSize: '0.82rem', color: '#64748b', lineHeight: 1.65 }}>
              {job.description}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {job.tags.map((tag) => (
                <span key={tag} style={{
                  padding: '2px 10px',
                  fontSize: '0.68rem',
                  fontFamily: 'monospace',
                  borderRadius: '5px',
                  border: '1px solid #1e293b',
                  background: '#0d1117',
                  color: '#475569',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ))}

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
