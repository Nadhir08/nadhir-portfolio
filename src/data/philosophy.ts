import type { PhilosophyPrinciple } from '@/types'

export const principles: PhilosophyPrinciple[] = [
  {
    number: '01',
    title: 'Build for Production, Not Demos',
    titleFr: 'Construire pour la Production',
    icon: 'Rocket',
    description:
      'Every system I design ships with monitoring, security, and scalability baked in from day one — not added as an afterthought.',
    descriptionFr:
      "Chaque système que je conçois est livré avec monitoring, sécurité et scalabilité intégrés dès le premier jour — jamais en afterthought.",
  },
  {
    number: '02',
    title: 'Security Is a Foundation',
    titleFr: 'La Sécurité, une Fondation',
    icon: 'Shield',
    description:
      'JWT authentication, RBAC authorization, binary-level file validation, and input hardening are standard practice — not optional extras.',
    descriptionFr:
      'JWT, RBAC, validation binaire des fichiers et sécurisation des entrées sont des pratiques standard — pas des options.',
  },
  {
    number: '03',
    title: 'Automate What Repeats',
    titleFr: 'Automatiser ce qui Se Répète',
    icon: 'Zap',
    description:
      'CI/CD pipelines, task queues, and infrastructure-as-code eliminate manual bottlenecks and free engineers to solve real problems.',
    descriptionFr:
      "Pipelines CI/CD, files de tâches et infrastructure-as-code éliminent les goulots d'étranglement manuels.",
  },
  {
    number: '04',
    title: 'Architecture Outlives Code',
    titleFr: "L'Architecture Survit au Code",
    icon: 'Layers',
    description:
      'I think in systems before writing a single line. Bad architecture compounds over time; so does good architecture.',
    descriptionFr:
      "Je pense en systèmes avant d'écrire la moindre ligne. La mauvaise architecture s'accumule — la bonne aussi.",
  },
  {
    number: '05',
    title: 'Ship Fast. Monitor Always.',
    titleFr: 'Livrer Vite. Monitorer Toujours.',
    icon: 'Activity',
    description:
      'Prometheus and Grafana are not optional. Real-time observability is how I know a system is alive, healthy, and delivering value.',
    descriptionFr:
      "Prometheus et Grafana ne sont pas optionnels. L'observabilité temps réel, c'est la preuve que le système fonctionne.",
  },
  {
    number: '06',
    title: 'AI Tools Amplify, Not Replace',
    titleFr: "L'IA Amplifie, Elle ne Remplace Pas",
    icon: 'Cpu',
    description:
      'I leverage Claude Code and Cursor to accelerate development velocity. AI amplifies engineering rigor — it does not substitute for it.',
    descriptionFr:
      "J'utilise Claude Code et Cursor pour accélérer. L'IA amplifie la rigueur d'ingénierie — elle ne la remplace pas.",
  },
]
