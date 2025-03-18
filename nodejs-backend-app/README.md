# Node.js Weather Reporting API

## Overview
This project is a Node.js backend application that provides an API for storing user details, including email and location, and automatically sends weather reports every 3 hours. The application integrates with the OpenWeatherMap API to fetch weather data and uses Nodemailer to send email notifications to users.

## Project Structure
```
nodejs-backend-app
├── src
│   ├── config
│   │   ├── email.js
│   │   └── weather.js
│   ├── controllers
│   │   ├── userController.js
│   └── models
│       └── User.js
│   ├── routes
│   │   └── userRoutes.js
│   ├── services
│   │   ├── emailService.js
│   │   └── weatherService.js
│   ├── utils
│   │   └── googleCloud.js
│   └── app.js
├── package.json
├── .env
├── .gitignore
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd nodejs-backend-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your environment variables:
   ```
   MONGODB_URI=<your_mongodb_connection_string>
   OPENWEATHERMAP_API_KEY=<your_openweathermap_api_key>
   GMAIL_USER=<your_gmail_address>
   GMAIL_PASS=<your_gmail_app_password>
   GOOGLE_CLOUD_API_KEY=<your_google_cloud_api_key>
   ```



## Usage

1. Start the application:
   ```
   npm start
   ```

2. The API will be running on `http://localhost:3000`.

## API Endpoints

- **POST /api/users**: Store user details (email and location).
- **PUT /api/users/:id**: Update user location.
- **GET /api/users/weather/:date**: Retrieve weather data for a given day.

## Scheduled Tasks
The application uses `node-cron` to send weather reports to users every 3 hours.

## Deployment
This application can be deployed on platforms like Vercel or AWS. For AWS deployment, you can use services like EC2 for hosting, S3 for storage, and MongoDB Atlas for the database.

## Testing
You can test the API endpoints using Postman. A Postman collection can be provided for convenience.

http://localhost:3000/api/users

Body raw data:
{
  "email": "test5@example.com",
  "location": {
    "lat": 40.7128,
    "lon": -74.0060
  }
}

### Step 1: Create Postman Requests
Create a New Postman Collection:

Open Postman and create a new collection named "Node.js Weather Reporting API".

Add Requests to the Collection:

POST /api/users:
URL: http://localhost:3000/api/users
Method: POST
Body (raw JSON):
{
  "email": "test@example.com",
  "location": {
    "lat": 40.7128,
    "lon": -74.0060
  }
}

PUT /api/users/:id:
URL: http://localhost:3000/api/users/:id
Method: PUT
Body (raw JSON):
{
  "location": {
    "lat": 34.0522,
    "lon": -118.2437
  }
}



GET /api/users/weather/:date:
URL: http://localhost:3000/api/users/weather/:date
Method: GET