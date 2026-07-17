const cityElement = document.getElementById("weather-city");
const tempElement = document.getElementById("weather-temp");
const conditionElement = document.getElementById("weather-condition");
const weatherIcon = document.getElementById("weather-icon");

const humidityElement = document.querySelector(
  "#weather-humidity .weather-detail-value",
);

const windElement = document.querySelector(
  "#weather-wind .weather-detail-value",
);

const weatherLoading = document.getElementById("weather-loading");
const weatherCard = document.getElementById("weather-card");

function showLoading(show) {
  if (show) {
    weatherLoading.style.display = "flex";
    weatherCard.style.display = "none";
  } else {
    weatherLoading.style.display = "none";
    weatherCard.style.display = "block";
  }
}

function getCurrentLocation() {
  showLoading(true);

  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");

    showLoading(false);

    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      console.log(latitude, longitude);

      fetchWeather(latitude, longitude);
    },

    (error) => {
      console.error(error);

      alert("Unable to get your location.");

      showLoading(false);
    },
  );
}
getCurrentLocation();

function getWeatherCondition(code) {
  const weatherCodes = {
    0: "Clear Sky",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Fog",
    51: "Light Drizzle",
    61: "Rain",
    63: "Moderate Rain",
    65: "Heavy Rain",
    71: "Snow",
    80: "Rain Showers",
    95: "Thunderstorm",
  };

  return weatherCodes[code] || "Unknown";
}

async function fetchWeather(latitude, longitude) {
  showLoading(true);

  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`,
    );

    const data = await response.json();
    const locationResponse = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
    );

    const locationData = await locationResponse.json();

    tempElement.textContent = `${Math.round(data.current.temperature_2m)}°C`;

    humidityElement.textContent = `${data.current.relative_humidity_2m}%`;

    windElement.textContent = `${Math.round(data.current.wind_speed_10m)} km/h`;

    conditionElement.textContent = getWeatherCondition(
      data.current.weather_code,
    );

    updateWeatherIcon(data.current.weather_code);

    const address = locationData.address;

    cityElement.textContent =
      address.city ||
      address.town ||
      address.village ||
      address.municipality ||
      address.county ||
      address.city_district ||
      address.suburb ||
      address.hamlet ||
      address.state_district ||
      address.state ||
      "Unknown Location";
  } catch (error) {
    console.error(error);

    alert("Unable to fetch weather.");
  } finally {
    showLoading(false);
  }
}

function updateWeatherIcon(code) {

    weatherIcon.className = "fa-solid";

    if (code === 0) {
        weatherIcon.classList.add("fa-sun");
    }
    else if (code >= 1 && code <= 3) {
        weatherIcon.classList.add("fa-cloud-sun");
    }
    else if (code === 45 || code === 48) {
        weatherIcon.classList.add("fa-smog");
    }
    else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
        weatherIcon.classList.add("fa-cloud-rain");
    }
    else if (code >= 71 && code <= 77) {
        weatherIcon.classList.add("fa-snowflake");
    }
    else if (code >= 95) {
        weatherIcon.classList.add("fa-bolt");
    }
    else {
        weatherIcon.classList.add("fa-cloud");
    }

}