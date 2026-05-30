import { motion } from 'framer-motion'
import { Star, GitFork, BookOpen, AlertCircle } from 'lucide-react'
import { FiGithub as Github } from 'react-icons/fi'
import { useGithub } from '@/hooks/useGithub'
import { useLang } from '@/context/LangContext'
import GlowCard from '@/components/ui/GlowCard'
import Badge from '@/components/ui/Badge'

export function GithubSection() {
  const { t } = useLang()
  const { user, repos, loading, error } = useGithub('Nadhir08')

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-custom" style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 40, height: 40, border: '3px solid var(--border-color)', borderTopColor: 'var(--accent-blue)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        </div>
      </section>
    )
  }

  if (error || !user) {
    return (
      <section className="section-padding">
        <div className="container-custom" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          <AlertCircle style={{ margin: '0 auto', marginBottom: '1rem' }} />
          <p>Failed to load GitHub data. Visit profile directly.</p>
          <a href="https://github.com/Nadhir08" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-blue)', textDecoration: 'none', marginTop: '0.5rem', display: 'inline-block' }}>@Nadhir08</a>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding" style={{ background: 'var(--bg-elevated)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container-custom">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <Github size={28} style={{ color: 'var(--text-primary)' }} />
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                {t.github.title}
              </h2>
            </div>
            <p style={{ color: 'var(--text-secondary)' }}>{t.github.subtitle}</p>
          </div>
          
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.25rem',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: '0.5rem',
              color: 'var(--text-primary)',
              fontWeight: 600,
              fontSize: '0.875rem',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-blue)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-color)';
            }}
          >
            {t.github.viewProfile}
          </a>
        </div>

        {/* User Stats */}
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {[
            { label: t.github.repositories, value: user.public_repos, icon: <BookOpen size={18} /> },
            { label: t.github.followers, value: user.followers, icon: <Github size={18} /> },
          ].map(stat => (
            <div key={stat.label} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem', background: 'var(--bg-surface)', borderRadius: '0.75rem', border: '1px solid var(--border-color)' }}>
              <div style={{ color: 'var(--accent-blue)' }}>{stat.icon}</div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.25rem' }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Repos Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {repos.map((repo, i) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <GlowCard style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '0.5rem', wordBreak: 'break-all' }}>
                    <BookOpen size={16} />
                    {repo.name}
                  </h3>
                  {repo.language && (
                    <Badge variant="tech">{repo.language}</Badge>
                  )}
                </div>
                
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>
                  {repo.description || 'No description provided.'}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                    <Star size={14} style={{ color: repo.stargazers_count > 0 ? '#FBBF24' : 'currentColor' }} />
                    {repo.stargazers_count}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                    <GitFork size={14} />
                    {repo.forks_count}
                  </span>
                </div>
              </GlowCard>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GithubSection
