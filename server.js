'use strict';
//node module dependencies
require('dotenv').config();
const express = require('express');
//app
const app = express();

const cors = require('cors');
// port
const PORT = process.env.PORT || 3000;

// app.use(express.static('./public'));

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
//errors
app.use('/*', (req, res) =>{
  res.status(400).send(`sorry that didn't work`);
})

app.listen(PORT, ()=> console.log(`listening on port ${PORT} ya mook`));