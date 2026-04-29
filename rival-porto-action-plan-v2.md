# rival-porto.vercel.app — Post-Reconstruction Action Plan
**Based on:** Re-review audit · April 2026  
**Status:** ~60% WCAG compliant · ~75% design upgraded  
**Goal:** Close remaining gaps to reach full WCAG 2.1 AA

---

## Summary Scores (current vs previous)

| Dimension | Before | After Reconstruction | Target |
|-----------|--------|----------------------|--------|
| Overall | B | B+ | A– |
| Typography | B– | B+ | A |
| WCAG / A11y | C+ | B– | A |
| Layout | B | B+ | A– |
| Visual Hierarchy | C | B+ | A– |
| Content Quality | A– | A | A |

---

## Remaining Issues — Ordered by Priority

### 🔴 P0 — Fix in under 1 hour (critical WCAG failures)

---

#### 1. Skip link not in BaseLayout — 10 min
**WCAG:** 2.4.1 Bypass Blocks  
**Pages failing:** `/`, `/about`, `/projects/suarawarga-ai-app`  
**Pages passing:** `/contact`, `/projects/olist-bi-dashboard`

The skip link exists in individual page files, so only 2 of 5 pages have it. It must live in the shared layout so it applies everywhere automatically.

**Fix — move this into `src/layouts/BaseLayout.astro` as the very first element inside `<body>`:**

```html
<a
  href="#main-content"
  class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50
         focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded focus:text-sm focus:font-medium"
>
  Skip to main content
</a>
```

Then remove the skip link from any individual page files where you added it manually.

---

#### 2. Page titles in wrong order on 3 pages — 5 min
**WCAG:** 2.4.6 Headings and Labels  
**Pages failing:** `/` (homepage), `/about`, `/contact`  
**Pages passing:** both project pages ✓

Screen readers announce the full title on page load. The unique part (section name) must come first so users immediately know where they are without hearing the brand name repeated on every page.

**Fix — update `<title>` in each page file:**

```astro
<!-- src/pages/index.astro -->
<title>Home — Rival Moh. Wahyudi | Data & ML Engineer</title>

<!-- src/pages/about.astro -->
<title>About — Rival Moh. Wahyudi</title>

<!-- src/pages/contact.astro -->
<title>Contact — Rival Moh. Wahyudi</title>
```

---

#### 3. Filter buttons missing aria-pressed — 15 min
**WCAG:** 1.3.1 Info and Relationships  
**Pages failing:** `/` (Filter Projects section)

The active/inactive state of the filter buttons ("All", "Data Analytics", "Machine Learning") is communicated by color or style only. Screen reader users cannot tell which filter is currently selected.

**Fix — add `aria-pressed` to button markup:**

```html
<div role="group" aria-label="Filter projects by category">
  <button class="filter-btn" aria-pressed="true"  data-filter="all">All</button>
  <button class="filter-btn" aria-pressed="false" data-filter="data-analytics">Data Analytics</button>
  <button class="filter-btn" aria-pressed="false" data-filter="machine-learning">Machine Learning</button>
</div>
```

**Fix — update `aria-pressed` in your filter JS:**

```js
const buttons = document.querySelectorAll('.filter-btn');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Reset all
    buttons.forEach(b => b.setAttribute('aria-pressed', 'false'));
    // Set active
    btn.setAttribute('aria-pressed', 'true');
    // ... rest of your filter logic
  });
});
```

---

#### 4. External links missing "opens in new tab" disclosure — 15 min
**WCAG:** 1.4.11 / 2.4.4 Link Purpose  
**Affects:** GitHub and LinkedIn links in nav, sidebar, footer, About page, Contact page

Opening a new tab without warning is disorienting for screen reader users and keyboard-only users. Every `target="_blank"` link needs to communicate this.

**Fix — add aria-label to every external link:**

```html
<!-- GitHub links -->
<a
  href="https://github.com/RivalMoh"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="GitHub profile (opens in new tab)"
>
  GitHub
</a>

<!-- LinkedIn links -->
<a
  href="https://www.linkedin.com/in/rivalmohwahyudi"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="LinkedIn profile (opens in new tab)"
>
  LinkedIn
</a>
```

**Alternative — append a visually hidden span inside each link (if aria-label is impractical):**

```html
<a href="https://github.com/RivalMoh" target="_blank" rel="noopener noreferrer">
  GitHub
  <span class="sr-only">(opens in new tab)</span>
</a>
```

Apply to: nav links, sidebar Connect section, footer, About page CTA block, Contact page.

---

### 🟠 P1 — Fix this week (important WCAG + UX)

---

#### 5. Run axe DevTools on all 5 pages — 30 min
**Why this is P1:** Contrast ratios and focus ring visibility cannot be confirmed from source code alone. They require the rendered browser output with actual computed styles. Axe will also surface any landmark role gaps (missing `role="main"`, `role="banner"`, etc.) that the markup extractor may have stripped.

