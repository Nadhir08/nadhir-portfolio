import { motion } from 'framer-motion'

interface FloatingBadgeProps {
  label: string
  delay?: number
  style?: React.CSSProperties
}

export function FloatingBadge({ label, delay = 0, style }: FloatingBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      style={{
        position: 'absolute',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.35rem 0.85rem',
        background: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: '999px',
        fontSize: '0.78rem',
        fontWeight: 600,
        fontFamily: 'JetBrains Mono, monospace',
        color: 'var(--accent-cyan)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        animation: `float ${3 + delay}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        zIndex: 10,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'var(--accent-blue)',
          boxShadow: '0 0 6px var(--accent-blue)',
        }}
      />
      {label}
    </motion.div>
  )
}

export default FloatingBadge
