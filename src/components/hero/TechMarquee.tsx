const techs = [
  'Django', 'React', 'Next.js', 'Docker', 'PostgreSQL', 'TypeScript',
  'Python', 'Redis', 'Celery', 'Supabase', 'Stripe', 'Jenkins',
  'SonarQube', 'Framer Motion', 'Express.js', 'Spring Boot', 'pgvector', 'Grafana',
]

export function TechMarquee() {
  const items = [...techs, ...techs]

  return (
    <div
      style={{
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        padding: '1.25rem 0',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      {/* Fade edges */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 80,
          background: 'linear-gradient(90deg, var(--bg-base), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: 80,
          background: 'linear-gradient(-90deg, var(--bg-base), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      <div
        className="animate-marquee"
        style={{ display: 'flex', gap: '0', width: 'max-content' }}
      >
        {items.map((tech, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1.25rem',
              padding: '0 1.5rem',
              fontSize: '0.875rem',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 500,
              color: 'var(--text-muted)',
              whiteSpace: 'nowrap',
            }}
          >
            {tech}
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: 'var(--accent-blue)',
                opacity: 0.5,
                flexShrink: 0,
              }}
            />
          </span>
        ))}
      </div>
    </div>
  )
}

export default TechMarquee
