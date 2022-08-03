const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
const {handleWeather} = require('./modules/weather');

const port = 3001
const app = express();
app.use(cors());

// const weatherData = require('./data/weather.json');

app.get('/weather', handleWeather)


app.get('*', (req, res) => {res.status(404).send('The page you are looking for is not found!')})

function errorHandler(error, res) {
  res.status(500).send({error: 'Something went wrong'})
}


app.listen(3001, () => {
  console.log('Listening to port:', port)
})