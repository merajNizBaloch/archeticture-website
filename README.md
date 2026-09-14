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


## Project case-study fields

Each project in `lib/projects.ts` now supports a full architecture case study:

- `intro` — short project overview
- `context` — site and environmental response
- `concept` — design concept
- `strategies` — numbered design decisions
- `materials` — material palette
- `drawings` — plan/section/elevation study labels
- `credits` — project information and scope
- `gallery` — five images used across the editorial gallery sequence

The current SVG drawings are intentionally diagrammatic placeholders. Replace them with real architectural plans/sections when project documentation is available.

For best results, provide at least five high-resolution images per project in this order:

1. primary spatial view
2. large secondary view
3. vertical/detail view
4. full-width atmosphere view
5. final detail/material view


## Premium interaction system

The site now includes:

- cinematic project-opening transitions from the homepage, project index, archive and next/previous project links
- route prefetching before project transitions
- desktop + mobile project case-study progress navigation
- mobile motion parity for pinned project sequences and horizontal project browsing
- touch equivalents for desktop hover interactions
- mobile viewport and orientation-change handling for GSAP / ScrollTrigger
- responsive AVIF/WebP image optimization and longer image caching
- canonical metadata for the main routes and project pages
- project-specific Open Graph / Twitter metadata
- schema.org ProfessionalService structured data
- WhatsApp-ready project inquiry flow
- optional principal architect section
- conditional social/contact links in the full-screen navigation

## Contact and principal configuration

These fields live in `lib/site.ts` and can be filled later without rebuilding the page structure:

```ts
email: ""
phone: ""
whatsapp: ""
address: ""
instagram: ""
linkedin: ""

principal: {
  name: "",
  role: "Principal Architect",
  bio: "",
  image: "",
}
```

For WhatsApp, use the international number including country code, for example:

```text
+92XXXXXXXXXX
```

When `whatsapp` is configured, the project inquiry form prepares the complete client brief and opens WhatsApp with that message. If WhatsApp is not configured, it falls back to email, then to copying the brief.

The principal architect section remains completely hidden until `name`, `bio` and `image` are all supplied. A local image path such as `/images/principal.jpg` is recommended.

## Final content still required before public launch

The remaining work is content, not page architecture:

- replace demo Unsplash imagery with the firm's real photography/renders
- replace demo project names/details with real projects
- replace diagrammatic drawing placeholders with real plans/sections/elevations where available
- fill the final contact/social fields
- fill principal architect details if that section is wanted
- set `NEXT_PUBLIC_SITE_URL` to the final production domain
- run a final production build and real-device QA after the final imagery is in place
