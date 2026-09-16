# claude-edit-intro — Design System

> Ground truth rút ra 100% từ code thực tế trong project này.
> Mọi số liệu, màu sắc, font size, spacing đều copy nguyên si từ các file
> `index.html`, `compositions/01-hook.html` qua `05-pip.html`.
> Khi làm video mới theo phong cách này, tuân thủ file này trước khi viết bất kỳ dòng CSS nào.

---

## 1. Canvas & Root

```
Resolution : 1920 × 1080px
Background : #05080f  (gần đen, không phải #000)
Font mặc định: "Inter", sans-serif
Color mặc định: #ffffff
```

Root composition div:
```html
<div data-composition-id="..." data-start="0" data-duration="N" data-width="1920" data-height="1080">
```

Face video wrapper pattern (`#face-wrapper`):
- Wrapper là `<div>`, KHÔNG BAO GIỜ animate trực tiếp lên `<video>` (freeze frame).
- Video bên trong: `position:absolute; top:0; left:50%; height:100%; width:auto; transform:translateX(-50%)`.
- Filter mặc định: `filter: contrast(1.05) saturate(1.08)`.
- PiP mode: thêm class `.pip` khi wrapper co lại → `border-radius:36px`, `box-shadow` sâu.

---

## 2. Fonts

Chỉ dùng 2 font families — không thêm font khác:

| Font | Weight | Vai trò |
|---|---|---|
| **Inter** | 400–900 | Body, headline, tất cả nội dung chính |
| **JetBrains Mono** | 400–700 | Kicker/eyebrow, log lines, code text, tag pills, caption tags |

Load từ Google Fonts trong `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=block" rel="stylesheet" />
```

---

## 3. Bảng màu

| Token | Hex | Vai trò |
|---|---|---|
| Canvas | `#05080f` | Background toàn frame |
| Accent orange | `#d97757` | Kicker, bullet, glow, bar peak, active word, ring |
| Accent RGB | `rgba(217,119,87,...)` | Mọi glow/shadow của orange |
| White | `#ffffff` | Text chính, active word |
| White dim | `rgba(255,255,255,0.55)` | Text mờ trong caption, log arg |
| White faint | `rgba(255,255,255,0.35–0.10)` | Text-shadow glow phụ |
| Green ok | `#8dffb8` | Status tag `ok` |
| Green ok bg | `rgba(141,255,184,0.10)` | Status tag `ok` background |

**Nguyên tắc màu:**
- Chỉ 1 accent color: orange `#d97757`. Không có purple, teal, neon.
- Không dùng màu nền trắng hoặc sáng.
- Mọi glow đều là orange — kể cả PiP halo, logo drop-shadow, text-shadow accent.

---

## 4. Typography — Size & Weight theo tầng

### Eyebrow / Kicker (JetBrains Mono)
```css
font-family: "JetBrains Mono", monospace;
font-size: 14–22px;
font-weight: 700;
letter-spacing: 0.32–0.46em;
color: #d97757;
text-shadow: 0 0 14px rgba(217,119,87,0.60);
```
Ví dụ thực tế:
- Beat 1 eyebrow: 18px / 700 / 0.46em (padding-left: 0.46em)
- Beat 2 kicker: 20px / 600 / 0.34em
- Beat 4 agent eyebrow: 14px / 700 / 0.32em

### Sub-label / Brand name (JetBrains Mono)
```css
font-size: 22–32px;
font-weight: 600–700;
color: rgba(255,255,255,0.78);
letter-spacing: 0.01em;
```

### Log lines / Code text (JetBrains Mono)
```css
font-size: 26px;
font-weight: 500;
gap giữa items: 10px;
color: rgba(255,255,255,0.88);
```
- Bullet ›: `color:#d97757; font-weight:700`
- Label: `color:#ffffff`
- Arg: `color:rgba(255,255,255,0.55)`
- Status `ok`: `font-size:18px / #8dffb8 / background+border rounded 6px`
- Status `…`: `font-size:18px / #d97757 / background+border rounded 6px`

