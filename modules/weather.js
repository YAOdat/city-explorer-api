const axios = require('axios');
const weatherCache = {};
async function handleWeather(req, res) {
  const searchQuery = req.query.searchQuery;
  const lat = req.query.lat;
  const lon = req.query.lon;
  
  console.log(weatherCache[searchQuery])

if (weatherCache[searchQuery] !== undefined){
  res.status(200).send(weatherCache[searchQuery])
  
} else {
  const cityArr = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`);
  //console.log(cityArr.data)
  try {
    const cityData = cityArr.data.data.map(item => new Forecast(item));
    // console.log(cityData)
    //res.status(200).send(cityData)
    weatherCache[searchQuery]=cityData;
  } catch (error) {
    errorHandler(error, res)
  }

}

};

class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.description = day.weather.description;
    this.highestTemp = day.high_temp
  }

}

// exports.handleWeather = handleWeather
module.exports = {handleWeather}