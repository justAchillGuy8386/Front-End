function formatMoney(amount) {
    return Math.round(amount).toLocaleString("vi-VN") + "đ";
}

function padLine(left, right, width = 38) {
    const leftStr = String(left);
    const rightStr = String(right);
    const spaces = Math.max(1, width - leftStr.length - rightStr.length);
    return "║ " + leftStr + " ".repeat(spaces) + rightStr + " ";
}

function calculateBill(items, options = {}) {
    const {
        isWednesday = false,
        includeTip = true,
        tipPercent = 5,
        vatPercent = 8,
    } = options;

    let subtotal = 0;
    const lines = [];

    for (let i = 0; i < items.length; i++) {
        const { name, price, quantity } = items[i];
        const lineTotal = price * quantity;
        subtotal += lineTotal;
        lines.push({
            index: i + 1,
            name,
            quantity,
            price,
            lineTotal,
        });
    }

    let discountPercent = 0;
    if (subtotal > 1_000_000) {
        discountPercent = 15;
    } else if (subtotal > 500_000) {
        discountPercent = 10;
    }

    if (isWednesday) {
        discountPercent += 5;
    }

    const discountAmount = subtotal * (discountPercent / 100);
    const afterDiscount = subtotal - discountAmount;
    const vatAmount = afterDiscount * (vatPercent / 100);
    const tipAmount = includeTip ? afterDiscount * (tipPercent / 100) : 0;
    const total = afterDiscount + vatAmount + tipAmount;

    console.log("╔══════════════════════════════════════╗");
    console.log("║        HÓA ĐƠN NHÀ HÀNG              ║");
    console.log("╠══════════════════════════════════════╣");

    for (let i = 0; i < lines.length; i++) {
        const L = lines[i];
        const itemDesc = `${L.index}. ${L.name.padEnd(10)} x${L.quantity}`;
        const pricePart = `@${(L.price / 1000).toFixed(0)}k`;
        const totalPart = `= ${formatMoney(L.lineTotal)}`;
        console.log(padLine(itemDesc + "    " + pricePart, totalPart));
    }

    console.log("╠══════════════════════════════════════╣");
    console.log(padLine("Tổng cộng:", formatMoney(subtotal)));
    console.log(padLine(`Giảm giá (${discountPercent}%):`, formatMoney(discountAmount)));
    console.log(padLine(`VAT (${vatPercent}%):`, formatMoney(vatAmount)));
    if (includeTip) {
        console.log(padLine(`Tip (${tipPercent}%):`, formatMoney(tipAmount)));
    }
    console.log("╠══════════════════════════════════════╣");
    console.log(padLine("THANH TOÁN:", formatMoney(total)));
    console.log("╚══════════════════════════════════════╝");

    return { subtotal, discountAmount, vatAmount, tipAmount, total };
}

// Ví dụ theo đề (tổng 200k, không giảm)
const sampleItems = [
    { name: "Phở bò", price: 65000, quantity: 2 },
    { name: "Trà đá", price: 5000, quantity: 3 },
    { name: "Bún chả", price: 55000, quantity: 1 },
];

calculateBill(sampleItems, { isWednesday: false, includeTip: true });

console.log("\n--- Demo: Đơn > 500k + Thứ Tư ---");
calculateBill(
    [
        { name: "Bò wagyu", price: 350000, quantity: 2 },
        { name: "Rượu vang", price: 450000, quantity: 1 },
    ],
    { isWednesday: true }
);
