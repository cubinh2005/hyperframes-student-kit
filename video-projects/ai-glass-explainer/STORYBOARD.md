# Storyboard: AI Glass Explainer (AIS Branded)

## Timing Table
| Scene / Beat | Range | Duration | Focus | Motion Language & Components |
| :--- | :--- | :--- | :--- | :--- |
| **Beat 1: Risk Alert** | 0.0s – 4.4s | 4.4s | "Đừng bao giờ phụ thuộc hoàn toàn vào các công cụ AI" | Authentic Liquid Glass + 7 Animated Risk Bars + Gloss Sweep |
| **Beat 2: Community Query** | 4.5s – 14.8s | 10.3s | Câu hỏi ChatGPT, Claude dùng sao cho hiệu quả | Frosted Chat Box + 2 Tool Badges + 3 Stagger Task Tags |
| **Beat 3: Circular Master Gauge** | 15.4s – 17.4s | 2.0s | "Không hề từ bỏ AI" | Circular Gauge Ring SVG (Cyan glow) + 100% Mastered Pill |
| **Beat 4: Core Takeaway** | 17.8s – 22.2s | 4.4s | Từ bỏ tâm lý phó mặc và thói quen ăn may | Two-Tier Alert Box + Warm Orange Icons + Hold to Outro |
| **Global: Karaoke Capsule** | 0.0s – 22.2s | 22.2s | Đồng bộ 111 từ tiếng Việt | Liquid Glass Pill at bottom + `#F5D82A` Gold Glow per word |
| **Global: AIS Brand Watermark**| 0.0s – 22.2s | 22.2s | Logo nhận diện thương hiệu | `assets/logo.png` at top-right with Cobalt Blue outer glow |

---

### Beat 1 — Risk Alert (0.00s – 4.40s)
- **Concept**: Cảnh báo rủi ro khi phó mặc cho AI.
- **Visual elements**:
  - Thẻ `glass-card` (440px) góc phải (`right: 140px`).
  - Kicker: Dot xanh cyan nhấp nháy + nhãn `AIS RISK ALERT` (Roboto Mono).
  - Headline: `ĐỪNG PHỤ THUỘC HOÀN TOÀN VÀO AI` (Montserrat Bold).
  - Biểu đồ: 7 cột sóng neon cyan sang orange vọt lên tuần tự theo nhịp câu nói.
- **Eases**: `expo.out`, `power3.out`, `power2.in` (exit).

### Beat 2 — Community Query (4.50s – 14.80s)
- **Concept**: Khán giả hỏi dùng AI thế nào khi hàng ngày vẫn dùng ChatGPT, Claude.
- **Visual elements**:
  - Kicker: `COMMUNITY QUERY // 02`.
  - Quote: `"Nếu không phụ thuộc AI thì dùng sao cho hiệu quả?"`.
  - 2 Tool Pills: `⚡ ChatGPT (OpenAI)` & `🧠 Claude (Anthropic)`.
  - 3 Task Tags: `Viết bài`, `Tìm ý tưởng`, `Tóm tắt`.
- **Eases**: `expo.out`, `back.out(1.5)`.

### Beat 3 — Circular Master Gauge (15.40s – 17.40s)
- **Concept**: Khẳng định: Không từ bỏ AI, mà làm chủ AI.
- **Visual elements**:
  - Kicker: `CORE DIRECTIVE`.
  - Headline: `KHÔNG HỀ TỪ BỎ AI`.
  - Circular Gauge SVG: Vòng tròn neon cyan xoay quét từ 0 đến 100% với giá trị `100% MASTER`.
- **Eases**: `power3.out`, `power2.inOut`.

### Beat 4 — Core Takeaway (17.80s – 22.20s)
- **Concept**: Bài học cốt lõi: Từ bỏ 2 thói quen cũ.
- **Visual elements**:
  - Kicker: `MINDSET SHIFT` với màu `--ais-warn` `#f09025`.
  - 2 dòng bài học: `✕ Tâm lý phó mặc cho AI` & `✕ Thói quen làm việc ăn may`.
  - Giữ vững 4 giây kết bài với hiệu ứng nổi nhẹ.
