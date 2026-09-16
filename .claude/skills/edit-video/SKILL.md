---
name: edit-video
description: Edit a raw talking-head video through transcription, silence trimming, mistake review, visual storytelling, motion graphics, and verified HyperFrames rendering. Use for a complete edit; route a single requested operation directly to its specialist skill.
---

# Master Video Pipeline Conductor (`edit-video`)

Orchestrate the complete 5-stage talking-head editing pipeline from raw footage to broadcast-grade HyperFrames MP4.

For vertical 9:16 reels/Shorts/TikTok, see [short-form-edit](../short-form-edit/SKILL.md).
For detailed 16:9 explainer architecture, see [docs/LONG-FORM.md](../../../docs/LONG-FORM.md).
For basic workflow overview, see [docs/WORKFLOW.md](../../../docs/WORKFLOW.md).
For studio design tokens & typography, see [DESIGN.md](../../../DESIGN.md).

---

## 1. Skill Inter-Link & Pipeline Flow

```
[Raw Footage: raw.mp4]
         │
         ▼
[Stage 1: Transcription] ────────► scripts/transcribe-elevenlabs.mjs (or Whisper)
         │                         Artifact: assets/raw.json
         ▼
[Stage 2: Cut Silences] ─────────► Skill: cut-silences
         │                         Artifacts: assets/raw.silence-transcript.json + silenced.mp4
         ▼
[Stage 3: Cut Mistakes] ─────────► Skill: cut-mistakes (Review-Gated)
         │                         Artifacts: assets/clean.mp4 + assets/transcript.json
         ▼
[Stage 4: Visual Compositions] ──► Skills: video-storytelling + hyperframes-video-beats + style-library
         │                         Artifacts: index.html + compositions/*.html
         ▼
[Stage 5: Verification & Render] ► Skills: hyperframes-cli + gsap
                                   Artifact: final.mp4
```

| Pipeline Stage | Primary Skill | Hand-off In | Hand-off Out |
|---|---|---|---|
| **Stage 1: Ingest & Transcribe** | [edit-video](SKILL.md) | `assets/raw.mp4` | `assets/raw.json` (word-level transcript) |
| **Stage 2: Silence Removal** | [cut-silences](../cut-silences/SKILL.md) | `raw.mp4`, `raw.json` | `raw.silence-transcript.json`, `silenced.mp4` |
| **Stage 3: Mistake Removal** | [cut-mistakes](../cut-mistakes/SKILL.md) | `silenced.mp4`, `raw.silence-transcript.json` | `clean.mp4`, `assets/transcript.json` |
| **Stage 4: World & Framing** | [video-storytelling](../video-storytelling/SKILL.md) | `clean.mp4`, `transcript.json` | Persistent world, safe zones (`left: 80px`), PiP docking |
| **Stage 4: Motion Beats** | [hyperframes-video-beats](../hyperframes-video-beats/SKILL.md) | `assets/transcript.json` | Anchored cards, lower thirds, callouts (`data-anchor`) |
| **Stage 4: Card Library** | [style-library](../style-library/SKILL.md) | `style-library/registry.json` | 406 cards (`02-kallaway/` Aurora Glass & `01-vox-explainer`) |
| **Stage 4: Animation** | [gsap](../gsap/SKILL.md) | GSAP 3.14+ | Deterministic timelines, Law #11 duration lock |
| **Stage 4: Compositions** | [hyperframes](../hyperframes/SKILL.md) | HTML/CSS | HyperFrames compositions, audio mixing |
| **Stage 5: Verification & CLI** | [hyperframes-cli](../hyperframes-cli/SKILL.md) | `index.html` | Preflight check, beat sync validation, studio preview, render |

---

## 2. Step-by-Step Execution Protocol

Keep each project in `video-projects/<slug>/`, preserving the source recording.
Run `npm run pipeline -- <slug>` at any time to inspect progress and get the next command.

### Step 1: Scaffold & Ingest
1. Scaffold project:
   ```bash
   npm run new-video -- <slug>
   ```
2. Copy source footage to `video-projects/<slug>/assets/raw.mp4`. Inspect streams and duration with ffprobe.
3. Transcribe audio with word timestamps:
   ```bash
   node scripts/transcribe-elevenlabs.mjs video-projects/<slug>/assets/raw.mp4
   ```
   (See [docs/TOOLS-AND-API-KEYS.md](../../../docs/TOOLS-AND-API-KEYS.md) for Whisper alternatives).

### Step 2: Remove Silences ([cut-silences](../cut-silences/SKILL.md))
1. Generate EDL, retimed transcript, and silenced video:
   ```bash
   node .agents/skills/cut-silences/scripts/cut-silences.mjs \
     video-projects/<slug>/assets/raw.json \
     --video video-projects/<slug>/assets/raw.mp4 \
     --out-dir video-projects/<slug>/assets \
     --output video-projects/<slug>/assets/silenced.mp4 \
     --apply
   ```
   Artifacts: `raw.silence-transcript.json`, `silenced.mp4`.

### Step 3: Remove Mistakes & Retakes ([cut-mistakes](../cut-mistakes/SKILL.md))
1. Scan for stutters, false starts, and duplicate takes:
   ```bash
   node .agents/skills/cut-mistakes/scripts/find-cut-candidates.mjs \
     video-projects/<slug>/assets/raw.silence-transcript.json \
     --out-dir video-projects/<slug>/assets
   ```
2. Review candidates with the user and write approved cuts to `approved-cuts.json`.
3. Apply approved cuts:
   ```bash
   node .agents/skills/cut-mistakes/scripts/apply-cuts.mjs \
     video-projects/<slug>/assets/raw.silence-transcript.json \
     --cuts video-projects/<slug>/assets/approved-cuts.json \
     --video video-projects/<slug>/assets/silenced.mp4 \
     --out-dir video-projects/<slug>/assets \
     --output video-projects/<slug>/assets/clean.mp4 \
     --apply
   ```
4. Copy `raw.mistakes-transcript.json` to `assets/transcript.json`.

### Step 4: Visual Storytelling & Motion Beats
1. Consult [video-storytelling](../video-storytelling/SKILL.md) for camera grammar, speaker safe zones, and PiP transitions.
2. Select cards from [style-library](../style-library/SKILL.md) (`02-kallaway/` Aurora Glass matching [DESIGN.md](../../../DESIGN.md)).
3. Plan beats with [hyperframes-video-beats](../hyperframes-video-beats/SKILL.md) using spoken `data-anchor` phrases matching `assets/transcript.json`.
4. Apply the studio signature typography standard:
   - **Headline:** `Montserrat 800`, `76px`, 2-line Dynamic Gradient Fill (White to Electric Cyan `#37bdf8`) with soft bloom.
   - **Eyebrow:** `Roboto Mono 700`, `16px`, `letter-spacing: 0.42em`.
   - **Law #11 Lock:** End every sub-timeline with `tl.to({}, { duration: SLOT_DURATION }, 0);`.

### Step 5: Verification, Preview & Render ([hyperframes-cli](../hyperframes-cli/SKILL.md))
1. Validate DOM contracts, timelines, and beat synchronization:
   ```bash
   npm run pipeline -- <slug> --check
   ```
2. Preview interactively in HyperFrames Studio:
   ```bash
   cd video-projects/<slug> && npx hyperframes preview
   ```
3. Render broadcast-grade MP4:
   ```bash
   cd video-projects/<slug> && npx hyperframes render index.html --output=final.mp4
   ```
4. Inspect encoded frames, audio boundaries, face framing, and write `VERIFY.md`.
