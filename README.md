# The Dubai Mall — Destination Deck

An interactive, browser-based **sales experience** for one of the world's
largest shopping and entertainment destinations. Built as a screening
project for LIAT.ai.

It replaces the fragmented way a property like this is pitched today —
jumping between a YouTube tab, a static PDF, and a spreadsheet — with a
single, self-contained, cinematic web application. A salesperson can
screen-share it on a live call, or send it as a link a prospect explores
alone.

**Live deck:** https://dubai-mall-deck-maneeshak2110-7915s-projects.vercel.app

**Repository:** https://github.com/MANEESHA-KONDAPUREDDY/dubai-mall-deck

---

## What it does

The deck is built for one audience: decision-makers at brands, agencies,
and production companies deciding whether to invest in a presence at the
property. Every section is written to move them toward a concrete action —
**signing a lease, committing to a sponsorship, or booking a venue.**

- **Phase 1 — Core overview:** an eight-chapter narrative — Overview, Why
  The Dubai Mall, Retail, Fashion Avenue, Dining, Attractions, Events, and
  a closing Partner section.
- **Phase 2 — Expandable sub-modules:** three deeper, independently routed
  modules reached from the deck — **Events**, **Sponsorship**, and
  **Leasing** — each with its own venues/tiers/paths and a working
  enquiry form.

## Tech stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **React 19 + Vite** | Component model maps cleanly to a modular, expandable deck; Vite keeps the build fast and lean |
| Styling | **Tailwind CSS** | A single design system (colour, type, spacing) enforced consistently |
| Motion | **Framer Motion** | Scroll reveals, masked text, the intro loader, 3D tilt, magnetic CTAs |
| Smooth scroll | **Lenis** | Inertial, cinematic scrolling that drives the whole experience |
| Routing | **React Router** | Each Phase 2 sub-module is a lazy-loaded route |
| Deployment | **Vercel** | Zero-config SPA hosting |

## Getting started

```bash
npm install        # install dependencies
npm run dev        # start the dev server (http://localhost:5173)
npm run build      # production build -> dist/
npm run preview    # preview the production build
```

Asset pipeline (already run; included for reproducibility):

```bash
py scripts/fetch-images.py      # download imagery from Wikimedia Commons
node scripts/optimize-images.mjs # compress it for the web
py scripts/fetch-credits.py     # regenerate CREDITS.md
```

## Project structure

```
src/
├── data/content.js        # single source of truth — all copy, stats, media
├── lib/                   # motion variants, smooth-scroll bridge
├── hooks/                 # smooth scroll, scroll-spy
├── components/
│   ├── layout/            # Nav, SideRail, IntroLoader, Footer, module chrome
│   └── ui/                # reusable: TextReveal, MediaFrame, StatCounter,
│                          #   Tilt, Magnetic, Cursor, CTAButton, ...
├── sections/              # the 8 Phase 1 sections
└── pages/
    ├── DeckHome.jsx       # the main scrollable deck
    └── modules/           # Phase 2: Events / Sponsorship / Leasing
```

## Design decisions

- **Data-driven, re-skinnable.** Every word, statistic, and media reference
  lives in `src/data/content.js`. Components render structure, never
  content. This was proven mid-build: the deck was retargeted from one
  mall to another by editing a single file — no component changes.
- **Expandable by construction.** Phase 2 modules are lazy-loaded routes
  built from shared chrome (`ModuleHeader`, `ModuleHero`, `ModuleFooter`,
  `EnquiryForm`). A new module is one file plus one route — the brief's
  "grow into sub-modules without a rewrite" requirement, made literal.
- **Non-linear navigation.** A full-screen Index with a live visual
  preview, plus an always-on side rail — the viewer controls their journey
  and always knows where they are.
- **Video-first, performance-aware.** Background video carries the opening
  and the Events section; it pauses off-screen and never blocks the UI.
- **Cinematic, restrained motion.** A signature easing curve, masked text
  reveals, scroll parallax, a 0–100 intro loader, a custom cursor,
  magnetic CTAs, and 3D-tilt cards — tuned to feel like a luxury brand,
  not a tech demo. All of it respects `prefers-reduced-motion`.

## How AI was used

This project was built end-to-end with **Claude (Claude Code)** as the
engineering partner — the brief explicitly rewards using AI to *accelerate
design and enhance the experience*, and that is exactly how it was used:

- **Architecture & code** — the component system, data-driven structure,
  motion system, and all three Phase 2 modules were designed and written
  in collaboration with Claude.
- **Copywriting** — section narratives and CTAs were drafted and refined
  with AI, then fact-checked against public figures.
- **Asset workflow** — AI scripted the pipeline that sources imagery from
  Wikimedia Commons, compresses it, and generates the attribution file.
- **Velocity** — the result is a large, polished, multi-module application
  produced in a tight window without sacrificing craft.

## Performance

Lighthouse: **97 on desktop**; ~75 on a throttled low-end phone.

- Route-level code splitting — sub-modules ship as separate chunks.
- Imagery is served as compressed WebP, lazy-loaded, capped at 1280px.
- The background film is **interaction-gated** — it loads only after the
  viewer scrolls or moves the pointer, so it never blocks first paint.
  On mobile the deck shows poster stills instead of video: lighter, and
  better suited to a phone.
- Fonts load asynchronously; the hero image is preloaded.
- A deliberate trade-off: the brief asks for both a video-first
  experience *and* a high score. The deck prioritises a fast first paint
  and a cinematic desktop presentation — its primary use on sales calls —
  and treats mobile (a "bonus" per the brief) as a fast, poster-led
  experience. A true 90+ on throttled mobile would need server-side
  pre-rendering; noted below as a next step.

## With more time

- Server-side pre-rendering (or static prerender of the first paint) to
  push the throttled-mobile Lighthouse score past 90.
- AI-generated renderings for the hypothetical venue concepts (a
  performing-arts hall, an expo wing) the brief invites.
- A deeper analytics layer in the sub-module enquiry forms, and a CMS
  behind `content.js` so a non-developer can edit the deck.
- An interactive property map as a fourth Phase 2 module.

## Credits

Photography: **Wikimedia Commons**, used under free licences — full
attribution in [CREDITS.md](CREDITS.md). Background films are embedded
from YouTube. Some audience/commercial figures are illustrative, in
service of the sales narrative.

---

_Built by Maneesha Kondapureddy · screening project for LIAT.ai._
