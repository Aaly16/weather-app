function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function showTemperature(response) {
  let tempNumber = document.querySelector("#temp-number");
  let city = document.querySelector("#city");
  let description = document.querySelector("#weather-description");
  let humidityPercentage = document.querySelector("#humidity-percentage");
  let windSpeed = document.querySelector("#wind-speed");
  let dayTime = document.querySelector("#day-time");
  let mainEmoji = document.querySelector("#main-emoji");

  celsiusTemp = response.data.main.temp;

  tempNumber.innerHTML = Math.round(celsiusTemp);
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidityPercentage.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  dayTime.innerHTML = formatDate(response.data.dt * 1000);
  mainEmoji.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  mainEmoji.setAttribute("alt", response.data.weather[0].description);
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

findCity("Edmonton");
