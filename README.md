# mikey-portfolio

Personal portfolio website for Mikey, software engineering and management student at the University of Gothenburg.

A light, editorial, image-forward site built with Vite, React, TypeScript and Tailwind CSS. Motion comes from GSAP (ScrollTrigger, SplitText), smooth scrolling from Lenis, and WebGL image effects from three.js.

## Run locally

```bash
npm install
npm run dev
```

## Editing content
All text lives in `src/content.ts`.
Project images live in `public/work/`. The current ones are generated placeholders, so replace each file with a real screenshot or photo (landscape, at least 2000px wide) under the same name, or point `image` in `src/content.ts` at a new file.

## How it's put together
- `src/sections/`: one file per page section (Hero, Intro, Work, Marquee, Practice, Capabilities, Contact).
- `src/components/gl/`: three.js effects. `HeroGL` is the ambient hero slideshow with noise transitions. `DistortImage` adds the hover lens to images; its WebGL code only loads on first hover and never on touch devices.
- `src/lib/smooth-scroll.ts`: Lenis momentum scrolling, synced to GSAP's ticker.
- Everything respects `prefers-reduced-motion`. With it on, smooth scrolling, WebGL and scroll animations are switched off.
- `components.json` keeps the shadcn registries for Magic UI and React Bits, if you want to pull in more components.
- The official [GSAP AI skills](https://github.com/greensock/gsap-skills) are vendored in `.claude/skills/` (MIT), so Claude Code uses them when working in this repo.

## Publishing
Pushes to `main` build and deploy through GitHub Actions (`.github/workflows/deploy.yml`).
One-time setup: Settings → Pages → Source: **GitHub Actions**. The site appears at https://makanj456.github.io/mikey-portfolio/.
