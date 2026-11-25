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

export const portfolioConfig: PortfolioConfig = {
  personal: {
    firstName: 'MOHAMED',
    lastName: 'ANDALOUSSI',
    fullName: 'Mohamed Andaloussi',
    role: 'Creative Developer & Graphic Designer',
    subtitle: 'Creative Developer, Graphic Designer and Video Editor in Tangier, Morocco.',
    location: 'Tangier, Morocco',
    email: 'andalossi90@gmail.com',
    phone: '+212688284783',
    phoneDisplay: '+212 688 284 783',
    whatsapp: '212688284783',
    instagram: '@andaluussi',
    linkedin: 'https://linkedin.com/in/mohamedandaloussi',
    github: 'https://github.com/mohamedandaloussi',
    behance: 'https://behance.net/mhmedaloui',
    cvUrl: '/docs/CV.pdf',
    timezone: 'Asia/Karachi',
    status: 'Available for Creative Engagements',
  },

  hero: {
    nameLine1: 'MOHAMED',
    nameLine2: 'ANDALOUSSI',
    scriptText: 'design & code',
    designerCard: {
      year: '2026',
      role: 'CREATIVE DEV // DESIGNER',
      name: 'M. ANDALOUSSI',
      focus: 'DESIGN × CODE',
      instagram: '@ANDALUUSSI',
      email: 'ANDALOSSI90@GMAIL.COM',
      photo: '/images/ref/portrait-jacket-1080.webp',
    },
  },

  projects: [
    {
      id: 'case-01',
      number: '01 / 07',
      title: 'TANGIER CITY PORT',
      category: 'Full-Stack Developer & Graphic Designer',
      description: 'Official interactive port portal and marina infrastructure management platform for SGPTV Tangier.',
      liveUrl: 'https://tangier-city-port.vercel.app',
      domain: 'tangier-city-port.vercel.app',
      screenshot: '/images/cases/case-tangierport.webp',
      badgeText: 'PORT DE TANGER VILLE',
      tags: ['Next.js', 'TypeScript', 'UI/UX Design', 'Branding'],
    },
    {
      id: 'case-02',
      number: '02 / 07',
      title: '2M CRAFTERS',
      category: 'Creative Direction & Full-Stack Development',
      description: 'Flagship creative studio platform featuring high-impact interactive web storytelling and multimedia showcase.',
      liveUrl: 'https://2mcrafters.com',
      domain: '2mcrafters.com',
      screenshot: '/images/cases/case-crafters.webp',
      badgeText: 'CREATIVE AGENCY',
      tags: ['GSAP', 'WebGL', 'Motion Design', 'Video Production'],
    },
    {
      id: 'case-03',
      number: '03 / 07',
      title: 'TAXI VOYAGE MOGADOR',
      category: 'Web Platform & Booking Architecture',
      description: 'Comprehensive inter-city private transit booking system and fleet dispatch interface for tourist transit.',
      liveUrl: 'https://taxivoyagemogador.ma',
      domain: 'taxivoyagemogador.ma',
      screenshot: '/images/cases/case-taxivoyagemogador.webp',
      badgeText: 'TRANSIT & MOBILITY',
      tags: ['React', 'Next.js', 'Booking Engine', 'Tailwind CSS'],
    },
    {
      id: 'case-04',
      number: '04 / 07',
      title: 'BOUKIR DIAMOND',
      category: 'Haute Joaillerie & Digital Flagship',
      description: 'Luxury jewelry e-commerce experience showcasing fine gemstones, bespoke rings, and artisanal craftsmanship.',
      liveUrl: 'https://boukirdiamond.ma',
      domain: 'boukirdiamond.ma',
      screenshot: '/images/cases/case-boukirdiamond.webp',
      badgeText: 'HAUTE JOAILLERIE',
      tags: ['E-Commerce', 'Luxury Branding', 'Responsive Web'],
    },
    {
      id: 'case-05',
      number: '05 / 07',
      title: 'PORT AZUR',
      category: 'Marina Real Estate & Visual Architecture',
      description: 'Promotional digital experience for waterfront luxury real estate, residences, and private berth leasing.',
      liveUrl: 'https://portazur.ma',
      domain: 'portazur.ma',
      screenshot: '/images/cases/case-portazur.webp',
      badgeText: 'LUXURY LIVING',
      tags: ['Interactive Layout', 'Graphic Design', 'Architecture'],
    },
    {
      id: 'case-06',
      number: '06 / 07',
      title: 'ATLAS NEST',
      category: 'Eco-Resort & Spatial Hospitality Experience',
      description: 'Immersive booking site and virtual tour platform for mountain ecolodges and bespoke high-atlas excursions.',
      liveUrl: 'https://atlasnest.ma',
      domain: 'atlasnest.ma',
      screenshot: '/images/cases/case-atlasnest.webp',
      badgeText: 'ECO RESORT',
      tags: ['UI/UX', 'Full-Stack', 'Photography Direction'],
    },
    {
      id: 'case-07',
      number: '07 / 07',
      title: 'ROVELIS ATLAS',
      category: 'Industrial Logistics & Automotive Fleet',
      description: 'Enterprise fleet tracking interface and corporate digital identity for cross-continental freight carriers.',
      liveUrl: 'https://rovelisatlas.ma',
      domain: 'rovelisatlas.ma',
      screenshot: '/images/cases/case-rovelisatlas.webp',
      badgeText: 'FLEET & LOGISTICS',
      tags: ['Web Application', 'TypeScript', 'Brand Identity'],
    },
  ],

  experience: [
    {
      period: '2022 — Present',
      role: 'Graphic Designer & Filmmaker',
      company: 'Tanja Marina Bay International',
      location: 'Tangier, Morocco',
      description: 'Leading brand creative direction, documentary filmmaking, interactive visual assets, and marketing campaigns for the flagship Mediterranean marina.',
      deliverables: [
        'Creative direction for international nautical events and regattas',
        'High-production promotional video editing and motion graphics',
        'Digital brand identity systems across web and physical spaces',
      ],
    },
    {
      period: '2020 — 2022',
      role: 'Full-Stack Developer & Graphic Designer',
      company: 'Port de Tanger Ville — SGPTV',
      location: 'Tangier, Morocco',
      description: 'Engineered web platforms, internal management portals, and public information displays for passenger traffic and cruise terminals.',
      deliverables: [
        'Developed official passenger portal with real-time ferry departures',
        'Designed high-visibility terminal signage and print publications',
      ],
    },
    {
      period: '2018 — 2020',
      role: 'Full-Stack Developer & Graphic Designer',
      company: 'Conceptify by Insic',
      location: 'Tangier, Morocco',
      description: 'Built client e-commerce platforms, brand identities, and responsive web applications for international retail and corporate partners.',
      deliverables: [
        'Delivered 20+ custom responsive client websites',
        'Implemented modern UI design systems and interactive animations',
      ],
    },
  ],

  education: [
    {
      period: '2016 — 2018',
      degree: 'Specialized Technician in Software Development',
      institution: 'ISTA NTIC',
      location: 'Tangier, Morocco',
      highlight: 'Full-Stack Software Architecture & Database Design',
    },
    {
      period: '2014 — 2016',
      degree: 'Applied Arts & Visual Communications',
      institution: 'Lycée Moulay Al Hassan',
      location: 'Tangier, Morocco',
      highlight: 'Graphic Design, Color Theory & Typographic Systems',
    },
  ],

  skills: [
    {
      category: 'Design & Visual Arts',
      items: [
        { name: 'Graphic Design & Brand Systems', level: 96 },
        { name: 'Video Editing & Color Grading (Premiere / DaVinci)', level: 94 },
        { name: 'UI / UX Design & Prototyping (Figma)', level: 92 },
        { name: 'Motion Graphics (After Effects)', level: 90 },
      ],
    },
    {
      category: 'Creative Development & Web',
      items: [
        { name: 'Next.js & React App Architecture', level: 94 },
        { name: 'TypeScript & Modern JavaScript', level: 92 },
        { name: 'Tailwind CSS & Responsive Layouts', level: 96 },
        { name: 'GSAP, ScrollTrigger & Web Animations', level: 90 },
        { name: 'Three.js / Canvas Interactive Visuals', level: 86 },
      ],
    },
  ],

  softSkills: [
    'Creative & Artistic Direction',
    'Visual Storytelling & Narrative Pacing',
    'Cross-disciplinary Problem Solving',
    'Attention to Detail & Typographic Craft',
    'Client Communication & Pitch Presentations',
    'Fast Turnaround & Production Agility',
  ],

  languages: [
    { language: 'Arabic', proficiency: 'Native Language', code: 'AR', flag: '🇲🇦' },
    { language: 'French', proficiency: 'Full Professional Proficiency', code: 'FR', flag: '🇫🇷' },
    { language: 'English', proficiency: 'Professional Working Proficiency', code: 'EN', flag: '🇬🇧' },
    { language: 'Spanish', proficiency: 'Conversational Working Proficiency', code: 'ES', flag: '🇪🇸' },
  ],

  meta: {
    siteTitle: 'Mohamed Andaloussi | Creative Developer & Graphic Designer',
    siteDescription: 'Explore Mohamed Andaloussi’s creative portfolio in Tangier, Morocco. Discover web development, graphic design, branding, filmmaking, UI/UX and digital projects.',
    themeColor: '#001428',
  },
}