### Headline nhỏ trong card (Inter — Beat 1)
```css
font-size: 84px;
font-weight: 800;
line-height: 0.98;
letter-spacing: -0.02em;

/* Line 1 — white gradient */
background: linear-gradient(180deg, #ffffff 0%, #c8c8c8 62%, #ededed 100%);
-webkit-background-clip: text; background-clip: text; color: transparent;
text-shadow: 0 0 22px rgba(255,255,255,0.35), 0 0 44px rgba(255,255,255,0.14);

/* Line 2 — orange gradient (accent word) */
background: linear-gradient(180deg, #ffffff 0%, #f5b39a 50%, #d97757 100%);
text-shadow: 0 0 26px rgba(217,119,87,0.55), 0 0 52px rgba(217,119,87,0.22);
```

### Headline slam top-of-frame (Inter — Beat 2)
```css
font-size: 68px;
font-weight: 900;
letter-spacing: -0.02em;
line-height: 1;
background: linear-gradient(180deg, #ffffff 0%, #b8b8b8 60%, #f1f1f1 100%);
text-shadow: 0 0 26px rgba(255,255,255,0.4), 0 0 52px rgba(255,255,255,0.18);
```

### Chart big number (Inter — Beat 4)
```css
font-size: 68px;
font-weight: 800;
letter-spacing: -0.03em;
line-height: 1;
background: linear-gradient(180deg, #ffffff, #f2a084);
font-variant-numeric: tabular-nums;
```

### PiP hit title words (Inter — Beat 5)
```css
font-size: 136px;
font-weight: 900;
line-height: 0.95;
letter-spacing: -0.03em;
/* Mỗi word là 1 <span class="b5-hit-word"> để stagger riêng */

/* Word thường — white gradient */
background: linear-gradient(180deg, #ffffff 0%, #b8b8b8 62%, #f1f1f1 100%);
text-shadow: 0 0 26px rgba(255,255,255,0.35), 0 0 50px rgba(255,255,255,0.14);

/* Word accent (cuối hit) — orange gradient */
background: linear-gradient(180deg, #ffffff 0%, #f5b39a 55%, #d97757 100%);
```

### Outro CTA title (Inter — Beat 5)
```css
font-size: 160px;
font-weight: 900;
line-height: 0.92;
letter-spacing: -0.03em;
background: linear-gradient(180deg, #ffffff 0%, #f5b39a 60%, #d97757 100%);
text-shadow: 0 0 40px rgba(255,255,255,0.3), 0 0 80px rgba(217,119,87,0.35);
```

### Hit kicker (JetBrains Mono — Beat 5)
```css
font-size: 22px;
font-weight: 700;
letter-spacing: 0.42em;
color: #d97757;
text-shadow: 0 0 16px rgba(217,119,87,0.6);
```

### Hit sub-text (JetBrains Mono — Beat 5)
```css
font-size: 28px;
font-weight: 500;
color: rgba(255,255,255,0.68);
letter-spacing: 0.02em;
margin-top: 8px;
```

### Caption pill text (Inter — Beat 3)
```css
font-size: 44px;
font-weight: 700;
letter-spacing: -0.01em;
color: rgba(255,255,255,0.55);  /* inactive */
/* active: color:#fff + text-shadow orange + scale pop 1.08 */
```

---

## 5. Card / Panel — Chất liệu Glass

### Frosted-glass tier-2 card (Beat 1)
```css
background: linear-gradient(
  150deg,
  rgba(255,255,255,0.07),
  rgba(255,255,255,0.02) 45%,
  rgba(217,119,87,0.08)
);
backdrop-filter: blur(18px) saturate(1.25);
-webkit-backdrop-filter: blur(18px) saturate(1.25);
border: 1px solid rgba(255,255,255,0.10);
border-radius: 24px;
box-shadow:
  0 40px 100px rgba(0,0,0,0.55),
  0 0 0 1px rgba(255,255,255,0.04) inset,
  0 0 60px rgba(217,119,87,0.12);
```

### Agent panel + Chart panel (Beat 4)
```css
background: linear-gradient(150deg,
  rgba(255,255,255,0.06),
  rgba(255,255,255,0.02) 45%,
  rgba(217,119,87,0.05));
backdrop-filter: blur(14px) saturate(1.2);
border: 1px solid rgba(255,255,255,0.09);
border-radius: 20px;
box-shadow:
  0 30px 80px rgba(0,0,0,0.4),
  0 0 0 1px rgba(255,255,255,0.03) inset;
```

### Caption pill (Beat 3)
```css
background: rgba(10,12,20,0.72);
backdrop-filter: blur(16px) saturate(1.2);
border: 1px solid rgba(255,255,255,0.08);
border-radius: 22px;
box-shadow: 0 30px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04) inset;
```

