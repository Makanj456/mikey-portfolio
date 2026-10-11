# mikey-portfolio

Personal portfolio website for Mikey, software engineering and management student at the University of Gothenburg.

Built with Vite, React, TypeScript and Tailwind CSS, with animated components from [Magic UI](https://magicui.design) and [React Bits](https://reactbits.dev).

## Run locally

```bash
npm install
npm run dev
```

## Editing content
All text lives in `src/content.ts`. Replace the `[bracketed placeholders]` there.
To add a profile photo, put it in `public/` and swap the placeholder in `src/App.tsx` (see the comment in the About section).

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
