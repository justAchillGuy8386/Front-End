# Phần A 

## Câu A1: S

**Thứ tự output:**
```
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms2q
7 - Nested timeout
5 - Timeout 100ms
```

**Giải thích:**
- JavaScript thực thi mã đồng bộ (Synchronous) trước: in ra `1 - Start` và `4 - End`.
- Các callback của `Promise.then` được đưa vào **Microtask Queue**.
- Các callback của `setTimeout` được đưa vào **Macrotask Queue** (hoặc Task Queue).
- Sau khi Call Stack (ngăn xếp thực thi) rỗng, Event Loop sẽ ưu tiên xử lý toàn bộ các task trong **Microtask Queue** trước. Nên nó sẽ in `3 - Promise` và `6 - Promise 2`. Trong hàm của `Promise 2`, nó gặp `setTimeout` và đẩy tiếp nó vào **Macrotask Queue**.
- Sau khi Microtask Queue rỗng, Event Loop mới lấy 1 task từ **Macrotask Queue** ra chạy. Callback đầu tiên vào hàng đợi là `2 - Timeout 0ms` (in ra `2 - Timeout 0ms`), sau đó đến `7 - Nested timeout` (in ra `7 - Nested timeout`). Cuối cùng, sau 100ms thì `5 - Timeout 100ms` mới được chạy.

## Câu A2

1. `await fetch(...)` — Hàm `fetch` trả về một `Promise` mang đối tượng `Response`. Cần dùng `await` vì việc gọi mạng cần thời gian, `await` giúp tạm dừng hàm `getData()` cho đến khi nhận được response từ server mà không làm block luồng chính (Main thread).
2. `response.ok` — Sẽ trả về `false` khi HTTP status code **không** nằm trong khoảng `200-299`. Ví dụ: `404` (Not Found), `500` (Internal Server Error), `403` (Forbidden).
3. `response.json()` — Hàm này đọc nội dung (body) của response stream và parse thành JSON. Quá trình đọc stream cũng là bất đồng bộ và tốn thời gian nên hàm này trả về một `Promise`. Do đó, ta cần `await` lần nữa để chờ parse xong.
4. `try...catch` ở đây bắt được các lỗi:
   - Lỗi mạng (Network error) như mất kết nối, server chết cứng (CORS block), lúc này fetch ném exception.
   - Lỗi ném ra thủ công do logic (dòng `throw new Error(...)` khi `!response.ok`).
   - Lỗi Parse JSON (SyntaxError) nếu API trả về một chuỗi không hợp lệ thay vì JSON (VD: trang HTML 404).

## Câu A3

**Sơ đồ trạng thái:**
- `Pending` (Đang chờ) → `Fulfilled` (Thành công, khi gọi resolve)
- `Pending` (Đang chờ) → `Rejected` (Thất bại, khi gọi reject hoặc gặp lỗi)

**Callback Hell là gì?**
Là hiện tượng khi các callback được lồng vào nhau quá sâu (nested) khi xử lý các chuỗi thao tác bất đồng bộ liên tiếp. Code có hình chữ V (Pyramid of Doom), làm code rất khó đọc, khó bảo trì và khó kiểm soát luồng lỗi.

**Ví dụ 4 cấp callback hell:**
```javascript
getUser(1, (user) => {
    getPosts(user.id, (posts) => {
        getComments(posts[0].id, (comments) => {
            getAuthorInfo(comments[0].authorId, (info) => {
                console.log(info);
            });
        });
    });
});
```

**Refactor bằng async/await:**
```javascript
async function getInfo() {
    try {
        const user = await getUser(1);
        const posts = await getPosts(user.id);
        const comments = await getComments(posts[0].id);
        const info = await getAuthorInfo(comments[0].authorId);
        console.log(info);
    } catch (error) {
        console.error(error);
    }
}
```

# Phần C 

## Câu C1

**1. Network errors (mất mạng giữa chừng)**
- **Xử lý:** Fetch API sẽ ném ra lỗi (TypeError) thay vì trả về Response. Ta hứng trong khối `catch` và kiểm tra lỗi. Có thể kết hợp thuộc tính `navigator.onLine` để báo chính xác cho user.
```javascript
catch(err) {
    if (!navigator.onLine) alert("Mất mạng, vui lòng kiểm tra kết nối!");
}
```