### PiP face-wrapper class `.pip`
```css
border-radius: 36px;
box-shadow:
  0 40px 100px rgba(0,0,0,0.55),
  0 0 0 1px rgba(255,255,255,0.06) inset,
  0 0 60px rgba(217,119,87,0.25);
```

---

## 6. Layout — Exact Pixel Values

### Tier-2 card (Beat 1)
```
top: 50% + gsap.set({ yPercent:-50 })   ← KHÔNG dùng CSS translateY
left: 80px (card trái) / right: 80px (card phải)
width: 640px
padding: 48px 52px 44px
display: flex; flex-direction: column; align-items: flex-start; gap: 28px
```

### Agent panel (Beat 4 — top-left)
```
top: 80px; left: 80px; width: 720px; padding: 28px 32px
```

### Chart panel (Beat 4 — top-right)
```
top: 80px; right: 80px; width: 560px; padding: 28px 32px 36px
```

### PiP side hit (Beat 5)
```
top: 50%; left: 130px; width: 1080px
flex-direction: column; gap: 20px; opacity: 0 (default)
gsap.set({ yPercent: -50 })
```

### PiP outro (Beat 5)
```
top: 50%; left: 130px; width: 1080px
flex-direction: column; gap: 22px; opacity: 0 (default)
gsap.set({ yPercent: -50 })
```

### Caption pill (Beat 3)
```
bottom: 80px; left: 50%; transform: translateX(-50%)
padding: 20px 40px 20px 24px; max-width: 1820px
```

---

## 7. Accent Elements — CSS Recipes

### Underline sweep bar
```css
width: 140px; height: 5px;
background: linear-gradient(90deg, #d97757, rgba(217,119,87,0));
border-radius: 3px; box-shadow: 0 0 20px rgba(217,119,87,0.75);
/* GSAP: from({ width:0, opacity:0 }, { duration:0.5, ease:"expo.out" }) */
```

### Outro tick bar (5px wide)
```css
width: 80px; height: 6px; background: #d97757;
border-radius: 3px; box-shadow: 0 0 18px rgba(217,119,87,0.8);
/* GSAP: from({ width:0, opacity:0 }, { duration:0.45, ease:"power3.out" }) */
```

### Outro bottom bar (under title)
```css
width: 280px; height: 4px;
background: linear-gradient(90deg, #d97757, rgba(217,119,87,0));
border-radius: 2px; box-shadow: 0 0 14px rgba(217,119,87,0.6);
```

### SVG Ring (Beat 4)
```css
/* r=50, circumference ≈ 314 */
stroke: #d97757; stroke-width: 5; stroke-linecap: round;
stroke-dasharray: 314; stroke-dashoffset: 314;
filter: drop-shadow(0 0 6px rgba(217,119,87,0.8));
/* Animate: tl.to('.ring-fg', { strokeDashoffset:0, duration:1.1, ease:"power2.out" }) */
/* Spin: gsap.to('.b4-ring', { rotate:720, transformOrigin:"50% 50%", duration:3.5, ease:"none", delay:0.60 }) */
```

### Status tags
```css
/* ok — green */
color: #8dffb8; background: rgba(141,255,184,0.10);
border: 1px solid rgba(141,255,184,0.40); border-radius: 6px;
padding: 2px 10px; font-size: 18px; font-weight: 700;

/* running … — orange */
color: #d97757; background: rgba(217,119,87,0.12);
border: 1px solid rgba(217,119,87,0.45); border-radius: 6px;
padding: 2px 10px; font-size: 18px; font-weight: 700;
```

### Caption tag "CC" (Beat 3)
```css
font-family: "JetBrains Mono"; font-size: 18px; font-weight: 700; letter-spacing: 0.18em;
padding: 6px 12px; border-radius: 8px;
background: rgba(217,119,87,0.14); color: #d97757;
border: 1px solid rgba(217,119,87,0.35);
```

