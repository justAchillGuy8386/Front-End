const mainImage = document.getElementById('mainImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const imgIndexSpan = document.getElementById('imgIndex');
const playStatus = document.getElementById('playStatus');

const paletteOverlay = document.getElementById('commandPalette');
const cmdInput = document.getElementById('cmdInput');
const cmdList = document.getElementById('cmdList');

let currentIndex = 1;
const totalImages = 9;
let slideshowInterval = null;

// --- Gallery Logic ---
function updateImage(index) {
    if (index < 1) index = totalImages;
    if (index > totalImages) index = 1;
    currentIndex = index;
    
    // Fake image URL for demo
    mainImage.src = `https://placehold.co/400x300/ccc/000?text=Image+${currentIndex}`;
    mainImage.alt = `Gallery Image ${currentIndex}`;
    imgIndexSpan.textContent = currentIndex;
}

function nextImage() { updateImage(currentIndex + 1); }
function prevImage() { updateImage(currentIndex - 1); }

function toggleSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
        playStatus.textContent = "(Paused)";
    } else {
        slideshowInterval = setInterval(nextImage, 2000);
        playStatus.textContent = "(Playing)";
    }
}

prevBtn.addEventListener('click', prevImage);
nextBtn.addEventListener('click', nextImage);

// Keyboard navigation cho gallery
document.addEventListener('keydown', (e) => {
    // Nếu command palette đang mở thì bỏ qua phím tắt gallery
    if (!paletteOverlay.classList.contains('hidden')) return;

    // Arrow keys
    if (e.key === 'ArrowRight') {
        nextImage();
    } else if (e.key === 'ArrowLeft') {
        prevImage();
    } 
    // Number keys 1-9
    else if (e.key >= '1' && e.key <= '9') {
        updateImage(parseInt(e.key));
    }
    // Space bar (ngăn không cho cuộn trang nếu focus body)
    else if (e.key === ' ' && document.activeElement !== prevBtn && document.activeElement !== nextBtn) {
        e.preventDefault();
        toggleSlideshow();
    }
});

// --- Command Palette Logic ---
let cmdItems = Array.from(cmdList.querySelectorAll('li'));
let selectedCmdIndex = 0;

function openPalette() {
    paletteOverlay.classList.remove('hidden');
    cmdInput.value = '';
    cmdInput.focus();
    filterCommands('');
}

function closePalette() {
    paletteOverlay.classList.add('hidden');
    mainImage.focus(); // Trả lại focus
}

function filterCommands(query) {
    query = query.toLowerCase();
    let visibleCount = 0;
    cmdItems.forEach(li => {
        if (li.textContent.toLowerCase().includes(query)) {
            li.style.display = 'block';
            visibleCount++;
        } else {
            li.style.display = 'none';
        }
        li.classList.remove('selected');
    });

    // Chọn cái đầu tiên hiển thị
    selectedCmdIndex = -1;
    updateCmdSelection(1); // tìm item đầu tiên
}

function updateCmdSelection(direction) {
    const visibleItems = cmdItems.filter(li => li.style.display !== 'none');
    if (visibleItems.length === 0) return;

    if (selectedCmdIndex >= 0 && selectedCmdIndex < visibleItems.length) {
        visibleItems[selectedCmdIndex].classList.remove('selected');
    }

    selectedCmdIndex += direction;
    if (selectedCmdIndex < 0) selectedCmdIndex = visibleItems.length - 1;
    if (selectedCmdIndex >= visibleItems.length) selectedCmdIndex = 0;

    visibleItems[selectedCmdIndex].classList.add('selected');
    // Đảm bảo cuộn tới phần tử được chọn
    visibleItems[selectedCmdIndex].scrollIntoView({ block: "nearest" });
}

function executeCommand(cmdName) {
    switch (cmdName) {
        case 'darkmode':
            document.body.classList.toggle('dark-mode');
            break;
        case 'play':
            if (!slideshowInterval) toggleSlideshow();
            break;
        case 'pause':
            if (slideshowInterval) toggleSlideshow();
            break;
        case 'first':
            updateImage(1);
            break;
        case 'last':
            updateImage(9);
            break;
    }
    closePalette();
}

// Lắng nghe Ctrl+K
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault(); // Ngăn trình duyệt nhảy vào ô search
        openPalette();
    } else if (e.key === 'Escape' && !paletteOverlay.classList.contains('hidden')) {
        closePalette();
    }
});

// Xử lý phím trong ô search của palette
cmdInput.addEventListener('input', (e) => filterCommands(e.target.value));
cmdInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        updateCmdSelection(1);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        updateCmdSelection(-1);
    } else if (e.key === 'Enter') {
        e.preventDefault();
        const visibleItems = cmdItems.filter(li => li.style.display !== 'none');
        if (visibleItems[selectedCmdIndex]) {
            executeCommand(visibleItems[selectedCmdIndex].dataset.cmd);
        }
    }
});

// Click vào li
cmdItems.forEach(li => {
    li.addEventListener('click', () => {
        executeCommand(li.dataset.cmd);
    });
    li.addEventListener('mouseover', () => {
        cmdItems.forEach(i => i.classList.remove('selected'));
        li.classList.add('selected');
        // Đồng bộ selectedCmdIndex
        const visibleItems = cmdItems.filter(i => i.style.display !== 'none');
        selectedCmdIndex = visibleItems.indexOf(li);
    });
});
