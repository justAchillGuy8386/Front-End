// Version 1: Classic FizzBuzz 1-100
console.log("=== Classic FizzBuzz (1-100) ===");
for (let i = 1; i <= 100; i++) {
    let out = "";
    if (i % 3 === 0) out += "Fizz";
    if (i % 5 === 0) out += "Buzz";
    console.log(i, out || i);
}
console.log("");

function customFizzBuzz(n, rules) {
    for (let i = 1; i <= n; i++) {
        let word = "";
        for (let j = 0; j < rules.length; j++) {
            if (i % rules[j].divisor === 0) {
                word += rules[j].word;
            }
        }
        console.log(i, word || i);
    }
}

console.log("=== Custom FizzBuzz (1-35) ===");
customFizzBuzz(35, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" },
]);

console.log("\n=== Kiểm tra các số đặc biệt ===");
function getFizzBuzzWord(num, rules) {
    let word = "";
    for (let j = 0; j < rules.length; j++) {
        if (num % rules[j].divisor === 0) word += rules[j].word;
    }
    return word || String(num);
}

const rules = [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" },
];
[21, 15, 35, 105].forEach((n) => console.log(`${n} = "${getFizzBuzzWord(n, rules)}"`));
