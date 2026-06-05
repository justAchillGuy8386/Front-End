const galleryGrid = document.getElementById('galleryGrid');
const loadTrigger = document.getElementById('load-trigger');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

let currentPage = 1;
const limit = 20;
let isLoading = false;
let hasMore = true;

// Sử dụng Picsum API
async function fetchPhotos(page) {
    try {
        const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);
        if (!response.ok) throw new Error('API error');
        const data = await response.json();
        
        // Nếu API hết ảnh (hoặc trả về ít hơn limit)
        if (data.length === 0) {
            hasMore = false;
            loadTrigger.innerHTML = "<span>Đã tải hết ảnh!</span>";
        }
        return data;
    } catch (error) {
        console.error("Lỗi lấy dữ liệu ảnh:", error);
        loadTrigger.innerHTML = "<span style='color:red'>Lỗi tải ảnh. Vui lòng tải lại trang.</span>";
        return [];
    }
}

function renderPhotos(photos) {
    photos.forEach(photo => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        
        // Tạo thẻ img nhưng chưa gắn src chuẩn ngay để Lazy Load
        // Picsum photo: thumbnail nhỏ để load, click thì lấy ảnh to hơn
        const img = document.createElement('img');
        // Kích thước thumbnail hiển thị
        img.dataset.src = `https://picsum.photos/id/${photo.id}/400/400`;
        // Kích thước gốc để xem lightbox
        img.dataset.fullSrc = `https://picsum.photos/id/${photo.id}/1200/800`; 
        img.alt = photo.author;
        
        // Lazy Load: Gắn IntersectionObserver cho từng ảnh
        imgObserver.observe(img);

        // Click để mở Lightbox
        div.addEventListener('click', () => {
            lightboxImg.src = img.dataset.fullSrc;
            lightbox.classList.remove('hidden');
        });

        div.appendChild(img);
        galleryGrid.appendChild(div);
    });
}

// 1. Observer để Lazy Loading hình ảnh (khi cuộn tới ảnh mới gán src)
const imgObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            
            img.onload = () => {
                img.classList.add('loaded');
                img.parentElement.classList.add('loaded');
            };
            
            observer.unobserve(img); // Chỉ load 1 lần
        }
    });
}, {
    rootMargin: '100px' // Load sớm trước 100px
});

// 2. Observer để Infinite Scroll (Cuộn tới thẻ "Đang tải thêm...")
async function loadMorePhotos() {
    if (isLoading || !hasMore) return;
    
    isLoading = true;
    loadTrigger.classList.remove('hidden');
    
    // Giả lập delay xíu để thấy loading nếu mạng nhanh
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const photos = await fetchPhotos(currentPage);
    renderPhotos(photos);
    
    currentPage++;
    isLoading = false;
}

const scrollObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        loadMorePhotos();
    }
}, {
    rootMargin: '200px' // Bắt đầu load khi cách đáy 200px
});

// Đóng lightbox
lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        lightbox.classList.add('hidden');
        lightboxImg.src = '';
    }
});

// Init
scrollObserver.observe(loadTrigger);