**2. API errors (Server trả 500, 404, 429)**
- **Xử lý:** Fetch vẫn `resolve` thành công vì nhận được tín hiệu trả về. Phải tự check `response.ok` và dựa vào status để xử lý từng loại.
```javascript
if (!response.ok) {
    if (response.status === 404) throw new Error("Không tìm thấy sản phẩm");
    if (response.status === 429) throw new Error("Gửi quá nhiều yêu cầu, vui lòng đợi");
    if (response.status >= 500) throw new Error("Hệ thống đang bảo trì");
}
```

**3. Timeout (API chậm > 10 giây)**
- Dùng `AbortController` để hủy request nếu sau thời gian ms chưa có response.
```javascript
async function fetchWithTimeout(url, ms) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), ms);
    try {
        const res = await fetch(url, { signal: controller.signal });
        return await res.json();
    } catch (err) {
        if (err.name === 'AbortError') throw new Error("Request Timeout!");
        throw err;
    } finally {
        clearTimeout(timeoutId);
    }
}
```

**4. Retry logic (thử lại 3 lần nếu lỗi network)**
- Tạo một vòng lặp, nếu fetch thất bại thì đợi 1 chút rồi chạy lại. Nếu thất bại tới lần thứ 3 thì mới throw lỗi thật sự ra ngoài.
```javascript
async function fetchWithRetry(url, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
            return await response.json();
        } catch (error) {
            if (i === maxRetries - 1) throw error; // Lần cuối thì quăng lỗi
            console.log(`Lỗi, đang thử lại lần ${i+1}...`);
            await new Promise(res => setTimeout(res, 1000)); // Nghỉ 1s
        }
    }
}
```

## Câu C2: Promise.all vs Promise.allSettled vs Promise.race

| Method | Khi nào resolve? | Khi nào reject? | Use case |
|--------|------------------|-----------------|----------|
| `.all()` | Khi TẤT CẢ các promise thành công | Khi CÓ ÍT NHẤT 1 promise thất bại (fail-fast) | Cần fetch song song dữ liệu từ nhiều nguồn, các nguồn này gắn chặt với nhau (cái này tạch thì bỏ hết). |
| `.allSettled()` | Khi TẤT CẢ promise hoàn tất (dù thành công hay thất bại) | Không bao giờ reject (luôn trả về array chứa object mô tả kết quả) | Tải nhiều widget trên Dashboard, widget nào lỗi thì hiện báo lỗi riêng, widget khác vẫn chạy bình thường. |
| `.race()` | Promise ĐẦU TIÊN hoàn tất với trạng thái thành công. | Promise ĐẦU TIÊN hoàn tất với trạng thái thất bại. | Chức năng timeout (cho 1 API đua với 1 Promise setTimeout). |
| `.any()` | Promise ĐẦU TIÊN thành công | Khi TẤT CẢ các promise đều thất bại | Gọi API dự phòng (lấy ảnh từ 3 máy chủ CDN khác nhau, cái nào tải xong nhanh nhất và thành công thì lấy ảnh đó). |

**Ví dụ code:**

1. **Promise.all** (Bắt buộc phải có cả thông tin người dùng và giỏ hàng mới render app)
```javascript
const [user, cart] = await Promise.all([fetch('/user'), fetch('/cart')]);
```

2. **Promise.allSettled** (Render widget bảng điều khiển độc lập)
```javascript
const results = await Promise.allSettled([fetch('/weather'), fetch('/news')]);
results.forEach(res => {
    if (res.status === 'fulfilled') renderWidget(res.value);
    else renderError(res.reason);
});
```

3. **Promise.race** (Fetch API có Timeout timeout)
```javascript
const data = await Promise.race([
    fetch('/api/data'),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
]);
```

4. **Promise.any** (Lấy ảnh từ server nào phản hồi nhanh nhất)
```javascript
const image = await Promise.any([
    fetch('cdn1.domain.com/img.jpg'),
    fetch('cdn2.domain.com/img.jpg')
]);
```
