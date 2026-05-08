### Câu A1 — 3 Cách nhúng CSS

 1. Inline CSS
Viết CSS trực tiếp bên trong thuộc tính `style` của thẻ HTML.

Ví dụ
`<h1 style="color: #2563eb; font-size: 32px;">Tiêu đề</h1>`

- Ưu điểm: Áp dụng nhanh, độ ưu tiên cao nhất, không cần file riêng.
- Nhược điểm: Không tái sử dụng được, làm HTML lộn xộn, không cache được, khó bảo trì.
- Khi nào dùng: Chỉ dùng khẩn cấp, override tạm thời hoặc khi JS thao tác style động.

 2. Internal CSS
Gom toàn bộ CSS vào thẻ `<style>` trong `<head>`.

Ví dụ:
```
<head>
    <style>
        h1 { color: #2563eb; font-size: 32px; }
    </style>
</head>
```

- Ưu điểm: Tiện lợi cho file đơn lẻ, mọi style gọn trong một nơi.
- Nhược điểm: Không chia sẻ cho các trang khác, không cache riêng, HTML phình to.
- Khi nào dùng: Bản nháp, email HTML, trang chỉ có một page duy nhất.

 3. External CSS
Tách CSS sang file riêng `.css`, nhúng vào HTML qua thẻ `<link>`.

**Ví dụ:**

*File HTML:*
```
<head>
    <link rel="stylesheet" href="styles.css">
</head>
```

*File styles.css:*
```
h1 { color: #2563eb; font-size: 32px; }
```

- Ưu điểm: Tái sử dụng, browser cache file CSS, tách biệt cấu trúc và trình bày, dễ bảo trì team.
- Nhược điểm: Thêm 1 HTTP request ban đầu (được bù bởi caching).
- Khi nào dùng: Tiêu chuẩn bắt buộc cho mọi dự án thực tế.

#### Câu hỏi thêm: Cách nào thắng?

Inline CSS thắng.

**Giải thích:** CSS tính theo cơ chế thác nước. Inline CSS có specificity score cao nhất vì nó được coi là `(1,0,0,0)` — cao hơn mọi selector. Internal và External CSS cùng mức ưu tiên về specificity, cái nào khai báo **sau** sẽ ghi đè cái trước (theo thứ tự nguồn). Trường hợp duy nhất vượt qua Inline CSS là dùng `!important` trong Internal/External CSS.

### Câu A2 — CSS Selectors — Dự đoán kết quả

Với HTML đã cho:

```
1. h1                    → Chọn: "ShopTLU" (thẻ h1 duy nhất trong header)
2. .price                → Chọn: "25.990.000đ" và "45.990.000đ" (2 phần tử có class="price")
3. #app header           → Chọn: toàn bộ thẻ <header class="top-bar dark"> (con cháu của #app)
4. nav a:first-child     → Chọn: "Home" (thẻ <a> đầu tiên là con của <nav>)
5. .product.featured h2  → Chọn: "MacBook Pro" (h2 bên trong article có cả 2 class product VÀ featured)
6. article > p           → Chọn: "25.990.000đ", "Mô tả sản phẩm..." (lần 1), "45.990.000đ", "Mô tả sản phẩm..." (lần 2) — tất cả thẻ <p> là con TRỰC TIẾP của <article>
7. a[href="/"]           → Chọn: "Home" (thẻ <a> có href chính xác là "/")
8. .top-bar.dark h1      → Chọn: "ShopTLU" (h1 bên trong phần tử có cả 2 class top-bar VÀ dark)
```

Giải thích chi tiết:
- Selector 3 (`#app header`): descendant selector — chọn mọi `header` là hậu duệ của `#app`.
- Selector 4 (`nav a:first-child`): pseudo-class `:first-child` — chọn `<a>` vừa là con đầu tiên vừa nằm trong `nav`. "Home" là `<a>` đầu tiên trong `<nav>`.
- Selector 5 (`.product.featured`): chained class — element phải có **cả hai** class, chỉ article MacBook Pro thỏa mãn.
- Selector 6 (`article > p`): child combinator `>` — chỉ lấy `<p>` là con **trực tiếp** của `article`, không lấy con của con.

### Câu A3 — Box Model — Tính toán kích thước

#### Trường hợp 1: content-box (mặc định)
```
.box-1 { width: 400px; padding: 20px; border: 5px solid black; margin: 10px; }
```

