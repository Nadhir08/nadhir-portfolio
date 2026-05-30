export interface Project {
  id: string
  name: string
  nameEn?: string
  nameFr?: string
  category: string
  categoryFr: string
  status: 'active' | 'live' | 'delivered'
  period: string
  role: string
  roleFr: string
  impact: string
  impactFr: string
  description?: string
  descriptionFr?: string
  architecture: string[]
  architectureFr: string[]
  stack: string[]
  image?: string
  liveUrl?: string
  githubUrl?: string
}

export interface ExperienceEntry {
  id: string
  company: string
  role: string
  roleFr: string
  type: 'freelance' | 'internship' | 'pfe' | 'academic' | 'education'
  period: string
  current: boolean
  impact: string[]
  impactFr: string[]
  stack: string[]
}

export interface Skill {
  name: string
  level: 'expert' | 'advanced' | 'proficient'
}

export interface SkillDomain {
  id: string
  label: string
  labelFr: string
  icon: string
  color: string
  skills: Skill[]
}

export interface PhilosophyPrinciple {
  number: string
  title: string
  titleFr: string
  description: string
  descriptionFr: string
  icon: string
}

export type Theme = 'dark' | 'light'
export type Lang = 'en' | 'fr'
