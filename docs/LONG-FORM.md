# Long-Form Video Production Guide (16:9 Landscape)

Complete end-to-end blueprint for turning raw talking-head footage into high-retention, broadcast-grade YouTube explainers, keynotes, and masterclasses using local HyperFrames rendering.

---

## 1. Skill Architecture & Routing Map

Long-form editing coordinates multiple specialist skills across the 5-stage pipeline:

```
[Raw Footage: raw.mp4]
         │
         ▼
[1. Transcribe] ──► ElevenLabs Scribe / Whisper ──► word-level transcript (raw.json)
         │
         ▼
[2. Cut Silences] ──► Skill: cut-silences ──► raw.silence-transcript.json + silenced.mp4
         │
         ▼
[3. Cut Mistakes] ──► Skill: cut-mistakes ──► clean.mp4 + assets/transcript.json
         │
         ▼
[4. Visual Layer] ──► Skill: video-storytelling + hyperframes-video-beats + style-library
                      ├─ Persistent World & Safe Zones (left: 80px)
                      ├─ Montserrat 800 2-Line Gradient Typography (DESIGN.md)
                      ├─ Frosted Glass Cards (style-library/02-kallaway)
                      └─ PiP Transition (Face docks to 9:16 at x: 1340)
         │
         ▼
[5. Check & Render] ─► preflight ──► validate-beats ──► Studio Preview ──► final.mp4
```

| Pipeline Stage | Primary Skill | Executable Script / Reference | Purpose |
|---|---|---|---|
| **Orchestrator** | `edit-video` | `AGENTS.md` | Manages the end-to-end 5-stage pipeline from raw video to final MP4 |
| **Stage 1: Transcription** | `edit-video` | `scripts/transcribe-elevenlabs.mjs` | Word-level JSON transcript with exact onset/offset timings |
| **Stage 2: Silence Stripping** | `cut-silences` | `.agents/skills/cut-silences/scripts/cut-silences.mjs` | Strips dead air, preserves natural breathing pauses, retimes timeline |
| **Stage 3: Mistake Removal** | `cut-mistakes` | `.agents/skills/cut-mistakes/scripts/find-cut-candidates.mjs` | Review-gated removal of retakes, stutters, and false starts |
| **Stage 4: Camera & World** | `video-storytelling` | `docs/STORYTELLING-WORKBOOK.md` | Camera grammar, persistent canvas, spatial open loops, PiP transitions |
| **Stage 4: Motion Beats** | `hyperframes-video-beats`| `scripts/validate-beat-sync.mjs` | Transcript-anchored overlays (lower thirds, cards, callouts, takeovers) |
| **Stage 4: Card Components**| `style-library` | `style-library/registry.json` | 406 production cards (`02-kallaway/` Aurora Glass) |
| **Stage 4: Animation** | `gsap` | `examples/starter/` | Deterministic GSAP timelines, power eases, and Law #11 padding |
| **Stage 5: Verification** | `hyperframes-cli` | `scripts/preflight.mjs` | Validates composition DOM contracts, beat-sync, and offline rendering |

---

## 2. Master Directing & Layout Rules

Before authoring compositions, strictly adhere to the studio standard in [DESIGN.md](../DESIGN.md):

1. **Resolution & Canvas:**
   * Resolution: `1920 × 1080` (16:9 Landscape), 30 FPS.
   * Background: Deep Navy `#07121c` (never pure black `#000000`).
2. **Speaker Safe Zone (Beats 1–3):**
   * Speaker is framed near center (`x ≈ 700px – 1220px`).
   * Overlay cards **must dock strictly to the left** (`left: 80px`, `width: 640px`). Never cover the speaker's face or body during full-frame mode.