- Chiều rộng hiển thị = width + padding-left + padding-right + border-left + border-right
  = 400 + 20 + 20 + 5 + 5 = **450px**
- Không gian chiếm trên trang = chiều rộng hiển thị + margin-left + margin-right
  = 450 + 10 + 10 = **470px**

#### Trường hợp 2: border-box
```css
.box-2 { box-sizing: border-box; width: 400px; padding: 20px; border: 5px solid black; margin: 10px; }
```

- Chiều rộng hiển thị = **400px** (width đã bao gồm padding + border)
- Kích thước content thực tế = width - padding-left - padding-right - border-left - border-right
  = 400 - 20 - 20 - 5 - 5 = **350px**
- Không gian chiếm trên trang = 400 + 10 + 10 = **420px**

#### Trường hợp 3: Margin Collapse
```
.box-a { margin-bottom: 25px; }
.box-b { margin-top: 40px; }
```

- Khoảng cách giữa box-a và box-b = 40px (KHÔNG phải 65px)
- Giải thích: Đây là hiện tượng Margin Collapse (sụp margin). Khi hai block-level elements cạnh nhau theo chiều dọc, margin của chúng không cộng lại mà hòa nhập (collapse — lấy giá trị lớn hơn Ở đây max(25px, 40px) = 40px.

### Câu A4

Element: `<p class="price" id="main-price">`

#### 1. Tính specificity score (a, b, c):

| Rule | Selector | ID (a) | Class (b) | Element (c) | Score |
|------|----------|--------|-----------|-------------|-------|
| A | `p` | 0 | 0 | 1 | **(0,0,1)** |
| B | `.price` | 0 | 1 | 0 | **(0,1,0)** |
| C | `#main-price` | 1 | 0 | 0 | **(1,0,0)** |
| D | `p.price` | 0 | 1 | 1 | **(0,1,1)** |

#### 2. Element sẽ có màu gì?

**Màu đỏ (red)** — do Rule C (`#main-price`) có specificity cao nhất (1,0,0).

So sánh: (1,0,0) > (0,1,1) > (0,1,0) > (0,0,1)  
→ Rule C thắng → `color: red`

#### 3. Nếu thêm `style="color: orange;"` (inline):

**Màu cam (orange)** — Inline style có specificity **(1,0,0,0)** — cao hơn bất kỳ selector nào trong stylesheet.

#### 4. Nếu Rule A thêm `!important`:

```css
p { color: black !important; }
```

**Màu đen (black)** — `!important` phá vỡ cascade thông thường. Kể cả inline style cũng bị ghi đè bởi `!important` trong stylesheet (trừ khi inline cũng có `!important`).

Thứ tự ưu tiên đầy đủ:
1. `!important` trong user agent stylesheet
2. `!important` trong author stylesheet ← Rule A lúc này
3. Inline style
4. ID selector
5. Class/Attribute/Pseudo-class selector
6. Element/Pseudo-element selector

### Bài B1 — Style trang Profile
→ Xem file: `profile.html` + `style.css`

### Bài B2 — Box Model Lab
→ Xem file: `boxmodel_lab.html` + `boxmodel.css`

### Bài B3 — Specificity Battle
→ Xem file: `specificity.html` + `specificity.css`

**10 CSS rules từ thấp đến cao (target `<p id="demo" class="text highlight">`):**

| # | Selector | Specificity | Color |
|---|----------|-------------|-------|
| 1 | `p` | (0,0,1) | gray |
| 2 | `div p` | (0,0,2) | brown |
| 3 | `.text` | (0,1,0) | blue |
| 4 | `p.text` | (0,1,1) | cyan |
| 5 | `.text.highlight` | (0,2,0) | teal |
| 6 | `p.text.highlight` | (0,2,1) | purple |
| 7 | `#demo` | (1,0,0) | orange |
| 8 | `#demo.text` | (1,1,0) | red |
| 9 | `#demo.text.highlight` | (1,2,0) | crimson |
| 10 | `#demo p` (không match) / dùng inline | inline | — |

**Element cuối cùng hiển thị màu:** `crimson` (rule 9 có specificity cao nhất trong stylesheet: 1,2,0).

**Thay đổi thứ tự rules:** Kết quả KHÔNG thay đổi vì specificity quyết định trước, thứ tự file chỉ là tiebreaker khi specificity bằng nhau.

### Câu C1 — Debug CSS Layout

#### 1. Tính chiều rộng thực tế (content-box):

- **Sidebar**: 300px (width) + 20px×2 (padding) + 1px×2 (border) = **342px**
- **Content**: 660px (width) + 30px×2 (padding) + 1px×2 (border) = **722px**

#### 2. Tại sao layout bị vỡ?

Tổng chiều rộng thực tế = 342px + 722px = **1064px > 960px** (container).

Vì `box-sizing` mặc định là `content-box`, padding và border được cộng thêm vào ngoài width. Tổng hai cột vượt quá container 104px, nên cột thứ hai bị đẩy xuống dòng mới.

#### 3. Hai cách sửa:

**Cách 1 — Dùng border-box:**
```
* { box-sizing: border-box; }
/* Giờ width: 300px và width: 660px là kích thước THỰC TẾ
   300px + 660px = 960px = đúng bằng container ✓ */
```

**Cách 2 — Không dùng border-box (điều chỉnh width):**
```
.sidebar {
    width: 258px; /* 300 - 20*2 padding - 1*2 border = 258px */
    padding: 20px;
    border: 1px solid #ccc;
    float: left;
}
.content {
    width: 598px; /* 660 - 30*2 padding - 1*2 border = 598px */
    padding: 30px;
    border: 1px solid #ccc;
    float: left;
}
/* 258 + 20*2 + 1*2 = 300px
   598 + 30*2 + 1*2 = 660px
   300 + 660 = 960px ✓ */
```

→ Xem file: `debug_layout.html` + `debug_layout.css`

---

### Câu C2 — Cascade Puzzle

#### CSS đã cho:
```css
body { font-size: 16px; color: #333; }
.container { font-size: 14px; }
.card { color: blue; }
.card .title { font-size: 20px; }
.card p { color: inherit; }
#featured .title { color: red; }
.highlight { color: green !important; }
```

#### 1. "Sản phẩm A" (h2.title.highlight trong #featured.card):

- **font-size:** `.card .title { font-size: 20px }` áp dụng → 20px
  - (Không có rule nào override font-size này với specificity cao hơn)
- **color:**
  - `.card { color: blue }` → specificity (0,1,0)
  - `#featured .title { color: red }` → specificity (1,1,0) — cao hơn
  - `.highlight { color: green !important }`
  - **→ color: green** (vì `!important` luôn thắng)

#### 2. "Mô tả sản phẩm" (p trong #featured.card, KHÔNG có class highlight):

- `.card p { color: inherit }` → inherit từ `.card { color: blue }`
  - Nhưng `.card { color: blue }` bị override bởi `#featured .title` chỉ trên h2, không trên p
  - Phần tử `<p>` kế thừa color từ `.card` (parent) → inherit = blue
  - color: blue

  Giải thích chi tiết: `.card p { color: inherit }` có specificity (0,1,1). `inherit` lấy giá trị từ cha gần nhất. Cha của `<p>` là `.card#featured`. `.card { color: blue }` và `#featured .title` chỉ áp dụng cho `.title` (h2), không phải `p`. Cha của `p` là `.card` có `color: blue`, nên `inherit` = blue.

#### 3. "Sản phẩm B" (h2.title trong .card thứ 2, KHÔNG có id featured):

- font-size: `.card .title { font-size: 20px }` → 20px
- color:
  - `.card { color: blue }` → specificity (0,1,0)
  - `.card .title { font-size: 20px }` → không set color
  - `#featured .title { color: red }` → KHÔNG áp dụng (h2 này không nằm trong #featured)
  - `.highlight` → h2 này không có class highlight
  - color: blue (từ `.card`)

#### 4. "Mô tả sản phẩm B" (p.highlight trong .card thứ 2):

- `.card p { color: inherit }` → specificity (0,1,1)
- `.highlight { color: green !important }` → specificity (0,1,0) nhưng có **!important**
- `!important` thắng tất cả → **color: green**

**Tóm tắt:**
| Element | font-size | color |
|---------|-----------|-------|
| "Sản phẩm A" (h2 trong #featured) | 20px | **green** (!important) |
| "Mô tả sản phẩm" (p trong #featured) | 14px (inherit từ .container) | **blue** (inherit từ .card) |
| "Sản phẩm B" (h2 trong card 2) | 20px | **blue** (.card) |
| "Mô tả sản phẩm B" (p.highlight) | 14px (inherit từ .container) | **green** (!important) |

→ Xem file: `cascade_puzzle.html`
