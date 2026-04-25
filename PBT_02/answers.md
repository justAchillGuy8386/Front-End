## Câu A1:
1. type="email" → Ô nhập text (trên mobile tự gọi bàn phím có phím @), tự động kiểm tra xem chuỗi có chứa ký tự '@' và cấu trúc tên miền hợp lệ hay không → Dùng cho form đăng ký tài khoản hoặc đăng ký nhận email khuyến mãi

2. type="password" → Ô nhập che giấu ký tự (hiển thị thành dấu *) → Dùng cho trường nhập mật khẩu khi khách hàng đăng nhập/tạo tài khoản.

3. type="number" → Ô nhập số kèm hai nút mũi tên nhỏ lên/xuống ở góc phải, tự động chặn nhập chữ cái và kiểm tra xem số có nằm trong giới hạn min / max hay không → Dùng để khách hàng tăng/giảm số lượng sản phẩm trong Giỏ hàng

4. type="tel" → Ô nhập text bình thường nhưng tự động kích hoạt bàn phím quay số trên mobile, không có validation tự động do định dạng số điện thoại mỗi quốc gia khác nhau → Dùng để nhập số điện thoại người nhận hàng ở bước Thanh toán

5. type="search" → Tương tự ô nhập text nhưng thường hiển thị thêm một dấu "x" nhỏ ở cuối để người dùng bấm vào xóa nhanh toàn bộ từ khóa, không có validation đặc biệt → Dùng cho thanh tìm kiếm sản phẩm nằm ở header của website

6. type="date" → Ô nhập hiển thị sẵn định dạng ngày tháng năm kèm theo một biểu tượng lịch để mở khung chọn ngày, tự động chặn nhập chữ và giới hạn ngày chọn nếu có min / max → Dùng để khách hàng chọn ngày sinh nhật hoặc chọn ngày mong muốn nhận hàng

7. type="url" → Ô nhập text, trên mobile hiển thị bàn phím có phím .com và /, tự động kiểm tra chuỗi có bắt đầu bằng giao thức chuẩn như http:// hoặc https:// hay không → Dùng để người dùng nhập đường link Facebook cá nhân hoặc website riêng khi đăng ký làm affiliate 

8. type="color" → Một ô vuông nhỏ hiển thị màu sắc, khi click vào sẽ mở ra bảng màu của hệ thống, luôn đảm bảo giá trị trả về là mã màu HEX chuẩn (như #ff0000) → Dùng để khách hàng tự do chọn màu sắc khi đặt hàng sản phẩm thiết kế theo yêu cầu

9. type="range" → Một thanh trượt ngang có một nút tròn để kéo qua lại, không cần validation báo lỗi vì người dùng chỉ có thể kéo trong một khoảng giá trị min và max đã định sẵn → Dùng cho bộ lọc bên thanh sidebar để khách hàng kéo chọn khoảng giá sản phẩm muốn tìm 

10. type="file" → Nút bấm "Choose File" kèm theo dòng text hiển thị tên tệp tin đã chọn, tự động chặn người dùng chọn sai loại tệp nếu được thiết lập thuộc tính accept → Dùng để khách hàng tải lên hình ảnh hoặc video minh họa tình trạng sản phẩm bị lỗi khi gửi yêu cầu đổi hàng hoặc bảo hành

## Câu A2:
1. Trường hợp 1: `<input type="text" required value="">`

Dự đoán: Trình duyệt sẽ chặn không cho gửi form và hiển thị thông báo lỗi yêu cầu nhập dữ liệu.

Giải thích: Thuộc tính required bắt buộc trường này không được để trống. Vì value="", điều kiện này bị vi phạm.

2. Trường hợp 2: `<input type="email" value="abc">`

Dự đoán: Form bị chặn lại. Trình duyệt báo lỗi định dạng email không hợp lệ 

Giải thích: type="email" có bộ kiểm tra (regex) ngầm định của trình duyệt, yêu cầu chuỗi nhập vào tối thiểu phải có ký tự @ và cấu trúc tên miền cơ bản. "abc" không thỏa mãn.

3. Trường hợp 3: `<input type="number" min="1" max="10" value="15">`

Dự đoán: Form bị chặn. Trình duyệt báo lỗi giá trị vượt quá giới hạn cho phép 

Giải thích: Thuộc tính max="10" thiết lập giới hạn trên là 10. Giá trị người dùng nhập là 15, lớn hơn giới hạn này.

4. Trường hợp 4: `<input type="text" pattern="[0-9]{10}" value="abc123">`

Dự đoán: Form bị chặn. Trình duyệt báo lỗi định dạng không khớp 

Giải thích: Thuộc tính pattern sử dụng Regular Expression [0-9]{10}, đòi hỏi người dùng phải nhập chính xác 10 chữ số từ 0 đến 9. Chuỗi "abc123" chứa chữ cái và chỉ dài 6 ký tự nên hoàn toàn sai lệch.

5. Trường hợp 5: `<input type="password" minlength="8" value="123">`

Dự đoán: Form bị chặn. Trình duyệt báo lỗi độ dài quá ngắn 

Giải thích: Thuộc tính minlength="8" yêu cầu chuỗi nhập vào phải có ít nhất 8 ký tự. Chuỗi "123" chỉ có 3 ký tự nên không vượt qua được bài kiểm tra.

- So sánh với dự đoán: Khi bấm Submit, trình duyệt sẽ kiểm tra mã HTML từ trên xuống dưới. Nó sẽ dừng lại ngay ở lỗi đầu tiên nó gặp phải, tự động focus vào ô đó và hiện popup thông báo lỗi. Ta sẽ phải sửa xong lỗi thứ 1, bấm Submit tiếp, thì nó mới hiện lỗi ở ô thứ 2. Nó không hiện 5 lỗi cùng một lúc.

## Câu A3:
1. Thuộc tính `for` trong thẻ `<label>` phải thuộc tính id của thẻ `<input>`. Với người dùng Screen Reader: Khi họ điều hướng vào một ô `<input>`, trình đọc màn hình sẽ tìm thẻ `<label>` được liên kết với nó và đọc to lên. Nếu không có liên kết này, trình đọc màn hình sẽ chỉ thông báo "edit text", khiến người khiếm thị hoàn toàn không biết họ cần phải nhập thông tin gì vào ô đó

2. Thẻ `<fieldset>` kết hợp với `<legend>` được dùng để nhóm các trường nhập liệu có liên quan chặt chẽ với nhau về mặt ngữ nghĩa hoặc chức năng thành một khối thống nhất. Ví dụ cụ thể:

```
<fieldset>
    <legend>Phương thức nhận thông báo</legend>
    <label>
        <input type="checkbox" name="notify" value="email" checked>
        Qua Email
    </label>
    <label>
        <input type="checkbox" name="notify" value="sms">
        Qua SMS
    </label>
</fieldset>
```

3. Dùng `aria-label` khi thuộc tính này được sử dụng khi một phần tử tương tác không có văn bản mô tả hiển thị trực tiếp trên giao diện màn hình để người dùng đọc
- Tại sao không nên dùng aria-label khi đã có `<label>`: Mục đích chính của cả hai là cung cấp tên gọi mô tả cho phần tử. Nếu một ô `<input>` đã được gắn đúng chuẩn với một thẻ `<label>` hiển thị rõ ràng trên màn hình, việc thêm aria-label có chứa nội dung tương tự vào ô `<input>` là thừa. Nó sẽ khiến trình đọc màn hình bị nhầm lẫn, dẫn đến việc đọc lặp đi lặp lại cùng một thông tin, gây khó chịu và giảm trải nghiệm của người dùng