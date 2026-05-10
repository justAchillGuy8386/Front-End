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
