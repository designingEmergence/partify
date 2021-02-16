const model = require('./model')
const path = require("path")
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get("/guest", function(request, response) {
  response.sendFile(path.join(__dirname, '..', "build/index.html"));
   });

app.get("/host", function(request, response) {
    response.sendFile(path.join(__dirname, '..', "build/index.html"));
  });
//-------------------------------------------------------------//

// init Spotify API wrapper
var SpotifyWebApi = require("spotify-web-api-node");

// Replace with your redirect URI, required scopes, and show_dialog preference
var redirectUriHost = (process.env.PORT)?`http://localhost:${process.env.PORT}/host/callback/`:null || `https://${process.env.PROJECT_DOMAIN}.glitch.me/host/callback`;
var redirectUriGuest = (process.env.PORT)?`http://localhost:${process.env.PORT}/guest/callback/`:null || `https://${process.env.PROJECT_DOMAIN}.glitch.me/guest/callback`;

var scopes = ["user-top-read"];
var showDialog = true;

// The API object we'll use to interact with the API
var spotifyApiHost = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: redirectUriHost
});


var spotifyApiGuest = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: redirectUriGuest
});

app.get("/authorize", function(request, response) {
  var authorizeURL = spotifyApiHost.createAuthorizeURL(scopes, null, showDialog);
  console.log(authorizeURL);
  response.send(authorizeURL);
});

app.get("/authorizeGuest", function(request, response) {
  var authorizeURL = spotifyApiGuest.createAuthorizeURL(scopes, null, showDialog);
  console.log(authorizeURL);
  response.send(authorizeURL);
});

// Exchange Authorization Code for an Access Token
app.get("/host/callback", function(request, response) {
  var authorizationCode = request.query.code;

  spotifyApiHost.authorizationCodeGrant(authorizationCode).then(
    function(data) {
      //console.log(data);
      response.redirect(
        `/host#access_token=${data.body["access_token"]}&refresh_token=${
          data.body["refresh_token"]
        }`
      );
    },
    function(err) {
      console.log(
        "Something went wrong when retrieving the access token!",
        err.message
      );
    }
  );
});

app.get("/guest/callback", function(request, response) {
  var authorizationCode = request.query.code;
  spotifyApiGuest.authorizationCodeGrant(authorizationCode).then(
    function(data) {
      //console.log(data);
      response.redirect(
        `/guest#access_token=${data.body["access_token"]}&refresh_token=${
          data.body["refresh_token"]
        }`
      );
    },
    function(err) {
      console.log(
        "Something went wrong when retrieving the access token!",
        err.message
      );
    }
  );
});



app.get("/logout", function(request, response) {
  response.redirect("/");
});

app.get("/toptracks", function(request, response) {
  var loggedInSpotifyApi = new SpotifyWebApi();
  console.log(request.headers["authorization"].split(" ")[1]);
  loggedInSpotifyApi.setAccessToken(
    request.headers["authorization"].split(" ")[1]
  );
  // Search for a track!
  loggedInSpotifyApi.getMyTopTracks().then(
    function(data) {
      //console.log(data.body);
      response.send(data.body);
    },
    function(err) {
      console.error(err);
    }
  );
});

app.post('/guestTracks', function(request,response){
  console.log(model);
  model.addTracks(request.body);
  response.send('got em');
});
//-------------------------------------------------------------//

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
