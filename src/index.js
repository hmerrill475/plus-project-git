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
  let apiKey = "1a5cc3cf3a952ac714d1e93f46d066a6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function showPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "1a2b7258ebd456c01aef9175dfe8b709";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showCurrentTemp);
}

navigator.geolocation.getCurrentPosition(showPosition);

function showCurrentTemp(response) {
  console.log(response.data);
  console.log(response.data.name);
  console.log(response.data.main.temp);
  let currentCity = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let sentance = document.querySelector("h4");
  sentance.innerHTML = `It is ${temperature} degrees out in ${currentCity}.`;
}
