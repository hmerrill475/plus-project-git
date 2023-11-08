let now = new Date();
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();
let days = [`Sun`, `Mon`, `Tues`, `Wed`, `Thurs`, `Fri`, `Sat`];
let day = days[now.getDay()];
let h2 = document.querySelector("h2");
h2.innerHTML = `${day} ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let input = document.querySelector("#search-button");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${input.value}`;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSearch);

function showTemperature(response) {
  let temperatureElement = document.querySelector("#topTemp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
}

function handleSearch(event) {
  event.preventDefault();

  let input = document.querySelector("#search-button");
}
function searchCity(city) {
  let apiKey = "f4cc721a34562ff0ba46b8a5811ca6to";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial};
`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function showCurrentTemp(response) {
  console.log(response.data);
  console.log(response.data.name);
  console.log(response.data.main.temp);
  console.log(response.data.weather[0].description);
  console.log(response.data.main.humidity);
  console.log(response.data.wind.speed);

  let currentCity = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let sentance = document.querySelector("h4");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  windElement.innerHTML = response.data.wind.speed;
  humidityElement.innerHTML = response.data.main.humidity;
  descriptionElement.innerHTML = response.data.weather[0].description;
}
