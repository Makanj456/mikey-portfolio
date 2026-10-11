# mikey-portfolio

Personal portfolio website for Mikey, software engineering and management student at the University of Gothenburg.

Built with Vite, React, TypeScript and Tailwind CSS, GSAP and three.js, with animated components from [Magic UI](https://magicui.design) and [React Bits](https://reactbits.dev).

## Run locally

```bash
npm install
npm run dev
```

## Editing content
All text lives in `src/content.ts`. Replace the `[bracketed placeholders]` there.
To add a profile photo, put it in `public/` and swap the placeholder in `src/App.tsx` (see the comment in the About section).

## Animation
GSAP (with ScrollTrigger) drives the scroll animations, and three.js renders the 3D shape in the hero (`src/components/HeroScene.tsx`, lazy-loaded).
The official [GSAP AI skills](https://github.com/greensock/gsap-skills) are vendored in `.claude/skills/` (MIT), so Claude Code picks them up when working in this repo.

## Adding components
`components.json` already lists the `@magicui` and `@react-bits` registries, so you can add more with the shadcn CLI, for example:

```bash
npx shadcn@latest add @magicui/marquee
npx shadcn@latest add @react-bits/Dither-TS-TW
```

Components live in `src/components/magicui` and `src/components/reactbits`.

## Publishing
Pushes to `main` build and deploy through GitHub Actions (`.github/workflows/deploy.yml`).
One-time setup: Settings → Pages → Source: **GitHub Actions**. The site appears at https://makanj456.github.io/mikey-portfolio/.
