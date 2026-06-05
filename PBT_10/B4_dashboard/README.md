# Multi-API Dashboard

Trang Dashboard tổng hợp dữ liệu từ 3 API khác nhau thông qua việc gọi song song.

## API đã dùng
- **Random User API**: Lấy dữ liệu người dùng ngẫu nhiên.
- **Open-Meteo API**: Lấy thông tin thời tiết hiện tại của London.
- **Dog API**: Lấy ảnh chó ngẫu nhiên.

## Tính năng
- Sử dụng `Promise.allSettled()` để gọi đồng thời 3 API. Lợi ích của hàm này là dù 1 API bị lỗi (do mất mạng, sai endpoint, v.v.), các API khác vẫn hoàn thành và widget của chúng vẫn hiển thị dữ liệu thành công.
- Widget bị lỗi sẽ hiển thị trạng thái Error màu đỏ độc lập.
- Hiển thị Global Loading khi đang gọi mạng.
- Nút "Refresh All" để gọi lại toàn bộ API.
- Đo và hiển thị tổng thời gian tải dữ liệu (in `ms`).

## Cách chạy
Mở file `index.html` trong trình duyệt. Ấn nút "Refresh All" để thử gọi lại các API.
