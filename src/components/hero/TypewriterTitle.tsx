import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '@/context/LangContext'

export function TypewriterTitle() {
  const { t } = useLang()
  const roles = t.hero.roles
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(i => (i + 1) % roles.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [roles.length])

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', height: '1.2em' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={`${index}-${roles[index]}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-gradient"
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
      <span
        className="animate-blink"
        style={{
          width: 3,
          height: '1.1em',
          background: 'var(--accent-cyan)',
          borderRadius: 2,
          display: 'inline-block',
          flexShrink: 0,
        }}
      />
    </div>
  )
}

export default TypewriterTitle
