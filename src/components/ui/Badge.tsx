interface BadgeProps {
  children: React.ReactNode
  variant?: 'tech' | 'status' | 'category' | 'type'
  status?: 'active' | 'live' | 'delivered'
  color?: string
  style?: React.CSSProperties
}

const statusColors: Record<string, { bg: string; color: string; dot: string }> = {
  active: { bg: 'rgba(16,185,129,0.12)', color: '#10B981', dot: '#10B981' },
  live: { bg: 'rgba(6,182,212,0.12)', color: '#06B6D4', dot: '#06B6D4' },
  delivered: { bg: 'rgba(139,163,199,0.12)', color: '#8BA3C7', dot: '#8BA3C7' },
}

export function Badge({ children, variant = 'tech', status, color }: BadgeProps) {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    padding: '0.2rem 0.65rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: 500,
    fontFamily: 'JetBrains Mono, monospace',
    whiteSpace: 'nowrap' as const,
    transition: 'all 0.2s ease',
  }

  if (variant === 'tech') {
    return (
      <span
        style={{
          ...base,
          background: 'rgba(30,58,95,0.5)',
          color: 'var(--text-secondary)',
          border: '1px solid var(--border-color)',
        }}
      >
        {children}
      </span>
    )
  }

  if (variant === 'status' && status) {
    const sc = statusColors[status]
    return (
      <span style={{ ...base, background: sc.bg, color: sc.color, border: `1px solid ${sc.color}40` }}>
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: sc.dot,
            boxShadow: `0 0 6px ${sc.dot}`,
            animation: status === 'active' ? 'glowPulse 2s ease-in-out infinite' : 'none',
          }}
        />
        {children}
      </span>
    )
  }

  if (variant === 'category') {
    return (
      <span
        style={{
          ...base,
          background: 'rgba(59,130,246,0.1)',
          color: 'var(--accent-blue)',
          border: '1px solid rgba(59,130,246,0.3)',
        }}
      >
        {children}
      </span>
    )
  }

  if (variant === 'type' && color) {
    return (
      <span
        style={{
          ...base,
          background: `${color}18`,
          color: color,
          border: `1px solid ${color}40`,
        }}
      >
        {children}
      </span>
    )
  }

  return <span style={base}>{children}</span>
}

export default Badge
