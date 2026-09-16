# ai-glass-explainer — Design System

> Ground truth được đúc kết từ kiến trúc của `claude-edit-intro` kết hợp bộ nhận diện thương hiệu AIS (Frosted Glass & Electric Cyan).
> Mọi thẻ đồ họa, màu sắc, font chữ, bố cục và chuyển động trong project này PHẢI tuân thủ các quy chuẩn dưới đây.

---

## 1. Canvas & Khung hình

```
Độ phân giải  : 1920 × 1080px (16:9 Landscape)
Frame Rate    : 30 FPS (mọi tween và data-start phải căn theo lưới 1/30 = 0.0333s)
Màu nền Canvas: #07121c (Deep Navy — không dùng đen tuyệt đối #000)
Màu chữ chính : #ffffff
```

### Kiến trúc Face-cam Wrapper (`#face-wrapper`)
- Wrapper là một thẻ `<div>` thông thường bọc thẻ `<video>`.
- **TUYỆT ĐỐI KHÔNG** animate trực tiếp các thuộc tính kích thước, scale lên thẻ `<video>` (sẽ gây đơ bộ giải mã video Chromium/HyperFrames).
- Thẻ `<video>` bên trong đặt `muted playsinline`, đồng bộ âm thanh qua thẻ `<audio>` độc lập cùng cấp.
- **2 Trạng thái bố cục:**
  - **Full frame (Beat 1–3):** `x: 0, y: 0, width: 1920, height: 1080`. Người nói giữ tỷ lệ tự nhiên.
  - **PiP Mode (Beat 4):** Co về góc phải `x: 1340, y: 60, width: 540, height: 960` (tỷ lệ 9:16 dọc), `border-radius: 36px`, viền `1px solid rgba(255,255,255,0.12)`, bóng đổ sâu và quầng sáng xanh (`cyan-halo`) tỏa ra sau lưng.

---

## 2. Hệ thống Typography (Studio Signature Style)

Chỉ sử dụng duy nhất 2 font families — không dùng font mặc định hệ thống:

| Font | Weights sử dụng | Vai trò & Quy chuẩn hiển thị |
|---|---|---|
| **Montserrat** | `800` (ExtraBold) | **Display / Headline:** Tiêu đề chính của thẻ card (`font-size: 76px`, `line-height: 1.02`, `letter-spacing: -0.02em`). Áp dụng kỹ thuật 2-line Dynamic Gradient Fill & Soft Bloom. |
| **Roboto Mono** | `700` (Bold) | **Technical Eyebrow / Kicker:** Nhãn chủ đề trên đầu card (`font-size: 16px`, `letter-spacing: 0.42em`, `color: #37bdf8`, neon glow `text-shadow: 0 0 16px rgba(55, 189, 248, 0.65)`). |
| **Roboto Mono** | `500` - `600` | **Technical UI & Interface:** Danh sách nhiệm vụ, tag pills, mã hiệu (`15px–16px`, bullet `›` màu `#37bdf8`). |
| **Montserrat** | `700` - `800` | **Karaoke Subtitles:** Dòng phụ đề 32px. Từ active: `color: #ffffff`, `font-weight: 800`, text-shadow cyan bloom `0 0 16px #37bdf8`. |

### Kỹ thuật 2-line Dynamic Gradient Fill (Headline Standard)
Để chữ không bị thô cứng mà luôn có chiều sâu phát sáng mượt mà:
- **Dòng 1 (Dẫn nhập):** 
  ```css
  background: linear-gradient(180deg, #ffffff 0%, #c8c8c8 62%, #ededed 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 22px rgba(255, 255, 255, 0.35), 0 0 44px rgba(255, 255, 255, 0.14);
  ```
- **Dòng 2 (Từ khóa trọng tâm / Punchline):**
  ```css
  background: linear-gradient(180deg, #ffffff 0%, #a5e3fc 50%, #37bdf8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 26px rgba(55, 189, 248, 0.55), 0 0 52px rgba(55, 189, 248, 0.22);
  ```

- **Dải Accent Underline Sweep Bar:**
  ```css
  width: 140px;
  height: 5px;
  background: linear-gradient(90deg, #37bdf8, rgba(55, 189, 248, 0));
  border-radius: 3px;
  box-shadow: 0 0 20px rgba(55, 189, 248, 0.75);
  ```

Font được nạp qua `@font-face` nội bộ từ `assets/brand-tokens.css` để đảm bảo render ngoại tuyến ổn định.

---

## 3. Bảng màu thương hiệu (AIS Palette)

