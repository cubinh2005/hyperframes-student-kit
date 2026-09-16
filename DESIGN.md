# Studio Design System — Master Visual Identity & Directing Rules

> Official design specification and directing standard for all HyperFrames video productions in this studio.
> Derived from the AIS Brand Identity, Frosted Glass aesthetics, and broadcast-grade motion architecture.
> Every composition MUST trace its palette, typography, glassmorphism, camera framing, and GSAP motion choices back to this file.

---

## 1. Style & Visual Philosophy

The studio brand is technical, authoritative, and cinematic — "Bloomberg Terminal meets premium Silicon Valley product launch." 

Compositions evoke a command center coming online:
- **Canvas:** Deep navy surfaces (`#07121c`), subtle tech grid textures, and ambient radial glow pools.
- **Glassmorphism:** Frosted, translucent glass panels (`backdrop-filter: blur(18px)`) with hairline highlights and deep 3D elevation shadows hovering in space.
- **Accents:** Sharp Electric Cyan (`#37bdf8`) as the hero glow, with occasional Warm Orange (`#f09025`) for contrast.
- **Pacing:** High retention, zero visual clutter. Every graphic enters with purpose, stays just long enough to be read, and yields focus back to the speaker.

---

## 2. Brand Tokens & Color Palette

All tokens are defined in `assets/brand-tokens.css`:

| CSS Variable | Value | Usage |
|---|---|---|
| `--color-canvas` | `#07121c` | Root composition canvas / deep navy background |
| `--color-surface` | `#0d2031` | Base surface for panels and cards |
| `--color-surface-2` | `#195066` | Secondary teal-navy surface / gradients |
| `--color-surface-glass` | `rgba(13, 32, 49, 0.72)` | Translucent frosted glass backdrop |
| `--color-accent` | `#37bdf8` | **Electric Cyan (Hero):** Highlights, stats, active words, underlines |
| `--color-accent-rgb` | `55, 189, 248` | RGB channels for dynamic alpha glows |
| `--color-accent-glow` | `#0307ff` | Deep blue outer glow for logo and PiP backlight |
| `--color-warn` | `#f09025` | **Warm Orange:** Contrast highlights, warnings, key metrics |
| `--color-text-white` | `#ffffff` | Primary display headlines and titles |
| `--color-text-dim` | `#96a2b6` | Secondary descriptions, labels, subtitles |
| `--color-text-muted` | `#64748b` | Muted metadata, dividers, tickers |
| `--color-border-subtle` | `rgba(255, 255, 255, 0.09)` | Subtle hairline borders |
| `--color-border-glow` | `rgba(55, 189, 248, 0.35)` | Glowing cyan border for active/highlighted elements |

*Note: Backward-compatible aliases (`--ais-bg`, `--ais-accent`, etc.) remain supported.*

---

## 3. Typography Hierarchy (Studio Signature Style)

Pair **Montserrat** and **Roboto Mono** — never use browser defaults or generic fonts.

| Font Family | Weight | Role & Usage |
|---|---|---|
| **Montserrat** | `800` (ExtraBold) | **Display Headlines & Titles:** Impact messaging (`font-size: 76px`, `line-height: 1.02`, `letter-spacing: -0.02em`). Uses the signature 2-line Dynamic Gradient Fill with soft glow blooms. |
| **Roboto Mono** | `700` (Bold) | **Technical Eyebrows & Kickers:** Eyebrow kickers on top of cards (`font-size: 16px`, `letter-spacing: 0.42em`, color `#37bdf8`, neon glow `text-shadow: 0 0 16px rgba(55, 189, 248, 0.65)`). |
| **Roboto Mono** | `500` (Medium), `600` (SemiBold) | **Technical UI & Interface:** Step numbers (`01`, `02`), stats, tickers, pill tags, daily task lists (`15px–16px`, bullet `›` in `#37bdf8`). |
| **Montserrat** | `700` (Bold), `800` (ExtraBold) | **Karaoke Subtitles:** 32px line. Active words: `color: #ffffff`, `font-weight: 800`, text-shadow cyan bloom `0 0 16px #37bdf8`. |

