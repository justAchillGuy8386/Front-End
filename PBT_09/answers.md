## Câu A1

1. **Sơ đồ cây (DOM Tree):**
```
div#app
├── header
│   ├── h1 (Todo App)
│   └── nav
│       ├── a.active (All)
│       ├── a (Active)
│       └── a (Completed)
└── main
    ├── form#todoForm
    │   ├── input#todoInput
    │   └── button (Add)
    └── ul#todoList
        ├── li.todo-item (Learn HTML)
        └── li.todo-item.completed (Learn CSS)
```

2. **Các lệnh querySelector:**
- Chọn thẻ `<h1>`: `document.querySelector('h1')`
- Chọn input trong form: `document.querySelector('#todoInput')`
- Chọn tất cả `.todo-item`: `document.querySelectorAll('.todo-item')`
- Chọn link đang active: `document.querySelector('a.active')` hoặc `document.querySelector('.active')`
- Chọn `<li>` đầu tiên trong `#todoList`: `document.querySelector('#todoList li:first-child')` hoặc `document.querySelector('#todoList li')`
- Chọn tất cả `<a>` bên trong `<nav>`: `document.querySelectorAll('nav a')`

## Câu A2

- **`textContent`**: Lấy hoặc đặt nội dung văn bản (text thuần túy) của một element và tất cả các node con của nó. Các thẻ HTML sẽ bị bỏ qua và không được render.
  *Ví dụ khi dùng:* Khi bạn muốn lấy đoạn chữ người dùng nhập vào, hoặc khi muốn hiển thị text một cách an toàn mà không sợ thẻ HTML lạ làm hỏng giao diện.
- **`innerHTML`**: Lấy hoặc đặt nội dung dưới dạng HTML string. Trình duyệt sẽ parse chuỗi này và biến nó thành các DOM nodes.
  *Ví dụ khi dùng:* Khi bạn xây dựng chuỗi HTML từ JS (ví dụ tạo template thẻ `<div>...</div>`) và muốn nhúng toàn bộ khối đó vào DOM.

**Câu hỏi bảo mật:**
`innerHTML` có nguy cơ gây lỗ hổng **XSS (Cross-Site Scripting)** vì nếu người dùng nhập vào mã HTML chứa mã độc (như thẻ `<script>` hoặc thẻ `<img>` có sự kiện `onerror` như ví dụ) thì trình duyệt sẽ thực thi mã đó. Kẻ xấu có thể đánh cắp cookie, session của người dùng khác.

*Cách sửa lỗi trong ví dụ:* Thay vì dùng `innerHTML`, hãy dùng `textContent` (hoặc `innerText`) để browser hiểu đó chỉ là văn bản thường:
```javascript
const userInput = document.querySelector("#search").value;
// Sửa thành:
document.querySelector("#result").textContent = userInput;
```

## Câu A3

- Khi click vào button (nếu **chưa bỏ comment** dòng `e.stopPropagation()`):
  Output sẽ là:
  ```
  BUTTON
  INNER
  OUTER
  ```
  *(Giải thích: Sự kiện "click" bắt đầu từ `#btn` (element sâu nhất) rồi nổi bọt (bubble) dần lên các phần tử cha là `#inner` và cuối cùng là `#outer`)*

- Nếu **uncomment `e.stopPropagation()`**:
  Output sẽ là:
  ```
  BUTTON
  ```
  *(Giải thích: Hàm `stopPropagation()` đã ngăn chặn sự lan truyền của event lên các phần tử cha. Do đó event không bao giờ nổi bọt tới `#inner` và `#outer`)*

## Câu C1

Code đã cho có rất nhiều lỗi. Đây là danh sách các lỗi và cách sửa (chọn 7 lỗi):

1. **Lỗi 1 (Sai tên event):** `document.querySelector("#decrementBtn").addEventListener("onclick", ...)`
   *Sửa:* Đổi `"onclick"` thành `"click"`.
2. **Lỗi 2 (Gán giá trị vào DOM node):** Trong `#resetBtn`, `countDisplay = count;` đang lấy phần tử DOM gắn bằng 1 số.
   *Sửa:* Đổi thành `countDisplay.textContent = count;`.
3. **Lỗi 3 (Clear HTML dùng null):** `historyList.innerHTML = null;` sẽ gán chuỗi `"null"` vào DOM thay vì xóa nó.
   *Sửa:* Đổi thành `historyList.innerHTML = "";`.
4. **Lỗi 4 (Thiếu gọi hàm):** Trong `#clearHistory`, `item.remove;` chỉ tham chiếu đến method chứ không thực thi.
   *Sửa:* Đổi thành `item.remove();`.
5. **Lỗi 5 (Lỗi ép kiểu lúc load):** Trong event load, `count = localStorage.getItem("count")` sẽ trả về string (hoặc null nếu chưa có). Khi cộng dồn `count++` hoặc trừ có thể gây nối chuỗi.
   *Sửa:* `count = Number(localStorage.getItem("count")) || 0;`.
6. **Lỗi 6 (Thiếu phục hồi DOM):** Lúc load trang không hề lấy lại `history` từ localStorage để nhét vào màn hình.
   *Sửa:* Cần thêm dòng `historyList.innerHTML = localStorage.getItem("history") || "";` vào `window.addEventListener("load", ...)`.
7. **Lỗi 7 (Mất event listener sau khi load từ localStorage):** Khi phục hồi `historyList.innerHTML` từ LocalStorage, các thẻ `<li>` cũ chỉ có dạng HTML text chứ không có event listener `click` để xóa. (Nên dùng Event Delegation).
   *Sửa:* Xóa event binding `li.addEventListener("click", ...)` lúc add; thay vào đó là bind event 1 lần vào cha là `historyList`:
   ```javascript
   historyList.addEventListener("click", function(e) {
       if(e.target.tagName === "LI") {
           e.target.remove();
       }
   });
   ```

## Câu C2

**1. Tại sao bind event lên 1000 elements là BAD PRACTICE?**
Việc gắn 1000 event listeners lên 1000 phần tử con đòi hỏi trình duyệt phải lưu trữ 1000 con trỏ hàm trong bộ nhớ (RAM), làm nặng quá trình render ban đầu, chiếm nhiều tài nguyên và có thể làm trang web bị giật lag (memory leak nếu không dọn dẹp kỹ).
**Event Delegation giải quyết thế nào:** Chúng ta chỉ cần đặt **một** event listener lên phần tử cha chung bao bọc 1000 phần tử đó. Nhờ cơ chế Event Bubbling, sự kiện click từ phần tử con sẽ nổi bọt lên phần tử cha. Tại cha, chúng ta kiểm tra `e.target` để biết chính xác phần tử con nào bị tác động và xử lý, giúp tiết kiệm bộ nhớ cực lớn.

**2. Refactor với DocumentFragment**
```javascript
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    fragment.appendChild(div);
}
document.body.appendChild(fragment); // ← Chỉ 1 lần reflow duy nhất ở đây!
```
**Giải thích tại sao nhanh hơn:** Khi append trực tiếp vào `document.body` 1000 lần, trình duyệt phải thực hiện 1000 lần tính toán lại layout (reflow) và vẽ lại màn hình (repaint), điều này cực kỳ nặng. `DocumentFragment` đóng vai trò là một container ảo không gắn vào DOM tree. Quá trình thêm phần tử vào nó không kích hoạt reflow. Đến khi ta nhúng toàn bộ Fragment vào body, toàn bộ các thẻ con sẽ được thêm vào DOM thật cùng lúc, chỉ gây ra **1 lần reflow duy nhất**.
