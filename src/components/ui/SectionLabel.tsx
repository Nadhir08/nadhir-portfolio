interface SectionLabelProps {
  number?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export function SectionLabel({ number, title, subtitle, align = 'center' }: SectionLabelProps) {
  const textAlign = align === 'center' ? 'center' : 'left'
  const alignItems = align === 'center' ? 'center' : 'flex-start'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems, gap: '0.75rem', marginBottom: '3.5rem' }}>
      {/* Section number + label */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.75rem',
          fontWeight: 500,
          letterSpacing: '0.15em',
          textTransform: 'uppercase' as const,
          color: 'var(--accent-cyan)',
        }}
      >
        {number && <span style={{ opacity: 0.5 }}>{number}</span>}
        {number && (
          <span
            style={{
              width: 24,
              height: 1,
              background: 'var(--accent-cyan)',
              opacity: 0.6,
              display: 'inline-block',
            }}
          />
        )}
        <span>{title}</span>
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '1.0625rem',
            maxWidth: '42rem',
            textAlign,
            lineHeight: 1.7,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default SectionLabel
