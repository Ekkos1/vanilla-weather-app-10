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
let searchForm = document.querySelector("#search-form1");
searchForm.addEventListener("click", search);

function fetchWeather(city, units = "metric") {
  let key = "b56252c34ed3604f2468353a63a1b351";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`;

  axios.get(url).then(displayWeather);
}

function displayWeather(response) {
  let weatherSpan = document.querySelector("#temp");
  let temperature = Math.round(response.data.main.temp);
  weatherSpan.innerHTML = `${temperature}`;

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  weatherBlock.classList.remove("d-none");
}

function changeUnits(event) {
  if (!event.target.dataset["units"]) {
    return;
  }
  currentUnits = event.target.dataset["units"];
  fetchWeather(curretCity, currentUnits);

  Array.from(unitsBlock.children).forEach((ch) =>
    ch.classList.toggle("active-unit")
  );
}
