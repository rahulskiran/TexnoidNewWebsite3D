# Texnoid Design Guide

Texnoid is a web design and development agency. Every section, modal and component
must follow this guide so the site reads as one system. **Read this before adding or
editing any UI.**

## Colour palette

Red is the single brand accent. Do not introduce lavender, purple, green or teal. The one exception is the floating WhatsApp button, which uses WhatsApp green (`#25d366`, hover `#1ebe5b`) so it is instantly recognisable.

| Token | Hex | Use |
| --- | --- | --- |
| Red (brand) | `#e11d2e` | Primary buttons, accents, highlighted words |
| Red (hover) | `#c8101f` | Hover/pressed state of red |
| Red tint | `#ffe3e0` | Soft red surfaces, badges, highlights |
| Red glow | `rgba(225, 29, 46, 0.25)` | Shadows under red buttons |
| Ink | `#14110f` | Headings and body text on light backgrounds |
| Ink muted | `rgba(20, 17, 15, 0.55–0.65)` | Secondary text, captions |
| Paper | `#faf8f6` | Default light section background, page base |
| Blush | `#f3e7e5` | Cards and image placeholders on light backgrounds |
| White | `#ffffff` | Text on red, badges, inner cards |
| Dark (wine-black) | `#16090c` | Base of dark abstract sections and the footer |

### Dark abstract sections (gallery, services, reviews)

These use a wine-black base (`#16090c`) with soft, blurred, slowly drifting colour blobs
(red `#e11d2e`, orange `rgba(255,120,70)`, magenta `rgba(190,30,110)`, coral `rgba(255,70,90)`)
and a faint white dot texture. Cards and controls on them use frosted glass:
`rgba(255,255,255,0.12)` fill, `1px rgba(255,255,255,0.3)` border, `blur(6px)`, white text.
Alternative blob palettes (midnight, sunset, orchid, aurora) exist for the reviews section only.

### Illustration accents (Included section)

3D illustrations may use the warm sunset set instead of red: amber-orange
`#ffb26b -> #ff8a3d -> #e86a1c` for main panels, peach tints `#ffe0bd / #ffc78f` for
back layers, plum `#a1266f -> #7a1f5c` for buttons and stars, on a cream card
(`#fdf3e7 -> #f7e2cc`). Do not use violet, teal or green here.

Rules:
- Text on red or dark is white. Text on light is ink. Never put red text on red.
- Inactive or secondary text on red: white at 55% opacity, never a different hue.
- Keep contrast at WCAG AA or better (4.5:1 body, 3:1 large text).

## Section rhythm

Sections alternate light and dark abstract so the page has a clear rhythm:

1. Hero: Paper, with animated red dot wave
2. Gallery: Dark abstract
3. Included: Paper
4. Services: Dark abstract (scroll-pinned, steps through services)
5. Works: Paper
6. Reviews: Dark abstract (two auto-scrolling rows of frosted cards moving in opposite directions)
7. FAQ: Paper (left: sticky abstract gradient card with title and CTA; right: numbered accordion rows)
8. Footer: Flat wine-black `#16090c` with blush `#f3e7e5` text and red hover accents, no gradients or blobs (big "Have a project in mind?" headline with a red accent word, large email link, hairline-divided link columns, underline newsletter field)

New sections should continue the alternation. Do not place two dark sections
back to back (the FAQ sits between reviews and the footer for this reason).

## Typography

- Font: **Plus Jakarta Sans** (`var(--font-body)`) for headings and body.
  Big display headlines may use the condensed `var(--font-hero)` only inside the
  gallery artwork.
- Headlines: weight 600–700, tight tracking (`-0.03em` to `-0.06em`), line-height 0.9–1.1.
- Body: 1rem minimum on mobile (never below 0.9rem for any readable text), line-height 1.5–1.6.
- Eyebrows and labels: small, weight 600, optional uppercase with `0.05em` tracking.
- Accent words in a headline use red (`#e11d2e`), never a gradient.

## Shape and spacing

- Buttons and badges: fully rounded pills.
- Cards and images: 16–28px radius (`16px` for images in grids, `28px` for feature cards).
- Section padding: `5rem 2.8rem` desktop, `3.5rem 1.5rem` mobile. Content max width `1540px`.
- Spacing follows an 8px rhythm (0.5rem steps).
- Elevation is subtle: only red buttons get a soft red glow shadow.

## Components

- **Primary button**: red background, white text, pill, `0.85rem` bold with `0.05em` tracking,
  min height 48px on mobile. Hover darkens to `#c8101f` and lifts 2px.
- **Ghost button**: transparent, ink text, `1.5px` ink border at 25% opacity, fills to 5% ink on hover.
- **Badge**: white pill with hairline border, red inner pill for the rating or label.
- **Links with arrows**: ink text, red arrow, gap widens on hover.
- **Accordion / list rows**: hairline dividers, big name, round `+` toggle that becomes a white `x` when open.

## Motion

- Ease: `cubic-bezier(0.16, 1, 0.3, 1)` for movement, `0.2–0.3s ease` for colour/opacity.
- Image hover: scale to 1.05 over about 0.7s.
- Scroll effects (parallax gallery, pinned services) must respect `prefers-reduced-motion`.
- Nothing should autoplay sound.

## Responsive rules

- Breakpoint: `900px` for layout changes, `640px` for the hero.
- Multi-column grids collapse to one column on mobile.
- Touch targets are at least 44px, and primary buttons are full width when stacked.
- No horizontal scrolling at any width.
- Pinned (sticky) sections must fit inside one screen height on phones.

## Content and voice

- Brand name is **Texnoid**; the legal entity shown in the footer copyright is **Texnoid Solutions LLP** (with the ™ mark only in the header logo).
- Voice: clear, confident, plain English. Focus on websites, web apps, e-commerce, 3D and motion.
- Do not reuse template copy ("The Smiling Agency", "Agency Template", "Logoipsum").
- Placeholder projects and stock images must be marked with a comment and replaced before launch.

## File conventions

- One component per file in `src/components/`, with its own CSS file named the same
  (`Works.tsx` and `Works.css`). Class names use a short section prefix (`wrk-`, `svc-`, `inc-`, `pg-`).
- Use the hex values above directly, or add CSS variables that match them exactly.
- New sections are registered in `src/App.tsx` in page order.

## Motion and scroll system

All scroll behaviour comes from one hook, `src/hooks/useScrollEffects.ts`, and the CSS block
at the end of `src/index.css`. New sections should plug into it instead of adding their own
scroll listeners.

- **Reveal on scroll:** add `data-reveal` to any heading, card or block. It slides up 32px and
  fades in once (0.9s, `cubic-bezier(0.16, 1, 0.3, 1)`), with an automatic stagger for siblings.
- **Off-screen pause:** add `data-anim` to any section with an animated background. Its
  animation only runs while the section is on screen (add the section's selector to the
  `:not(.in-view)` rule in `index.css`).
- **Hero:** staggered load-in, then the content eases up and fades and the dots drift as you
  scroll (`--hero-p`). The dot canvas is capped at about 30fps and stops when off screen.
- **Progress bar:** a 3px orange-to-red gradient bar at the top follows page progress
  (`--scroll-progress`).
- **Pinned sections:** Services is pinned and steps through items on scroll; the gallery columns
  move in opposite directions.
- **Rules:** animate only `transform` and `opacity`; no per-frame React state that changes
  value every frame; every effect is disabled under `prefers-reduced-motion`.
