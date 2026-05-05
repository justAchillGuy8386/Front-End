## Câu A1
Các cách nhúng CSS vào HTML:
1. Inline CSS
- Cách này viết CSS trực tiếp bên trong thuộc tính style của thẻ HTML cần định dạng
- Ví dụ code:
`<h1 style="color: #2563eb; font-size: 32px;">Tiêu đề</h1> `
- Ưu điểm: Áp dụng style nhanh cho một phần tử cụ thể, độ ưu tiên cao nhất
- Nhược điểm: Không thể tái sử dụng cho các phần tử khác, làm file HTML trở nên lộn xộn và khó bảo trì về sau. Nó không thể được trình duyệt lưu vào bộ nhớ đệm nên trang sẽ tải lại toàn bộ CSS mỗi lần load
- Khi nào nên dùng: Chỉ nên dùng trong các trường hợp khẩn cấp hoặc khi cần override (ghi đè) style tạm thời

2. Internal CSS
- Cách này gom toàn bộ code CSS đặt vào bên trong cặp thẻ `<style>` nằm ở phần `<head>` của trang HTML
- Ví dụ code:
```
<head>
    <style>
        h1 { color: #2563eb; font-size: 32px; }
    </style>
</head>
```
- Ưu điểm: Tiện lợi khi chỉ làm việc trên một file duy nhất, mọi style đều nằm gọn trong một nơi dễ theo dõi.
- Nhược điểm: Giống như Inline, Internal CSS không thể được chia sẻ cho các trang khác. Trình duyệt không thể lưu file CSS riêng biệt nên nếu website có nhiều trang, người dùng sẽ phải tải lại cùng một đoạn code CSS nhiều lần.
- Khi nào nên dùng: Chấp nhận được khi thiết kế các bản nháp hoặc các dự án chỉ có một trang duy nhất

3. External CSS
- Cách này tách biệt hoàn toàn code CSS sang một file riêng (đuôi `.css`) và nhúng vào HTML thông qua thẻ `<link>`.

- Ví dụ code:
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
- Ưu điểm:
+ Tái sử dụng: Hàng chục trang HTML có thể dùng chung một file CSS. Khi cần sửa, bạn chỉ cần sửa ở một nơi là toàn bộ website thay đổi
+ Caching & Hiệu suất: Trình duyệt sẽ cache file CSS sau lần tải đầu tiên, giúp các trang thứ 2, thứ 3 load cực nhanh Có thể dùng kỹ thuật minified (nén file) để file nhỏ hơn và tải nhanh hơn
+ Bảo trì: Tách biệt cấu trúc (HTML) và trình bày (CSS), giúp các team làm việc song song dễ dàng
- Nhược điểm: Mất thêm một request HTTP ban đầu để tải file CSS (nhưng lợi ích từ caching bù đắp lại hoàn toàn).
- Khi nào nên dùng: Đây là tiêu chuẩn bắt buộc cho môi trường product thực tế, nên dùng cho mọi dự án thật

#### Câu hỏi thêm: Cách nào "thắng"?

Nếu cùng một element có cả 3 cách CSS đồng thời áp dụng để thay đổi cùng một thuộc tính (ví dụ đều đổi màu `color`), Inline CSS sẽ là người chiến thắng. 

**Giải thích:**
Trong cơ chế hoạt động của CSS, Inline CSS có độ ưu tiên cao nhất so với Internal và External CSS. Trình duyệt sẽ luôn ưu tiên áp dụng các style được định nghĩa trực tiếp ngay trên chính thẻ HTML đó. 