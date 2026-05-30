import HeroContent from '@/components/hero/HeroContent'
import HeroPortrait from '@/components/hero/HeroPortrait'
import TechMarquee from '@/components/hero/TechMarquee'

export function Hero() {
  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Background gradients */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '60vh',
          background: 'linear-gradient(180deg, rgba(59,130,246,0.08) 0%, var(--bg-base) 100%)',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />
      <div
        className="grid-bg"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.5,
          pointerEvents: 'none',
          zIndex: -1,
          maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 70%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 70%, transparent)',
        }}
      />

      {/* Main hero content */}
      <div
        className="container-custom"
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          paddingTop: '6rem', // Account for navbar
          paddingBottom: '3rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <HeroContent />
          <HeroPortrait />
        </div>
      </div>

      <TechMarquee />
    </section>
  )
}

export default Hero
