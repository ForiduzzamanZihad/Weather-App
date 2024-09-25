const apiKey = 'a66e5e319ac146848d5224217242509'; 
// Event listener for the search button
document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        fetchWeatherData(city);
    } else {
        alert('Please enter a city name');
    }
});

// Function to fetch weather data
async function fetchWeatherData(city) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);
        const data = await response.json();
        
        console.log(data);  // Debugging: To check the API response in the console
        
        if (response.ok) {
            displayWeatherData(data);
        } else {
            throw new Error('City not found');
        }
    } catch (error) {
        document.getElementById('weather-container').innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

// Function to display weather data
function displayWeatherData(data) {
    const weatherContainer = document.getElementById('weather-container');
    weatherContainer.style.display = 'block';  // Making the container visible
    weatherContainer.innerHTML = `
        <div class="weather-info">
            <h2>${data.location.name}, ${data.location.country}</h2>
            <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">
        </div>
        <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
        <p><strong>Condition:</strong> ${data.current.condition.text}</p>
        <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.current.wind_kph} kph</p>
    `;
}
