// PBT 07 — Kiểm chứng var / let / const (Câu A1)

console.log("=== Đoạn 1: var hoisting ===");
console.log(x); // undefined (hoisted, chưa gán)
var x = 5;
console.log("x sau gán:", x);

console.log("\n=== Đoạn 2: let TDZ ===");
try {
    console.log(y);
} catch (e) {
    console.log("Lỗi:", e.name, "-", e.message);
}
let y = 10;
console.log("y sau khai báo:", y);

console.log("\n=== Đoạn 3: const reassignment ===");
const z = 15;
try {
    z = 20;
} catch (e) {
    console.log("Lỗi:", e.name, "-", e.message);
}
console.log("z:", z);

console.log("\n=== Đoạn 4: const array mutation ===");
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);

console.log("\n=== Đoạn 5: block scope ===");
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);
}
console.log("Ngoài block:", a);
