function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let weatherBlock = document.querySelector("#weather-info");

let unitsBlock = document.querySelector("#units");
unitsBlock.addEventListener("click", changeUnits);

let currentUnits = "metric";
let curretCity = "";

function search(event) {
  event.preventDefault();
  curretCity = document.querySelector("#city-input").value;
  fetchWeather(curretCity);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function fetchWeather(city, units = "metric") {
  let key = "b56252c34ed3604f2468353a63a1b351";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`;

  axios.get(url).then(displayWeather);
}

function displayWeather(response) {
  const data = response.data;
  const weather = data.weather[0];
  let weatherSpan = document.querySelector("#temp");
  let temperature = Math.round(data.main.temp);
  weatherSpan.innerHTML = `${temperature}`;

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

  let weatherDesc = document.querySelector("#description");
  weatherDesc.innerHTML = weather.description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${data.wind.speed} ${
    currentUnits === "metric" ? "meter/sec" : "miles/hour"
  }`;

  weatherBlock.classList.remove("d-none");
}

function changeUnits(event) {
  if (
    !event.target.dataset["units"] ||
    currentUnits === event.target.dataset["units"]
  ) {
    return;
  }
  currentUnits = event.target.dataset["units"];

  fetchWeather(curretCity, currentUnits);

  Array.from(unitsBlock.children).forEach((ch) =>
    ch.classList.toggle("active-unit")
  );
}
