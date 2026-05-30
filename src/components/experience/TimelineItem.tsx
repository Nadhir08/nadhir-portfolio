import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, ChevronRight, CheckCircle2 } from 'lucide-react'
import type { ExperienceEntry } from '@/types'
import { useLang } from '@/context/LangContext'

interface TimelineItemProps {
  entry: ExperienceEntry
  isLast: boolean
}

export function TimelineItem({ entry, isLast }: TimelineItemProps) {
  const { lang } = useLang()

  const isEdu = entry.type === 'education' || entry.type === 'academic' || entry.type === 'pfe'
  const Icon = isEdu ? GraduationCap : Briefcase

  const role = lang === 'fr' ? entry.roleFr : entry.role
  const impact = lang === 'fr' ? entry.impactFr : entry.impact

  return (
    <div style={{ display: 'flex', gap: '1.5rem', position: 'relative' }}>
      {/* Timeline spine */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: entry.current ? 'var(--accent-blue)' : 'var(--bg-surface)',
            border: `2px solid ${entry.current ? 'var(--accent-blue)' : 'var(--border-color)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: entry.current ? '#fff' : 'var(--text-secondary)',
            zIndex: 2,
            boxShadow: entry.current ? '0 0 20px rgba(59,130,246,0.4)' : 'none',
          }}
        >
          <Icon size={20} />
        </div>
        {!isLast && (
          <div
            style={{
              width: 2,
              flex: 1,
              background: entry.current
                ? 'linear-gradient(to bottom, var(--accent-blue), var(--border-color))'
                : 'var(--border-color)',
              margin: '0.5rem 0',
              opacity: 0.5,
            }}
          />
        )}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        style={{
          flex: 1,
          paddingBottom: isLast ? 0 : '3rem',
        }}
      >
        <div
          className="glow-border glass"
          style={{
            padding: '2rem',
            borderRadius: '1rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {entry.current && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                padding: '0.25rem 1rem',
                background: 'rgba(59,130,246,0.15)',
                color: 'var(--accent-blue)',
                fontSize: '0.75rem',
                fontWeight: 700,
                fontFamily: 'JetBrains Mono, monospace',
                borderBottomLeftRadius: '0.75rem',
              }}
            >
              PRESENT
            </div>
          )}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                {role}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '1rem' }}>
                {entry.company}
              </div>
            </div>
            <div
              style={{
                padding: '0.25rem 0.75rem',
                background: 'var(--bg-base)',
                border: '1px solid var(--border-color)',
                borderRadius: '999px',
                fontSize: '0.8125rem',
                color: 'var(--text-secondary)',
                fontFamily: 'JetBrains Mono, monospace',
                whiteSpace: 'nowrap',
              }}
            >
              {entry.period}
            </div>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {impact.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                <CheckCircle2 size={18} style={{ color: 'var(--accent-blue)', flexShrink: 0, marginTop: '0.1rem' }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {entry.stack.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
              {entry.stack.map(tech => (
                <span
                  key={tech}
                  style={{
                    padding: '0.25rem 0.75rem',
                    background: 'rgba(59,130,246,0.05)',
                    border: '1px solid rgba(59,130,246,0.2)',
                    borderRadius: '0.5rem',
                    fontSize: '0.75rem',
                    color: 'var(--text-primary)',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default TimelineItem
