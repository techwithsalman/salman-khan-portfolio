export interface PersonalInfo {
  name: string
  firstName: string
  lastName: string
  title: string
  role: string
  tagline: string
  shortBio: string
  fullBio: string[]
  location: string
  status: string
  email: string
  phone: string
  phoneFormatted: string
  whatsapp: string
  avatar: string
  cvUrl: string
  socialLinks: {
    github?: string
    linkedin?: string
    twitter?: string
    behance?: string
    instagram?: string
    dribbble?: string
    codepen?: string
  }
}

export interface HeroConfig {
  oversizedNameLine1: string
  oversizedNameLine2: string
  handwrittenSubtitles: string[]
  badge: {
    title: string
    idNumber: string
    role: string
    department: string
    clearance: string
    issueDate: string
    barcodeText: string
    avatar: string
    specialty: string
  }
  contactPill: {
    phoneNumber: string
    statusText: string
    quickDialAction: string
    whatsappDirect: string
  }
  quickStats: Array<{
    label: string
    value: string
    description?: string
  }>
}

export interface ProjectItem {
  id: string
  slug: string
  title: string
  subtitle: string
  category: '3D WebGL' | 'Full-Stack' | 'Creative Dev' | 'AI & Interactive' | 'Design System'
  year: string
  client: string
  liveUrl?: string
  githubUrl?: string
  thumbnail: string
  badgeText: string
  description: string
  challenge: string
  solution: string
  technologies: string[]
  metrics?: { label: string; value: string }[]
  featured: boolean
  featuredNumber: string
}

export interface ArtGalleryItem {
  id: string
  title: string
  medium: string
  year: string
  description: string
  color: string
  accentColor: string
  geometryType: 'torusKnot' | 'icosahedron' | 'cyberCube' | 'quantumSphere' | 'mobiusStrip' | 'hyperPrism'
  tags: string[]
  aspectRatio: string
}

export interface ExperienceItem {
  id: string
  role: string
  company: string
  period: string
  location: string
  type: 'Full-time' | 'Lead' | 'Contract' | 'Advisory'
  description: string
  keyAchievements: string[]
  techStack: string[]
}

export interface EducationItem {
  id: string
  degree: string
  institution: string
  period: string
  location: string
  honors?: string
  courses: string[]
}

export interface SkillCategory {
  category: string
  skills: Array<{
    name: string
    level: number // 1 - 100
    icon?: string
    highlight?: boolean
  }>
}

export interface CreativeLabExperiment {
  id: string
  title: string
  type: 'Shader' | 'Physics' | 'Audio-Reactive' | 'Procedural' | 'Morphing'
  description: string
  fpsTarget: string
  instructions: string
  colorTheme: string
}

export interface PortfolioConfig {
  personal: PersonalInfo
  hero: HeroConfig
  projects: ProjectItem[]
  artGallery: ArtGalleryItem[]
  experience: ExperienceItem[]
  education: EducationItem[]
  skills: SkillCategory[]
  softSkills: string[]
  languages: Array<{ language: string; proficiency: string; flag: string }>
  creativeLab: CreativeLabExperiment[]
  meta: {
    siteTitle: string
    siteDescription: string
    siteKeywords: string[]
    themeColorDark: string
    themeColorLight: string
  }
}
