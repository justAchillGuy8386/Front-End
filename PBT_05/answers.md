# 📋 LỜI GIẢI PHIẾU BÀI TẬP 05
**CSS RESPONSIVE & SCSS — Responsive Design, Media Queries, Sass**

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)

### Câu A1 (5đ) — Viewport & Mobile-First

#### 1. Viết chính xác thẻ `<meta viewport>` chuẩn. Giải thích từng thuộc tính.
Cú pháp chuẩn xác nhất cần đặt trong thẻ `<head>` của trang HTML:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
**Giải thích chi tiết từng thuộc tính:**
- `name="viewport"`: Xác định thẻ meta này dùng để cấu hình vùng nhìn (viewport) của trình duyệt – khu vực hiển thị nội dung trang web trên màn hình thiết bị.
- `width=device-width`: Hướng dẫn trình duyệt thiết lập chiều rộng của trang web bằng đúng với chiều rộng vật lý của màn hình thiết bị đang truy cập (thay vì render ở kích thước mặc định của desktop).
- `initial-scale=1.0`: Đặt mức độ phóng to/thu nhỏ ban đầu là `1.0` (tương đương 100%) khi trang web vừa được tải. Điều này đảm bảo các phần tử giao diện hiển thị đúng với kích thước pixel đã thiết kế trong CSS mà không bị zoom tự động.

#### 2. Nếu THIẾU thẻ này, iPhone sẽ hiển thị trang web như thế nào?
Nếu thiếu thẻ meta viewport, các trình duyệt trên thiết bị di động (như Safari trên iPhone) sẽ giả định trang web được thiết kế riêng cho màn hình Desktop. 
- Trình duyệt sẽ render toàn bộ trang web trên một viewport ảo có chiều rộng lớn (thường là `980px`).
- Sau đó, để hiển thị trọn vẹn nội dung đó lên màn hình vật lý bé của điện thoại, trình duyệt sẽ **tự động thu nhỏ (scale down)** toàn bộ trang web.
- **Hậu quả:** Giao diện tổng thể sẽ hiển thị đầy đủ nhưng chữ viết, hình ảnh và các nút bấm trở nên cực kỳ nhỏ, người dùng bắt buộc phải dùng thao tác phóng to bằng tay (pinch-to-zoom) và cuộn ngang liên tục mới có thể đọc thông tin hoặc bấm xác thực các nút chức năng.

#### 3. Mobile-First và Desktop-First khác nhau thế nào? Viết ví dụ CSS cho mỗi cách với breakpoint 768px. Tại sao Mobile-First được khuyên dùng?

**Sự khác biệt cốt lõi:**
- **Mobile-First (Ưu tiên di động trước):** Lập trình viên bắt đầu viết các quy tắc CSS gốc (base styles, không bọc trong Media Query) dành cho màn hình nhỏ nhất (Mobile). Sau đó, sử dụng Media Queries với điều kiện `min-width` để bổ sung, mở rộng hoặc ghi đè các bố cục phức tạp hơn khi kích thước màn hình tăng lên (Tablet, Desktop).
- **Desktop-First (Ưu tiên máy tính trước):** Lập trình viên bắt đầu viết CSS gốc cho màn hình lớn (Desktop) với đầy đủ các tính năng, cột, và hiệu ứng. Sau đó, sử dụng Media Queries với điều kiện `max-width` để thu hẹp, bớt đi hoặc ẩn các phần tử giao diện khi màn hình co nhỏ lại.

