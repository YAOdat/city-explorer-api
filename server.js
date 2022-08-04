const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
const {handleWeather} = require('./modules/weather');

const port = 4000
const app = express();
app.use(cors());

// const weatherData = require('./data/weather.json');

app.get('/weather', handleWeather)

app.get('/movies', async (req, res) => {
    const {searchQuery, lat, lon} = req.query;
    
    const movieArr = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`);
  
    try {
      const movieData = movieArr.data.results.map(item => new Movie(item));
      res.status(200).send(movieData)
    } catch (error) {
      errorHandler(error, res)
    }
  })

app.get('*', (req, res) => {res.status(404).send('The page you are looking for is not found!')})

function errorHandler(error, res) {
  res.status(500).send({error: 'Something went wrong'})
}


class Movie {
    constructor(movie) {
      this.title = movie.title;
      this.overview = movie.overview;
      this.average_votes = movie.vote_average
      this.total_votes = movie.vote_count
      this.image_url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      this.popularity = movie.popularity
      this.released_on = movie.release_date;
    }
  }


app.listen(port, () => {
  console.log('Listening to port:', port)
})