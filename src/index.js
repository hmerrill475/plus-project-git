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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [`Sun`, `Mon`, `Tues`, `Wed`, `Thur`, `Fri`, `Sat`];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "f4cc721a34562ff0ba46b8a5811ca6to";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day"> 
          <div class="forecast-date">${formateDay(day.time)}</div>
          
          <img src="${day.condition.icon_url}" class="forecast-icon">/>
          <span class="forecast-high"> ${Math.round(
            day.temperature.maximum
          )}°</span>
           <span class="forecast-low">${Math.round(
             day.temperature.minimum
           )}°</span>       
        </div>
      `;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSearch);

searchCity();