**Ví dụ CSS minh họa (Breakpoint 768px):**
```css
/* ==========================================
   APPROACH 1: MOBILE-FIRST (Khuyên dùng)
   ========================================== */

/* 1. Base style: Mặc định áp dụng cho Mobile (màn hình < 768px) */
.product-grid {
    display: grid;
    grid-template-columns: 1fr; /* Chỉ hiển thị 1 cột trên mobile */
    gap: 16px;
}

/* 2. Kích thước từ 768px trở lên (Tablet & Desktop) */
@media (min-width: 768px) {
    .product-grid {
        grid-template-columns: repeat(2, 1fr); /* Mở rộng lên 2 cột */
    }
}


/* ==========================================
   APPROACH 2: DESKTOP-FIRST
   ========================================== */

/* 1. Base style: Mặc định áp dụng cho Desktop/Màn hình lớn */
.product-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Hiển thị 2 cột trên desktop */
    gap: 16px;
}

/* 2. Kích thước nhỏ hơn 768px (Mobile) */
@media (max-width: 767px) {
    .product-grid {
        grid-template-columns: 1fr; /* Thu về 1 cột trên mobile */
    }
}
```

**Tại sao Mobile-First được khuyên dùng?**
1. **Tối ưu hóa hiệu năng tải trang trên di động:** Thiết bị di động thường có bộ xử lý yếu hơn và tốc độ mạng hạn chế hơn desktop. Với Mobile-First, trình duyệt trên điện thoại chỉ cần đọc và áp dụng ngay các đoạn CSS gốc đơn giản mà không phải tải, xử lý các đoạn CSS đồ sộ của desktop rồi sau đó mới tốn công ghi đè/ẩn đi.
2. **Chiến lược Phát triển Nâng cao dần (Progressive Enhancement):** Mobile-First buộc đội ngũ thiết kế và lập trình phải tập trung tuyệt đối vào nội dung và tính năng cốt lõi nhất của sản phẩm để đặt vào không gian hạn chế. Khi màn hình mở rộng, ta mới đắp thêm các lớp giao diện nâng cao (như thanh trượt, nhiều cột, sidebar phụ), giúp mã nguồn sạch, ít bị lặp và cực kỳ dễ bảo trì.

---

### Câu A2 (5đ) — Breakpoints
Bảng tổng hợp các breakpoints chuẩn (dựa trên hệ thống thiết kế tiêu chuẩn của Bootstrap / Tailwind CSS):

| Breakpoint | Kích thước Pixel | Thiết bị đại diện | Ví dụ: Lưới sản phẩm nên hiển thị mấy cột? |
| :--- | :--- | :--- | :--- |
| **xs** (Extra small) | `< 576px` | Điện thoại di động cầm tay dạng dọc (iPhone SE, Android) | **1 cột** (`grid-template-columns: 1fr`) |
| **sm** (Small) | `≥ 576px` | Điện thoại di động xoay ngang, Phablet màn hình lớn | **2 cột** (`repeat(2, 1fr)`) |
| **md** (Medium) | `≥ 768px` | Máy tính bảng (iPad tiêu chuẩn, Tablet) | **2 hoặc 3 cột** (`repeat(3, 1fr)`) |
| **lg** (Large) | `≥ 992px` | Máy tính xách tay (Laptop), Màn hình Desktop nhỏ | **3 hoặc 4 cột** (`repeat(4, 1fr)`) |
| **xl** (Extra large) | `≥ 1200px` | Màn hình Desktop độ phân giải cao tiêu chuẩn | **4 cột** (`repeat(4, 1fr)`) |
| **xxl** | `≥ 1400px` | Màn hình Desktop siêu rộng, Màn hình TV | **4 đến 6 cột** |

---

### Câu A3 (5đ) — Media Queries
Dựa vào đoạn mã CSS đề bài cung cấp:
```css
.container { width: 100%; padding: 10px; }

@media (min-width: 576px) { .container { width: 540px; } }
@media (min-width: 768px) { .container { width: 720px; } }
@media (min-width: 992px) { .container { width: 960px; } }
@media (min-width: 1200px) { .container { width: 1140px; } }
```

Bảng phân tích chiều rộng của `.container` tại từng độ phân giải:

