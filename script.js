
const LATITUDE = -7.3824;
const LONGITUDE = 110.3986;

async function fetchWeather() {
    const weatherContainer = document.getElementById('weather-content');
    
    try {
        // Fetch data dari API Open-Meteo (Tanpa API Key)
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=Asia%2FJakarta`
        );

        if (!response.ok) throw new Error("Gagal mengambil data cuaca");

        const data = await response.json();
        const current = data.current;

        // Pemetaan Kode Cuaca WMO ke Teks & Icon
        const weatherInfo = getWeatherDescription(current.weather_code);

        // Injeksikan UI hasil fetching ke elemen HTML
        weatherContainer.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem; margin-top: 0.5rem;">
                <span style="font-size: 3rem;">${weatherInfo.icon}</span>
                <div>
                    <h3 style="margin: 0; font-size: 1.5rem; color: #fff;">${current.temperature_2m} °C</h3>
                    <p style="margin: 0; color: #cbd5e1;">${weatherInfo.description}</p>
                </div>
            </div>
            <div style="margin-top: 1rem; font-size: 0.9rem; color: #94a3b8; display: flex; gap: 1rem;">
                <span>💧 Kelembapan: <strong>${current.relative_humidity_2m}%</strong></span>
                <span>💨 Angin: <strong>${current.wind_speed_10m} km/h</strong></span>
            </div>
        `;
    } catch (error) {
        console.error(error);
        weatherContainer.innerHTML = `
            <div style="color: #f87171;">⚠️ Gagal memperbarui cuaca. Periksa koneksi internet Anda.</div>
        `;
    }
}

// Konversi WMO Weather Code
function getWeatherDescription(code) {
    const codes = {
        0: { description: 'Cerah', icon: '☀️' },
        1: { description: 'Cerah Berawan', icon: '🌤️' },
        2: { description: 'Berawan', icon: '⛅' },
        3: { description: 'Sangat Berawan', icon: '☁️' },
        45: { description: 'Kabut', icon: '🌫️' },
        48: { description: 'Kabut Tebal', icon: '🌫️' },
        51: { description: 'Gerimis Ringan', icon: '🌦️' },
        61: { description: 'Hujan Ringan', icon: '🌧️' },
        63: { description: 'Hujan Sedang', icon: '🌧️' },
        65: { description: 'Hujan Lebat', icon: '🌧️' },
        80: { description: 'Hujan Semburan Ringan', icon: '🌦️' },
        95: { description: 'Hujan Badai / Petir', icon: '⛈️' }
    };
    return codes[code] || { description: 'Cuaca Tidak Diketahui', icon: '🌈' };
}

// Jalankan saat halaman di-load
document.addEventListener('DOMContentLoaded', fetchWeather);

// Fungsi ganti tab visual (opsional untuk menyelaraskan skrip tab kamu)
function switchTab(tabId) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.guide-content').forEach(content => content.classList.remove('active'));

    event.target.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}