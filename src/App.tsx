import React, { Suspense } from 'react'
import { ThemeProvider } from '@/context/ThemeContext'
import { LangProvider } from '@/context/LangContext'
import { useLenis } from '@/hooks/useLenis'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/ui/ScrollProgress'

import Hero from '@/sections/Hero'
import Architecture from '@/sections/Architecture'
import Projects from '@/sections/Projects'
import Experience from '@/sections/Experience'
import Philosophy from '@/sections/Philosophy'
import Contact from '@/sections/Contact'

function AppContent() {
  useLenis() // Initialize smooth scroll

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Architecture />
        <Projects />
        <Experience />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <Suspense fallback={null}>
          <AppContent />
        </Suspense>
      </LangProvider>
    </ThemeProvider>
  )
}

export default App