| Chiều rộng màn hình | `.container` width | Giải thích cơ chế áp dụng |
| :--- | :--- | :--- |
| **375px** (iPhone SE) | **100%** | Màn hình nhỏ hơn `576px`, không thỏa mãn bất kỳ Media Query nào, do đó giữ nguyên giá trị base ban đầu. |
| **600px** | **540px** | Nằm trong khoảng `≥ 576px` và `< 768px`, kích hoạt quy tắc `@media (min-width: 576px)`. |
| **800px** | **720px** | Thỏa mãn cả 2 mốc `576px` và `768px`. Do cơ chế xếp tầng (Cascade), quy tắc viết sau `@media (min-width: 768px)` sẽ ghi đè. |
| **1000px** | **960px** | Thỏa mãn các mốc `576px`, `768px`, và `992px`. Quy tắc `@media (min-width: 992px)` nằm sau cùng trong nhóm này sẽ có hiệu lực. |
| **1400px** | **1140px** | Lớn hơn mốc tối đa `1200px`, kích hoạt và áp dụng quy tắc `@media (min-width: 1200px)` cuối cùng. |

---

### Câu A4 (5đ) — SCSS Basics

#### 1. Giải thích 4 tính năng chính của SCSS và cho ví dụ:

**a. Variables (Biến - `$variable`):**
- **Giải thích:** Cho phép lưu trữ các giá trị được tái sử dụng nhiều lần trong toàn bộ dự án (như mã màu, phông chữ, kích thước, hệ thống khoảng cách) vào một định danh bắt đầu bằng ký tự `$`. Khi cần thay đổi một màu sắc hay khoảng cách, ta chỉ cần sửa giá trị của biến đó ở một nơi duy nhất.
- **Ví dụ:**
  ```scss
  $primary-color: #2563eb;
  $font-main: 'Inter', sans-serif;
  $base-radius: 8px;

  .btn-primary {
      background-color: $primary-color;
      font-family: $font-main;
      border-radius: $base-radius;
  }
  ```

**b. Nesting (Viết CSS lồng nhau):**
- **Giải thích:** Cho phép lồng các bộ chọn (selectors) con vào bên trong khối mã của bộ chọn cha, phản ánh chính xác cấu trúc phân cấp của cây HTML DOM. Kỹ thuật này giúp mã nguồn gọn gàng, cực kỳ dễ đọc và hỗ trợ ký hiệu `&` để tham chiếu trực tiếp đến phần tử cha hiện tại (rất hữu ích cho các trạng thái `:hover`, `:focus` hoặc cấu trúc BEM).
- **Ví dụ:**
  ```scss
  .navbar {
      background-color: #ffffff;
      padding: 16px;

      .nav-list {
          list-style: none;

          .nav-item {
              display: inline-block;

              a {
                  color: #333333;
                  text-decoration: none;

                  &:hover { /* Ký tự & tương đương với .navbar .nav-list .nav-item a */
                      color: #2563eb;
                  }
              }
          }
      }
  }
  ```

**c. Mixins (`@mixin`, `@include`):**
- **Giải thích:** Đóng vai trò như một hàm trong lập trình, cho phép đóng gói một nhóm các thuộc tính CSS để tái sử dụng ở nhiều bộ chọn khác nhau. Mixin hỗ trợ truyền tham số vào để linh hoạt tạo ra các phong cách tùy chỉnh (như tiền tố trình duyệt, hiệu ứng bóng đổ, flexbox hoặc quản lý Media Queries).
- **Ví dụ:**
  ```scss
  @mixin flex-center($flex-direction: row) {
      display: flex;
      flex-direction: $flex-direction;
      justify-content: center;
      align-items: center;
  }

  .card-container {
      @include flex-center(column); /* Gọi mixin và truyền tham số column */
      min-height: 200px;
  }
  ```

**d. `@extend` / Inheritance (Kế thừa):**
- **Giải thích:** Cho phép một bộ chọn chia sẻ (kế thừa) toàn bộ các thuộc tính CSS của một bộ chọn khác. Trình biên dịch SCSS sẽ tự động gộp chung các selectors chia sẻ thuộc tính lại với nhau bằng dấu phẩy, giúp tránh lặp lại mã và tối ưu hóa dung lượng file CSS đầu ra.
- **Ví dụ:**
  ```scss
  .alert-base {
      padding: 12px 20px;
      border-radius: 6px;
      font-weight: 600;
  }

  .alert-success {
      @extend .alert-base; /* Kế thừa toàn bộ thuộc tính từ .alert-base */
      background-color: #d1fae5;
      color: #065f46;
  }

  .alert-danger {
      @extend .alert-base; /* Kế thừa toàn bộ thuộc tính từ .alert-base */
      background-color: #fee2e2;
      color: #991b1b;
  }
  ```

