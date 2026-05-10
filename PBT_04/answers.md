### Câu A1

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|----------|---------------------------|-------------------|------------------|----------|
| `static` | Có | Dòng chảy mặc định | Có | Trạng thái mặc định của các phần tử HTML. |
| `relative` | Có | Vị trí ban đầu của chính nó | Có | Dịch chuyển nhẹ phần tử, hoặc làm mốc tọa độ cho thẻ con có absolute. |
| `absolute` | Không | Phần tử cha gần nhất có thuộc tính position khác static | Có (trừ khi thẻ cha là fixed) | Tạo tooltips, dropdowns, badge thông báo, icon nổi trên ảnh. |
| `fixed` | Không | Cửa sổ trình duyệt | Không | Header cố định, Nút back-to-top, Nổi lơ lửng trên màn hình bất chấp cuộn trang. |
| `sticky` | Có | Vị trí cuộn so với viewport và phần tử cha chứa nó | Có (cho đến khi đạt ngưỡng thì đứng lại) | Table header, sidebar menu dính khi cuộn trang, thanh điều hướng phụ. |

Câu hỏi thêm:
- Khi nào `absolute` tham chiếu `body`? Khi phần tử absolute không có bất kỳ thẻ cha nào bọc ngoài có thuộc tính `position` khác `static`, nghĩa là không có thẻ cha nào thiết lập `relative`, `absolute`, `fixed`, `sticky`.
- Khi nào tham chiếu parent? Khi thẻ cha đó được thiết lập thuộc tính `position` là `relative`, `absolute`, `fixed`, hoặc `sticky`. Thường dùng nhất là `relative`.
- Giải thích khái niệm "nearest positioned ancestor": "Ancestor" là phần tử cha, ông, cụ... bao bọc phần tử hiện tại. "Positioned" nghĩa là phần tử đó có thuộc tính `position` không phải `static` (mặc định). "Nearest positioned ancestor" là phần tử bọc ngoài gần nhất (tính từ phần tử hiện tại ngược lên trên cấu trúc cây DOM) thỏa mãn điều kiện "positioned" này.

### Câu A2 

**Trường hợp 1:** 4 items chia đều trên 1 hàng, mỗi item chiếm 25% chiều rộng.
```text
+---------+---------+---------+---------+
|  Item 1 |  Item 2 |  Item 3 |  Item 4 |
+---------+---------+---------+---------+
```

**Trường hợp 2:** 6 items sẽ chia thành 3 hàng, mỗi hàng 2 cột. (Vì mỗi item chiếm 45% width + 5% margin = 50%).
```text
+---------+ +---------+
|  Item 1 | |  Item 2 |
+---------+ +---------+
+---------+ +---------+
|  Item 3 | |  Item 4 |
+---------+ +---------+
+---------+ +---------+
|  Item 5 | |  Item 6 |
+---------+ +---------+
```

**Trường hợp 3:** 3 items nằm trên 1 hàng. Item 1 sát mép trái, Item 2 ở chính giữa, Item 3 sát mép phải. Căn giữa theo chiều dọc.
```text
+-------+                   +-------+                   +-------+
|   1   |                   |   2   |                   |   3   |
+-------+                   +-------+                   +-------+
```

**Trường hợp 4:** 3 cột trên 1 hàng. Cột bên trái 200px, cột bên phải 200px, cột giữa chiếm toàn bộ khoảng trống còn lại.
```text
+---------+ +-----------------------------------------+ +---------+
|  200px  | |                   1fr                   | |  200px  |
+---------+ +-----------------------------------------+ +---------+
```

**Trường hợp 5:** 7 items xếp thành lưới 3 cột đều nhau. Hàng 1 có 3 items, hàng 2 có 3 items. Hàng 3 có 1 item (Item 7 sẽ nằm ở cột đầu tiên của hàng 3).
```text
+---------+ +---------+ +---------+
|  Item 1 | |  Item 2 | |  Item 3 |
+---------+ +---------+ +---------+
+---------+ +---------+ +---------+
|  Item 4 | |  Item 5 | |  Item 6 |
+---------+ +---------+ +---------+
+---------+
|  Item 7 |
+---------+
```


