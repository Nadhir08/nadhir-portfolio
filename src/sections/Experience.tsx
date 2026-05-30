import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '@/context/LangContext'
import { experiences } from '@/data/experience'
import SectionLabel from '@/components/ui/SectionLabel'
import TimelineItem from '@/components/experience/TimelineItem'

export function Experience() {
  const { t } = useLang()
  const [filter, setFilter] = useState<'all' | 'professional' | 'academic'>('all')

  const filteredExp = experiences.filter(exp => {
    if (filter === 'all') return true
    if (filter === 'professional') return ['freelance', 'internship'].includes(exp.type)
    if (filter === 'academic') return ['pfe', 'academic', 'education'].includes(exp.type)
    return true
  })

  return (
    <section id="experience" className="section-padding" style={{ position: 'relative' }}>
      {/* Background decoration */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-10%',
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(6,182,212,0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />

      <div className="container-custom" style={{ maxWidth: 900 }}>
        <SectionLabel number="03" title={t.experience.title} subtitle={t.experience.subtitle} />

        {/* Filters */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '4rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All' },
            { id: 'professional', label: t.experience.professional },
            { id: 'academic', label: t.experience.academic },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as any)}
              style={{
                padding: '0.5rem 1.25rem',
                background: filter === f.id ? 'var(--accent-blue)' : 'var(--bg-surface)',
                color: filter === f.id ? '#fff' : 'var(--text-secondary)',
                border: '1px solid',
                borderColor: filter === f.id ? 'var(--accent-blue)' : 'var(--border-color)',
                borderRadius: '999px',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          <AnimatePresence mode="popLayout">
            {filteredExp.map((exp, index) => (
              <motion.div
                key={exp.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <TimelineItem entry={exp} isLast={index === filteredExp.length - 1} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default Experience
