import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '@/context/LangContext'
import { skillDomains } from '@/data/skills'
import SectionLabel from '@/components/ui/SectionLabel'
import DomainHub from '@/components/architecture/DomainHub'
import SkillNode from '@/components/architecture/SkillNode'

export function Architecture() {
  const { lang, t } = useLang()
  const [activeId, setActiveId] = useState<string>(skillDomains[0].id)

  const activeDomain = skillDomains.find(d => d.id === activeId) || skillDomains[0]

  return (
    <section id="architecture" className="section-padding" style={{ position: 'relative' }}>
      {/* Background decoration */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '5%',
          width: '40vw',
          height: '40vw',
          background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />

      <div className="container-custom">
        <SectionLabel number="01" title={t.architecture.title} subtitle={t.architecture.subtitle} />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
          }}
        >
          {/* Left: Domain list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {skillDomains.map(domain => (
              <DomainHub
                key={domain.id}
                domain={domain}
                isActive={activeId === domain.id}
                onClick={() => setActiveId(domain.id)}
              />
            ))}
          </div>

          {/* Right: Active skills map (Desktop only) */}
          <div className="hidden-mobile" style={{ position: 'relative', minHeight: 400 }}>
            <div
              className="glass glow-border"
              style={{
                position: 'sticky',
                top: 120,
                borderRadius: '1.5rem',
                padding: '2.5rem',
                height: 'calc(100% - 120px)',
                minHeight: 500,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ marginBottom: '2rem' }}>
                <h3
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}
                >
                  <span
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: activeDomain.color,
                      boxShadow: `0 0 12px ${activeDomain.color}`,
                    }}
                  />
                  {lang === 'fr' ? activeDomain.labelFr : activeDomain.label}
                </h3>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                  style={{ flex: 1, display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start', gap: '0.75rem' }}
                >
                  {activeDomain.skills.map((skill, idx) => (
                    <SkillNode key={skill.name} skill={skill} index={idx} color={activeDomain.color} />
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Legend */}
              <div
                style={{
                  marginTop: 'auto',
                  paddingTop: '2rem',
                  borderTop: '1px solid var(--border-color)',
                  display: 'flex',
                  gap: '1.5rem',
                  flexWrap: 'wrap',
                }}
              >
                {(['expert', 'advanced', 'proficient'] as const).map((level) => (
                  <div key={level} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: 'var(--text-muted)',
                        opacity: level === 'expert' ? 1 : level === 'advanced' ? 0.75 : 0.5,
                      }}
                    />
                    {t.architecture.levels[level]}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Global stats */}
        <div
          style={{
            marginTop: '4rem',
            padding: '2rem',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-color)',
            borderRadius: '1rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
          }}
        >
          {[
            { value: t.architecture.stats.years, label: t.architecture.stats.yearsLabel },
            { value: t.architecture.stats.technologies, label: t.architecture.stats.technologiesLabel },
            { value: t.architecture.stats.apps, label: t.architecture.stats.appsLabel },
            { value: t.architecture.stats.languages, label: t.architecture.stats.languagesLabel },
          ].map(stat => (
            <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center', textAlign: 'center' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-blue)', letterSpacing: '-0.02em' }}>
                {stat.value}
              </span>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Architecture
