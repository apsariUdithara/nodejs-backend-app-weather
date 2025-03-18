const axios = require("axios");
const cron = require("node-cron");
const { getWeather } = require("../config/weather");
const { sendEmail } = require("../config/email");
const User = require("../models/User");
const { OPENWEATHER_API_KEY } = process.env;

const getWeatherData = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          lat,
          lon,
          appid: OPENWEATHER_API_KEY,
          units: "metric",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching weather data: " + error.message);
  }
};

const generateWeatherText = (weather) => {
  return `The current temperature is ${weather.main.temp}°C with ${weather.weather[0].description}.`;
};

const scheduleWeatherReports = () => {
  // Change the schedule to run every minute for testing
  cron.schedule("* * * * *", async () => {
    try {
      const users = await User.find();
      for (const user of users) {
        const weatherData = await getWeather(
          user.location.lat,
          user.location.lon
        );
        const weatherText = `Current temperature: ${weatherData.main.temp}°C\nWeather: ${weatherData.weather[0].description}`;
        await sendEmail(user.email, "Weather Report", weatherText);
      }
    } catch (error) {
      console.error("Error sending weather reports:", error);
    }
  });
};

module.exports = {
  getWeatherData,
  generateWeatherText,
  scheduleWeatherReports,
};
