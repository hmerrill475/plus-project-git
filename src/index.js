let now = new Date();
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();
let days = [`Sun`, `Mon`, `Tues`, `Wed`, `Thurs`, `Fri`, `Sat`];
let day = days[now.getDay()];
let h2 = document.querySelector("h2");
h2.innerHTML = `${day} ${hours}:${minutes}`;

function showWeather(response) {
  console.log(response.data);
  // console.log(response.data.name);
  // console.log(response.data.main.temp);
  // console.log(response.data.condition.description);
  // console.log(response.data.temperature.humidity);
  // console.log(response.data.wind.speed);

  let temperatureElement = document.querySelector("#topTemp");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  let celsiusTemperature = response.data.temperature.current;
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather.app.icon"/>`;

  cityElement.innerHTML = response.data.city;
  windElement.innerHTML = response.data.wind.speed;
  humidityElement.innerHTML = response.data.temperature.humidity;
  descriptionElement.innerHTML = response.data.condition.description;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "f4cc721a34562ff0ba46b8a5811ca6to";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let input = document.querySelector("#search-form-input");
  let h1 = document.querySelector("#city");

  h1.innerHTML = `${input.value}`;
  searchCity(input.value);
}

function getForecast(city) {
  let apiKey = "f4cc721a34562ff0ba46b8a5811ca6to";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  console.log(response.data);
}
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

 response.data.daily.forEarch(function(day)){
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-day"> 
          <div class="forecast-date">${day}</div>
          
          <div class="forecast-icon"> <img src="https://static.vecteezy.com/system/resources/previews/009/213/913/non_2x/cloud-with-sun-emoji-icon-cloudy-sunny-day-weather-symbol-illustration-vector.jpg" alt="" width="100px">
</div>
          <span class="forecast-high"> ${Math.round(day.temperature.maximum)}°</span> <span class="forecast-low">${Math.round(day.temperature.minimum)}°</span>       
        </div>
      `;
  });
  forecastElement.innerHTML = forecastHtml;
}}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSearch);
displayForecast();
