import { motion } from 'framer-motion'
import FloatingBadge from './FloatingBadge'

const floatingTechs = [
  { label: 'Django', delay: 0, style: { top: '10%', left: '-8%' } },
  { label: 'React', delay: 0.4, style: { top: '8%', right: '-5%' } },
  { label: 'Docker', delay: 0.8, style: { top: '45%', right: '-12%' } },
  { label: 'PostgreSQL', delay: 0.2, style: { bottom: '18%', right: '-8%' } },
  { label: 'Next.js', delay: 0.6, style: { bottom: '12%', left: '-10%' } },
  { label: 'CI/CD', delay: 1.0, style: { top: '45%', left: '-12%' } },
]

export function HeroPortrait() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="hero-portrait-wrapper"
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: 420,
        margin: '0 auto',
      }}
    >
      {/* Ambient glow background */}
      <div
        className="hero-glow"
        style={{
          position: 'absolute',
          inset: -40,
          background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.15) 0%, rgba(6,182,212,0.05) 50%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      {/* Outer rotating ring */}
      <div
        className="animate-spin-slow hero-ring-outer"
        style={{
          position: 'absolute',
          inset: -12,
          borderRadius: '50%',
          border: '1px solid transparent',
          borderTopColor: 'var(--accent-blue)',
          borderRightColor: 'var(--accent-cyan)',
          opacity: 0.4,
        }}
      />

      {/* Glow ring */}
      <div
        className="animate-glow-pulse hero-ring-glow"
        style={{
          position: 'absolute',
          inset: -4,
          borderRadius: '50%',
          border: '2px solid var(--accent-blue)',
          opacity: 0.5,
        }}
      />

      {/* Portrait image */}
      <div
        className="hero-portrait-img"
        style={{
          width: 280,
          height: 280,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '3px solid var(--border-color)',
          position: 'relative',
          zIndex: 2,
          flexShrink: 0,
        }}
      >
        <img
          src="/images/photo_cercle.jpg"
          alt="Nadhir Baatout — Full-Stack Engineer"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
          }}
          onError={e => {
            // Fallback to initials if image not found
            const target = e.currentTarget
            target.style.display = 'none'
            const parent = target.parentElement
            if (parent) {
              parent.style.background = 'linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))'
              parent.style.display = 'flex'
              parent.style.alignItems = 'center'
              parent.style.justifyContent = 'center'
              const initials = document.createElement('span')
              initials.textContent = 'NB'
              initials.style.cssText = 'font-size:4rem;font-weight:800;color:#fff;font-family:Inter,sans-serif'
              parent.appendChild(initials)
            }
          }}
        />
      </div>

      {/* Floating badges */}
      {floatingTechs.map(tech => (
        <FloatingBadge
          key={tech.label}
          label={tech.label}
          delay={tech.delay}
          style={tech.style}
        />
      ))}
    </motion.div>
  )
}

export default HeroPortrait
