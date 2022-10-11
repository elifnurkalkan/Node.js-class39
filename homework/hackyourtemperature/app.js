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
    `https://api.openweathermap.org/data/2.5/weather?APPID=${keys.API_KEY}`,
  );

  const weatherData = response.json();

  try {
    res
      .status(200)
      .json(
        `The temperature in ${weatherData.name} is  ${weatherData.main.temp} °C !`,
      );
  } catch {
    res.status(400).json(`${cityName} is not found!`);
  }
});

export default app;
