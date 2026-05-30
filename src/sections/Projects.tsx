import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '@/context/LangContext'
import { projects } from '@/data/projects'
import SectionLabel from '@/components/ui/SectionLabel'
import ProjectCard from '@/components/projects/ProjectCard'

export function Projects() {
  const { t } = useLang()
  const [filter, setFilter] = useState('all')

  const filters = [
    { id: 'all', label: t.projects.filters.all },
    { id: 'Backend', label: t.projects.filters.backend },
    { id: 'Full-Stack', label: t.projects.filters.fullstack },
  ]

  const filteredProjects = projects.filter(p => {
    if (filter === 'all') return true
    if (filter === 'Backend' && p.category.includes('Backend') || p.category.includes('Fraud')) return true
    if (filter === 'Full-Stack' && (p.category.includes('Platform') || p.category.includes('ERP') || p.category.includes('E-Commerce') || p.category.includes('Real Estate'))) return true
    return false
  })

  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        <SectionLabel number="02" title={t.projects.title} subtitle={t.projects.subtitle} />

        {/* Filters */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
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

        {/* Projects List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default Projects
