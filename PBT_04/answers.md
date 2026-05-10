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