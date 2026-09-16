# Studio Design System — Visual Identity

> Ground truth design specification for new video projects.
> All new compositions must adhere to this system for colors, typography, glassmorphism, and motion rules.

---

## 1. Canvas & Composition Architecture

- **Resolution:** 1920 × 1080px (16:9 Landscape) or 1080 × 1920px (9:16 Short-form)
- **Frame Rate:** 30 FPS (`1/30 = 0.0333s` snap grid)
- **Canvas Background:** Deep Navy `#07121c`
- **Root Element:** `<div id="root" data-composition-id="..." data-duration="N" data-width="1920" data-height="1080">`

### Face Video Wrapper Pattern (`#face-wrapper`)
- Wrapper is a standard non-timed `<div>` reframed/scaled by GSAP.
- **NEVER** animate dimensions, scale, or clip-path directly on `<video>` (causes video decoder freezing in Chromium/HyperFrames).
- The `<video>` tag remains `muted playsinline`, while a sibling `<audio>` element handles the sound mix.
- For PiP (Picture-in-Picture) transitions, animate the wrapper's `width`, `height`, `x`, `y`, and `borderRadius`.

---

## 2. Typography (Studio Signature Style)

Pair **Montserrat** and **Roboto Mono** — never use generic browser fonts.

| Font Family | Weights | Role |
|---|---|---|
| **Montserrat** | ExtraBold `800` | Headlines & hero titles (`font-size: 76px`, 2-line Dynamic Gradient Fill with soft glow bloom) |
| **Roboto Mono** | Bold `700` | Eyebrow kickers (`font-size: 16px`, tracking `0.42em`, color `#37bdf8`, neon glow) |
| **Roboto Mono** | Medium `500` / SemiBold `600` | UI labels, stats, tag pills, step numbers (`01`, `02`), task items (`15px–16px`, bullet `›`) |
| **Montserrat** | Bold `700` / ExtraBold `800` | Subtitles & captions (Active words: `#ffffff` with `#37bdf8` bloom) |

Fonts are imported locally via `assets/brand-tokens.css` or Google Fonts.

---

## 3. Color Palette & CSS Tokens

| Token | Hex / Value | Usage |
|---|---|---|
| `--color-canvas` | `#07121c` | Deep Navy Canvas / Body background |
| `--color-surface` | `#0d2031` | Dark card surface / base panels |
| `--color-surface-2` | `#195066` | Secondary teal-navy surface / gradients |
| `--color-surface-glass` | `rgba(13, 32, 49, 0.72)` | Frosted glass panel backdrop |
| `--color-accent` | `#37bdf8` | Electric Cyan — primary accent, highlights, metrics, CTAs |
| `--color-accent-glow` | `#0307ff` | Deep blue glow / outer shadow accents |
| `--color-warn` | `#f09025` | Vibrant Orange — contrast accent, alerts, warm highlights |
| `--color-text-white` | `#ffffff` | Primary text on dark backgrounds |
| `--color-text-dim` | `#96a2b6` | Secondary copy, descriptions, subtitles |
| `--color-text-muted` | `#64748b` | Muted metadata, footer notes, dividers |
| `--color-border-subtle` | `rgba(255, 255, 255, 0.09)` | Subtle card hairline borders |
| `--color-border-glow` | `rgba(55, 189, 248, 0.35)` | Glowing cyan border for active/highlighted cards |

---

## 4. Glassmorphism & Depth

For all card components and overlay panels:
- **Backdrop blur:** `backdrop-filter: blur(16px)` (or `20px` for hero cards)
- **Top gradient accent line:** `height: 3px; background: linear-gradient(90deg, var(--color-accent), transparent);`
- **Border:** `1px solid rgba(255, 255, 255, 0.09)`
- **Box shadow:** `0 20px 48px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.12)`
- **Border radius:** `20px` for main cards, `8px` for pills/tags.

---

## 5. Motion Principles (GSAP)

- **Deterministic timelines:** Exactly one paused timeline registered synchronously on `window.__timelines[<id>]`.
- **Eases:**
  - `power3.out` / `expo.out` for crisp text and title reveals.
  - `back.out(1.2)` for glass card pop-in entrances.
  - `sine.inOut` or `none` for ambient background grid/gradient drift.
- **Law #11 Timeline Lock:** Every timeline must conclude with `tl.to({}, { duration: DURATION }, 0)` to guarantee the exact composition length.
- **No hard flashes:** Use smooth alpha reveals, slide offsets, and scale interpolations.
