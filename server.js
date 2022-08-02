'use strict';

const express = require('express');
require('dotenv').config();
const cors =  require('cors');

const app = express();
app.use(cors()); 
const port =  3001;

const weatherData = require ('./data/weather.json');
// Routes
app.get('/photo', handleHome);

app.get('/weather', (req, res) =>{
    let searchQuery = req.query.searchQuery;
    const city = weatherData.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase());
   
    try {
        const weatherArr = city.data.map(item => new Forecast(item))

         res.status(200).send(weatherArr)

    } catch (err) {

        handleError (err, res)
    }
   
    


})

class Forecast {
    constructor(day) {
        this.date = day.valid_date;
        this.description = day.weather.description;

    }
}

// Functions:

function handleHome(req, res){
    const photoName= req.query.photoName
    res.send('Test2!')
}


function handleError (error, res) {
    res.status(500).send('Sorry, the city you are looking for is not found.')
}

app.listen (port, ()=> {
    console.log(`Listening to porttt ${port}`)
})