function createCart() {
    // Private data
    let items = [];
    
    return {
        // Thêm sản phẩm (nếu đã có → tăng quantity)
        addItem(product, quantity = 1) {
            const existingItem = items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },
        
        // Xóa sản phẩm theo id
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },
        
        // Cập nhật số lượng
        updateQuantity(productId, newQuantity) {
            const item = items.find(i => i.id === productId);
            if (item) {
                item.quantity = newQuantity;
            }
        },
        
        // Tính tổng tiền
        getTotal() {
            return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },
        
        // Áp dụng mã giảm giá
        applyDiscount(code) {
            let total = this.getTotal();
            if (code === "SALE10") {
                return total * 0.9;
            } else if (code === "SALE20") {
                return total * 0.8;
            } else if (code === "FREESHIP") {
                return Math.max(0, total - 30000);
            }
            return total;
        },
        
        // In giỏ hàng dạng bảng
        printCart() {
            console.log("┌──────────────────────────────────────────────┐");
            console.log("│ # │ Sản phẩm      │ SL │ Đơn giá     │ Tổng        │");
            items.forEach((item, index) => {
                const total = item.price * item.quantity;
                const paddedName = item.name.padEnd(13).substring(0, 13);
                console.log(`│ ${index + 1} │ ${paddedName} │ ${(item.quantity).toString().padStart(2)} │ ${item.price.toLocaleString("vi-VN").padStart(11)} │ ${total.toLocaleString("vi-VN").padStart(11)} │`);
            });
            console.log("├──────────────────────────────────────────────┤");
            console.log(`│ Tổng cộng: ${this.getTotal().toLocaleString("vi-VN").padStart(28)}đ │`);
            console.log("└──────────────────────────────────────────────┘");
        },
        
        // Lấy tổng số sản phẩm (tổng quantity)
        getItemCount() {
            return items.reduce((sum, item) => sum + item.quantity, 0);
        },
        
        // Xóa toàn bộ giỏ
        clearCart() {
            items = [];
        }
    };
}

// === TEST ===
const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // Tăng lên 2

cart.printCart();

const discountedTotal = cart.applyDiscount("SALE10");
console.log(`\nTổng sau giảm (SALE10): ${discountedTotal.toLocaleString("vi-VN")}đ`);

console.log("Số SP:", cart.getItemCount()); // → 4
cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount()); // → 2
