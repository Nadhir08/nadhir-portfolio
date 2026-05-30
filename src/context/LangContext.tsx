import { createContext, useContext, useState } from 'react'
import type { Lang } from '@/types'
import { en } from '@/i18n/en'
import { fr } from '@/i18n/fr'
import type { Translations } from '@/i18n/en'

interface LangContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Translations
}

const translations = { en, fr }

const LangContext = createContext<LangContextType>({
  lang: 'en',
  setLang: () => {},
  t: en,
})

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem('portfolio-lang') as Lang | null
    if (stored === 'en' || stored === 'fr') return stored
    return navigator.language.startsWith('fr') ? 'fr' : 'en'
  })

  const setLang = (newLang: Lang) => {
    setLangState(newLang)
    localStorage.setItem('portfolio-lang', newLang)
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
