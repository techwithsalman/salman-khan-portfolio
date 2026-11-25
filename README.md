# Cinematic 3D Personal Portfolio · Next.js & Three.js

A high-performance personal portfolio website inspired by the visual composition, immersive dark office atmosphere, and physics-driven micro-interactions of vanguard creative developer portfolios.

Built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, **GSAP & ScrollTrigger**, **Three.js**, and **Lenis** smooth scrolling.

---

## 🌟 Key Features & Architectural Highlights

### 1. Cinematic Hero Section
- **Cinematic Dark Office Interior**: Atmospheric dark slate/navy interior (`#000814` to `#001428`) with ambient desk reflections, bokeh skylines, and subtle perspective depth.
- **Oversized Two-Line Typography**: Monumental display typography (`ALEXANDER` / `VANCE`) floating behind the center portrait with mouse-driven parallax depth.
- **Transparent Personal Portrait**: Centered realistic portrait with layered depth, reacting with responsive 3D tilt to cursor trajectory.
- **Hanging Glass Designer ID Card**: Interactive glassmorphic badge suspended from the ceiling by a dual-threaded nylon lanyard with realistic spring recoil physics, mouse dragging, inertial swing, 3D tilt, barcode, and double-sided card flip.
- **Interactive Phone Contact Element**: Bottom-left contact beacon featuring a real-time availability indicator, direct WhatsApp trigger, one-click voice dialing, email link, and click-to-copy phone number with sound feedback.
- **Handwritten Typography & Notes**: Cursive typographic annotations, hand-drawn vector arrows, and creative developer stamps.
- **Scroll Into Work Button**: Circular spinning text button (`SCROLL INTO THE WORK · EXPLORE CASES`) with animated bouncing chevron and smooth viewport scrolling.
- **Hero Ambient Particle Dust**: Real-time Three.js additive particle system drifting in 3D coordinate space with mouse velocity reactions.

### 2. Broadcast Station · Horizontal Project Showcase
- **GSAP ScrollTrigger Horizontal Track**: Smooth horizontal pinned timeline showcasing production case studies on desktop and responsive swipe cards on mobile.
- **Gallery vs. List Mode Switcher**: Instantly toggle between visual horizontal cards and an architectural data index table.
- **Category Filter Matrix**: Filter by *All*, *3D WebGL*, *Creative Dev*, *Full-Stack*, and *Design System*.
- **Interactive Case Study Modal**: Deep-dive into problem statements, engineering challenges, solutions, performance benchmarks, live demo links, and GitHub repositories.
- **"Skip the Cases" Shortcut**: Instant navigational jump for rapid site evaluation.

### 3. Art Museum · 3D Generative Art Gallery
- **Live Three.js WebGL Viewports**: Interactive procedural geometries rendered in client-side WebGL:
  - *Singularity Torus Knot* (Parametric manifold with specular reflections)
  - *Quantum Icosahedron Lattice* (Nested rotating wireframe core)
  - *Liquid Cyber Prism* (Refractive glass cone prism)
  - *Cosmic Pulsar Core* (Turbulent wireframe displacement sphere)
  - *Tesseract Hypercube* (4D projection)
  - *Endless Möbius Ribbon* (Topological loop)
- **Direct 3D Interaction**: Click and drag any sculpture to orbit in 3D space.
- **Full-Screen 3D Modal**: Dedicated high-resolution viewport for close inspection.

### 4. The Nexus · About & Manifesto
- Creative manifesto and design engineering philosophy.
- Live telemetry counters (8+ years experience, 45+ projects, 14 awards, 60+ FPS target).
- Verified status indicator and geographical coordinates.
- One-click curriculum vitae download.

### 5. Time Corridor · Career & Capabilities Timeline
- **Tabbed Interactive Hub**:
  - `Experience` (Roles, achievements, tech tags, and company records)
  - `Diplomas` (Academic degrees, honors, and coursework)
  - `Skills` (Skill breakdown with visual percentage meters)
  - `Soft skills` (Creative direction, empathy, and systems design)
  - `Languages` (Multilingual proficiencies with national flags)

### 6. Creative Forge · Experimental Code Lab
- **Interactive Particle Flowfield**: 350+ particles streaming along trigonometric curl-noise vectors that deform around the cursor.
- **Glassmorphism Optics & Chromatic Refraction**: Interactive optical lens simulating Snell's law and real-time RGB split.
- **Harmonic Audio Synesthesia**: Web Audio API oscillator synthesizing live acoustic chord harmonics.
- **Magnetic Spring Matrix**: Responsive 36-node magnetic grid reacting with elastic spring deformation.

### 7. Signal Tower · Contact & Telemetry
- Interactive message transmission form with client validation and confetti explosion.
- Real-time digital clock showing local Pacific Time (`PST / San Francisco`).
- Instant communication via WhatsApp, voice phone, and email copy.
- Comprehensive social coordinate links.

### 8. System-Wide Utilities
- **Minimal Floating Navigation**: Top pill dock with section links, theme toggle, audio FX toggle, and search trigger.
- **Command Palette & Keyboard Navigation (Cmd+K / Ctrl+K)**: Instant keyboard-driven search and navigation across all projects, art pieces, skills, and sections.
- **Web Audio API Sound Synthesizer**: Client-side metallic clicks, card swooshes, phone chirps, and success chimes without external audio dependencies.
- **Dark / Light Mode**: Seamless theme switching with persistent localStorage settings.

---

## 📁 Project Architecture