3. **Face-Cam Wrapper Architecture:**
   * Wrap `<video>` inside a standard non-timed `<div>` (`#face-wrapper`).
   * **NEVER** animate `width`, `scale`, or `clip-path` directly on the `<video>` element (freezes Chromium's decoder).
   * Mute the video and pair with a sibling `<audio>` element for the render mix.
4. **PiP (Picture-in-Picture) Mode (Beat 4 / Climax):**
   * At key takeaways or summary beats, smoothly shrink `#face-wrapper` to 9:16 (`width: 540, height: 960, x: 1340, y: 60`) with `border-radius: 36px`.
   * Ignite a radial cyan backlight pool (`b4-pip-halo`) behind the PiP window to lift the speaker off the dark tech background.
5. **Seam Treatments (Whip Streaks):**
   * Cover cut seams and card entrances with fast 0.22s horizontal cyan whip streaks (`power4.out`, `height: 3px`) to maintain energy and hide edits.

---

## 3. Studio Signature Typography (Montserrat 800 Gradient)

Every card headline must follow the studio's locked typography standard defined in [assets/brand-tokens.css](../assets/brand-tokens.css):

* **Font:** `Montserrat 800 (ExtraBold)`, `font-size: 76px`, `line-height: 1.02`, `letter-spacing: -0.02em`.
* **Spotlight Rule:** 3 to 5 words maximum per headline.
* **2-Line Dynamic Gradient Fill:**
  * **Line 1 (Introductory):** Silver-white gradient with soft white bloom:
    ```css
    background: linear-gradient(180deg, #ffffff 0%, #c8c8c8 62%, #ededed 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow: 0 0 22px rgba(255, 255, 255, 0.35), 0 0 44px rgba(255, 255, 255, 0.14);
    ```
  * **Line 2 (Punchline / Core Keyword):** Electric Cyan glow gradient:
    ```css
    background: linear-gradient(180deg, #ffffff 0%, #a5e3fc 50%, #37bdf8 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow: 0 0 26px rgba(55, 189, 248, 0.55), 0 0 52px rgba(55, 189, 248, 0.22);
    ```
* **Eyebrow Kicker:** `Roboto Mono 700`, `16px`, `letter-spacing: 0.42em`, color `#37bdf8`, `text-shadow: 0 0 16px rgba(55, 189, 248, 0.65)`.
* **Accent Underline Sweep:** `width: 140px; height: 5px; background: linear-gradient(90deg, #37bdf8, transparent); border-radius: 3px; box-shadow: 0 0 20px rgba(55, 189, 248, 0.75);`.

---

## 4. Step-by-Step Terminal Commands

### Step 1: Scaffold Project & Transcribe
```bash
# Create project folder under video-projects/my-explainer
npm run new-video -- my-explainer

# Place your camera footage at: video-projects/my-explainer/assets/raw.mp4

# Generate word-level transcript via ElevenLabs Scribe
node scripts/transcribe-elevenlabs.mjs video-projects/my-explainer/assets/raw.mp4
# (Or supply normalized Whisper transcript to video-projects/my-explainer/assets/raw.json)
```

### Step 2: Cut Silences & Dead Air
```bash
node .agents/skills/cut-silences/scripts/cut-silences.mjs \
  video-projects/my-explainer/assets/raw.json \
  --video video-projects/my-explainer/assets/raw.mp4 \
  --out-dir video-projects/my-explainer/assets \
  --output video-projects/my-explainer/assets/silenced.mp4 \
  --apply
```

### Step 3: Cut Mistakes, Retakes & Stutters
```bash
# Find candidates (repeated phrases, false starts, filler restarts)
node .agents/skills/cut-mistakes/scripts/find-cut-candidates.mjs \
  video-projects/my-explainer/assets/raw.silence-transcript.json \
  --out-dir video-projects/my-explainer/assets

# Review approved-cuts.json, then render clean audio/video:
node .agents/skills/cut-mistakes/scripts/apply-cuts.mjs \
  video-projects/my-explainer/assets/raw.silence-transcript.json \
  --cuts video-projects/my-explainer/assets/approved-cuts.json \
  --video video-projects/my-explainer/assets/silenced.mp4 \
  --out-dir video-projects/my-explainer/assets \
  --output video-projects/my-explainer/assets/clean.mp4 \
  --apply

# Promote the clean transcript as the final reference
cp video-projects/my-explainer/assets/raw.mistakes-transcript.json \
   video-projects/my-explainer/assets/transcript.json
```

### Step 4: Author Beat Compositions & Mount to `index.html`
* Mount each sub-composition inside `index.html` as a `.scene-layer`:
  ```html
  <div id="beat-1" class="scene-layer" data-composition-id="beat-1-hook"
       data-composition-src="compositions/01-hook.html"
       data-start="0" data-duration="4.40" data-track-index="2"
       data-width="1920" data-height="1080"></div>
  ```
* Ensure every sub-composition has a matching `data-anchor="..."` attribute matching a phrase in `assets/transcript.json`.

### Step 5: Verification & Studio Preview
```bash
# 1. Check DOM structure, dimensions, and timeline registrations
node scripts/preflight.mjs video-projects/my-explainer

# 2. Check transcript sync (-0.2s <= wordStart - beatStart <= 1.8s)
node scripts/validate-beat-sync.mjs video-projects/my-explainer

# 3. Lint HyperFrames contracts
cd video-projects/my-explainer && npx hyperframes lint

# 4. Launch Studio Preview (port 3002)
npx hyperframes preview --port 3002
```

### Step 6: Production Rendering
```bash
cd video-projects/my-explainer
npx hyperframes render index.html --output=final.mp4
```

---

## 5. Quality Checklist Before Publishing

- [ ] **No Overlaps:** Speaker face is completely unobstructed during Beats 1–3.
- [ ] **Spotlight Discipline:** No card has more than 5 words in its headline.
- [ ] **Smooth Transitions:** Whip streaks hide cuts and lead card entries.
- [ ] **Law #11 Timeline Lock:** Every sub-timeline and master timeline ends with `tl.to({}, { duration: DURATION }, 0);`.
- [ ] **Audio Sync:** Word highlights on subtitles illuminate exactly as spoken audio is heard.