### Câu C1 

1. **Navigation bar ngang (logo + menu + buttons):**
   - **Dùng:** Flexbox.
   - **Lý do:** Bố cục 1 chiều (ngang), dễ dàng điều chỉnh khoảng cách linh hoạt bằng `justify-content: space-between` và căn giữa dọc bằng `align-items: center`.
2. **Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước):**
   - **Dùng:** Grid.
   - **Lý do:** Bố cục 2 chiều (nhiều hàng, nhiều cột). Grid kiểm soát cực tốt lưới đều nhau bằng `grid-template-columns: repeat(3, 1fr)` và quản lý khoảng cách bằng `gap`.
3. **Layout blog: main content + sidebar:**
   - **Dùng:** Grid (hoặc kết hợp cả hai).
   - **Lý do:** Đây là bố cục macro (tổng thể của trang). Dùng Grid chia layout chính (`grid-template-columns: 1fr 300px`) rất gọn và trực quan.
4. **Footer với 4 cột thông tin (Về chúng tôi, Liên kết, Hỗ trợ, Liên hệ):**
   - **Dùng:** Grid (hoặc Flexbox).
   - **Lý do:** Grid hợp lý hơn khi muốn chia cột chính xác và đều đặn (`repeat(4, 1fr)`). Nếu dùng Flexbox thì cũng được bằng cách set `flex: 1` cho mỗi cột.
5. **Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy):**
   - **Dùng:** Flexbox.
   - **Lý do:** Bố cục 1 chiều dọc (`flex-direction: column`). Sử dụng tuyệt chiêu `margin-top: auto` cho nút dưới cùng là cách hoàn hảo để đẩy nút dính sát xuống đáy card.

### Câu C2

**Lỗi 1:** Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống
- **Nguyên nhân:** `.card-container` dùng flexbox nên các thẻ `.card` được stretch chiều cao bằng nhau, nhưng bản thân thẻ `.card` lại không dùng flexbox nên nội dung bên trong nó không lấp đầy chiều cao được. Nút "Mua" nằm ngay dưới text nên nếu text ngắn, nút sẽ lơ lửng.
- **Cách sửa:** Biến thẻ `.card` thành một flex container theo chiều dọc và dùng `margin-top: auto` đẩy nút xuống.
- **Code sửa:**
```css
.card-container { display: flex; flex-wrap: wrap; }
.card { 
    width: 30%; 
    margin: 1.5%; 
    display: flex; 
    flex-direction: column;
}
.card img { width: 100%; }
.card h3 { font-size: 18px; }
.card .btn { 
    padding: 10px; 
    margin-top: auto;
}
```

**Lỗi 2:** Muốn items nằm giữa cả ngang lẫn dọc trong container 100vh, nhưng item vẫn dính góc trái trên
- **Nguyên nhân:** Container `.hero` đã có `display: flex;` nhưng chưa dùng các thuộc tính căn chỉnh của Flexbox (`justify-content` cho chiều ngang và `align-items` cho chiều dọc).
- **Cách sửa:** Thêm `justify-content: center` và `align-items: center` vào `.hero`.
- **Code sửa:**
```css
.hero {
    height: 100vh;
    display: flex;
    justify-content: center; 
    align-items: center;     
.hero-content {
    text-align: center;
}
```

**Lỗi 3:** Sidebar bị co lại khi content quá dài
- **Nguyên nhân:** Mặc định của Flexbox là cho phép các thẻ con co lại khi không đủ không gian (`flex-shrink: 1`). Khi nội dung `.content` quá dài, nó sẽ ép `.sidebar` nhỏ lại dưới mức `250px`.
- **Cách sửa:** Chặn không cho thẻ `.sidebar` co lại bằng `flex-shrink: 0`.
- **Code sửa:**
```css
.layout { display: flex; }
.sidebar { 
    width: 250px; 
    flex-shrink: 0; /* Không cho phép co lại */
}
.content { flex: 1; }
```
