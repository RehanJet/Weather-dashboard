const apiKey = '4383565f167c11ad9e994669779d2f0b'; // API key
const locationInput = document.getElementById('locationInput');
const weatherInfo = document.getElementById('weatherInfo');
const forecastInfo = document.getElementById('forecastInfo');
const getWeatherButton = document.getElementById('getWeatherButton');

getWeatherButton.addEventListener('click', () => {
  const location = locationInput.value;
  if (location) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=4383565f167c11ad9e994669779d2f0b')
      .then(response => response.json())
      .then(data => {
        if (data.cod === '404') {
          weatherInfo.textContent = 'Location not found. Please try again.';
          forecastInfo.innerHTML = '';
        } else {
          const weather = data.weather[0].description;
          const temp = data.main.temp;
          const humidity = data.main.humidity;
          const windSpeed = data.wind.speed;
          weatherInfo.innerHTML = `
            <h2>Current Weather in ${location}</h2>
            <p>Weather: ${weather}</p>
            <p>Temperature: ${temp}°C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
          `;
          getForecast(location);
        }
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        weatherInfo.textContent = 'Failed to fetch weather data. Please try again.';
        forecastInfo.innerHTML = '';
      });
  } else {
    weatherInfo.textContent = 'Please enter a location.';
    forecastInfo.innerHTML = '';
  }
});

function getForecast(location) {
  fetch('https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=4383565f167c11ad9e994669779d2f0b')
    .then(response => response.json())
    .then(data => {
      const forecastList = data.list;
      const forecastItems = forecastList.map(item => {
        const dateTime = new Date(item.dt * 1000);
        const date = dateTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        const time = dateTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
        const weather = item.weather[0].description;
        const temp = item.main.temp;
        const humidity = item.main.humidity;
        return `
          <div class="forecast-item">
            <div class="forecast-date">${date}</div>
            <div class="forecast-time">${time}</div>
            <div class="forecast-weather">${weather}</div>
            <div class="forecast-temp">${temp}°C</div>
            <div class="forecast-humidity">Humidity: ${humidity}%</div>
          </div>
        `;
      });
      forecastInfo.innerHTML = `
        <h2>5-Day Forecast for ${location}</h2>
        <div class="forecast-container">
          ${forecastItems.join('')}
        </div>
      `;
    })
    .catch(error => {
      console.error('Error fetching forecast data:', error);
      forecastInfo.textContent = 'Failed to fetch forecast data. Please try again.';
    });
}
