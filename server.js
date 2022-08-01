'use strict';

const express = require('express');
require('dotenv').config();

const app = express();
4
const port =  process.env.PORT || 3001;

app.get('/api', (req, res) => {
    res.send('Message from the server')
})
app.listen (port, ()=> {
    console.log(`Listening to port ${port}`)
})