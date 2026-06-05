const globalLoading = document.getElementById('globalLoading');
const timingInfo = document.getElementById('timingInfo');
const refreshBtn = document.getElementById('refreshBtn');

// APIs
const API_USER = "https://randomuser.me/api/";
const API_WEATHER = "https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&current_weather=true"; // London
const API_DOG = "https://dog.ceo/api/breeds/image/random";

// DOM Elements cho từng Widget
const widgets = {
    user: {
        status: document.querySelector('#widget-user .widget-status'),
        content: document.getElementById('content-user')
    },
    weather: {
        status: document.querySelector('#widget-weather .widget-status'),
        content: document.getElementById('content-weather')
    },
    dog: {
        status: document.querySelector('#widget-dog .widget-status'),
        content: document.getElementById('content-dog')
    }
};

// Hàm set trạng thái UI cho widget
function setWidgetState(widgetKey, state, dataOrMessage) {
    const w = widgets[widgetKey];
    w.status.className = 'widget-status ' + state;
    
    if (state === 'loading') {
        w.status.textContent = 'Loading...';
        w.content.innerHTML = '<div class="spinner-large" style="width:30px; height:30px; border-width: 3px;"></div>';
    } else if (state === 'error') {
        w.status.textContent = 'Error';
        w.content.innerHTML = `<p style="color: #e74c3c; font-weight: bold;">❌ ${dataOrMessage}</p>`;
    } else if (state === 'success') {
        w.status.textContent = 'Success';
        
        // Custom render logic cho từng loại data
        if (widgetKey === 'user') {
            const u = dataOrMessage.results[0];
            w.content.innerHTML = `
                <div class="user-card">
                    <img src="${u.picture.large}" alt="Avatar">
                    <div class="user-info">
                        <h3>${u.name.first} ${u.name.last}</h3>
                        <p>📧 ${u.email}</p>
                        <p>🌍 ${u.location.country}</p>
                    </div>
                </div>
            `;
        } else if (widgetKey === 'weather') {
            const cw = dataOrMessage.current_weather;
            w.content.innerHTML = `
                <div class="weather-data">${cw.temperature}°C</div>
                <p>Wind Speed: ${cw.windspeed} km/h</p>
                <p>Time: ${cw.time.replace('T', ' ')}</p>
            `;
        } else if (widgetKey === 'dog') {
            w.content.innerHTML = `
                <img src="${dataOrMessage.message}" alt="Random Dog" class="dog-image">
            `;
        }
    }
}

// Fetch helper (tự quăng lỗi nếu response fail)
async function fetchData(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
    return await res.json();
}

async function loadDashboard() {
    // 1. Bật loading
    globalLoading.classList.remove('hidden');
    refreshBtn.disabled = true;
    timingInfo.textContent = "Fetching...";
    
    // Set widget state to loading
    setWidgetState('user', 'loading');
    setWidgetState('weather', 'loading');
    setWidgetState('dog', 'loading');

    const startTime = Date.now();

    // 2. Gọi song song 3 APIs dùng Promise.allSettled
    // Đảm bảo 1 API chết thì 2 cái kia vẫn render được
    const results = await Promise.allSettled([
        fetchData(API_USER),
        fetchData(API_WEATHER),
        fetchData(API_DOG)
    ]);

    // 3. Xử lý kết quả trả về
    const [userRes, weatherRes, dogRes] = results;

    // User Widget
    if (userRes.status === "fulfilled") {
        setWidgetState('user', 'success', userRes.value);
    } else {
        setWidgetState('user', 'error', userRes.reason.message);
    }

    // Weather Widget
    if (weatherRes.status === "fulfilled") {
        setWidgetState('weather', 'success', weatherRes.value);
    } else {
        setWidgetState('weather', 'error', weatherRes.reason.message);
    }

    // Dog Widget
    if (dogRes.status === "fulfilled") {
        setWidgetState('dog', 'success', dogRes.value);
    } else {
        setWidgetState('dog', 'error', dogRes.reason.message);
    }

    // 4. Tắt loading và tính thời gian
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    globalLoading.classList.add('hidden');
    refreshBtn.disabled = false;
    timingInfo.textContent = `Data loaded in ${duration} ms`;
}

refreshBtn.addEventListener('click', loadDashboard);

// Load ngay lần đầu
loadDashboard();
