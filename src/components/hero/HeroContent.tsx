import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronDown, MapPin } from 'lucide-react'
import { useLang } from '@/context/LangContext'
import TypewriterTitle from './TypewriterTitle'
import Button from '@/components/ui/Button'

const container: any = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}
const item: any = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export function HeroContent() {
  const { t } = useLang()
  const [cvOpen, setCvOpen] = useState(false)

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      {/* Label */}
      <motion.div variants={item}>
        <span
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.8rem',
            fontWeight: 500,
            color: 'var(--accent-cyan)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span style={{ width: 20, height: 1, background: 'var(--accent-cyan)' }} />
          {t.hero.label}
        </span>
      </motion.div>

      {/* Name */}
      <motion.h1
        variants={item}
        style={{
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: 900,
          color: 'var(--text-primary)',
          lineHeight: 1.08,
          letterSpacing: '-0.03em',
          margin: 0,
        }}
      >
        Nadhir
        <br />
        <span className="text-gradient">Baatout</span>
      </motion.h1>

      {/* Typewriter */}
      <motion.div variants={item}>
        <TypewriterTitle />
      </motion.div>

      {/* Tagline */}
      <motion.p
        variants={item}
        style={{
          color: 'var(--text-secondary)',
          fontSize: 'clamp(1rem, 2vw, 1.125rem)',
          lineHeight: 1.7,
          maxWidth: '30rem',
          margin: 0,
        }}
      >
        {t.hero.tagline}
      </motion.p>

      {/* CTAs */}
      <motion.div variants={item} style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button
          variant="primary"
          size="lg"
          rightIcon={<ArrowRight size={18} />}
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        >
          {t.hero.viewProjects}
        </Button>

        {/* CV dropdown */}
        <div style={{ position: 'relative' }}>
          <Button
            variant="secondary"
            size="lg"
            rightIcon={<ChevronDown size={16} />}
            onClick={() => setCvOpen(v => !v)}
          >
            {t.hero.downloadCV}
          </Button>
          <AnimatePresence>
            {cvOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 0.5rem)',
                  left: 0,
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '0.75rem',
                  padding: '0.5rem',
                  minWidth: 180,
                  boxShadow: '0 16px 40px rgba(0,0,0,0.3)',
                  zIndex: 100,
                }}
              >
                {[
                  { label: '🇬🇧 English PDF', href: '/cv/Nadhir_Baatout_CV_EN.pdf' },
                  { label: '🇫🇷 French PDF', href: '/cv/Nadhir_Baatout_CV_FR.pdf' },
                ].map(cv => (
                  <a
                    key={cv.href}
                    href={cv.href}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setCvOpen(false)}
                    style={{
                      display: 'block',
                      padding: '0.65rem 1rem',
                      borderRadius: '0.5rem',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      textDecoration: 'none',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                  >
                    {cv.label}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Location & availability */}
      <motion.div variants={item} style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            color: 'var(--text-muted)',
            fontSize: '0.875rem',
          }}
        >
          <MapPin size={14} />
          {t.hero.location} · {t.hero.openToRemote}
        </span>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[t.hero.fullTime, t.hero.freelance].map(label => (
            <span
              key={label}
              style={{
                padding: '0.2rem 0.7rem',
                borderRadius: '999px',
                background: 'rgba(59,130,246,0.1)',
                border: '1px solid rgba(59,130,246,0.25)',
                color: 'var(--accent-blue)',
                fontSize: '0.75rem',
                fontWeight: 600,
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default HeroContent
