const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const { scheduleWeatherReports } = require("./services/weatherService");

dotenv.config(); // Load environment variables

console.log("OpenWeatherMap API Key:", process.env.OPENWEATHERMAP_API_KEY); // Add this line to verify the API key

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.use("/api", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  scheduleWeatherReports(); // Start the scheduled task
});
