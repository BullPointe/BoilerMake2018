const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  var request = require('request'); // "Request" library

  var client_id = '4a673bfaeec343de9bc5e62ea9a835a6'; // Your client id
  var client_secret = '9c13333ac0624c74b93f82c7ce9c000d'; // Your secret

  // your application requests authorization
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
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
      var options = {
        url: 'https://api.spotify.com/v1/tracks/3n3Ppam7vgaVa1iaRUc9Lp',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        console.log(body);
        res.send(body);
      });
    }
  });

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
