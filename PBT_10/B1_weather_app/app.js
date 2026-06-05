const form = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');
const historyList = document.getElementById('historyList');

let searchHistory = JSON.parse(localStorage.getItem('weatherHistory')) || [];

function renderHistory() {
    historyList.innerHTML = '';
    searchHistory.forEach(city => {
        const badge = document.createElement('div');
        badge.className = 'history-badge';
        badge.textContent = city;
        badge.addEventListener('click', () => {
            cityInput.value = city;
            getWeather(city);
        });
        historyList.appendChild(badge);
    });
}

function updateHistory(city) {
    // Xóa nếu đã tồn tại để đẩy lên đầu
    searchHistory = searchHistory.filter(item => item.toLowerCase() !== city.toLowerCase());
    searchHistory.unshift(city);
    // Giữ tối đa 5 thành phố
    if (searchHistory.length > 5) {
        searchHistory.pop();
    }
    localStorage.setItem('weatherHistory', JSON.stringify(searchHistory));
    renderHistory();
}

function showLoading() {
    weatherResult.innerHTML = `
        <div class="spinner"></div>
        <p class="loading">Đang tải...</p>
    `;
}

function showError(message) {
    weatherResult.innerHTML = `
        <p class="error">❌ ${message}</p>
    `;
}

function showWeather(data, city) {
    // API wttr.in format=j1
    const current = data.current_condition[0];
    const temp = current.temp_C;
    const desc = current.lang_vi && current.lang_vi[0] ? current.lang_vi[0].value : current.weatherDesc[0].value;
    const humidity = current.humidity;

    weatherResult.innerHTML = `
        <div class="weather-info">
            <h2>${city.toUpperCase()}</h2>
            <div class="temp">${temp}°C</div>
            <p><strong>Mô tả:</strong> ${desc}</p>
            <p><strong>Độ ẩm:</strong> ${humidity}%</p>
        </div>
    `;
}

async function getWeather(city) {
    if (!city) return;
    showLoading();

    try {
        const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1&lang=vi`);
        
        if (!response.ok) {
            throw new Error(`Không tìm thấy thành phố hoặc lỗi API (HTTP ${response.status})`);
        }

        const data = await response.json();
        
        if (!data.current_condition || data.current_condition.length === 0) {
            throw new Error("Không lấy được dữ liệu thời tiết cho thành phố này");
        }

        showWeather(data, city);
        updateHistory(city);

    } catch (error) {
        if (!navigator.onLine) {
            showError("Mất kết nối mạng. Vui lòng kiểm tra lại Wifi/3G.");
        } else {
            showError(error.message);
        }
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    getWeather(city);
});

// Init
renderHistory();
