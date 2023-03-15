const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error = document.querySelector(".not-found");

const image = document.querySelector(".weather-box img");
const temperature = document.querySelector(".weather-box .temperature");
const description = document.querySelector(".weather-box .description");
const humidity = document.querySelector(".weather-details .humidity span");
const wind = document.querySelector(".weather-details .wind span");

const handleSearch = () => {
  const apiKey = "e1e3ae846e57ce16c28128f205e4213f";
  const city = document.querySelector(".search-box input").value;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`,
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404" || city === "") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error.style.display = "block";
        error.classList.add("fadeIn");
        return;
      }

      error.style.display = "none";
      error.classList.remove("fadeIn");

      if (json.weather[0].main === "Clear") {
        image.src = "assets/images/clear.png";
      }

      if (json.weather[0].main === "Rain") {
        image.src = "assets/images/rain.png";
      }

      if (json.weather[0].main === "Snow") {
        image.src = "assets/images/snow.png";
      }

      if (json.weather[0].main === "Clouds") {
        image.src = "assets/images/cloud.png";
      }

      if (json.weather[0].main === "Haze") {
        image.src = "assets/images/mist.png";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    });
};

search.addEventListener("click", handleSearch);
