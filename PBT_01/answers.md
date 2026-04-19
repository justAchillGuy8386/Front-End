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

### Câu A4:
1.  Sự khác nhau:
    - thead: table header, dùng để ghi tiêu đề các cột
    - tbody: table body, thân bảng chứa các dữ liệu chính
    - tfoot: table footer, thường dùng để ghi các hàng tổng cộng, tổng kết 
2. Không nên dùng table trong layout trang web bởi vì: 
    - Không mang tính semantic và ảnh hưởng đến SEO
    - Khó để thiết kế theo đúng như ý, tại các bảng khá cứng nhắc
    - Code không sạch và ảnh hưởng đến trải nghiệm người dùng

### Câu B3:
1. Sai khai báo DOCTYPE: `<!DOCTYPE>` thiếu chữ html (`<!DOCTYPE html`)

2. Thẻ title chưa đóng: `<title>Trang web` đang bị thiếu thẻ đóng ` </title> `

3. Sai giá trị charset: Thuộc tính `<meta charset="utf8">` thiếu dấu gạch ngang, sửa thành charset="UTF-8".

4. Thẻ `<h1>` đóng sai: `<h1>Welcome to ShopTLU<h1>`, sửa thành `</h1>` ở cuối

5. Thẻ `<a>` đóng sai: phần `<a href="home">Trang chủ<a>` thiếu dấu `/` ở thẻ đóng `</a>`.

6. Thẻ `<img>` thiếu ngoặc kép: `src=iphone.jpg` đặt trong dấu ngoặc kép `src="iphone.jpg" `

7. Thẻ `<img>` thiếu thuộc tính alt

8. Lỗi lồng thẻ: `<b>25.990.000đ</p></b>` sai thứ tự. Cần sửa thành `<b>25.990.000đ</b></p>`

9. Dùng nhiều thẻ `<main>`: Sửa `<main><p>Sidebar content</p></main>` đổi thành thẻ `<aside> `

10. Thẻ `<p>` ở footer chưa đóng: `<p>Copyright 2026 đang bị thiếu </p>`

11. Thiếu thẻ `</html>`: Dưới cùng của tài liệu chưa được chốt bằng thẻ đóng `</html>`