// 1. pipe() — Nối chuỗi functions
function pipe(...fns) {
    return function(initialValue) {
        return fns.reduce((value, fn) => fn(value), initialValue);
    };
}

const process = pipe(
    x => x * 2,        // 5 → 10
    x => x + 10,       // 10 → 20
    x => x.toString(), // 20 → "20"
    x => "Kết quả: " + x
);
console.log("pipe test:", process(5)); // → "Kết quả: 20"


// 2. memoize() — Cache kết quả
function memoize(fn) {
    const cache = {};
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache[key] !== undefined) {
            return cache[key];
        }
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});
console.log("memoize test 1:", expensiveCalc(1000000)); // → "Đang tính..." → 499999500000
console.log("memoize test 2:", expensiveCalc(1000000)); // → (không in "Đang tính...", lấy cache!)


// 3. debounce() — Chờ user ngừng gõ mới thực hiện
function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);

search("a");
search("ap");
search("app");
search("appl");
search("apple"); // Chỉ cái cuối cùng này được chạy sau 500ms


// 4. retry() — Thử lại nếu lỗi
async function retry(fn, maxAttempts = 3) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            if (attempt === maxAttempts) {
                throw error;
            }
            console.log(`Attempt ${attempt} failed. Retrying...`);
        }
    }
}

// Test retry:
let attempts = 0;
const unstableFunc = async () => {
    attempts++;
    if (attempts < 3) {
        throw new Error("Temporary error");
    }
    return "Success at attempt " + attempts;
};

retry(unstableFunc).then(res => console.log("retry test:", res)).catch(console.error);
