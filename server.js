'use strict';
//node module dependencies
let allWeather = [];
require('dotenv').config();
const express = require('express');
//app
const app = express();

const cors = require('cors');
// port
const PORT = process.env.PORT || 3000;

// app.use(express.static('./public'));
//borroed from stack overflow from epoc
function toDateTime(secs) {
  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(secs);
  return t;
}
// app.get('/hello', (request, response) =>{
//   response.status(200).send('hello');
// })
//get location
app.use(cors());
app.get('/location', (request, response) => {
  const locationData = searchToLatLong(request.query.data || 'Lynnwood, WA');
  response.send(locationData);
});

function searchToLatLong(query){
  const geoData = require('./geo.json');
  const location = new Location(geoData.results[0]);
  return location;
}



function Location(location){
  this.formatted_query = location.formatted_address;
  this.latitude = location.geometry.location.lat;
  this.longitude = location.geometry.location.lng;
}
app.get('/weather', (request, response) => {
  console.log(request);
  const weatherData = searchWeather(request.query.data || 'Lynnwood, WA');
  response.send(weatherData);
});

function searchWeather(query){
  allWeather = [];
  const wData = require('./weather.json');
  wData.daily.data.forEach((day) => {
    new Weather(day);
  });
  return(allWeather);
}
function Weather(day){
  this.forecast = day.summary;
  this.time = new Date (day.time * 1000).toDateString();
  allWeather.push(this);
}
//errors
app.get('/*', (req, res) =>{
  res.status(404).send(`sorry that didn't work`);
})

app.listen(PORT, ()=> console.log(`listening on port ${PORT} ya mook`));