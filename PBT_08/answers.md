# Phần A - Trả lời câu hỏi

## Câu A1:

```javascript
// 1. Function Declaration
function tinhThueBaoHiem(luong) {
    const thue = luong > 11000000 ? 0.1 : 0;
    return { thuong: luong * thue, thuc_nhan: luong * (1 - thue) };
}

// 2. Function Expression
const tinhThueBaoHiemExpr = function(luong) {
    const thue = luong > 11000000 ? 0.1 : 0;
    return { thuong: luong * thue, thuc_nhan: luong * (1 - thue) };
};

// 3. Arrow Function
const tinhThueBaoHiemArrow = (luong) => {
    const thue = luong > 11000000 ? 0.1 : 0;
    return { thuong: luong * thue, thuc_nhan: luong * (1 - thue) };
};
```

**Sự khác nhau về hoisting:**
- **Function Declaration** được "hoisted" lên đầu scope của nó. Có thể gọi hàm trước khi khai báo.
- **Function Expression** và **Arrow Function** không được hoisted giống như Declaration (đặc biệt khi dùng `let` hoặc `const` thì biến nằm trong Temporal Dead Zone). Lỗi `ReferenceError` nếu gọi trước khi khai báo.

Ví dụ:
```javascript
console.log(tinhThueBaoHiem(15000000)); // Hoạt động tốt
console.log(tinhThueBaoHiemExpr(15000000)); // ReferenceError
console.log(tinhThueBaoHiemArrow(15000000)); // ReferenceError
```

## Câu A2: 

**Dự đoán Output Đoạn 1:**
```javascript
1
2
3
2
2
```

**Dự đoán Output Đoạn 2 (sau 200ms):**
```javascript
var: 3
var: 3
var: 3
let: 0
let: 1
let: 2
```

**Giải thích:**
- **`var` trong vòng lặp đầu:** `var` có function scope (hoặc global scope ở đây). Biến `i` là duy nhất và dùng chung cho tất cả các lần lặp. Sau 100ms khi các callback chạy, vòng lặp đã kết thúc và `i` đã có giá trị là `3`. Do đó tất cả đều in ra `3`.
- **`let` trong vòng lặp thứ hai:** `let` có block scope. Ở mỗi lần lặp, một biến `j` mới được tạo ra riêng biệt cho block đó. Các closure bên trong `setTimeout` sẽ "nhớ" được biến `j` riêng biệt của vòng lặp tương ứng. Vì vậy nó in ra `0`, `1`, `2`.

## Câu A3

```javascript
// 1. Lấy các số chẵn                    → [2, 4, 6, 8, 10]
nums.filter(n => n % 2 === 0);

// 2. Nhân mỗi số với 3                  → [3, 6, 9, ..., 30]
nums.map(n => n * 3);

// 3. Tính tổng tất cả                   → 55
nums.reduce((sum, n) => sum + n, 0);

// 4. Tìm số đầu tiên > 7               → 8
nums.find(n => n > 7);

// 5. Kiểm tra CÓ số > 10 không         → false
nums.some(n => n > 10);

// 6. Kiểm tra TẤT CẢ đều > 0           → true
nums.every(n => n > 0);

// 7. Tạo mảng "Số X là [chẵn/lẻ]"      → ["Số 1 là lẻ", "Số 2 là chẵn", ...]
nums.map(n => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);

// 8. Đảo ngược mảng (không mutate gốc)  → [10, 9, ..., 1]
[...nums].reverse(); // Hoặc nums.toReversed() nếu ES2023+
```

## Câu A4

**Destructuring:**
- `console.log(name, price, ram, color);` // In ra: `"iPhone 16" 25990000 8 "Titan"`
- `console.log(specs);` // In ra: Lỗi `ReferenceError: specs is not defined`. Do `specs: { ram, color }` đã được destructure sâu, nó không tạo ra biến tên `specs`.

**Spread:**
- `console.log(updated.price);` // In ra: `23990000`
- `console.log(updated.sale);` // In ra: `true`
- `console.log(product.price);` // In ra: `25990000` (Giá trị gốc không bị đổi do spread tạo ra một object mới ở lớp ngoài cùng)

**Spread Gotcha:**
- `console.log(product.specs.ram);` // In ra: `16`.
- **Tại sao?** Spread operator (`...`) chỉ thực hiện **shallow copy** (sao chép nông). Thuộc tính `specs` là một object (kiểu tham chiếu), nên object `copy` chỉ sao chép tham chiếu của `specs` từ object `product`. Do đó, `copy.specs` và `product.specs` trỏ về cùng một object trong bộ nhớ. Thay đổi `copy.specs.ram` sẽ làm thay đổi cả `product.specs.ram`.


## Câu C1

```javascript
const processOrders = (orders) => orders
    .filter(o => o.status === "completed" && o.total > 100000)
    .map(({ id, customer, total }) => ({
        id, customer, total,
        discount: total * 0.1,
        finalTotal: total * 0.9
    }))
    .sort((a, b) => b.finalTotal - a.finalTotal);
```

## Câu C2

```javascript
const miniArray = {
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },
    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    },
    reduce(arr, fn, initialValue) {
        let acc = initialValue !== undefined ? initialValue : arr[0];
        let startIndex = initialValue !== undefined ? 0 : 1;
        for (let i = startIndex; i < arr.length; i++) {
            acc = fn(acc, arr[i], i, arr);
        }
        return acc;
    }
};

// Test
console.log(miniArray.map([1,2,3], x => x * 2));        // → [2,4,6]
console.log(miniArray.filter([1,2,3,4], x => x > 2));    // → [3,4]
console.log(miniArray.reduce([1,2,3,4], (a,b) => a+b, 0)); // → 10
```
