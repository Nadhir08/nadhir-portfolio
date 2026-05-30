import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface GlowCardProps {
  children: React.ReactNode
  className?: string
  noPadding?: boolean
  delay?: number
  style?: React.CSSProperties
}

export function GlowCard({ children, className, noPadding, delay = 0, style }: GlowCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn('glow-border glass', className)}
      style={{
        borderRadius: '1rem',
        padding: noPadding ? 0 : '1.75rem',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Subtle inner shine */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)',
          pointerEvents: 'none',
        }}
      />
      {children}
    </motion.div>
  )
}

export default GlowCard
