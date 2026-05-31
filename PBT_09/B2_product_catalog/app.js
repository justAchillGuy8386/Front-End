const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", image: "https://placehold.co/200", rating: 4.5, inStock: true },
    { id: 2, name: "Samsung Galaxy S24", price: 22990000, category: "phone", image: "https://placehold.co/200", rating: 4.8, inStock: true },
    { id: 3, name: "Google Pixel 9", price: 20990000, category: "phone", image: "https://placehold.co/200", rating: 4.2, inStock: false },
    { id: 4, name: "MacBook Pro M3", price: 39990000, category: "laptop", image: "https://placehold.co/200", rating: 4.9, inStock: true },
    { id: 5, name: "Dell XPS 15", price: 34990000, category: "laptop", image: "https://placehold.co/200", rating: 4.6, inStock: true },
    { id: 6, name: "Asus ROG Zephyrus", price: 42990000, category: "laptop", image: "https://placehold.co/200", rating: 4.7, inStock: false },
    { id: 7, name: "iPad Pro M4", price: 28990000, category: "tablet", image: "https://placehold.co/200", rating: 4.8, inStock: true },
    { id: 8, name: "Samsung Galaxy Tab S9", price: 19990000, category: "tablet", image: "https://placehold.co/200", rating: 4.5, inStock: true },
    { id: 9, name: "Xiaomi Pad 6", price: 8990000, category: "tablet", image: "https://placehold.co/200", rating: 4.3, inStock: true },
    { id: 10, name: "AirPods Pro 2", price: 6590000, category: "accessory", image: "https://placehold.co/200", rating: 4.7, inStock: true },
    { id: 11, name: "Sony WH-1000XM5", price: 8990000, category: "accessory", image: "https://placehold.co/200", rating: 4.8, inStock: true },
    { id: 12, name: "Logitech MX Master 3S", price: 2490000, category: "accessory", image: "https://placehold.co/200", rating: 4.9, inStock: true }
];

let cartItemCount = 0;
let currentCategory = 'all';
let currentSearch = '';
let currentSort = 'default';

const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilters = document.getElementById('categoryFilters');
const sortSelect = document.getElementById('sortSelect');
const cartCount = document.getElementById('cartCount');
const themeToggle = document.getElementById('themeToggle');
const productModal = document.getElementById('productModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalBody = document.getElementById('modalBody');

function renderProducts() {
    productGrid.innerHTML = '';

    let filtered = products.filter(p => {
        const matchCategory = currentCategory === 'all' || p.category === currentCategory;
        const matchSearch = p.name.toLowerCase().includes(currentSearch.toLowerCase());
        return matchCategory && matchSearch;
    });

    if (currentSort === 'priceAsc') filtered.sort((a, b) => a.price - b.price);
    else if (currentSort === 'priceDesc') filtered.sort((a, b) => b.price - a.price);
    else if (currentSort === 'nameAsc') filtered.sort((a, b) => a.name.localeCompare(b.name));
    else if (currentSort === 'ratingDesc') filtered.sort((a, b) => b.rating - a.rating);

    filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        const img = document.createElement('img');
        img.src = p.image;
        img.alt = p.name;
        
        const title = document.createElement('h3');
        title.textContent = p.name;
        
        const price = document.createElement('div');
        price.className = 'price';
        price.textContent = p.price.toLocaleString('vi-VN') + 'đ';
        
        const rating = document.createElement('div');
        rating.textContent = `⭐ ${p.rating}`;
        rating.style.marginBottom = '10px';

        const btn = document.createElement('button');
        btn.className = 'add-to-cart-btn';
        btn.textContent = p.inStock ? 'Thêm vào giỏ' : 'Hết hàng';
        btn.disabled = !p.inStock;
        if (!p.inStock) btn.style.background = '#ccc';

        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Ngăn sự kiện click card mở modal
            if (p.inStock) {
                cartItemCount++;
                cartCount.textContent = cartItemCount;
            }
        });

        card.addEventListener('click', () => openModal(p));

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(rating);
        card.appendChild(btn);

        productGrid.appendChild(card);
    });
}

// Tìm kiếm
searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value;
    renderProducts();
});

// Lọc theo danh mục
categoryFilters.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        document.querySelectorAll('#categoryFilters button').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentCategory = e.target.dataset.cat;
        renderProducts();
    }
});

// Sắp xếp
sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderProducts();
});

// Dark Mode Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Modal Logic
function openModal(product) {
    modalBody.innerHTML = '';
    const img = document.createElement('img');
    img.src = product.image;
    
    const title = document.createElement('h2');
    title.textContent = product.name;
    
    const price = document.createElement('h3');
    price.textContent = product.price.toLocaleString('vi-VN') + 'đ';
    price.style.color = '#e53935';
    price.style.margin = '10px 0';

    const desc = document.createElement('p');
    desc.textContent = `Danh mục: ${product.category} | Đánh giá: ${product.rating} ⭐`;
    
    const status = document.createElement('p');
    status.textContent = product.inStock ? 'Tình trạng: Còn hàng' : 'Tình trạng: Hết hàng';
    status.style.fontWeight = 'bold';
    status.style.marginTop = '10px';

    modalBody.appendChild(img);
    modalBody.appendChild(title);
    modalBody.appendChild(price);
    modalBody.appendChild(desc);
    modalBody.appendChild(status);

    productModal.classList.add('show');
}

closeModalBtn.addEventListener('click', () => {
    productModal.classList.remove('show');
});

window.addEventListener('click', (e) => {
    if (e.target === productModal) {
        productModal.classList.remove('show');
    }
});

// Khởi tạo ban đầu
renderProducts();
