document
  .getElementById("weather-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const city = document.getElementById("city").value;
    getWeather(city);
  });

function getWeather(city) {
  const apiKey = "3e83aec90b1f4b83882135737241712";
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        document.getElementById(
          "weather-result"
        ).innerHTML = `<p>${data.error.message}</p>`;
      } else {
        document.getElementById("weather-result").innerHTML = `
                  <h2>Weather in ${data.location.name}</h2>
                  <p>Temperature: ${data.current.temp_c}°C</p>
                  <p>Humidity: ${data.current.humidity}%</p>
                  <p>Wind Speed: ${data.current.wind_kph} kph</p>
              `;
      }
    })
    .catch((error) => console.error("Error fetching weather data:", error));
}
