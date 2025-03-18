const axios = require("axios");

const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const getWeather = async (lat, lon) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching weather data: " + error.message);
  }
};

module.exports = { getWeather };
