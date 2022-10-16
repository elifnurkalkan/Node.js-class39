import express from 'express';
import fetch from 'node-fetch';
import keys from './sources/keys.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('welcome weather api');
});

app.post('/weather', async (req, res) => {
  const { cityName } = req.body;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${keys.API_KEY}&units=metric`,
  );

  const weatherData = response.json();

  try {
    if (!cityName) {
      res.status(404).json({
        weatherAppMsg: `${weatherData.message.toUpperCase()},Please check your city name`,
      });
    } else {
      res
        .status(200)
        .json(
          `The temperature in ${weatherData.name} is  ${weatherData.main.temp} °C !`,
        );
    }
  } catch {
    res.status(400).json(`${cityName} is not found!`);
  }
});

export default app;
