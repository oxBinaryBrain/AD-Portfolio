# Behaviors — andrewdominic.vercel.app

## Libraries
- **Lenis:** `html` has `.lenis` class — smooth scroll with inertia
- **GSAP + ScrollTrigger:** `.pin-spacer` elements confirm pinning (4 instances)
- **Lucide React:** Arrow icons on buttons

## Scroll Sweep

### Capsule Portal (0–~1980px scroll)
- Hero viewport pinned for ~2 viewport heights
- Capsule element clips from full viewport to pill shape in headline
- Dark overlay opacity 0 → 1
- Metric cards fade in with mix-blend-mode: difference
- Hero bottom nav fades with hero content

### Work Section (~1980–7200px)
- Section pinned; project cards transition on scroll (not click)
- Active project indicator: `[ 01 / 04 ]` updates with scroll position
- Custom cursor shows "VIEW PROJECT" on project card hover areas

### About Section (~7200–12172px)
- "Real Context." heading with split-word animation
- Word-by-word text reveal on bio paragraphs
- Image panels (Andrew portrait + PC setup) scroll/pin
- Origin story: uppercase kinetic typography
- Content images stacked with absolute z-index layers (1–4)
- Counter animations: "0K+" → target values on viewport enter
- Skills marquee: horizontal LogoLoop auto-scroll

### Contact (~12172px+)
- "Contact" h2 slides from `translate(100vw)` → `0`
- Circle clip-path reveal from bottom: `circle(0px at 50% 100%)` → full
- Light `#f4f4f4` panel expands over dark background

## Click Sweep
- **Nav links:** WORK → `#work`, INFO → `#about`, CONTACT → `#contact` (anchor scroll via Lenis)
- **Social links:** BEHANCE, LINKEDIN, GITHUB → `#` placeholders
- **VIEW CASE STUDY:** `/project/shitha`, `/project/yatra`, `/project/isro`, `/project/sinclo`
- **VIEW ALL PROJECTS:** `#`
- **Contact links:** GitHub, LinkedIn, Behance, mailto

## Hover Sweep
- **Nav links:** opacity 1 → 0.5, transition 0.3s
- **CTA buttons:** bg `#0a0a0a` → `#171717`; arrow icon translates x+0.5 y-0.5
- **Outline buttons:** bg transparent → white, text white → grit-900
- **Contact social links:** text grit-900 → accent `#da2727`
- **Project cards:** cursor label appears (custom cursor)

## Responsive (390px vs 1440px)
- Custom cursor: hidden on mobile (`hidden md:block`)
- Hero headline: mobile `clamp(3.5rem,16vw,7rem)` vs desktop `clamp(5rem,9vw,10rem)`
- Grid lines, side labels: hidden below 1024px
- Work cards: stack vertically on mobile, horizontal pinned on lg+
- Contact grid: single column on mobile, 12-col on md+
- Skills section height: 60vh mobile, 70vh desktop