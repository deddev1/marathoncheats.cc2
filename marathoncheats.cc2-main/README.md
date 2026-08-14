# Marathon Cheats — Marketing Site

Astro 7 template site for [marathoncheats.cc](https://marathoncheats.cc), adapted from the reusable game SEO template.

Primary SEO keyword: **marathon cheats** (secondary: marathon esp, aimbot, wallhack).

## Stack

- Astro 7 + Tailwind CSS 4 + TypeScript
- Multi-locale i18n (English at root, `/es/`, `/fr/`, …)
- Cloudflare Workers + Assets deployment

## Quick start

```bash
cd marathoncheats.cc2-main
npm install
npm run sync:brand
npm run dev
```

Brand Studio (local only): http://localhost:4321/brand-studio/

Build from repo root:

```bash
npm run build
```

## Deploy

Cloudflare Workers project: **marathoncheats2**

```bash
npm run deploy
```

## Brand

Edit `marathoncheats.cc2-main/src/data/brand.ts` (or Brand Studio), then:

```bash
npm run sync:brand
```

Checkout URL: Zadeyo Marathon product (`brand.checkoutUrl`).
