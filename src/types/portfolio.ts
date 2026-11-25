export interface ProjectCase {
  id: string
  number: string
  title: string
  category: string
  description: string
  liveUrl: string
  domain: string
  screenshot: string
  badgeText: string
  tags: string[]
}

export interface PortfolioConfig {
  personal: {
    firstName: string
    lastName: string
    fullName: string
    role: string
    subtitle: string
    location: string
    email: string
    phone: string
    phoneDisplay: string
    whatsapp: string
    instagram: string
    linkedin: string
    github: string
    behance: string
    cvUrl: string
    timezone: string
    status: string
  }
  hero: {
    nameLine1: string
    nameLine2: string
    scriptText: string
    designerCard: {
      year: string
      role: string
      name: string
      focus: string
      instagram: string
      email: string
      photo: string
    }
  }
  projects: ProjectCase[]
  experience: Array<{
    period: string
    role: string
    company: string
    location: string
    description: string
    deliverables: string[]
  }>
  education: Array<{
    period: string
    degree: string
    institution: string
    location: string
    highlight: string
  }>
  skills: Array<{
    category: string
    items: Array<{ name: string; level: number }>
  }>
  softSkills: string[]
  languages: Array<{
    language: string
    proficiency: string
    code: string
    flag: string
  }>
  meta: {
    siteTitle: string
    siteDescription: string
    themeColor: string
  }
}