**Steps:**
1. Install the [axe DevTools browser extension](https://www.deque.com/axe/devtools/) (free tier is sufficient)
2. Open each page in Chrome/Edge
3. Open DevTools → axe DevTools tab → click "Scan ALL of my page"
4. Fix every reported violation before moving on

**Pages to scan in order:**
- [ ] `/` (homepage)
- [ ] `/about`
- [ ] `/contact`
- [ ] `/projects/suarawarga-ai-app`
- [ ] `/projects/olist-bi-dashboard`

**What to look for specifically:**
- Any contrast failures on secondary text, tag chips, sidebar links, footer text
- Missing landmark roles (`banner`, `navigation`, `main`, `contentinfo`)
- Any interactive elements without visible focus indicators
- Duplicate `id` attributes (the nav link duplication may cause this)

---

#### 6. ASCII architecture diagram needs a text alternative — 20 min
**WCAG:** 1.1.1 Non-text Content  
**Pages failing:** `/projects/suarawarga-ai-app`

The large ASCII box-drawing diagram in a `<pre><code>` block is read by screen readers as a stream of characters (┌─────────────────────...) which is meaningless. It needs a plain-English text alternative.

**Fix — wrap the code block in a figure with a hidden description:**

```html
<figure role="img" aria-label="SuaraWarga system architecture diagram">
  <pre><code>
┌─────────────────────────────────────────────────────┐
│                    FRONTEND (PWA)                   │
│   HTML5 + Vanilla JS + Leaflet.js                   │
│   MediaRecorder API  │  Geolocation API             │
└───────────────────┬─────────────────────────────────┘
                    │  POST /report  (audio + GPS)
                    ▼
┌─────────────────────────────────────────────────────┐
│                 BACKEND (FastAPI)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐  │
│  │ audio_service│  │  ai_service  │  │geo_service│  │
│  │  (validate + │  │   (Gemini    │  │ (Nominatim│  │
│  │ noise reduce)│  │  multimodal) │  │  geocode) │  │
│  └──────────────┘  └──────────────┘  └───────────┘  │
│                 SQLite Database                     │
└─────────────────────────────────────────────────────┘
  </code></pre>
  <figcaption class="sr-only">
    The SuaraWarga system has two layers. The frontend is a Progressive Web App
    built with HTML5, Vanilla JS, and Leaflet.js. It uses the MediaRecorder API
    to capture audio and the Geolocation API to capture GPS coordinates, then
    sends both to the backend via POST /report. The backend is a FastAPI server
    with three services: audio_service (validates and noise-reduces the recording),
    ai_service (uses Google Gemini multimodal to extract structured data), and
    geo_service (uses Nominatim to geocode location names). All results are
    persisted to a SQLite database.
  </figcaption>
</figure>
```

Do the same for the processing pipeline ASCII diagram on the same page.

---

#### 7. Project overview panels — use semantic dl/dt/dd markup — 20 min
**WCAG:** 1.3.1 Info and Relationships  
**Pages failing:** both project pages

The overview stats (Role, Duration, Core Impact, and metrics) are visually key-value pairs — a definition list. Using generic `<div>` elements means screen readers cannot identify the relationship between the label and its value.

**Fix — replace overview markup with:**

```html
<dl class="project-overview">
  <div class="overview-item">
    <dt>Role</dt>
    <dd>Full Stack & AI Engineer</dd>
  </div>
  <div class="overview-item">
    <dt>Duration</dt>
    <dd>March 2026</dd>
  </div>
  <div class="overview-item">
    <dt>Core Impact</dt>
    <dd>Eliminated manual emergency data entry via zero-friction voice reporting.</dd>
  </div>
  <div class="overview-item">
    <dt>Audio Validation</dt>
    <dd>&lt; 2s rejection</dd>
  </div>
  <div class="overview-item">
    <dt>Inference</dt>
    <dd>Single-Step AI</dd>
  </div>
</dl>
```

CSS stays the same — `<dl>`, `<dt>`, `<dd>` are block elements and accept all the same grid/flex styling as `<div>`.

---

#### 8. Sidebar social links need navigation role — 10 min
**WCAG:** 1.3.1 Info and Relationships  
**Affects:** All pages (sidebar is in BaseLayout)

The "Connect" section with GitHub, LinkedIn, Email is a secondary navigation region. Without an explicit role and label, screen readers announce it as a generic list of links with no context about its purpose.

**Fix:**

```html
<aside aria-label="Social links">
  <nav role="navigation" aria-label="Social links">
    <p id="connect-heading">Connect</p>
    <ul aria-labelledby="connect-heading">
      <li>
        <a href="https://github.com/RivalMoh" target="_blank" rel="noopener noreferrer"
           aria-label="GitHub profile (opens in new tab)">GitHub</a>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/rivalmohwahyudi" target="_blank" rel="noopener noreferrer"
           aria-label="LinkedIn profile (opens in new tab)">LinkedIn</a>
      </li>
      <li>
        <a href="/contact" aria-label="Contact page">Email</a>
      </li>
    </ul>
  </nav>
</aside>
```

Also ensure that when the sidebar is hidden on mobile, it includes `aria-hidden="true"` so hidden links are not announced.

---

### 🟡 P2 — Fix this month (design + UX improvements)

---

#### 9. Remove the filter UI until you have 4+ projects — 10 min
**Affects:** `/` (homepage)

The "Filter Projects" section with category buttons currently shows 2 projects. A user clicking "Machine Learning" sees 1 result. Clicking "Data Analytics" sees 1 result. The interaction cost exceeds the value delivered.

**Fix — conditional render in Astro:**

```astro
---
const projects = await getProjects(); // your data source
const FILTER_THRESHOLD = 4;
---

{projects.length >= FILTER_THRESHOLD && (
  <div role="group" aria-label="Filter projects by category">
    <!-- filter buttons here -->
  </div>
)}
```

The "2 documented" count label already communicates the number without requiring a filter.

---

#### 10. Add a visual anchor to the hero section — 1–2 hours
**Affects:** `/` (homepage)

The hero is entirely text. Adding a subtle background element visually separates "above the fold" from the rest of the page and signals that the site is designed, not just typed.

**Fix — add a dot-grid SVG directly before the hero text, inside the hero `<section>`:**

```html
<!-- Must be aria-hidden so screen readers skip it -->
<svg
  aria-hidden="true"
  focusable="false"
  class="absolute inset-0 w-full h-full pointer-events-none opacity-[0.07]"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <pattern id="dot-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#dot-grid)" />
</svg>
```

Ensure the hero `<section>` has `position: relative` and `overflow: hidden` so the SVG is contained.

---

#### 11. Homepage About section — expand or simplify — 30 min
**Affects:** `/` (homepage)

The single-paragraph About block between the hero and projects reads as filler. Two options:

**Option A — Expand it (add visual support):**

```html
<section aria-labelledby="about-heading">
  <h2 id="about-heading">About</h2>
  <div class="about-grid"> <!-- two-column on desktop -->
    <p>My focus is translating ambiguous business and civic problems...</p>
    <div class="stat-row">
      <div class="stat"><span class="stat-num">2+</span><span class="stat-label">Years building data systems</span></div>
      <div class="stat"><span class="stat-num">2</span><span class="stat-label">Production projects shipped</span></div>
      <div class="stat"><span class="stat-num">10+</span><span class="stat-label">Technologies in stack</span></div>
    </div>
  </div>
  <a href="/about">Read full background →</a>
</section>
```

**Option B — Simplify to a single link:**

```html
<section aria-labelledby="about-heading">
  <h2 id="about-heading">About</h2>
  <p>My focus is translating ambiguous business and civic problems into robust technical systems.</p>
  <a href="/about" class="text-link">Read more about my approach →</a>
</section>
```

Option B is recommended if you don't have time to implement stats right now. A clean brief teaser is better than an orphaned paragraph.

---

#### 12. Contact page — fix CTA visual hierarchy — 15 min
**Affects:** `/contact`

Email and LinkedIn are styled identically, but Email is the primary action. Users should be able to identify the primary CTA without reading the "Primary" label.

**Fix — differentiate button styles:**

```html
<!-- Email — solid/filled (primary) -->
<a href="mailto:rvlwhy@gmail.com?..." class="btn-primary">
  <span class="btn-label">Primary</span>
  <span class="btn-type">Email</span>
  <span class="btn-value">rvlwhy@gmail.com</span>
</a>

<!-- LinkedIn — outlined (secondary) -->
<a href="https://www.linkedin.com/in/rivalmohwahyudi" class="btn-secondary">
  <span class="btn-label">Professional Network</span>
  <span class="btn-type">LinkedIn</span>
  <span class="btn-value">Message me directly</span>
</a>
```

```css
.btn-primary {
  background: var(--accent);
  color: var(--bg-base);
  border: 1px solid var(--accent);
}
.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-default);
}
```

---

#### 13. Move table of contents to top of project articles — 30 min
**Affects:** both project pages

The Contents list currently renders at the very bottom of the article — after all the content it's supposed to navigate. This makes it useless for in-page navigation on a long document.

**Fix options, in order of preference:**

**Option A — Sticky sidebar TOC (desktop):**

```html
<div class="article-layout"> <!-- CSS grid: content | sidebar -->
  <article><!-- main content --></article>
  <aside class="toc-sidebar" aria-label="Table of contents">
    <nav>
      <p class="toc-heading">Contents</p>
      <ul>
        <li><a href="#the-problem-context">The Problem Context</a></li>
        <li><a href="#system-architecture">System Architecture</a></li>
        <!-- ... -->
      </ul>
    </nav>
  </aside>
</div>
```

```css
.toc-sidebar {
  position: sticky;
  top: 80px; /* below the navbar */
  align-self: start;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}
```

**Option B — TOC at the top of the article (simpler):**

Move the Contents `<nav>` to immediately after the project overview panel and before "The Problem Context" section.

---

#### 14. Fix "1 highlighted" and "2 documented" counter labels — 15 min
**WCAG:** 1.3.1 Info and Relationships  
**Affects:** `/` (homepage)

These counter labels appear next to section headings but are visually associated only — screen readers read them as orphaned text.

**Fix — nest inside the heading:**

```html
<h2 id="featured-heading">
  Featured Projects
  <span class="section-count" aria-label="1 project highlighted">1 highlighted</span>
</h2>

<h2 id="all-projects-heading">
  Filter Projects
  <span class="section-count" aria-label="2 projects documented">2 documented</span>
</h2>
```

```css
.section-count {
  font-size: 0.6em;
  font-weight: 400;
  color: var(--text-secondary);
  margin-left: 0.5em;
}
```

---

### 🟢 P3 — Future improvements (polish)

These do not affect WCAG compliance but improve the professional quality of the site.

| Item | Description | Est. Time |
|------|-------------|-----------|
| Hero font size | Increase H1 to use the `--text-hero` clamp variable for more visual impact on desktop | 15 min |
| Scroll-triggered reveal | Add `.reveal-on-scroll` entrance animations (wrapped in prefers-reduced-motion) | 2 hrs |
| Card hover animations | Add subtle `translateY(-2px)` on project card hover (reduced-motion safe) | 30 min |
| Profile image on homepage About | A headshot next to the About paragraph creates immediate human connection | 1 hr |
| 404 page | A custom 404 with a nav link back home is a small but professional touch | 30 min |

---

## Verification Checklist

Run this after completing all P0 and P1 items.

### Automated
- [ ] axe DevTools scan on all 5 pages — zero violations
- [ ] WAVE scan: [https://wave.webaim.org/](https://wave.webaim.org/) — all 5 pages
- [ ] Lighthouse Accessibility score ≥ 95 on all pages
- [ ] Lighthouse Performance score ≥ 90 (images lazy-loaded, fonts display=swap)

### Manual keyboard test (do on every page)
- [ ] First Tab press shows skip link visibly
- [ ] Skip link jumps focus to `#main-content` correctly
- [ ] Tab order matches visual left-to-right, top-to-bottom flow
- [ ] Every link and button receives a visible focus ring
- [ ] Filter buttons announce correct pressed state (use browser accessibility inspector)
- [ ] No interactive elements are unreachable by keyboard

### Screen reader test (VoiceOver on macOS: Cmd+F5)
- [ ] Page title announced correctly on load (section name first)
- [ ] Landmarks navigable: header, nav, main, aside, footer all present
- [ ] Profile image alt text announced on About page
- [ ] Architecture diagram announced as image with description on SuaraWarga page
- [ ] Overview stats read as definition list (Role: Full Stack & AI Engineer, etc.)
- [ ] External links announce "(opens in new tab)"
- [ ] Active filter button announces as "pressed"

### Visual check
- [ ] Site usable at 320px viewport width (no horizontal scroll)
- [ ] Text readable at 200% browser zoom on all pages
- [ ] Site tested in Windows High Contrast mode (Edge → Settings → High Contrast)
- [ ] All content visible and navigable without a mouse

---

## Time Estimate Summary

| Priority | Items | Total Estimated Time |
|----------|-------|----------------------|
| P0 — Critical WCAG | 4 items | ~45 minutes |
| P1 — Important WCAG | 4 items | ~80 minutes |
| P2 — Design/UX | 6 items | ~3–4 hours |
| Verification | Full checklist | ~1 hour |
| **Total** | | **~6–7 hours** |

The P0 fixes alone take under an hour and move you from ~60% to approximately 80% WCAG compliance. P0 + P1 together should get you to ~95%.

---

## Reference Links

| Tool | URL |
|------|-----|
| axe DevTools (free) | https://www.deque.com/axe/devtools/ |
| WAVE Checker | https://wave.webaim.org/ |
| WebAIM Contrast Checker | https://webaim.org/resources/contrastchecker/ |
| WCAG 2.1 Quick Reference | https://www.w3.org/WAI/WCAG21/quickref/ |
| MDN ARIA roles | https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles |

---

*Generated from re-review audit — rival-porto.vercel.app — April 2026*
