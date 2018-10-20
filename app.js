const express = require('express')
const app = express()
const port = 3000

// app.get('/', (req, res) => res.redirect('./index.html'))
app.get('/', (req, res) => res.sendFile('public/index.html', { root: __dirname }))

var requestURL = 'https://api.fitbit.com/1/user/6XYDTQ/activities/heart/date/today/1d.json';
var XMLHttpRequest= require("xmlhttprequest").XMLHttpRequest;
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() 
{
  var fitBitInformation = request.response;
  console.log(fitBitInformation)
  app.get('/', (req, res) => res.send(fitBitInformation["activities-heart"][0]["restingHeartRate"]))
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

