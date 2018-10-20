const express = require('express')
var request = require('request');  
const app = express()
const port = 3000

function getUserBPM(){

  // app.get('/getBPM', (req, res) => {
  // "Request" library
  var client_id = '22D8PZ'; // Your client id
  var client_secret = '4a14d64fdf640e48deb2e0df100ed3c2'; // Your secret

  // your application requests authorization
  var authOptions = {
    url: 'https://api.fitbit.com/oauth2/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      // use the access token to access the Spotify Web API
      var token = body.access_token;
      token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMkQ4UFoiLCJzdWIiOiI2WFlEVFEiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd3dlaSB3c29jIHdhY3Qgd3NldCB3bG9jIiwiZXhwIjoxNTQwNjI0MTg4LCJpYXQiOjE1NDAwMjI2OTV9.RJtGOrvdvoF25BrZeP8Wo8WWs1sN7qDr5k0-bEYENJI'
      var options = {
        url: 'https://api.fitbit.com/1/user/6XYDTQ/activities/heart/date/today/1d.json',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        console.log(body);
        json = body['activities-heart-intraday']['dataset']
        result = json[json.length-1]['value']
        res.send(JSON.stringify(result)) 
      });
    }
  });

};

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
