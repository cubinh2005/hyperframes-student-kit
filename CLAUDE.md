# Video Production Studio: Workspace Guide & Architecture Map

Turn raw talking-head footage into high-retention, broadcast-grade videos using local HyperFrames rendering, transcript-driven cuts, and reusable frosted-glass motion graphics.

## 1. Runtime Routing & Skill Discovery

`AGENTS.md` and `CLAUDE.md` are identical standing guides. Keep them synchronized at all times.
- Claude Code discovers canonical skills in `.claude/skills/`.
- Codex discovers generated mirror skills in `.agents/skills/`.
- When updating skills: edit in `.claude/skills/<name>/`, then run `npm run sync:skills`.
- Use `$edit-video` in Codex, `/edit-video` in Claude Code, or natural language.
- Use local tools unless the user explicitly requests cloud/subagent delegation.

### Skill Dispatch Directory

| Task / Stage | Primary Skill | Description |
|---|---|---|
| Reels, Shorts, TikTok (9:16) | `short-form-edit` | Fast-paced vertical hook, precise captions, moving B-roll, sound design |
| Full raw talking-head edit | `edit-video` | Coordinates the full 5-stage pipeline: transcribe → cut → design → render |
| Silence & pause removal | `cut-silences` | Strips dead air using word-level transcript, retimes downstream timeline |
| Mistake & stutter removal | `cut-mistakes` | Detects false starts, retakes, and flubs; review-gated ffmpeg cuts |
| Narrative visual world | `video-storytelling` | Camera framing, persistent canvas, spatial open loops, callbacks |
| Overlay motion beats | `hyperframes-video-beats` | Transcript-anchored lower thirds, callouts, cards, and takeovers |
| Reusable card library | `style-library` | Selects and adapts cards from the 406-card library |
| HTML video compositions | `hyperframes` | Compositions authoring, media timing, and audio mixing in HyperFrames HTML |
| Timeline animations | `gsap` | Deterministic GSAP timelines, eases, and Law #11 padding |
| CLI & Rendering | `hyperframes-cli` | HyperFrames preview studio, linting, and local Chromium rendering |
| Blocks & Components | `hyperframes-registry` | Installs catalog blocks and components into `hyperframes.json` |
| Concept-to-video from scratch | `make-a-video` | Interview-driven video creator for blank-slate projects |
| Web-to-video promotion | `website-to-hyperframes` | Captures website assets and turns them into promo videos |

---

## 2. Design Systems & Ground-Truth Reference Files

Before authoring or modifying any visual composition, read and strictly adhere to these reference files:

1. **Master Studio Design Standard:**
   - `DESIGN.md`: Primary ground truth for the studio (Deep Navy `#07121c`, Electric Cyan `#37bdf8`, Frosted Glass, `Montserrat` 500–700 + `Roboto Mono` 500).
   - `video-projects/ai-glass-explainer/DESIGN.md`: Active production project design implementation.
2. **Interaction & Layout Reference:**
   - `video-projects/claude-edit-intro/DESIGN.md`: Reference implementation for Left Glass Popout cards, PiP face-cam docking (`x: 1340`), and Whip Streak transitions.
3. **Global Design Tokens & Fonts:**
   - `assets/brand-tokens.css`: Core CSS variables, local `@font-face` declarations for Montserrat & Roboto Mono, frosted glass tokens, and elevations.
4. **Starter Scaffold Boilerplate:**
   - `examples/starter/`: Complete standalone starter project (with `DESIGN.md`, `index.html`, and `assets/`). Cloned automatically when creating new projects.

---

## 3. Style Library & Scene Templates Map

### Style Library (`style-library/`)
A catalog of 406 production-ready cards indexed in `style-library/registry.json`. Preview cards visually via `_preview/contact-sheet.html`:
- **`02-kallaway/` (300 cards):** Aurora Glass & Electric Cyan style matching our studio brand. Frosted cards, edge-lit elements, stat counters, lower-thirds, timelines.
- **`01-vox-explainer/` (106 cards):** Journalistic documentary paper style with torn edges, marker highlights, and serif display.
- **`_blueprint/`:** Clean scaffold for authoring new style packs. Run `node scripts/style-library/new-style.mjs` to generate a new pack.

