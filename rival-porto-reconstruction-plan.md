# rival-porto.vercel.app — Complete Reconstruction Plan
**Target:** WCAG 2.1 AA Compliance + Professional Design Upgrade  
**Stack:** Astro + Tailwind CSS (assumed from site structure)  
**Author:** Design Audit — April 2026

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Priority Matrix](#2-priority-matrix)
3. [Phase 1 — WCAG Critical Fixes](#3-phase-1--wcag-critical-fixes)
4. [Phase 2 — Design Foundation Upgrade](#4-phase-2--design-foundation-upgrade)
5. [Phase 3 — Layout & Component Rebuild](#5-phase-3--layout--component-rebuild)
6. [Phase 4 — Typography System](#6-phase-4--typography-system)
7. [Phase 5 — Motion & Interaction](#7-phase-5--motion--interaction)
8. [Phase 6 — QA & Testing Checklist](#8-phase-6--qa--testing-checklist)
9. [File-by-File Change Reference](#9-file-by-file-change-reference)
10. [Design Token Reference](#10-design-token-reference)

---

## 1. Executive Summary

Your portfolio has excellent content depth — the SuaraWarga project write-up, the architecture diagrams, and the "measurable outcomes" framing put you ahead of most developer portfolios. The reconstruction is not a rewrite; it is a **targeted upgrade** that fixes accessibility violations, establishes a proper design system, and elevates the visual shell to match the quality of your content.

### Goals

- Achieve **WCAG 2.1 AA** compliance across all pages
- Establish a **typed design token system** (colors, spacing, typography)
- Upgrade visual identity without changing content or site structure
- Remain **performant** (no heavy JS frameworks added)

### What is NOT changing

- Site architecture (Astro, existing routing)
- Page content and copy
- Project documentation structure (keep the technical depth)

---

## 2. Priority Matrix

| Priority | Category | Issue | WCAG Criterion | Effort |
|----------|----------|-------|----------------|--------|
| 🔴 P0 | Accessibility | Text contrast ratios below 4.5:1 | 1.4.3 | Low |
| 🔴 P0 | Accessibility | No visible focus ring on links/buttons | 2.4.7 | Low |
| 🔴 P0 | Accessibility | Missing landmark roles and ARIA labels | 1.3.1 | Low |
| 🟠 P1 | Accessibility | Page titles not unique/descriptive | 2.4.6 | Low |
| 🟠 P1 | Accessibility | Non-text UI contrast (tags, borders) | 1.4.11 | Low |
| 🟠 P1 | Accessibility | Inadequate alt text on profile image | 1.1.1 | Low |
| 🟠 P1 | Design | Generic system font — no typographic identity | — | Medium |
| 🟠 P1 | Design | Hero section has no visual anchor | — | Medium |
| 🟡 P2 | Design | Body prose line-length too wide | — | Low |
| 🟡 P2 | Design | CTA button hierarchy is flat | — | Low |
| 🟡 P2 | Design | Heading scale too compressed | — | Medium |
| 🟡 P2 | Layout | Filter UI shown with only 2 projects | — | Low |
| 🟢 P3 | Layout | Sidebar social links feel detached | — | Medium |
| 🟢 P3 | Motion | No entrance animations or micro-interactions | — | High |

---

## 3. Phase 1 — WCAG Critical Fixes

> **Timeline:** 1–2 days  
> **Goal:** Achieve baseline WCAG 2.1 AA compliance

### 3.1 Color Contrast (WCAG 1.4.3, 1.4.11)

**Requirement:**
- Normal text (< 18px or < 14px bold): minimum **4.5:1** contrast ratio
- Large text (≥ 18px or ≥ 14px bold): minimum **3:1** contrast ratio
- UI components and borders: minimum **3:1** contrast ratio

**Audit every text/background pair on:**
- [ ] Navigation links on header background
- [ ] Hero body copy on page background
- [ ] Section headings
- [ ] Project card descriptions
- [ ] Tech tag text on tag background
- [ ] Tech tag border on card background
- [ ] Footer text
- [ ] Sidebar "Connect" label and social links

**Recommended contrast-safe palette** (assumes dark theme, adjust for your actual bg):

```css
/* globals.css or tailwind.config.js */

:root {
  /* Backgrounds */
  --bg-base:        #0f0f0f;   /* page background */
  --bg-surface:     #1a1a1a;   /* card backgrounds */
  --bg-elevated:    #242424;   /* hover states, tags */

  /* Text — all verified 4.5:1+ against --bg-base */
  --text-primary:   #f0efea;   /* main body text      — ratio ~15:1 */
  --text-secondary: #a8a6a0;   /* secondary/muted     — ratio ~5.6:1 */
  --text-tertiary:  #6e6c68;   /* hints, placeholders — ratio ~3.1:1 (large text only) */

  /* Accent */
  --accent:         #4f9ef8;   /* links, CTAs         — ratio ~4.6:1 on --bg-base */
  --accent-hover:   #74b3fa;   /* hover state */

  /* Borders — UI components need 3:1 */
  --border-default: #3a3836;   /* card borders        — ratio ~3.2:1 on --bg-base */
  --border-focus:   #4f9ef8;   /* focus ring color */

  /* Tags */
  --tag-bg:         #242424;
  --tag-text:       #c2bfb8;   /* ratio ~6.8:1 on --tag-bg */
  --tag-border:     #4a4846;   /* ratio ~3.1:1 on --tag-bg */
}
```

> **Tool:** Verify every pair at [https://webaim.org/resources/contrastchecker/](https://webaim.org/resources/contrastchecker/)  
> **Tailwind:** If using Tailwind, extend `theme.colors` with these values and replace all inline `text-gray-*` / `bg-gray-*` classes with your semantic tokens.

---

### 3.2 Focus Visibility (WCAG 2.4.7)

**Problem:** Tailwind's default `outline-none` / `focus:outline-none` on links and buttons removes the browser focus ring. Keyboard users cannot track focus position.

**Fix — global CSS:**

```css
/* Remove only for pointer users, keep for keyboard users */
*:focus {
  outline: none;
}

*:focus-visible {
  outline: 2px solid var(--border-focus);
  outline-offset: 3px;
  border-radius: 4px;
}
```

**Fix — Tailwind classes (add to every interactive element):**

```html
<!-- Replace any focus:outline-none with: -->
<a class="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400 rounded">
  Link text
</a>

<button class="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400 rounded-md">
  Button text
</button>
```

**Elements to audit:**
- [ ] All `<a>` tags in nav, footer, sidebar
- [ ] "View Projects" and "Contact" CTA buttons
- [ ] "Download Resume" button on About page
- [ ] "Back to Systems" link on project pages
- [ ] All project card links
- [ ] Filter buttons ("All", "Data Analytics", "Machine Learning")
- [ ] Social icon links (GitHub, LinkedIn, Email)

---

### 3.3 Landmark Roles and ARIA Labels (WCAG 1.3.1)

**Problem:** Screen readers navigate by landmark regions. Without explicit roles, the page structure is opaque to assistive technology.

**Required changes in layout component:**

```html
<!-- Header / Nav -->
<header role="banner">
  <nav role="navigation" aria-label="Primary navigation">
    <!-- nav links -->
  </nav>
</header>

<!-- Sidebar social links -->
<aside role="complementary" aria-label="Social links">
  <p id="connect-label">Connect</p>
  <nav aria-labelledby="connect-label">
    <a href="https://github.com/RivalMoh" aria-label="GitHub profile">GitHub</a>
    <a href="https://www.linkedin.com/in/rivalmohwahyudi" aria-label="LinkedIn profile">LinkedIn</a>
    <a href="/contact" aria-label="Contact page">Email</a>
  </nav>
</aside>

<!-- Main content -->
<main id="main-content" role="main">
  <!-- page content -->
</main>

<!-- Footer -->
<footer role="contentinfo">
  <!-- footer content -->
</footer>
```

**Skip navigation link** (add as first element in `<body>`):

```html
<a 
  href="#main-content" 
  class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded focus:text-sm focus:font-medium"
>
  Skip to main content
</a>
```

---

### 3.4 Page Titles (WCAG 2.4.6)

**Problem:** Titles put the brand before the unique identifier. Screen readers announce the full title; unique content should come first.

**Fix — in each Astro page's `<head>`:**

```astro
---
// index.astro
const title = "Home — Rival Moh. Wahyudi | Data & ML Engineer";

// about.astro
const title = "About — Rival Moh. Wahyudi";

// projects/suarawarga-ai-app.astro
const title = "SuaraWarga Project — Rival Moh. Wahyudi";

// projects/olist-bi-dashboard.astro
const title = "Olist BI Dashboard — Rival Moh. Wahyudi";

// contact.astro
const title = "Contact — Rival Moh. Wahyudi";
---
<title>{title}</title>
```

---

### 3.5 Image Alt Text (WCAG 1.1.1)

**About page — profile image:**

```html
<!-- Before -->
<img src="profile.webp" alt="Rival Moh. Wahyudi" />

<!-- After -->
<img 
  src="profile.webp" 
  alt="Rival Moh. Wahyudi — Data and ML Engineer" 
  width="400" 
  height="400"
/>
```

**Project architecture diagrams (ASCII/code blocks are fine; if any `<img>` used):**

```html
<img 
  src="architecture-diagram.png" 
  alt="SuaraWarga system architecture: PWA frontend connects via POST /report to a FastAPI backend with audio, AI, and geocoding services writing to SQLite." 
/>
```

**Rule:** If an image is purely decorative (background texture, divider graphic), use `alt=""` — this tells screen readers to skip it entirely.

---

### 3.6 Mobile Sidebar Visibility (WCAG 1.3.2)

When the sidebar is hidden on mobile, ensure it is also hidden from assistive technology:

```html
<!-- When sidebar is visually hidden on mobile -->
<aside 
  aria-hidden="true"   <!-- add this when visually hidden -->
  class="hidden md:block"
  role="complementary" 
  aria-label="Social links"
>
```

Use JavaScript to toggle `aria-hidden` in sync with the CSS display state if the sidebar is toggled by a button.

---

## 4. Phase 2 — Design Foundation Upgrade

> **Timeline:** 2–3 days  
> **Goal:** Establish a design token system and visual identity

### 4.1 Typography System

**Font pairing choice:**

| Role | Font | Source | Usage |
|------|------|---------|-------|
| Display / Headings | **Syne** | Google Fonts | H1, H2, hero tagline |
| Body / UI | **IBM Plex Sans** | Google Fonts | Body text, nav, labels |
| Monospace | **IBM Plex Mono** | Google Fonts | Code blocks, tech tags |

**Why this pairing:**
- Syne has a geometric, technical character that matches a data/ML engineer's identity
- IBM Plex Sans is readable, professional, and connects to the "systems" theme
- IBM Plex Mono keeps code blocks legible and on-brand

**Load in `<head>`:**

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

**CSS variables:**

```css
:root {
  --font-display: 'Syne', sans-serif;
  --font-body:    'IBM Plex Sans', sans-serif;
  --font-mono:    'IBM Plex Mono', monospace;
}
```

**Tailwind config extension:**

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body:    ['IBM Plex Sans', 'sans-serif'],
        mono:    ['IBM Plex Mono', 'monospace'],
      }
    }
  }
}
```

---

### 4.2 Type Scale

Use `clamp()` for fluid typography that scales between mobile and desktop without breakpoints:

```css
:root {
  /* Hero H1 — 40px mobile → 72px desktop */
  --text-hero:  clamp(2.5rem, 5vw + 1rem, 4.5rem);

  /* H1 — 32px → 52px */
  --text-h1:    clamp(2rem, 3.5vw + 0.75rem, 3.25rem);

  /* H2 — 22px → 32px */
  --text-h2:    clamp(1.375rem, 2vw + 0.5rem, 2rem);

  /* H3 — 18px → 22px */
  --text-h3:    clamp(1.125rem, 1vw + 0.5rem, 1.375rem);

  /* Body — fixed 1rem (16px) */
  --text-body:  1rem;

  /* Small / label — fixed 0.875rem (14px) */
  --text-sm:    0.875rem;

  /* Micro / caption — fixed 0.75rem (12px) */
  --text-xs:    0.75rem;
}
```

**Application:**

```css
h1 { font-family: var(--font-display); font-size: var(--text-h1); font-weight: 600; line-height: 1.15; }
h2 { font-family: var(--font-display); font-size: var(--text-h2); font-weight: 600; line-height: 1.25; }
h3 { font-family: var(--font-display); font-size: var(--text-h3); font-weight: 500; line-height: 1.35; }
p  { font-family: var(--font-body);    font-size: var(--text-body); line-height: 1.75; max-width: 65ch; }

/* Hero override */
.hero-headline { font-size: var(--text-hero); line-height: 1.1; letter-spacing: -0.02em; }
```

---

### 4.3 Spacing Scale

```css
:root {
  --space-1:  0.25rem;   /*  4px */
  --space-2:  0.5rem;    /*  8px */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-24: 6rem;      /* 96px */
  --space-32: 8rem;      /* 128px */
}
```

---

## 5. Phase 3 — Layout & Component Rebuild

> **Timeline:** 3–5 days  
> **Goal:** Rebuild key sections with correct visual hierarchy

### 5.1 Hero Section Rebuild

**Current problem:** Plain text block with no visual differentiation.

**Rebuild spec:**

```
┌─────────────────────────────────────────────────────────┐
│  [subtle animated SVG background — dot grid / data flow]│
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │  OVERLINE                                        │   │
│  │  Data & ML Engineer                              │   │
│  │                                                  │   │
│  │  Architecting data                               │   │
│  │  into actionable systems.   ← Syne, 64–72px      │   │
│  │                                                  │   │
│  │  I build end-to-end solutions... [body copy]     │   │
│  │  max-width: 55ch                                 │   │
│  │                                                  │   │
│  │  [View Projects ▶]   [Contact →]                 │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Background SVG (subtle animated dot grid):**

```html
<!-- Hero background — add as first child of hero section -->
<svg 
  aria-hidden="true" 
  focusable="false"
  class="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <pattern id="dot-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="1" fill="currentColor" />
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#dot-grid)" />
</svg>
```

**Overline label:**

```html
<p class="text-xs font-mono uppercase tracking-widest text-accent mb-4">
  Data &amp; ML Engineer
</p>
```

**Button hierarchy:**

```html
<!-- Primary CTA — solid fill -->
<a 
  href="#projects" 
  class="inline-flex items-center gap-2 px-6 py-3 bg-accent text-bg-base font-medium rounded-md 
         hover:bg-accent-hover transition-colors
         focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400"
>
  View Projects
  <svg aria-hidden="true" width="16" height="16"><!-- arrow icon --></svg>
</a>

<!-- Secondary CTA — outline -->
<a 
  href="/contact" 
  class="inline-flex items-center gap-2 px-6 py-3 border border-border-default text-primary font-medium rounded-md 
         hover:bg-bg-elevated transition-colors
         focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400"
>
  Contact
</a>
```

---

### 5.2 Navigation Rebuild

**Current problem:** Missing landmark roles, possible contrast issues on links.

**Rebuilt nav structure:**

```html
<header class="sticky top-0 z-40 border-b border-border-default bg-bg-base/90 backdrop-blur-sm" role="banner">
  <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

    <!-- Brand -->
    <a 
      href="/" 
      class="font-display font-semibold text-primary hover:text-accent transition-colors
             focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400 rounded"
      aria-label="RivalMoh.dev — home"
    >
      RivalMoh.dev
    </a>

    <!-- Primary nav -->
    <nav role="navigation" aria-label="Primary navigation">
      <ul class="flex items-center gap-8 list-none m-0 p-0">
        <li><a href="/" class="nav-link" aria-current="page">Home</a></li>
        <li><a href="/about" class="nav-link">About</a></li>
        <li><a href="/#projects" class="nav-link">Projects</a></li>
        <li><a href="/contact" class="nav-link">Contact</a></li>
      </ul>
    </nav>

  </div>
</header>
```

```css
/* nav-link utility */
.nav-link {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.15s;
  border-radius: 4px;
  padding: 2px 4px;
}
.nav-link:hover { color: var(--text-primary); }
.nav-link[aria-current="page"] { color: var(--text-primary); }
.nav-link:focus-visible {
  outline: 2px solid var(--border-focus);
  outline-offset: 3px;
}
```

---

### 5.3 Project Card Rebuild

**Current problem:** Cards may have flat CTA, contrast issues on tags, no clear action affordance.

**Rebuilt card:**

```html
<article 
  class="group relative flex flex-col bg-bg-surface border border-border-default rounded-xl p-6 
         hover:border-border-focus transition-colors"
  aria-labelledby="card-title-1"
>
  <!-- Category badge -->
  <span class="inline-flex self-start text-xs font-mono font-medium uppercase tracking-wide 
               px-2.5 py-1 rounded bg-bg-elevated text-text-secondary border border-border-default mb-4"
        aria-label="Category: Machine Learning">
    Machine Learning
  </span>

  <!-- Title -->
  <h3 
    id="card-title-1"
    class="font-display text-h3 font-semibold text-text-primary mb-2 leading-snug"
  >
    SuaraWarga: Voice-First AI Disaster Reporting
  </h3>

  <!-- Description -->
  <p class="text-sm text-text-secondary leading-relaxed flex-1 mb-4">
    A Progressive Web App utilizing multimodal AI to convert raw emergency voice recordings 
    into structured, geocoded intelligence on a live dashboard.
  </p>

  <!-- Tech tags -->
  <ul class="flex flex-wrap gap-2 mb-6 list-none p-0 m-0" aria-label="Technologies used">
    <li>
      <span class="text-xs font-mono px-2.5 py-1 rounded border border-border-default 
                   text-text-secondary bg-bg-elevated">Python</span>
    </li>
    <li>
      <span class="text-xs font-mono px-2.5 py-1 rounded border border-border-default 
                   text-text-secondary bg-bg-elevated">FastAPI</span>
    </li>
    <!-- ... -->
  </ul>

  <!-- CTA — full card is clickable, but explicit link for a11y -->
  <a 
    href="/projects/suarawarga-ai-app"
    class="inline-flex items-center gap-1.5 text-sm font-medium text-accent 
           hover:gap-2.5 transition-all
           focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400 rounded"
    aria-label="Read full documentation for SuaraWarga project"
  >
    Read Documentation →
  </a>
</article>
```

---

### 5.4 Filter Section Fix

**Current problem:** Filter UI shown with only 2 projects — creates visual noise with no functional value.

**Conditional render in Astro:**

```astro
---
const projects = await getProjects(); // your data fetch
const showFilter = projects.length >= 4;
---

{showFilter && (
  <div class="filter-group" role="group" aria-label="Filter projects by category">
    <button class="filter-btn active" aria-pressed="true" data-filter="all">All</button>
    <button class="filter-btn" aria-pressed="false" data-filter="data-analytics">Data Analytics</button>
    <button class="filter-btn" aria-pressed="false" data-filter="machine-learning">Machine Learning</button>
  </div>
)}
```

> Note `aria-pressed` on toggle buttons — this communicates the active state to screen readers without relying on color alone (WCAG 1.4.1).

---

### 5.5 About Page Layout Rebuild

**Rebuild the profile + stack section into a two-column layout:**

```
Desktop (≥ 768px):                    Mobile:
┌──────────────────┬──────────────┐   ┌──────────────────────┐
│                  │              │   │   [profile image]    │
│  Bio text        │  [Photo]     │   │                      │
│  max-width:55ch  │  400×400     │   │   Bio text           │
│                  │  rounded-xl  │   │                      │
│  [Download CV]   │              │   │   Core Stack         │
│  [GitHub]        │              │   │   ...                │
│  [LinkedIn]      │              │   └──────────────────────┘
└──────────────────┴──────────────┘
       Core Technology Stack (full width below)
```

**Profile image accessibility:**

```html
<img 
  src="/profile.webp"
  alt="Rival Moh. Wahyudi, Data and ML Engineer based in Indonesia"
  width="400"
  height="400"
  loading="lazy"
  decoding="async"
  class="rounded-xl object-cover aspect-square w-full"
/>
```

---

### 5.6 Sidebar Rebuild

**Current problem:** Left sidebar social links feel disconnected from the layout.

**Option A (recommended): Integrate into footer**

Remove the persistent left sidebar and consolidate all social links into:
1. The main nav (as icon links on the right side)
2. The footer (full display with labels)

This removes layout complexity and the ARIA management burden.

**Option B: Keep sidebar, fix ARIA**

```html
<aside 
  class="fixed left-6 bottom-16 hidden lg:flex flex-col gap-4 items-center"
  role="complementary"
  aria-label="Social links"
>
  <!-- Vertical line above -->
  <div class="w-px h-16 bg-border-default" aria-hidden="true"></div>

  <nav aria-label="Social profiles">
    <ul class="flex flex-col gap-3 list-none m-0 p-0">
      <li>
        <a 
          href="https://github.com/RivalMoh" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="GitHub profile (opens in new tab)"
          class="text-text-secondary hover:text-text-primary transition-colors
                 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400 rounded"
        >
          <!-- GitHub SVG icon, aria-hidden="true" -->
        </a>
      </li>
    </ul>
  </nav>

  <!-- Vertical line below -->
  <div class="w-px h-16 bg-border-default" aria-hidden="true"></div>
</aside>
```

---

## 6. Phase 4 — Typography System

> **Timeline:** 1–2 days (can be done in parallel with Phase 3)  
> **Goal:** Implement full typographic system with correct semantic markup

### 6.1 Heading Hierarchy Rules

Every page must follow a **strict heading order** — this is both a WCAG requirement (1.3.1) and an SEO signal.

| Level | Usage | Never use for |
|-------|-------|---------------|
| `<h1>` | One per page. Page title / hero headline | Section titles |
| `<h2>` | Major sections (About, Projects, Contact) | Card titles |
| `<h3>` | Project card titles, subsection headers | Styling purposes |
| `<h4>` | Sub-subsections within project docs | Anything that's not a heading |

**Audit each page:**
- [ ] Home: H1 = "Architecting data into actionable systems", H2 = "About", "Featured Projects", "Let's Collaborate"
- [ ] About: H1 = "About Me", H2 = "Core Technology Stack", "Experience & Timeline", H3 = tech categories
- [ ] Project pages: H1 = project title, H2 = major doc sections, H3 = sub-sections
- [ ] Contact: H1 = "Contact" or "Let's Talk"

### 6.2 Prose Width Constraint

Add to every content-area `<p>`:

```css
/* globals.css */
.prose p,
.prose li,
.prose blockquote {
  max-width: 65ch;
  line-height: 1.75;
}
```

Or in Tailwind, use `prose` from `@tailwindcss/typography` on project documentation pages:

```html
<article class="prose prose-invert max-w-none prose-p:max-w-[65ch]">
  <!-- project content -->
</article>
```

### 6.3 Code Block Accessibility

On project pages, ASCII architecture diagrams inside `<pre><code>` blocks need:

```html
<figure role="img" aria-label="SuaraWarga system architecture diagram showing frontend, backend, and service layers">
  <pre>
    <code class="font-mono text-sm leading-relaxed">
      ┌─────────────────────────────────────────────────────┐
      │                    FRONTEND (PWA)                   │
      ...
    </code>
  </pre>
  <figcaption class="sr-only">
    Text description: The SuaraWarga architecture has a PWA frontend that sends POST /report 
    requests containing audio and GPS data to a FastAPI backend. The backend has three services: 
    audio_service for validation, ai_service using Gemini multimodal, and geo_service using 
    Nominatim. All data is persisted to a SQLite database.
  </figcaption>
</figure>
```

---

## 7. Phase 5 — Motion & Interaction

> **Timeline:** 2–3 days  
> **Goal:** Add purposeful animation that respects `prefers-reduced-motion`

### 7.1 The Cardinal Rule

**Every animation must be wrapped in a `prefers-reduced-motion` media query:**

```css
/* Default: no animation (respects users who need it) */
.fade-in { opacity: 1; transform: none; }

/* Animation only for users who haven't opted out */
@media (prefers-reduced-motion: no-preference) {
  .fade-in {
    opacity: 0;
    transform: translateY(16px);
    animation: fadeUp 0.5s ease forwards;
  }

  @keyframes fadeUp {
    to { opacity: 1; transform: translateY(0); }
  }
}
```

### 7.2 Hero Entrance Animation

```css
@media (prefers-reduced-motion: no-preference) {
  .hero-overline  { animation: fadeUp 0.4s ease forwards 0.1s; opacity: 0; }
  .hero-headline  { animation: fadeUp 0.5s ease forwards 0.2s; opacity: 0; }
  .hero-body      { animation: fadeUp 0.5s ease forwards 0.35s; opacity: 0; }
  .hero-ctas      { animation: fadeUp 0.5s ease forwards 0.5s; opacity: 0; }
}
```

### 7.3 Project Card Hover States

```css
.project-card {
  transition: border-color 0.2s, transform 0.2s;
}

@media (prefers-reduced-motion: no-preference) {
  .project-card:hover {
    transform: translateY(-2px);
  }
}

/* Always transition color, even for reduced-motion users */
.project-card:hover {
  border-color: var(--border-focus);
}
```

### 7.4 Scroll-Triggered Reveal (Intersection Observer)

```js
// animations.js — add to Astro as a client-side script
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target); // fire once only
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

// Observe all section headings and project cards
document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
```

```css
.reveal-on-scroll { opacity: 1; }

@media (prefers-reduced-motion: no-preference) {
  .reveal-on-scroll {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .reveal-on-scroll.in-view {
    opacity: 1;
    transform: none;
  }
}
```

---

## 8. Phase 6 — QA & Testing Checklist

> **Timeline:** 1 day  
> **Run before each deployment**

### 8.1 Automated Tools

Run all of these and resolve every reported issue:

- [ ] **axe DevTools** browser extension — scan every page, zero violations
- [ ] **WAVE** ([https://wave.webaim.org/](https://wave.webaim.org/)) — check all pages
- [ ] **Lighthouse** (Chrome DevTools → Lighthouse) — target Accessibility score ≥ 95
- [ ] **IBM Equal Access Checker** — for edge cases axe misses

### 8.2 Manual Keyboard Testing

Perform this on every page:

- [ ] Press `Tab` — focus moves through the page in logical visual order
- [ ] Every interactive element receives a **visible** focus ring when tabbed to
- [ ] Skip link appears on first `Tab` press and navigates to `#main-content`
- [ ] All buttons/links are activatable with `Enter` or `Space`
- [ ] Modal dialogs (if any) trap focus inside until closed
- [ ] Escape key closes any open menus or modals

### 8.3 Screen Reader Testing

Test with at least one screen reader:

- **macOS/iOS:** VoiceOver (Cmd + F5 to toggle)
- **Windows:** NVDA (free) or JAWS
- **Chrome extension:** ChromeVox

Checklist:
- [ ] Page title is announced correctly when page loads
- [ ] Heading structure is navigable (screen reader heading list makes sense)
- [ ] All images have meaningful alt text or are marked as decorative
- [ ] Navigation landmarks are announced (header, nav, main, aside, footer)
- [ ] Skip link works and announces correctly
- [ ] Filter buttons announce their pressed state
- [ ] External links announce "(opens in new tab)" via aria-label

### 8.4 Color & Contrast

- [ ] Every text color passes 4.5:1 against its background (use DevTools eyedropper + contrast checker)
- [ ] All UI component borders pass 3:1 (tech tags, card borders, input borders)
- [ ] No information is conveyed by color alone (WCAG 1.4.1) — active filter uses both color AND `aria-pressed`
- [ ] Site is usable in Windows High Contrast mode (test via Edge → Settings → High Contrast)

### 8.5 Responsive Testing

- [ ] All content readable at 320px width (WCAG 1.4.10 Reflow)
- [ ] No horizontal scrollbar at 100% zoom on any viewport
- [ ] Text remains readable when browser zoom is set to 200% (WCAG 1.4.4)
- [ ] Sidebar correctly hides and `aria-hidden="true"` is set on mobile

### 8.6 Performance (Supporting A11y)

Slow sites disproportionately affect users on assistive technology and low-powered devices:

- [ ] Lighthouse Performance ≥ 90
- [ ] All images use `loading="lazy"` and `decoding="async"`
- [ ] Fonts loaded with `display=swap` to prevent layout shift
- [ ] No render-blocking scripts in `<head>`

---

## 9. File-by-File Change Reference

### `src/layouts/BaseLayout.astro`
- Add skip navigation link as first element in `<body>`
- Add `role="banner"` to `<header>`
- Add `role="main"` and `id="main-content"` to `<main>`
- Add `role="contentinfo"` to `<footer>`
- Add `role="complementary"` and `aria-label` to sidebar `<aside>`
- Import new font stack in `<head>`
- Add global CSS variables for color tokens

### `src/layouts/BaseLayout.astro` → Nav component
- Add `role="navigation"` and `aria-label="Primary navigation"` to `<nav>`
- Add `aria-current="page"` to active nav link
- Add `aria-label` to social icon links
- Add `focus-visible` focus ring classes to all links

### `src/pages/index.astro`
- Update `<title>` to "Home — Rival Moh. Wahyudi | Data & ML Engineer"
- Add overline label above hero H1
- Apply `hero-headline` class to H1 for display font + large size
- Wrap hero prose in `max-width: 55ch` container
- Add dot-grid SVG background (aria-hidden)
- Apply `reveal-on-scroll` class to project cards
- Conditionally render filter UI (hide if < 4 projects)
- Fix button hierarchy: primary (solid) vs secondary (outline)

### `src/pages/about.astro`
- Update `<title>` to "About — Rival Moh. Wahyudi"
- Update profile `<img>` alt text
- Add `width` and `height` attributes to `<img>`
- Add `loading="lazy"` and `decoding="async"` to `<img>`
- Constrain bio paragraph to `max-width: 65ch`
- Verify heading hierarchy: H1 → H2 → H3 (no skips)

### `src/pages/projects/[slug].astro`
- Update `<title>` template to "[Project Name] — Rival Moh. Wahyudi"
- Wrap ASCII architecture diagrams in `<figure role="img" aria-label="...">` with `<figcaption class="sr-only">`
- Ensure all table of contents links are keyboard accessible
- Add `aria-label` to all external links (GitHub repo links, etc.)
- Apply `prose` class with `max-w-none` to article body

### `src/pages/contact.astro`
- Update `<title>` to "Contact — Rival Moh. Wahyudi"
- If form exists: add `<label>` elements explicitly linked to inputs via `for`/`id`
- Add `required` attribute and `aria-required="true"` to required fields
- Add `aria-describedby` for validation error messages

### `src/styles/global.css`
- Add all CSS custom properties (color tokens, spacing, type scale)
- Add `*:focus { outline: none }` + `*:focus-visible { ... }` rules
- Add `.prose p` max-width constraint
- Add animation keyframes wrapped in `@media (prefers-reduced-motion: no-preference)`
- Add `.reveal-on-scroll` styles

---

## 10. Design Token Reference

Copy this into your `global.css` as the single source of truth for all design decisions:

```css
:root {
  /* ─── Typography ─────────────────────────────── */
  --font-display: 'Syne', sans-serif;
  --font-body:    'IBM Plex Sans', sans-serif;
  --font-mono:    'IBM Plex Mono', monospace;

  --text-hero: clamp(2.5rem, 5vw + 1rem, 4.5rem);
  --text-h1:   clamp(2rem, 3.5vw + 0.75rem, 3.25rem);
  --text-h2:   clamp(1.375rem, 2vw + 0.5rem, 2rem);
  --text-h3:   clamp(1.125rem, 1vw + 0.5rem, 1.375rem);
  --text-body: 1rem;
  --text-sm:   0.875rem;
  --text-xs:   0.75rem;

  /* ─── Colors (Dark Theme) ────────────────────── */
  --bg-base:        #0f0f0f;
  --bg-surface:     #1a1a1a;
  --bg-elevated:    #242424;

  --text-primary:   #f0efea;
  --text-secondary: #a8a6a0;
  --text-tertiary:  #6e6c68;

  --accent:         #4f9ef8;
  --accent-hover:   #74b3fa;

  --border-default: #3a3836;
  --border-emphasis:#5a5654;
  --border-focus:   #4f9ef8;

  --tag-bg:         #242424;
  --tag-text:       #c2bfb8;
  --tag-border:     #4a4846;

  /* ─── Spacing ────────────────────────────────── */
  --space-1:   0.25rem;
  --space-2:   0.5rem;
  --space-3:   0.75rem;
  --space-4:   1rem;
  --space-6:   1.5rem;
  --space-8:   2rem;
  --space-12:  3rem;
  --space-16:  4rem;
  --space-24:  6rem;

  /* ─── Borders ────────────────────────────────── */
  --radius-sm:  4px;
  --radius-md:  8px;
  --radius-lg:  12px;
  --radius-xl:  16px;

  /* ─── Transitions ────────────────────────────── */
  --transition-fast:   0.15s ease;
  --transition-normal: 0.25s ease;
  --transition-slow:   0.5s ease;
}

/* ─── Global resets ──────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; }

body {
  font-family: var(--font-body);
  font-size: var(--text-body);
  color: var(--text-primary);
  background-color: var(--bg-base);
  line-height: 1.75;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  font-weight: 600;
  line-height: 1.2;
  color: var(--text-primary);
}

h1 { font-size: var(--text-h1); }
h2 { font-size: var(--text-h2); }
h3 { font-size: var(--text-h3); }

p { max-width: 65ch; }

code, pre {
  font-family: var(--font-mono);
  font-size: 0.875em;
}

/* ─── Focus management ───────────────────────────── */
*:focus { outline: none; }
*:focus-visible {
  outline: 2px solid var(--border-focus);
  outline-offset: 3px;
  border-radius: var(--radius-sm);
}

/* ─── Screen reader only ─────────────────────────── */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only.focus\:not-sr-only:focus,
.sr-only.focus-visible\:not-sr-only:focus-visible {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}

/* ─── Animations ─────────────────────────────────── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.reveal-on-scroll { opacity: 1; transform: none; }

@media (prefers-reduced-motion: no-preference) {
  .reveal-on-scroll {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity var(--transition-slow), transform var(--transition-slow);
  }
  .reveal-on-scroll.in-view {
    opacity: 1;
    transform: none;
  }
}
```

---

## Appendix: Reference Links

| Resource | URL |
|----------|-----|
| WCAG 2.1 Quick Reference | https://www.w3.org/WAI/WCAG21/quickref/ |
| WebAIM Contrast Checker | https://webaim.org/resources/contrastchecker/ |
| axe DevTools (browser ext.) | https://www.deque.com/axe/devtools/ |
| WAVE Accessibility Checker | https://wave.webaim.org/ |
| Syne font | https://fonts.google.com/specimen/Syne |
| IBM Plex Sans font | https://fonts.google.com/specimen/IBM+Plex+Sans |
| IBM Plex Mono font | https://fonts.google.com/specimen/IBM+Plex+Mono |
| Tailwind Typography plugin | https://tailwindcss.com/docs/typography-plugin |
| MDN ARIA roles reference | https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles |
| prefers-reduced-motion | https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion |

---

*Document generated: April 2026 — rival-porto.vercel.app design audit*
