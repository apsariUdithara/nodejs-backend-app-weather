const express = require("express");
const { 
  storeUser, 
  updateUserLocation, 
  getUserWeatherData 
} = require("../controllers/userController");

const router = express.Router();

// Route to store user details
router.post("/users", storeUser);

// Route to update user's location
router.put("/users/:id/location", updateUserLocation);

// Route to retrieve user's weather data for a given day
router.get("/users/:id/weather", getUserWeatherData);

module.exports = router;