#### 2. Tại sao trình duyệt KHÔNG đọc được file `.scss`? Cần bước gì để chuyển SCSS → CSS?
- **Lý do trình duyệt không đọc được:** Trình duyệt web (Chrome, Safari, Firefox, Edge) chỉ tích hợp sẵn engine để phân tích và render ngôn ngữ tiêu chuẩn là **CSS**. SCSS (Sassy CSS) là một ngôn ngữ tiền xử lý (Preprocessor) có các cú pháp lập trình bậc cao (biến, vòng lặp, hàm, lồng nhau) nằm ngoài tiêu chuẩn đặc tả mà trình duyệt có thể hiểu trực tiếp.
- **Quy trình chuyển đổi:** Để trang web có thể hiển thị giao diện được viết bằng SCSS, ta bắt buộc phải trải qua bước **Biên dịch (Compilation)** nhằm dịch toàn bộ mã SCSS sang các tệp CSS thuần túy. Quá trình này được thực hiện thông qua:
  - Cài đặt trình biên dịch chính thức `sass` qua dòng lệnh (Node.js/npm).
  - Sử dụng tiện ích mở rộng trực tiếp trên VSCode như **Live Sass Compiler**.
  - Tích hợp tự động vào quy trình build của các công cụ hiện đại như Vite, Webpack, Gulp.

---

## PHẦN C — PHÂN TÍCH (20 điểm)

### Câu C1 (10đ) — Phân tích trang web thực (Shopee Việt Nam - `shopee.vn`)

#### 1. Phân tích sự thay đổi giao diện trên 3 kích thước màn hình:
- **Mobile (375px):**
  - **Navigation:** Thanh tìm kiếm và logo Shopee được tối ưu nhỏ gọn sát phía trên. Dải menu ngang chứa các danh mục hàng hóa bị loại bỏ hoàn toàn; thay vào đó là thanh điều hướng dưới cùng (Bottom Navigation Bar) chứa các tab cốt lõi: *Trang chủ, Mall, Video, Thông báo, Tôi*.
  - **Lưới Content:** Danh sách sản phẩm gợi ý được chuyển về dạng lưới **2 cột** (giúp hình ảnh sản phẩm đủ lớn để quan sát trên màn hình hẹp) hoặc **1 cột** đối với các dải Flash Sale cuộn ngang.
  - **Phần tử bị ẩn:** Toàn bộ các dải banner quảng cáo lớn hai bên, danh sách bộ lọc nâng cao dạng sidebar bên trái bị ẩn đi (chuyển thành một nút "Lọc" nhỏ, khi bấm vào sẽ mở ra Drawer/Popup trượt).
  - **Font size:** Kích thước chữ được tinh chỉnh nhỏ hơn (khoảng `12px - 13px` cho tiêu đề sản phẩm) để tối ưu hiển thị thông tin mà không làm tràn khung.

- **Tablet (768px):**
  - **Navigation:** Thanh tìm kiếm phía trên được kéo dài rộng rãi hơn, xuất hiện thêm các biểu tượng giỏ hàng và chat rõ ràng ở góc phải.
  - **Lưới Content:** Lưới sản phẩm tự động mở rộng lên thành **3 hoặc 4 cột** tùy thuộc vào module nội dung.
  - **Phần tử hiển thị:** Các dải danh mục bắt đầu hiển thị dạng lưới nhiều icon trượt ngang mượt mà.