### Signature 2-line Dynamic Gradient Headline Standard
```css
/* Line 1: Silver White Glow */
background: linear-gradient(180deg, #ffffff 0%, #c8c8c8 62%, #ededed 100%);
-webkit-background-clip: text;
background-clip: text;
color: transparent;
text-shadow: 0 0 22px rgba(255, 255, 255, 0.35), 0 0 44px rgba(255, 255, 255, 0.14);

/* Line 2: Electric Cyan Punchline Glow */
background: linear-gradient(180deg, #ffffff 0%, #a5e3fc 50%, #37bdf8 100%);
-webkit-background-clip: text;
background-clip: text;
color: transparent;
text-shadow: 0 0 26px rgba(55, 189, 248, 0.55), 0 0 52px rgba(55, 189, 248, 0.22);
```

Font files are served locally via `@font-face` in `assets/brand-tokens.css` for 100% deterministic offline rendering.

---

## 4. Frosted Glass Architecture

All overlay cards and graphic panels follow this shared CSS glass specification:

```css
.glass-card {
  background: linear-gradient(
    150deg,
    rgba(255, 255, 255, 0.07),
    rgba(255, 255, 255, 0.02) 45%,
    rgba(55, 189, 248, 0.08)
  );
  backdrop-filter: blur(18px) saturate(1.25);
  -webkit-backdrop-filter: blur(18px) saturate(1.25);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 24px;
  box-shadow:
    0 40px 100px rgba(0, 0, 0, 0.55),
    0 0 0 1px rgba(255, 255, 255, 0.04) inset,
    0 0 60px rgba(55, 189, 248, 0.15);
}
```

- **Top Accent Line:** `height: 3px; background: linear-gradient(90deg, var(--color-accent), transparent);`
- **Glowing Underline:** `height: 2px; background: var(--color-accent); box-shadow: 0 0 16px rgba(55, 189, 248, 0.8);`

---

## 5. Camera & Face-Cam Directing Rules

1. **Face-Cam Wrapper Architecture:**
   - Always wrap `<video>` inside a standard non-timed `<div>` (`#face-wrapper`).
   - **NEVER** animate `width`, `scale`, or `clip-path` directly on `<video>` (freezes Chromium's video decoder).
   - Set `<video muted playsinline>` and use a sibling `<audio>` element for the render audio mix.
2. **Speaker Safe Zone (Full Frame):**
   - In full-frame mode (Beats 1–3), overlay cards must dock strictly to the side (`left: 80px`, `width: 640px`). Never allow cards or labels to collide with the speaker's face or body.
3. **Picture-in-Picture (PiP) Transition:**
   - When moving to PiP mode (Beat 4/5), animate `#face-wrapper` from `1920×1080` down to `540×960` (9:16 vertical) docked at `x: 1340, y: 60`.
   - Apply `border-radius: 36px` and ignite a radial cyan backlight pool (`radial-gradient`) behind the window to separate the speaker from the dark canvas.

---

## 6. Pacing & Motion Principles (GSAP)

1. **The Spotlight Rule (Negative Space):**
   - Maximum **3 to 5 words** per card headline.
   - Zero visual clutter: never include dense bullet lists, fake file trees, or unprompted code blocks. The viewer must absorb the card in under 0.5s.
2. **Script-Driven Visuals:**
   - Every gauge, pill, or chart must directly represent a concept or entity spoken in the transcript at that exact moment.
3. **Whip Streaks:**
   - Use fast horizontal cyan light streaks (`height: 3px; duration: 0.22s; ease: power4.out`) to transition into new cards and cover cut seams.
4. **GSAP Easing Palette:**
   - `power3.out` / `expo.out`: Smooth text reveals.
   - `back.out(1.2)`: Elegant card pop-in.
   - `sine.inOut` / `none`: Ambient grid or particle drift.
5. **Law #11 Timeline Lock:**
   - Every composition timeline must end with: `tl.to({}, { duration: SLOT_DURATION }, 0);` to lock exact deterministic render duration.

---

## 7. Studio Assets & References

- `assets/logo.png`: Official Studio & AIS logo.
- `assets/brand-tokens.css`: Core design tokens & typography definitions.
- `examples/starter/`: Boilerplate starter project automatically copied by `npm run new-video`.
- `style-library/02-kallaway/`: 300 pre-built motion graphic cards matching this exact aesthetic.