### Whole-Scene Templates (`style-templates/`)
Standalone full-scene starting points:
- **`style-templates/left-glass-popout/`:** Full scene combining talking-head camera reframe with a sliding frosted-glass panel.
- **`style-templates/dark-graph-paper-template/`:** 16-second organic tech background (paper fibers, grid, ambient gradient lights) for graphic-heavy videos without face-cam.

---

## 4. Operational Scripts & Tooling (`scripts/`)

| Command | Script Path | Purpose |
|---|---|---|
| `npm run new-video -- <slug>` | `scripts/new-video.mjs` | Scaffolds a new project under `video-projects/<slug>` with brand tokens, local GSAP, and matching timeline key |
| `npm run preflight [project]` | `scripts/preflight.mjs` | Validates root dimensions, video wrappers, timeline registration, and sub-composition paths |
| `npm run preflight:all` | `scripts/preflight-all.mjs` | Runs preflight verification across all active projects in `video-projects/` |
| `npm run check` | `scripts/check-kit.mjs` | Verifies distribution integrity, 406 cards, unique IDs, slot contracts, and skills |
| `npm test` | `tests/*.test.mjs` | Runs test suite (silence edits, stutter cuts, beat validation, short-form plans) |
| `npm run catalog` | `scripts/style-library/build-registry.mjs` | Scans `style-library/` and regenerates `style-library/registry.json` |
| `npm run validate-beats -- <p>`| `scripts/validate-beat-sync.mjs` | Enforces sync between `data-anchor` phrases and `assets/transcript.json` |
| `npm run test:media` | `scripts/smoke-media.mjs` | Smoke tests the FFmpeg silence/mistake cutting engine and builds EDL review HTML |
| `npm run setup` | `scripts/setup.mjs` | Verifies local Node 22, FFmpeg, and Chrome availability |
| `npm run transcribe -- <file>` | `scripts/transcribe-elevenlabs.mjs` | Generates word-level JSON transcript via ElevenLabs Scribe API |

---

## 5. Documentation Directory (`docs/`)

- `docs/WORKFLOW.md`: Complete 5-stage production guide (Transcribe → Cut Silences → Cut Mistakes → Visual Compositions → Render).
- `docs/TOOLS-AND-API-KEYS.md`: API configuration and exact JSON transcript schema (`words: [{text, start, end}]`).
- `docs/SHORT-FORM.md`: Dedicated guide for 9:16 vertical reels, Shorts, and TikTok.
- `docs/SETUP.md`: Environment setup, FFmpeg troubleshooting, and HyperFrames doctor diagnostics.
- `docs/PROMPTS.md`: Standard prompt recipes for delegating editing stages to AI.
- `docs/STORYTELLING-WORKBOOK.md`: Principles of continuous camera flow, persistent visual worlds, and open loops.
- `docs/VERIFICATION.md`: Quality control inspection checklist for audio joins, black flashes, and A/V sync.

---

## 6. Golden Production Rules for All AI Agents

1. **The Spotlight Rule (Negative Space):** Max **3 to 5 words** per card headline. Never crowd the frame with dense paragraphs, fake code, or uncalled-for tickers. The viewer must absorb the idea in under 0.5s.
2. **Face-Cam Wrapper Architecture:** Wrap speaker `<video>` in a plain `<div>` (`#face-wrapper`). **NEVER** animate dimensions, scale, or clip-path directly on the `<video>` element (causes Chromium decoder freezing). Mute the video and pair with a sibling `<audio>` element for the render mix.
3. **Speaker Safe Zone:** Overlay cards must live docked to the side (`left: 80px`, `width: 640px`) or bottom. Never cover the speaker's face or body during full-frame mode.
4. **Picture-in-Picture (PiP) Transition:** When transitioning to PiP mode in Beat 4/5, smoothly shrink `#face-wrapper` to 9:16 (`width: 540, height: 960, x: 1340, y: 60`), apply `border-radius: 36px`, and ignite a cyan backlight halo pool (`radial-gradient`) behind the window.
5. **Seam Treatments & Whip Streaks:** Cover cut seams and card entrances with fast 0.2s horizontal cyan whip streaks (`power4.out`) to maintain energy and hide cuts.
6. **Script-Driven Visuals:** Every diagram, chart, gauge, or pill must visually embody a concept spoken at that exact moment in the transcript.
7. **Law #11 Timeline Lock:** Every GSAP timeline must conclude with `tl.to({}, { duration: SLOT_DURATION }, 0);` to lock deterministic rendering duration.