- **Desktop (1440px):**
  - **Navigation:** Header đồ sộ và cực kỳ đầy đủ. Phía trên cùng là dải menu phụ (Kênh Người Bán, Tải ứng dụng, Kết nối, Thông báo, Hỗ trợ, Ngôn ngữ, Tài khoản). Ngay bên dưới là Logo Shopee bản đầy đủ, thanh tìm kiếm khổng lồ kèm các từ khóa hot gợi ý bên dưới, và Giỏ hàng lớn.
  - **Lưới Content:** Danh sách sản phẩm hiển thị chuẩn **6 cột** card sản phẩm liền kề.
  - **Phần tử hiển thị đầy đủ:** Khung bộ lọc sản phẩm chuyên sâu (Nơi bán, Đơn vị vận chuyển, Thương hiệu, Khoảng giá, Loại shop) nằm cố định ở Sidebar bên trái. Banner Slider chính giữa hiển thị cực lớn kèm các banner phụ bên phải.
  - **Font size:** Kích thước chữ tiêu chuẩn (`14px - 16px`), khoảng trống giữa các khối (padding/gap) thoáng đãng, tận dụng trọn vẹn màn hình rộng.

#### 2. Cú pháp `@media` tiêu biểu Shopee áp dụng (Trích xuất từ DevTools):
```css
/* Tối ưu hóa ẩn dải header phụ của Desktop khi xem trên Mobile/Tablet nhỏ */
@media (max-width: 767px) {
    .header-desktop-wrapper {
        display: none !important;
    }
    .mobile-bottom-nav {
        display: flex;
        position: fixed;
        bottom: 0;
        width: 100%;
    }
}

/* Tăng số cột của lưới sản phẩm khi màn hình đạt kích thước Desktop tiêu chuẩn */
@media (min-width: 1200px) {
    .shopee-product-list .row {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 10px;
    }
}
```

---

### Câu C2 (10đ) — Thiết kế Responsive Strategy (Trang Đặt bàn nhà hàng)

#### 1. Wireframe / Sơ đồ bố cục chiến lược
- **Mobile (< 768px):**
  - **Header:** Logo nhà hàng đặt bên trái, nút icon Hotline gọi điện nhanh đặt bên phải. Thanh menu chính được ẩn gọn gàng vào nút Hamburger ☰.
  - **Hero Image:** Hiển thị 100% chiều rộng, chiều cao tối ưu khoảng `250px` để người dùng không phải cuộn quá lâu mới thấy nội dung chính.
  - **Grid ảnh món ăn:** Xếp thành **1 cột** (hoặc lưới 2 cột nhỏ) để các bức ảnh món ăn giữ được chi tiết sắc nét trên điện thoại.
  - **Form đặt bàn:** Nằm trọn vẹn thành 1 khối dọc. Các trường input (Ngày, Giờ, Số người, Ghi chú) xếp chồng lên nhau, mỗi trường chiếm 100% chiều rộng màn hình.
  - **Bản đồ Google Maps:** Nằm ngay phía dưới Form đặt bàn, chiếm 100% chiều rộng để khách hàng dễ dàng tra cứu đường đi.
  - **Footer:** Các thông tin địa chỉ, giờ mở cửa, mạng xã hội xếp thành 1 cột dọc căn giữa.

- **Tablet (768px - 1023px):**
  - **Header:** Menu điều hướng ngang dạng rút gọn xuất hiện bên cạnh Logo.
  - **Grid ảnh món ăn:** Dàn thành lưới **3 cột** (2 hàng ảnh).
  - **Form đặt bàn & Bản đồ:** Chia thành bố cục ngang **2 cột** song song (Cột trái chứa Form đặt bàn, Cột phải chứa Bản đồ Google Maps nhúng), giúp tiết kiệm chiều cao trang web và tận dụng rất tốt không gian của màn hình Tablet.

