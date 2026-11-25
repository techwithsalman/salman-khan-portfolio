# Mohamed Andaloussi · Creative Portfolio

A personal creative developer and designer portfolio recreating the visual composition, luxury industrial office atmosphere, typography hierarchy, and interactive experience of [2mcrafters.com/mohamedandaloussi](https://2mcrafters.com/mohamedandaloussi/).

Built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Lenis** smooth scrolling.

---

## 🌟 Key Visual & Interactive Features

### 1. Hero Section (Visual Composition)
- **Photorealistic Luxury Industrial Office Background**: Dark wooden shelves on the left with warm decorative lamps, large industrial windows with nighttime city views on the right, brick walls, and leather office chair.
- **Hanging Green Plant in Upper-Left Foreground**: Suspended leafy foliage framing the top-left perspective.
- **Oversized Two-Line Typography**: Monumental uppercase bold display typography (`MOHAMED` / `ANDALOUSSI`) positioned behind the character with a white-to-light-grey gradient.
- **Main Photographic Character**: High-resolution transparent photographic portrait of the creator wearing a black leather jacket and white shirt, holding a laptop in one hand and a phone in the other.
- **Shoulder Robot Companion**: Miniature companion robot sitting on the shoulder with an animated waving hand and interactive speech bubble (`"Hi! We're here for you."`).
- **Hanging Glass Designer ID Card**: Hanging lanyard strap extending from above the viewport, metal clip, transparent glass sleeve, and black inner card with `DESIGNER CARD 2026`, photo, and contact details with physics drag & tilt.
- **Handwritten Typography**: Cursive script typography (`design & code`).
- **Interactive Smartphone in Bottom-Left**: Realistic iPhone with real-time clock (`Asia/Karachi` timezone), caller details, white hand-drawn arrow pointing toward it, and glowing `"Let's Talk"` button expanding WhatsApp, voice call, email, and copy-number actions.
- **Scroll Into Work Button**: Bottom-center pill button (`SCROLL INTO THE WORK`) with downward navigation arrow.
- **Minimal Floating Navigation**: Top-right floating pill (`MENU` + sound toggle) expanding into the numbered menu.

### 2. Project Showcase (Cinematic Laptop Presentation)
- **Full-Screen Darker Office Environment**: Dimmed ambient studio atmosphere.
- **Large Central Metallic Laptop Mockup**: Occupies ~70% of desktop viewport with screen bezel, webcam dot, browser address bar (`tangier-city-port.vercel.app`), keyboard deck, and trackpad.
- **Actual Website Screenshots Inside Screen**: Displays high-resolution portfolio cases:
  1. `TANGIER CITY PORT` (`tangier-city-port.vercel.app`)
  2. `2M CRAFTERS` (`2mcrafters.com`)
  3. `TAXI VOYAGE MOGADOR` (`taxivoyagemogador.ma`)
  4. `BOUKIR DIAMOND` (`boukirdiamond.ma`)
  5. `PORT AZUR` (`portazur.ma`)
  6. `ATLAS NEST` (`atlasnest.ma`)
  7. `ROVELIS ATLAS` (`rovelisatlas.ma`)
- **Left-Side Project Telemetry**: Case index (`01 / 07`), project title, role/category, project narrative, and `"Open the case →"` live link.
- **Upper-Right White Plaque**: Floating white information plaque with crisp typography and subtle shadow.
- **Previous & Next Case Controls**: Bottom-left (`previous case`) and bottom-right (`next case`) circular navigation buttons with keyboard arrow support.

### 3. Curriculum Vitae & Experience Timeline
- **Interactive Tabbed Hub**:
  - `Experience` (Roles at Tanja Marina Bay International, Port de Tanger Ville — SGPTV, Conceptify by Insic)
  - `Diplomas` (ISTA NTIC Software Development, Lycée Moulay Al Hassan Applied Arts)
  - `Skills` (Design & Visual Arts, Creative Development)
  - `Soft skills` (Artistic direction, visual storytelling, craft)
  - `Languages` (Arabic, French, English, Spanish)
- **Download Official CV**: One-click download of the curriculum vitae PDF document.

### 4. Broadcast Sign-Off & Footer
- Bold `"THANKS FOR WATCHING."` statement.
- Vintage SMPTE color test bars & scanline accent.
- Social coordinates (Instagram, LinkedIn, GitHub, Behance).

---

## ⚙️ Centralized Configuration (`src/data/portfolioConfig.ts`)

All content, names, contact links, project screenshots, titles, descriptions, and experience records are controlled in:
👉 `src/data/portfolioConfig.ts`

---

## 🚀 Running the Project

```bash
# Development server (bound to 0.0.0.0:3000)
npm run dev

# Production build & start
npm run build
npm run start -- -H 0.0.0.0 -p 3000
```
Open **[http://localhost:3000](http://localhost:3000)** or **[http://127.0.0.1:3000](http://127.0.0.1:3000)** in your browser.
