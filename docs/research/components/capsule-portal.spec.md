# CapsulePortal Specification

## Overview
- **Target file:** `src/components/CapsulePortal.tsx`
- **Screenshot:** `docs/design-references/andrewdominic.vercel.app/desktop-1440-full.png`
- **Interaction model:** scroll-driven (GSAP ScrollTrigger pin + scrub)

## DOM Structure
- `section.capsule-portal` > `div.capsule-portal__viewport`
  - grain/grid overlays, meta labels, hero-content (headline/CTA), capsule media, dark overlay, metrics, bottom nav

## Key Styles
- Viewport: height 100svh, bg #fafafa, flex center
- Headline: Antonio 700, clamp(5rem,9vw,10rem), color #0a0a0a, line-height 0.88
- Capsule: 100vw × 100svh absolute, z-index 15
- Metrics: mix-blend-mode difference, opacity 0 → 1 on scroll

## States & Behaviors
- **Scroll pin:** 200% viewport height, scrub 1
- **Capsule clip:** full viewport → pill inset(42% 20%)
- **Overlay:** opacity 0 → 1
- **Hero content:** fades out y -40

## Assets
- `/assets/tenor-DNPDyf8y.gif`

## Text Content
- BUILDING SYSTEMS THAT WORK
- Full-stack developer combining Computer Science and Business...
- Nav: BEHANCE / LINKEDIN / GITHUB | WORK INFO CONTACT

## Responsive
- Mobile headline: clamp(3.5rem,16vw,7rem)
- Grid lines/side labels hidden < 1024px