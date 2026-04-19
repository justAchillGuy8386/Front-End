## Phần A

### Câu A1:

1. Các bước theo thử tự:
- Request xuất phát từ máy tính cá nhân đi qua router Wifi
- Đi qua nhà mạng và sau đó đi qua cáp quang biển ở biển Đông
- Request đến trụ sở của Shopee ở Singapore
- Server xử lý request của người dùng và trả về dữ liệu theo chiều ngược lại
- Browser người dùng nhận HTML, CSS, JS và render ra giao diện

2. Tab network trong DevTools cho biết các thông tin: Mọi tài nguyên được tải xuống hoặc gửi đi, trạng thái của từng request, kich thước của file tải về, thời gian mất bao lâu để tải file,... 
![Request đầu và thời gian load trang](./anh1.png)
![Request đầu và thời gian load trang](./anh2.png)

### Câu A2:
Các lỗi semantic:
- Sử dụng div cho các vùng chức năng chính: Thay vì dùng header, main và footer, đoạn code dùng div
- Thiếu thẻ điều hướng nav, Google không hiểu được các đường dẫn quan trọng để lập index
- Không dùng các thẻ tiêu đề h1-h6
- Thiếu thuộc tính alt trong thẻ img, hình ảnh không có mô tả văn bản, khiến Google không xem được ảnh
- Đoạn mã sửa lỗi:
```html
<header>
    <div class="logo">ShopTLU</div>
    <nav>
        <ul>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/products">Sản phẩm</a></li>
        </ul>
    </nav>
</header>

<main>
    <article class="product">
        <h1>iPhone 16 Pro</h1>
        <p class="price">25.990.000đ</p>
        <figure>
            <img src="iphone.jpg" alt="Điện thoại iPhone 16 Pro phiên bản Titan tự nhiên">
        </figure>
    </article>
</main>

<footer>
    <p>© 2026 ShopTLU</p>
</footer>
```

### Câu A3:
Hộp 1
TextATextB
Hộp 2
TextCTextD (TextD im đậm)
Hộp 3