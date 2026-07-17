# Off The Muscle Pressure Cleaning

Marketing site for **Off The Muscle Pressure Cleaning** — family-owned, licensed & insured power washing across South Florida (Palm Beach County, Northern Broward, Southern Martin). Residential power washing, driveway & surface cleaning, roof cleaning, and commercial power washing.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, static output)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- TypeScript, pnpm

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:3730
```

## Build & run

```bash
pnpm build
pnpm start      # production server on :3730
```

## Where things live

- `src/lib/site.ts` — all copy-adjacent data: services, cities, transformations, gallery, contact info
- `src/components/` — sections & interactions (Hero jet-cut, GrimeCanvas wash-it-yourself, BeforeAfter sliders, InsuredBand, SocialStrip gallery, lead popup)
- `public/images/` — brand logos and real field photography
- `public/videos/` — the cinematic hero wash clip
