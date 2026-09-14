# Architecture Website

A cinematic architecture portfolio built with Next.js, TypeScript, Tailwind CSS, GSAP and Lenis.

## Current direction

The first build establishes the motion and page-flow system:

- cinematic three-panel entrance reveal
- full-screen architectural hero
- oversized editorial typography
- smooth Lenis scrolling
- GSAP ScrollTrigger parallax
- pinned scroll-driven project sequence
- layered image transitions
- services and process sections
- large practice statistics
- full-screen project enquiry footer
- responsive mobile layout
- reduced-motion accessibility fallback

The current studio name, contact email, project names, statistics and project images are placeholders until the final firm content is supplied.

## Run locally

```bash
git clone https://github.com/merajNizBaloch/archeticture-website.git
cd archeticture-website
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Production build

```bash
npm run build
npm start
```

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- GSAP + ScrollTrigger
- Lenis
- Lucide React

## Next implementation pass

- replace placeholder studio identity with the real firm brand
- add final logo and typography
- add real project photography/renders
- create individual project case-study routes
- refine page-to-page transitions
- add an immersive project index
- add studio/about and contact pages
- tune the motion system against the final imagery


## Final firm identity

The site now uses one central branding/content file:

```text
lib/site.ts
```

Replace these fields when the final firm information is available:

- `name`
- `shortName`
- `descriptor`
- `location`
- `email`
- `phone`
- `address`
- social links
- `workingIdentity: false`

The navigation, footer, metadata, Open Graph image and general studio copy all read from this source.

The current geometric `S/01` mark is a temporary working identity. Replace `components/StudioMark.tsx` with the final logo component when the real logo is supplied.

## Project content

Project content lives in:

```text
lib/projects.ts
```

Each project currently contains:

- slug
- project number
- title
- location
- year
- type
- area
- status
- hero image
- gallery images
- project introduction
- design concept

Replace the temporary Unsplash URLs with the firm's real renders or photography before launch.

## Launch checklist

1. Replace the working firm identity in `lib/site.ts`.
2. Replace the temporary `StudioMark`.
3. Replace placeholder projects and imagery in `lib/projects.ts`.
4. Add the real email/phone/address.
5. Set the final production domain in Vercel.
6. Run `npm run build` before deployment.


## Production site URL

Set this environment variable in Vercel before launch:

```text
NEXT_PUBLIC_SITE_URL=https://your-final-domain.com
```

It is used for metadata and the generated sitemap. Local development automatically falls back to `http://localhost:3000`.
