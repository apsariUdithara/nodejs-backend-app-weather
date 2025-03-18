const User = require("../models/User");
const { getWeather } = require("../config/weather");
const { sendEmail } = require("../config/email");

// Store user details
exports.storeUser = async (req, res) => {
  try {
    const { email, location } = req.body;
    const newUser = new User({ email, location });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error storing user", error: error.message });
  }
};

// Update user location
exports.updateUserLocation = async (req, res) => {
  try {
    const { userId, location } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { location },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User location updated", user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user location", error: error.message });
  }
};

// Retrieve weather data for a given day
exports.getUserWeatherData = async (req, res) => {
  try {
    const { userId, date } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const weatherData = user.weatherData.filter((data) => data.date === date);
    res.status(200).json({ weatherData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving weather data", error: error.message });
  }
};
