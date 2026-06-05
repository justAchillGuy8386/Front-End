# User Directory (CRUD)

Ứng dụng quản lý danh sách người dùng với các thao tác Create, Read, Update, Delete.

## API đã dùng
- JSONPlaceholder (https://jsonplaceholder.typicode.com/users)

## Tính năng
- Hiển thị danh sách user (Read)
- Tìm kiếm realtime bằng JS filter
- Thêm mới user (Create)
- Cập nhật user (Update)
- Xóa user (Delete) kèm confirm dialog
- Skeleton loader khi lấy dữ liệu
- Toast notification khi thành công/thất bại

*Lưu ý: API JSONPlaceholder là Fake API, khi gọi POST/PUT/DELETE nó sẽ trả về kết quả thành công nhưng dữ liệu thật trên server không thay đổi. Ứng dụng này đã xử lý cập nhật state ở Frontend (Client-side) để phản ánh đúng thao tác.*

## Cách chạy
Mở file `index.html` trong trình duyệt.
