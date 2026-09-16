# Project Brief: AI Glass Explainer (AIS Branded)

## 1. Project Metadata
- **Slug**: `ai-glass-explainer`
- **Location**: `/Users/macos/Documents/editvideo/video-projects/ai-glass-explainer`
- **Format**: 16:9 Landscape (1920 × 1080)
- **Frame Rate**: 30 fps
- **Duration**: 22.20 giây (666 frames)
- **Source Footage**: `assets/source.mp4` (Full talking-head video, giữ nguyên 100% độ sáng và màu sắc gốc)

## 2. Brand Identity: AI Automation Society (AIS)
- **Brand Document**: Ground truth from `DESIGN.ais-example.md` and `assets/brand-tokens.css`.
- **Brand Mood**: "Bloomberg Terminal meets SaaS launch" — Kỹ thuật, uy quyền, dứt khoát, chuyên nghiệp.
- **Logo**: `assets/logo.png` xuất hiện tinh tế ở góc trên phải với hiệu ứng hào quang xanh cobalt `drop-shadow(0 0 40px rgba(3, 7, 255, 0.75))`.
- **Color Palette (AIS Tokens)**:
  - `--ais-bg`: `#07121c` (Deep Navy)
  - `--ais-surface`: `#0d2031` (Thẻ kính bề mặt)
  - `--ais-accent`: `#37bdf8` (AIS Cyan - màu nhấn thương hiệu chính)
  - `--ais-accent-glow`: `#0307ff` (Hào quang logo)
  - `--ais-warn`: `#f09025` (Warm Orange - cảnh báo tương phản)
  - `--ais-text`: `#ffffff` (Chữ chính)
  - `--ais-text-dim`: `#96a2b6` (Chữ phụ / meta)
- **Typography System**:
  - **Montserrat** (Bold 700 / 800): Tiêu đề chính, mang lại cảm giác vững chãi và năng động.
  - **Roboto Mono** (Medium 500 / 700): Kicker labels, nhãn công nghệ, số liệu, ticker.

## 3. Card Aesthetics: Authentic Liquid Glass
- Vị trí: Đặt ở góc phải (`right: 140px`, `top: 170px`), đối xứng hoàn hảo với góc mặt người nói.
- Cấu trúc 5 tầng kính lỏng:
  - Layer 1 (`.glass-backdrop`): Khúc xạ hình ảnh mờ từ `assets/backdrop.jpg` (`filter: blur(44px) saturate(1.3)`).
  - Layer 2 (`.glass-tint`): Ánh sáng gradient nhẹ khúc xạ từ mép trên.
  - Layer 3 (`.glass-scrim`): Lớp tương phản tinh tế giữ chữ luôn dễ đọc.
  - Layer 4 (`.glass-body`): Nội dung đồ họa động mang đậm chất AIS (biểu đồ cột neon cyan, circular gauge, tool pills).
  - Layer 5 (`.glass-gloss`): Vệt sáng kim loại quét qua mặt kính khi xuất hiện.

## 4. Audio & Captions Plan
- **Audio Source**: Âm thanh gốc AAC 48kHz từ `assets/source.mp4`.
- **Karaoke Capsule**: Viên thuốc kính mờ ở `bottom: 44px`, chữ Montserrat, từ đang đọc sáng rực màu vàng kim AIS `#F5D82A` đồng bộ theo từng mili-giây với transcript.

## 5. Visual Storyboard (4 Beats chính)
- **Beat 1 (0.0s – 4.4s) · Risk Warning**:
  - Kicker: `[DOT] AIS RISK ALERT` (Roboto Mono)
  - Headline: `ĐỪNG PHỤ THUỘC HOÀN TOÀN VÀO AI` (Montserrat)
  - Visual: Biểu đồ cột animated bar chart với dải màu cyan sang orange cảnh báo rủi ro.
- **Beat 2 (4.5s – 14.8s) · The Crowd's Question & Tools**:
  - Kicker: `COMMUNITY QUERY // 02`
  - Headline: `"Dùng AI thế nào cho hiệu quả?"`
  - Visual: 2 tool pills `ChatGPT` (OpenAI) & `Claude` (Anthropic) + các tag nhiệm vụ (`Viết bài`, `Tìm ý tưởng`, `Tóm tắt`).
- **Beat 3 (15.4s – 17.4s) · Reversal & Master Gauge**:
  - Kicker: `CORE DIRECTIVE`
  - Headline: `KHÔNG HỀ TỪ BỎ AI`
  - Visual: Vòng đo hiệu suất Circular Gauge SVG phát sáng viền cyan `#37bdf8` đạt 100% Mastered.
- **Beat 4 (17.8s – 22.2s) · Core Takeaway**:
  - Kicker: `MINDSET SHIFT`
  - Headline: `TỪ BỎ 2 THÓI QUEN CŨ`
  - Visual: 2 dòng bài học với icon cảnh báo cam `--ais-warn`: `✕ Tâm lý phó mặc` & `✕ Thói quen ăn may`.
