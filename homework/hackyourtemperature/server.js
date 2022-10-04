import express from 'express';
import fetch from 'node-fetch';
import handleBar from 'express-handlebars';

const port = 3000;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});

app.post('/weather', (req, res) => {
  const cityName = req.body.city;
  res.send(cityName);
});

app.listen(port, () => console.log(`Server started on port ${port}`));