| Tên Token | Mã Hex / RGBA | Vai trò |
|---|---|---|
| `--color-canvas` | `#07121c` | Nền canvas toàn frame (Deep Navy) |
| `--color-surface` | `#0d2031` | Nền cơ sở của các bề mặt card |
| `--color-surface-glass` | `rgba(13, 32, 49, 0.72)` | Lớp kính mờ trong suốt |
| `--color-accent` | `#37bdf8` | **Electric Cyan — Màu chủ đạo:** Kicker, gạch chân, chữ phát sáng, điểm nhấn biểu đồ |
| `--color-accent-rgb` | `55, 189, 248` | Dùng để tạo các lớp shadow/glow RGBA |
| `--color-accent-glow` | `#0307ff` | Ánh xanh sâu cho logo và quầng sáng nền |
| `--color-warn` | `#f09025` | **Warm Orange:** Điểm xuyết tương phản cao, cảnh báo hoặc số liệu đặc biệt |
| `--color-text-white` | `#ffffff` | Chữ chính, tiêu đề |
| `--color-text-dim` | `#96a2b6` | Phụ đề, mô tả, nội dung thứ cấp |
| `--color-text-muted` | `#64748b` | Chữ mờ, ghi chú kỹ thuật, vạch phân cách |

**Nguyên tắc ánh sáng:** Chỉ có **1 màu phát sáng chủ đạo (Electric Cyan `#37bdf8`)** trong mỗi frame. Màu cam `#f09025` chỉ đóng vai trò chấm phá nhỏ.

---

## 4. Hệ thống Frosted Glass (Kính mờ cao cấp)

Mọi panel đồ họa xuất hiện trên video phải tuân theo cấu trúc kính đồng nhất:

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

- **Vạch chỉ hướng (Top Accent Highlight):** Thêm dải gradient cyan cao 3px ở cạnh trên cùng:
  `background: linear-gradient(90deg, #37bdf8, transparent);`
- **Gạch chân phát sáng (Underline):**
  `height: 2px; background: #37bdf8; box-shadow: 0 0 16px rgba(55, 189, 248, 0.8);`

---

## 5. Quy tắc vàng về "Độ sạch" (Học từ `claude-edit-intro`)

Để đạt được đẳng cấp tối giản và sang trọng như video của Nate Herk:

### 1. Quy tắc giới hạn chữ (Spotlight Rule)
- **Tối đa 3–5 từ lớn** cho một tiêu đề thẻ card (ví dụ: *"Đừng phụ thuộc hoàn toàn vào AI"*, *"2 thói quen cần từ bỏ"*).
- Không nhồi nhét nhiều khối text, gạch đầu dòng dài dòng hoặc danh sách file code giả. Người xem chỉ có 1–2 giây để quét qua đồ họa trước khi nhìn lại người nói.

### 2. Vùng an toàn của Người nói (Speaker Safe Zone)
- **Khi ở chế độ Full frame:** Thẻ card luôn neo sát mép trái (`left: 80px`) với chiều rộng tối đa `640px`. Người nói phải luôn nhìn thấy rõ ở nửa bên phải khung hình, không bị card đè lên khuôn mặt hay bờ vai.
- **Khi ở chế độ PiP (Beat 4):** Người nói thu về góc phải (`x: 1340`), giải phóng toàn bộ 1340px bên trái cho các thẻ kết luận và bài học xuất hiện thoáng đãng.

### 3. Đồ họa bám sát Lời thoại (Script-Driven Graphics)
- Mọi hình vẽ, biểu đồ (gauge, chart, pills) phải đại diện chính xác cho khái niệm được nói ra trong transcript tại đúng timestamp đó (ví dụ: nói *"ChatGPT, Claude"* $\to$ hiện 2 pill tên công cụ; nói *"đo lường hiệu quả"* $\to$ hiện thước đo master gauge).
- Không tự ý thêm log code `console.log()` hoặc file tree `folder/file.js` nếu kịch bản không nhắc đến lập trình.

---

## 6. Chuyển động & Hiệu ứng chuyển cảnh (Motion & Seams)

- **Vệt sáng chuyển cảnh (Whip Streaks):**
  - Giữa các beat hoặc khi một thẻ card mới bật lên, kích hoạt một vệt sáng cyan ngang màn hình (`height: 3px`, chuyển động `x: -100% -> 200%` trong `0.22s`, ease `power4.out`).
  - Vệt sáng này vừa tăng năng lượng thị giác, vừa giấu đi các vết cắt thô của video gốc.
- **Quầng sáng lưng PiP (Halo Pool):**
  - Đặt một `div` hình elip phát sáng cyan (`width: 800px; height: 1000px; filter: blur(120px); opacity: 0.28`) ngay sau lưng khung PiP để tách lớp video người nói khỏi nền canvas.
- **Ease chuyển động chuẩn:**
  - Tiêu đề và text reveal: `power3.out` hoặc `expo.out` (0.6s–0.8s).
  - Thẻ card bật ra (pop-in): `back.out(1.2)` (0.65s).
  - Ambient drift (sao trời, lưới grid): `ease: "none"` hoặc `sine.inOut` chạy xuyên suốt.
- **Law #11 Timeline Lock:**
  - Mọi file composition và sub-timeline phải kết thúc bằng:
    `tl.to({}, { duration: SLOT_DURATION }, 0);` để khóa thời lượng render chính xác tuyệt đối.
