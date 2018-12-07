'use strict';
//node module dependencies
require('dotenv').config();
const express = require('express');
//app
const app = express();
// port
const PORT = process.env.PORT || 3000;

app.use(express.static('./public'));

app.get('/hello', (request, response) =>{
  response.status(200).send('hello');
})
//get location
app.get('/location', (request, response) => {
  const locationData = searchToLatLong(request.query.data || 'Lynnwood, WA');
});

//errors
app.use('/*', (req, res) =>{
  res.status(400).send(`sorry that didn't work`);
})

app.listen(PORT, ()=> console.log(`listening on port ${PORT} ya mook`));