```
portfolio-05/
├── public/
│   ├── docs/
│   │   └── Alexander_Vance_Resume.pdf   # Official downloadable resume PDF
│   ├── images/
│   │   ├── hero/
│   │   │   ├── office-bg.webp          # Dark cinematic interior background
│   │   │   └── portrait-front.webp     # Transparent personal portrait
│   │   └── projects/
│   │       ├── project-01.webp         # Lumina 3D Soundstage
│   │       ├── project-02.webp         # Strata Hypercar 3D
│   │       ├── project-03.webp         # Chronos Neural Foundry
│   │       ├── project-04.webp         # Aether Kinetic Type
│   │       ├── project-05.webp         # Zenith Tourbillon 3D
│   │       └── project-06.webp         # Nebula Design System
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── globals.css                 # Tailwind directives, fonts, scrollbar styles
│   │   ├── layout.tsx                  # Root layout with providers & metadata
│   │   └── page.tsx                    # Main landing page assembling all sections
│   ├── components/
│   │   ├── about/
│   │   │   └── AboutSection.tsx        # Manifesto, bio & telemetry stats
│   │   ├── contact/
│   │   │   └── ContactSection.tsx      # Signal transmission form & live clock
│   │   ├── gallery/
│   │   │   ├── ArtGallery3D.tsx        # 3D Art Museum grid & modal
│   │   │   └── SingleArtCanvas.tsx     # Three.js 3D viewport component
│   │   ├── hero/
│   │   │   ├── HandwrittenAccents.tsx  # Script annotations & arrows
│   │   │   ├── HeroAmbientCanvas.tsx   # Three.js particle dust canvas
│   │   │   ├── HeroSection.tsx         # Main Hero composition
│   │   │   ├── InteractivePhone.tsx    # Bottom-left phone contact pill
│   │   │   └── PhysicsGlassBadge.tsx   # Hanging glass ID card with spring physics
│   │   ├── lab/
│   │   │   └── CreativeLab.tsx         # Interactive physics & audio experiments
│   │   ├── layout/
│   │   │   └── SmoothScroll.tsx        # Lenis smooth scrolling with GSAP sync
│   │   ├── navigation/
│   │   │   └── FloatingNav.tsx         # Minimal floating dock navigation
│   │   ├── search/
│   │   │   └── CommandSearchModal.tsx  # Cmd+K search & keyboard navigation
│   │   ├── showcase/
│   │   │   ├── ProjectModal.tsx        # Case study deep-dive drawer
│   │   │   └── ProjectShowcase.tsx     # Horizontal scroll project gallery
│   │   └── timeline/
│   │       └── CareerTimeline.tsx      # Tabbed experience & skills timeline
│   ├── context/
│   │   └── PortfolioContext.tsx        # Global state (theme, sound, modals)
│   ├── data/
│   │   └── portfolioConfig.ts          # Master configuration file (ALL personal data)
│   ├── types/
│   │   └── portfolio.ts                # TypeScript interfaces
│   └── utils/
│       └── audio.ts                    # Web Audio API sound synthesizer
├── next.config.js                      # Next.js build configuration
├── tailwind.config.js                  # Tailwind tokens, fonts & animations
├── tsconfig.json                       # TypeScript compiler options
├── vercel.json                         # Vercel deployment configuration
└── package.json
```

---

## ⚙️ Centralized Configuration (`src/data/portfolioConfig.ts`)

Every piece of personal data, name, contact information, project list, 3D art piece, career milestone, and educational credential is strictly controlled by **one file**:
👉 `src/data/portfolioConfig.ts`

To personalize this website for yourself:
1. Open `src/data/portfolioConfig.ts`.
2. Update `personal`: `name`, `title`, `email`, `phone`, `whatsapp`, `location`, `socialLinks`.
3. Update `hero`: `oversizedNameLine1`, `oversizedNameLine2`, `badge` details.
4. Update `projects`: Replace project items with your own titles, descriptions, live links, and tech tags.
5. Update `experience`, `education`, and `skills` to reflect your career history.

---

## 🎨 Asset Replacement Guide

All media assets are stored inside `public/`:

| Asset File | Recommended Dimensions | Description |
| :--- | :--- | :--- |
| `public/images/hero/portrait-front.webp` | `800 x 1100 px` | Transparent PNG or WebP of yourself from chest or waist up. Rim lighting complements the dark office aesthetic. |
| `public/images/hero/office-bg.webp` | `1920 x 1080 px` | Dark interior background with cinematic lighting, desk horizon, or architectural studio geometry. |
| `public/images/projects/project-*.webp` | `900 x 600 px` (16:10 or 3:2) | High-resolution screenshots or mockups of your projects. |
| `public/docs/Alexander_Vance_Resume.pdf` | Standard A4 / Letter PDF | Your downloadable curriculum vitae. |
| `public/favicon.ico` | `32 x 32 px` | Website browser tab icon. |

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
```

### 4. Production Preview
```bash
npm run start
```

---

## 🚢 Deployment to Vercel

This repository includes a native `vercel.json` configuration. To deploy:

### Option A: Via Vercel CLI
```bash
npx vercel
```

### Option B: Via GitHub & Vercel Dashboard
1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "feat: cinematic 3D portfolio initial release"
   ```
2. Push to your GitHub repository.
3. Import the repository in [Vercel](https://vercel.com/new).
4. Vercel will automatically detect Next.js and deploy with optimal edge caching and compression.

---

## ♿ Accessibility & Performance

- **Reduced Motion Support**: Automatically disables intense GSAP inertial smooth scrolling when `prefers-reduced-motion: reduce` is enabled in user system settings.
- **Audio Consent**: Web Audio API respects browser autoplay policies and includes an intuitive one-click sound toggle (defaults can be muted).
- **Keyboard Navigation**: Full keyboard accessibility via `Tab`, `Escape`, `Enter`, and `Cmd+K` / `Ctrl+K`.
- **Zero Heavy External Runtimes**: Sound synthesis runs completely client-side via native Web Audio API oscillators without heavy external audio asset downloads.
