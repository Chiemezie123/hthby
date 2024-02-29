const express = require('express');
const app = express();
const request = require('request');
const querystring = require('querystring');

const clientId = 'your_client_id';
const clientSecret = 'your_client_secret';
const redirectUri = 'http://localhost:8888/callback'; // Update the redirect URI accordingly

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/login', (req, res) => {
  const scope = 'user-read-private user-read-email'; // Define the required scope
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri
    }));
});

app.get('/callback', (req, res) => {
  const code = req.query.code || null;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64'))
    },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      const refresh_token = body.refresh_token;

      // Use the access_token to fetch user data or perform other actions
      res.send({ access_token: access_token, refresh_token: refresh_token });
    } else {
      res.send({ error: 'Invalid token' });
    }
  });
});

app.listen(8888, () => {
  console.log('Server is running on port 8888');
});
