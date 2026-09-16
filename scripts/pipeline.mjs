#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const slug = args[0] && !args[0].startsWith('--') ? args[0] : null;
const runCheck = args.includes('--check') || args.includes('-c');
const listAll = args.includes('--list') || args.includes('-l');

function getProjects() {
  const projectsDir = join(root, 'video-projects');
  if (!existsSync(projectsDir)) return [];
  return readdirSync(projectsDir, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith('.'))
    .map(d => d.name);
}

if (!slug && !listAll) {
  console.log(`
🎬 HyperFrames Video Production Pipeline Orchestrator

Usage:
  npm run pipeline -- <project-slug>          # Inspect project pipeline status
  npm run pipeline -- <project-slug> --check  # Run preflight & beat verification
  npm run pipeline -- --list                  # List all video projects

Available Projects:
${getProjects().map(p => `  • ${p}`).join('\n') || '  (None found)'}

Skills in Pipeline:
  1. Transcription       ──► scripts/transcribe-elevenlabs.mjs
  2. Cut Silences        ──► .agents/skills/cut-silences
  3. Cut Mistakes        ──► .agents/skills/cut-mistakes
  4. Visual Storytelling ──► .agents/skills/video-storytelling + hyperframes-video-beats
  5. Check & Render      ──► scripts/preflight.mjs + hyperframes render
`);
  process.exit(0);
}

if (listAll) {
  const projects = getProjects();
  console.log(`\nFound ${projects.length} project(s):`);
  for (const p of projects) console.log(`  • ${p}`);
  process.exit(0);
}

const projectDir = join(root, 'video-projects', slug);
if (!existsSync(projectDir)) {
  console.error(`\n❌ Error: Project not found at: video-projects/${slug}`);
  console.error(`Available projects: ${getProjects().join(', ')}`);
  process.exit(1);
}

console.log(`\n======================================================`);
console.log(`🎥 PIPELINE STATUS: video-projects/${slug}`);
console.log(`======================================================\n`);

const assetsDir = join(projectDir, 'assets');
const compositionsDir = join(projectDir, 'compositions');

// 1. Ingest & Transcribe
const hasRawVideo = existsSync(join(assetsDir, 'raw.mp4')) || existsSync(join(assetsDir, 'source.mp4'));
const rawVideoName = existsSync(join(assetsDir, 'raw.mp4')) ? 'raw.mp4' : 'source.mp4';
const hasRawTranscript = existsSync(join(assetsDir, 'raw.json')) || existsSync(join(assetsDir, 'transcript.json'));
const stage1Ok = hasRawVideo && hasRawTranscript;

console.log(`[Stage 1] Ingest & Transcription (edit-video)`);
console.log(`  ${hasRawVideo ? '✔' : '✖'} Source Video: assets/${rawVideoName} ${hasRawVideo ? 'detected' : 'MISSING'}`);
console.log(`  ${hasRawTranscript ? '✔' : '✖'} Word Transcript: ${hasRawTranscript ? 'detected' : 'MISSING'}`);
if (!hasRawTranscript && hasRawVideo) {
  console.log(`  💡 Action: node scripts/transcribe-elevenlabs.mjs video-projects/${slug}/assets/${rawVideoName}`);
}

// 2. Cut Silences
const hasSilencedVideo = existsSync(join(assetsDir, 'silenced.mp4')) || existsSync(join(assetsDir, 'edited-silenced.mp4'));
const hasSilenceTranscript = existsSync(join(assetsDir, 'raw.silence-transcript.json')) || existsSync(join(assetsDir, `${slug}.silence-transcript.json`));
const stage2Ok = hasSilencedVideo || hasSilenceTranscript || stage1Ok; // If direct source is already edited

console.log(`\n[Stage 2] Silence & Dead-Air Removal (cut-silences)`);
if (hasSilencedVideo || hasSilenceTranscript) {
  console.log(`  ✔ Silence removal executed (silenced video / retimed transcript present)`);
} else {
  console.log(`  ℹ Pending or using pre-cut source.`);
  console.log(`  💡 Action: node .agents/skills/cut-silences/scripts/cut-silences.mjs video-projects/${slug}/assets/raw.json --video video-projects/${slug}/assets/${rawVideoName} --apply`);
}

// 3. Cut Mistakes
const hasCleanVideo = existsSync(join(assetsDir, 'clean.mp4')) || existsSync(join(assetsDir, 'edited-clean.mp4'));
const hasMistakesTranscript = existsSync(join(assetsDir, 'raw.mistakes-transcript.json')) || existsSync(join(assetsDir, 'transcript.json'));
const stage3Ok = hasCleanVideo || hasMistakesTranscript;

console.log(`\n[Stage 3] Mistake & Retake Removal (cut-mistakes)`);
if (hasCleanVideo) {
  console.log(`  ✔ Clean cut video ready: assets/clean.mp4`);
} else if (hasMistakesTranscript) {
  console.log(`  ✔ Active transcript linked to clean narration`);
} else {
  console.log(`  ℹ Candidate scan pending.`);
  console.log(`  💡 Action: node .agents/skills/cut-mistakes/scripts/find-cut-candidates.mjs video-projects/${slug}/assets/raw.silence-transcript.json --out-dir video-projects/${slug}/assets`);
}

// 4. Visual Layer
const hasIndex = existsSync(join(projectDir, 'index.html'));
const hasBrandTokens = existsSync(join(assetsDir, 'brand-tokens.css'));
let compFiles = [];
if (existsSync(compositionsDir)) {
  compFiles = readdirSync(compositionsDir).filter(f => f.endsWith('.html'));
}

console.log(`\n[Stage 4] Visual Storytelling & Beat Overlays (video-storytelling + hyperframes-video-beats)`);
console.log(`  ${hasIndex ? '✔' : '✖'} Master Assembly: index.html ${hasIndex ? 'present' : 'MISSING'}`);
console.log(`  ${hasBrandTokens ? '✔' : '✖'} Brand Tokens: assets/brand-tokens.css ${hasBrandTokens ? 'present' : 'MISSING'}`);
console.log(`  ✔ Sub-Compositions: ${compFiles.length} card(s) authored`);
for (const c of compFiles) {
  console.log(`    - compositions/${c}`);
}

// 5. Verification & Preflight
console.log(`\n[Stage 5] Preflight Verification & Rendering (hyperframes-cli)`);

if (runCheck) {
  console.log(`\nRunning preflight checks...`);
  const preflight = spawnSync(process.execPath, [join(root, 'scripts/preflight.mjs'), `video-projects/${slug}`], { stdio: 'inherit' });
  
  if (existsSync(join(assetsDir, 'transcript.json')) && compFiles.length > 0) {
    console.log(`\nRunning beat synchronization check...`);
    spawnSync(process.execPath, [join(root, 'scripts/validate-beat-sync.mjs'), `video-projects/${slug}`], { stdio: 'inherit' });
  }
} else {
  console.log(`  Run check with: npm run pipeline -- ${slug} --check`);
  console.log(`  Launch Studio preview: cd video-projects/${slug} && npx hyperframes preview`);
  console.log(`  Render final MP4:      cd video-projects/${slug} && npx hyperframes render index.html --output=final.mp4`);
}

console.log(`\n======================================================\n`);