### PiP background system (Beat 5)
```css
/* b5-bg */
background:
  radial-gradient(ellipse at 25% 40%, rgba(217,119,87,0.10) 0%, transparent 55%),
  radial-gradient(ellipse at 70% 80%, rgba(40,90,160,0.08) 0%, transparent 60%),
  #05080f;

/* b5-grid */
background-image:
  repeating-linear-gradient(0deg,  rgba(255,255,255,0.035) 0 1px, transparent 1px 90px),
  repeating-linear-gradient(90deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 90px);
mask-image: radial-gradient(ellipse at 30% 50%, #000 40%, transparent 85%);

/* b5-pip-halo */
position:absolute; top:-100px; right:-100px; width:900px; height:1200px;
background: radial-gradient(ellipse at 70% 50%,
  rgba(217,119,87,0.22) 0%, rgba(217,119,87,0.05) 45%, transparent 70%);
filter: blur(30px);

/* b5-star — seeded NOT Math.random() */
width:3px; height:3px; border-radius:50%; background:#fff; box-shadow:0 0 6px #fff;
```

---

## 8. Motion Rules (GSAP)

### Easing palette
```
Entrances:      power3.out, expo.out, power4.out
Overshoot:      back.out(1.8)   (logo, pill spring)
Hand-off exits: power2.in
Ambient loops:  sine.inOut
Line draw:      power2.out (stroke-dashoffset)
```

### Duration bands
```
Whip streak:      0.20–0.22s
Kicker/label:     0.30–0.35s
Card entrance:    0.55–0.65s
Headline line:    0.55–0.70s
Logo spring:      0.45–0.55s
Ring fill:        1.10s
Exit/hand-off:    0.30–0.35s
Outro tick:       0.45s
Outro title:      0.70s
Outro bar:        0.55s
Ambient breath:   0.9s × repeat:4
```

### Stagger
```
Bar chart:    stagger: 0.07–0.08s
Hit words:    stagger: 0.12s
Caption words: data-at driven, baseline at-0.08s
Log lines:    data-at driven per element
```

### Scene start offset
```
Tối thiểu 0.10–0.20s trước animation đầu tiên.
Ngoại lệ: BG crossfade (0.00s) và whip (0.20s).
```

### Vertical center — BẮT BUỘC
```js
// KHÔNG: CSS transform: translateY(-50%) cùng với GSAP x/scale/filter
// ĐÚNG:
gsap.set('.card', { yPercent: -50 });
// top: 50% trong CSS, yPercent làm phần còn lại
```

### No exit animations — BẮT BUỘC
```
Beat 1, 2, 3: KHÔNG có exit tween trong sub-composition.
Beat 4: chỉ fade out panels tại seam 3.60s (đặc biệt vì PiP transition).
Beat 5: hits fade + y:-30 + blur (đây là pattern swap nội bộ trong Beat 5, không phải exit sang beat khác).
Root mainTl xử lý face-wrapper transition.
```

### Card entrance direction
```
Card LEFT  → from({ x:-60, opacity:0, filter:"blur(14px)" })
Card RIGHT → from({ x:+60, opacity:0, filter:"blur(14px)" })
Top panels → from({ x:±80, opacity:0, filter:"blur(16px)" })
PiP words  → from({ y:+60, opacity:0, scale:0.92, filter:"blur(12px)" })
PiP exit   → to({ y:-30, opacity:0, filter:"blur(14px)" })
```

### Logo pattern
```js
// Spring entrance (back.out)
tl.from('.logo', { scale:0.55, opacity:0, duration:0.55, ease:"back.out(1.8)" }, 0.55);
// Ambient halo breath — gsap.to (NOT tl.to, runs independently)
gsap.to('.logo', {
  filter: "drop-shadow(0 0 44px rgba(217,119,87,0.95)) drop-shadow(0 0 80px rgba(217,119,87,0.45))",
  duration:0.9, repeat:4, yoyo:true, ease:"sine.inOut"
});
```

### Count-up number (Beat 4)
```js
const counter = { v: 0 };
tl.to(counter, {
  v: 248, duration: 1.1, ease: "power2.out",
  onUpdate: () => { el.innerHTML = "+" + Math.round(counter.v) + '<span class="unit">%</span>'; }
}, 1.56);
// CSS cần: font-variant-numeric: tabular-nums;
```

### Karaoke word activation (Beat 3)
```js
tl.from(w, { y:14, opacity:0, duration:0.22, ease:"power2.out" }, Math.max(0.15, at - 0.08));
tl.add(() => w.classList.add("active"), at);
tl.fromTo(w, { scale:1.0 }, { scale:1.08, duration:0.10, ease:"power2.out", yoyo:true, repeat:1 }, at);
tl.add(() => w.classList.remove("active"), at + 0.45);
```

