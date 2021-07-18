let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let weekDay = document.querySelector("#day");
weekDay.innerHTML = `${day}`;

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let timeFormat = `${hour}:${minutes}`;
let time = document.querySelector("#time");
time.innerHTML = `${timeFormat}`;

function showTemperature(response) {
  let tempNumber = document.querySelector("#temp-number");
  let city = document.querySelector("#city");
  let description = document.querySelector("#description");
  let humidityPercentage = document.querySelector("#humidity-percentage");
  let windSpeed = document.querySelector("#wind-speed");

  celsiusTemp = response.data.main.temp;

  tempNumber.innerHTML = Math.round(celsiusTemp);
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidityPercentage.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
}
function findCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function enterCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  findCity(city);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", enterCity);

let currentWeather = document.querySelector("#current-weather");
currentWeather.addEventListener("click", getCurrentLocation);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(calculatePosition);
}

function calculatePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

let celsiusTemp = null;

function convertFtemp(event) {
  event.preventDefault();
  let tempNumber = document.querySelector("#temp-number");
  cTemp.classList.remove("active");
  fTemp.classList.add("active");
  let fahrenheitConversion = (celsiusTemp * 9) / 5 + 32;
  tempNumber.innerHTML = Math.round(fahrenheitConversion);
}

function convertCtemp(event) {
  event.preventDefault();
  let tempNumber = document.querySelector("#temp-number");
  cTemp.classList.add("active");
  fTemp.classList.remove("active");
  tempNumber.innerHTML = Math.round(celsiusTemp);
}

let fTemp = document.querySelector("#fahrenheit");
fTemp.addEventListener("click", convertFtemp);

let cTemp = document.querySelector("#celsius");
cTemp.addEventListener("click", convertCtemp);

findCity("Edmonton");
