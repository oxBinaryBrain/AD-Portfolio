# Page Topology — andrewdominic.vercel.app

## Global Layout
- **Scroll container:** `html.lenis` with Lenis smooth scroll
- **Body:** `bg-grit-900`, `cursor: none`, hidden scrollbar
- **Main structure:** Fixed overlays + single scroll column (`div.w-full.h-full`)

## Z-Index Layers (top to bottom)
| Layer | Element | z-index | Position |
|-------|---------|---------|----------|
| Custom cursor label | `VIEW PROJECT` | 9999 | fixed |
| Custom cursor dot | rounded circle | 9998 | fixed |
| Noise overlay | `.noise-overlay` | 9999 | fixed |
| Section content | various | 10–100 | relative/fixed |
| Hero bottom nav | `.hero-bottom-nav` | 50 | absolute |

## Sections (top → bottom)

### 1. CapsulePortal (Hero)
- **Selector:** `.capsule-portal`
- **Position:** Pinned via GSAP ScrollTrigger (pin-spacer height ~1980px)
- **Interaction:** scroll-driven — capsule clip-path morphs, dark overlay fades, metrics reveal
- **Contains:** Hero headline, role tag, subtext, CTA, bottom nav, capsule GIF media
- **Background:** `#fafafa` viewport

### 2. Work Section
- **Selector:** `#work`
- **Position:** Pinned scroll section (pin-spacer height ~5220px)
- **Interaction:** scroll-driven — project cards stack/switch as user scrolls
- **Projects:** Shitha Clothing, Yatra 2026, ISRO Drone, Synflow Studio
- **Background:** `bg-grit-900`

### 3. About Section
- **Selector:** `#about`
- **Interaction:** scroll-driven text reveals, pinned image panels, content stack
- **Sub-panels:**
  - Real Context intro (min-h-screen)
  - Bio paragraph 1 (min-h-screen)
  - Bio paragraph 2 (min-h-screen)
  - Origin story quote (min-h-screen)
  - Social/content section with stacked images + counters
  - Skills marquee (`.skills-section`)
- **Background:** `bg-grit-900`

### 4. Contact Footer
- **Selector:** `#contact`
- **Interaction:** scroll-driven — "Contact" title slides in, circle clip-path reveal
- **Contains:** Social links, email, apprenticeship copy, abstract images, footer meta
- **Background:** `#f4f4f4` reveal panel + `bg-grit-900` base

## Dependencies
- CapsulePortal must complete pin before Work section begins
- Work pin must release before About flows normally
- Lenis must wrap all scroll-driven animations
- GSAP ScrollTrigger must refresh on resize