# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # dev server (SSR mode via astro.config.server.mjs)
pnpm build        # production static build (astro.config.static.mjs)
pnpm build:preview # SSR build for preview.tallboylandscapes.com
pnpm preview      # serve last build locally
```

No test runner is configured.

## Environment Variables

Required in `.env` for local dev:

```
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
CONTENTFUL_HOST=          # use cdn.contentful.com (prod) or preview.contentful.com (draft)
PUBLIC_EMAILJS_SERVICE_ID=
PUBLIC_EMAILJS_TEMPLATE_ID=
PUBLIC_EMAILJS_PUBLIC_KEY=
```

Astro validates these at build time via `astro:env` (defined in `astro.config.common.ts`). Server secrets (`CONTENTFUL_*`) are only accessible in `.astro` frontmatter and `src/lib/` — never in client `<script>` tags.

## Architecture

**Two build modes** share `astro.config.common.ts`:
- `static` — fully pre-rendered, deployed to `www.tallboylandscapes.com`
- `server` — Cloudflare Workers SSR, deployed to `preview.tallboylandscapes.com`

**Data layer** (`src/lib/`): Each content type has a `types.ts` (Contentful skeleton + resolved type) and `index.ts` (typed fetch functions). The Contentful client in `src/lib/contentful.ts` uses `.withoutUnresolvableLinks` — all resolved types use the `Resolved<T>` helper from `src/lib/types.ts` which wraps `Entry<T, "WITHOUT_UNRESOLVABLE_LINKS">`.

**Content types**: `homePage`, `Job` (with `beforeafterImages` field for before/after sliders), `Service`, `Testimonial`, `Stat`.

**Job pages** (`src/pages/jobs/[slug].astro`) are statically pre-rendered. The `beforeafterImages` array on a job powers `BeforeAfterImage.astro` — first image is "before", last is "after". The slider is a vanilla `<input type="range">` driving `clip-path` on the after layer.

**Styling**: All colours are CSS custom properties defined in `src/styles/global.css`. Light/dark theme is set via `data-theme` attribute on `<html>`, toggled in `src/scripts/theme.ts` and persisted in `localStorage`. Always use semantic colour tokens (e.g. `var(--color-primary)`) — never raw HSL values.

**Images**: Served via `@unpic/astro` with Contentful as the fallback image service. Use `OptimisedImage.astro` for all images — it wraps `@unpic/astro`'s `<Image>` and handles Contentful CDN URLs (which arrive without `https:` prefix).

**Client scripts**: Placed in `src/scripts/` and imported via `<script src="...">` in components. Astro bundles and deduplicates these. No framework (React/Vue/etc.) — all interactivity is vanilla TypeScript.