- **Desktop (≥ 1024px):**
  - **Header:** Dải menu ngang sang trọng trải rộng đầy đủ (Logo bên trái, danh sách liên kết ở giữa, Nút Đặt bàn nổi bật bên phải).
  - **Hero Image:** Trải rộng toàn dải (Banner lớn hoặc chiều cao đạt `80vh - 100vh`) tạo ấn tượng thị giác mạnh mẽ (Rich Aesthetics).
  - **Grid ảnh món ăn:** Lưới **3 cột lớn** hoặc dải gallery **6 cột** liền kề.
  - **Form đặt bàn & Bản đồ:** Bố cục 2 cột cao cấp được giới hạn trong một container trung tâm (`max-width: 1200px`). Form đặt bàn chiếm khoảng `40%` chiều rộng bên trái với các trường input được xếp thành 2 cột nhỏ gọn gàng; Bản đồ Google Maps chiếm `60%` chiều rộng bên phải, có hiệu ứng đổ bóng shadow và bo góc tinh tế.

#### 2. CSS Skeleton (Grid + Media Queries Mobile-First)
```css
/* =========================================================
   1. BỐ CỤC GỐC DÀNH CHO MOBILE (BASE STYLES - MOBILE FIRST)
   ========================================================= */

/* Container bọc ngoài giới hạn khoảng cách an toàn */
.restaurant-wrapper {
    width: 100%;
    padding: 16px;
    margin: 0 auto;
}

/* Lưới hình ảnh món ăn: Mặc định 1 cột trên Mobile */
.food-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
}

/* Khu vực Đặt bàn bao gồm Form và Bản đồ: Xếp chồng theo chiều dọc */
.reservation-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
    margin-top: 32px;
}

/* Các trường bên trong Form đặt bàn: Xếp dọc 100% width */
.booking-form {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
}


/* =========================================================
   2. BREAKPOINT DÀNH CHO TABLET (≥ 768px)
   ========================================================= */
@media (min-width: 768px) {
    .restaurant-wrapper {
        padding: 24px;
    }

    /* Lưới hình ảnh món ăn dàn thành 3 cột */
    .food-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
    }

    /* Đưa Form đặt bàn và Bản đồ lên nằm ngang song song (2 cột đều nhau) */
    .reservation-container {
        grid-template-columns: repeat(2, 1fr);
        align-items: start; /* Giúp 2 cột căn đều từ phía trên */
    }
}


/* =========================================================
   3. BREAKPOINT DÀNH CHO DESKTOP (≥ 1024px)
   ========================================================= */
@media (min-width: 1024px) {
    .restaurant-wrapper {
        max-width: 1200px;
        padding: 40px 0;
    }

    /* Lưới hình ảnh món ăn mở rộng khoảng cách thoáng đãng */
    .food-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 28px;
    }

    /* Tinh chỉnh tỷ lệ vàng: Form chiếm 40% (4fr), Bản đồ chiếm 60% (6fr) */
    .reservation-container {
        grid-template-columns: 4fr 6fr;
        gap: 48px;
        margin-top: 48px;
    }

    /* Tối ưu hóa form input trên Desktop: Xếp 2 trường nhỏ trên cùng 1 hàng */
    .booking-form {
        grid-template-columns: repeat(2, 1fr);
    }
    
    /* Các trường yêu cầu nhập dài (Ghi chú) hoặc Nút bấm sẽ chiếm trọn 2 cột */
    .booking-form .full-width-field {
        grid-column: span 2;
    }
}
```

---

## BÀI B3 — LỆNH BIÊN DỊCH SCSS SANG CSS
Để đáp ứng yêu cầu của **Bài B3**, dưới đây là cú pháp lệnh dòng lệnh chuẩn xác để biên dịch cấu trúc file SCSS (đã chia partials) sang file CSS hoàn chỉnh:

```bash
# Lệnh biên dịch file style.scss chính thành file style.css
# Cờ --no-source-map giúp file xuất ra gọn gàng không kèm file map phụ
npx sass scss/style.scss scss/style.css --no-source-map

# Hoặc nếu muốn trình biên dịch tự động theo dõi và dịch lại mỗi khi file SCSS có thay đổi (chế độ watch):
npx sass --watch scss/style.scss scss/style.css
```
*(Lưu ý: Nếu sử dụng VSCode, bạn có thể cài đặt extension **Live Sass Compiler** và bấm nút **"Watch Sass"** ở thanh trạng thái dưới cùng để tự động thực hiện quá trình này mà không cần gõ lệnh).*
