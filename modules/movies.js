const axios = require('axios');
const moviesCache = {}; // cache memory

async function handleMovie(req, res) {
  const {searchQuery, lat, lon} = req.query;
  
  console.log(moviesCache[searchQuery])


// check if data exists in cache:
  if (moviesCache[searchQuery]!==undefined){

    res.status(200).send(moviesCache[searchQuery])
// if it doesn't exist, store it:
  } else {
    const movieArr = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`);

    try {
      const movieData = movieArr.data.results.map(item => new Movie(item));
      moviesCache[searchQuery]=movieData;
      res.status(200).send(movieData)
    } catch (error) {
      res.status(500).send('Something went wrong.')

    }
  }


 
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

module.exports = {handleMovie};