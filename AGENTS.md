# Antigravity Autonomous Agent Workflow & Engineering Standards

This document establishes the mandatory workflow, architectural principles, and deployment procedures for the **Salman Khan PUBG-Themed Cinematic Portfolio**.

---

## 1. Core Principles & Strict Rules

1. **Direct In-Place Modification**: Always work directly inside the existing project structure. Never rebuild from scratch or replace with generic templates.
2. **Preserve Functionality**: Preserve all existing WebGL/Three.js architectures, scroll-driven interactions, pinned animations, responsive layouts, and routing.
3. **Asset Integrity**: Use high-resolution, independently authored, or authorized PUBG-themed tactical textures and assets. Never leave unverified 404 links or broken CDN dependencies.
4. **Local Origin First**: All scripts, chunks, and media must resolve cleanly from the local origin (`http://localhost:8080/`) without hardcoded remote cross-origin blockers.

---

## 2. Mandatory 8-Step Engineering Workflow

Every future modification or enhancement must strictly follow this lifecycle:

1. **Step 1 — Code & Asset Audit**:
   - Inspect existing files, bundles, and styles before proposing or writing modifications.
   - Trace exact execution paths, Webpack dynamic chunks, and DOM structures.

2. **Step 2 — In-Place Implementation**:
   - Apply edits cleanly without breaking surrounding code or existing features.
   - Synchronize changes across both root directories and mirrored subpaths (e.g. `2mcrafters.com/` and root `_next/`).

3. **Step 3 — Local Multi-Resolution Testing**:
   - Verify locally on `http://localhost:8080/2mcrafters.com/mohamedandaloussi/index.html`.
   - Test responsive viewports: Desktop (1920×1080, 1649×928, 1440×900, 1366×768), Tablet (768×1024), and Mobile (390×844).

4. **Step 4 — Automated Regression Verification**:
   - Run headless browser tests with hardware WebGL enabled (`--use-gl=angle`).
   - Confirm zero unhandled client-side exceptions or console errors.

5. **Step 5 — Visual Capture & Verification**:
   - Capture multi-angle screenshots of affected sections and components.
   - Verify contrast, typography, lighting balance (2700K–3200K warm tactical ambient), and asset boundaries.

6. **Step 6 — Staging & Descriptive Git Commits**:
   - Stage modified code, assets, and verification scripts cleanly.
   - Write clear, conventional commit messages (e.g. `refactor: refine PUBG gallery with cinematic lighting and minimal tactical styling`).

7. **Step 7 — GitHub Push & Remote Sync**:
   - Push to `origin main` at `https://github.com/techwithsalman/salman-khan-portfolio`.
   - Verify that local `HEAD` and remote `origin/main` commit hashes match exactly.

8. **Step 8 — Verification Links & Deliverables**:
   - Provide clickable local test links, remote repository links, and visual verification artifacts.

---

## 3. Section Architecture Guide

| Section | Tech Stack | Key Files | Key Characteristics |
| :--- | :--- | :--- | :--- |
| **Hero / Identity** | CSS Grid, SVG, Canvas | `pubg-portfolio.css`, `portfolio-personalizer.js` | Transparent PUBG Survivor character, tactical ID badge, 3D typography |
| **Laptop Project Showcase** | Pinned Scroll, CSS transforms | `8447-c2247280dfd2b6a2.js` | 8 real web developer projects on an interactive laptop screen |
| **3D Posts & Media Gallery** | Three.js, WebGL, InstancedMesh | `8734.c7e0a9326b6dad2c.js`, `pubg-wall-tactical.webp`, `asphalt.webp` | Dark concrete corridor, warm downlights (2700K–3200K), isolated stencils |
| **Curriculum Vitae (CV)** | CSS Tabs, SVG Dials, Tactical Glass | `CvHome_*`, `cv/index.html` | Dark bunker battleground background, dial meters, experience tabs |
| **Closing Scene (TV)** | Responsive CRT overlay, WebM/MP4 | `OfflineTV_*`, `pubg-portfolio.css` | Perfectly fitted CRT video overlay inside vintage PUBG TV display |
| **Footer** | Tactical Grid | `pubg-portfolio.css` | Minimalist dark footer with SK monogram, clean navigation |

---

## 4. Maintenance & Run Commands

- **Local Preview Server**:
  ```bash
  npx serve -l 8080 -C -S .
  ```
- **Run Gallery Multi-Angle Verification**:
  ```bash
  node verify_pubg_gallery_views.js
  ```
- **Git Push**:
  ```bash
  git push origin main
  ```
