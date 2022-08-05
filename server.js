const express = require('express');
require('dotenv').config();
const cors = require('cors');

const {handleWeather} = require('./modules/weather');
const {handleMovie} = require('./modules/movies');

const port = process.env.PORT || 4000

const app = express();
app.use(cors());


app.get('/weather', handleWeather);
app.get('/movies', handleMovie);


app.get('*', (req, res) => {res.status(404).send('The page you are trying to access does not exist!')})

function errorHandler(error, res) {
  res.status(500).send({error: 'Something went wrong!'})
}

// test 
app.listen(port, () => {
  console.log('Listening to port:', port)
})