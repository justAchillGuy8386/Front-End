# Infinite Scroll Gallery

Thư viện ảnh với tính năng tải vô hạn khi cuộn trang (Infinite Scroll) và tải ảnh lười (Lazy Loading).

## API đã dùng
- Lorem Picsum (https://picsum.photos/)
- Endpoint: `https://picsum.photos/v2/list?page=1&limit=20`

## Tính năng
- Hiển thị 20 ảnh đầu tiên khi mở trang.
- Cuộn xuống đáy để tải thêm 20 ảnh tiếp theo (dùng `IntersectionObserver`).
- Hình ảnh chỉ được tải về khi xuất hiện trong màn hình (Lazy Loading bằng `IntersectionObserver`).
- Click vào hình ảnh để xem kích thước lớn (Lightbox Modal).
- Giao diện đáp ứng (Responsive Grid): 4 cột PC, 2 cột Tablet, 1 cột Mobile.

## Cách chạy
Mở file `index.html` trong trình duyệt. Cuộn chuột xuống dưới cùng để thấy tính năng tải thêm tự động.