### PiP hit swap pattern (Beat 5)
```js
// Mỗi hit: set visible → kicker → words stagger → fade out → set hidden → next hit arrives
tl.to('.hit-1', { opacity: 1, duration: 0.01 }, 2.58);
// ... animate nội dung ...
tl.to('.hit-1', { opacity:0, y:-30, filter:"blur(14px)", duration:0.30, ease:"power2.in" }, 4.00);
tl.set('.hit-1', { opacity:0, visibility:"hidden" }, 4.30);
// hit-2 bắt đầu ở 4.24 (overlap nhẹ)
```

---

## 9. Code Structure Rules

### Sub-composition template
```html
<template id="beat-N-slug-template">
  <div
    data-composition-id="beat-N-slug"
    data-start="0"
    data-duration="X.XX"
    data-width="1920"
    data-height="1080"
  >
    <!-- HTML -->
    <style>
      [data-composition-id="beat-N-slug"] .class { ... }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <script>
      (() => {
        window.__timelines = window.__timelines || {};
        const tl = gsap.timeline({ paused: true });
        const root = '[data-composition-id="beat-N-slug"]';
        /* animations */
        tl.to({}, { duration: X.XX }, 0);  // duration anchor (Law #11)
        window.__timelines["beat-N-slug"] = tl;
      })();
    </script>
  </div>
</template>
```

### querySelector — KHÔNG dùng template literal
```js
// SAI — linter crash
document.querySelectorAll(`${root} .class`)

// ĐÚNG
document.querySelectorAll('[data-composition-id="beat-N-slug"] .class')
```

### Asset paths — KHÔNG dùng ../
```html
<!-- ĐÚNG — relative từ project root -->
<img src="assets/logo.png" />
<!-- SAI — 404 trong Studio preview -->
<img src="../assets/logo.png" />
```

---

## 10. Beat Structure

| Beat | File | Master start | Duration | Pattern |
|---|---|---|---|---|
| 1 — Hook card | `01-hook.html` | 0.00s | 3.95s | Frosted glass card LEFT, logo spring + headline 2 lines + orange underline |
| 2 — Text slam | `02-text-on-screen.html` | 3.95s | 1.99s | Top-center kicker + slam headline + whip streak |
| 3 — Karaoke | `03-karaoke-captions.html` | 5.94s | 2.70s | Bottom-center caption pill + per-word glow activation |
| 4 — Split panel | `04-mg-and-charts.html` | 8.64s | 4.20s | Agent panel LEFT (top-anchored) + chart RIGHT (top-anchored) |
| 5 — PiP | `05-pip.html` | 12.84s | 10.33s | Navy+grid+40-star BG, 2 side hits swap, outro CTA |

**Face wrapper (root timeline mainTl):**
```js
const FULL = { x:0, y:0, width:1920, height:1080 };
const PIP  = { x:1340, y:60, width:540, height:960 };
gsap.set('#face-wrapper', FULL);
mainTl.to('#face-wrapper', { ...PIP, duration:0.60, ease:"power3.inOut",
  onStart: () => document.getElementById('face-wrapper').classList.add('pip') }, 12.54);
```

---

## 11. What NOT To Do

1. **Không animate `<video>` trực tiếp** — sẽ freeze. Animate `#face-wrapper` div.
2. **Không CSS `transform:translateY(-50%)` cùng GSAP transform** — dùng `gsap.set({ yPercent:-50 })`.
3. **Không dùng template literal trong querySelector** — linter crash.
4. **Không dùng `../assets/`** trong sub-composition path — 404 Studio preview.
5. **Không thêm exit animation** vào Beat 1–3 — root timeline handles transitions.
6. **Không mix 2 accent colors** — chỉ orange `#d97757` cho toàn project.
7. **Không dùng `Math.random()` hoặc `Date.now()`** — render phải deterministic.
8. **Không hardcode pixel position** (e.g., `top:260px`) thay vì `top:50% + yPercent:-50`.
9. **Không đặt `data-start` khác 0** trong sub-composition template — đây là master time, đặt ở `index.html`.
10. **Không dùng emoji hoặc icon box fill** — chỉ dùng `›` bullet JetBrains Mono và SVG circle/path.
