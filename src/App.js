import React, { useState, useEffect } from "react";

import Player from './Player.js';
import Queue from './Queue.js';

import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const getHashParams = () => {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  };

  useEffect(() => {
    if (!loggedIn) {
      const params = getHashParams();
      const token = params.access_token;
      if (token) {
        spotifyApi.setAccessToken(token);
        setLoggedIn(true);
      }
    }
  });

  return (
    <div className="App">
      <a href="http://localhost:8888"> Login to Spotify </a>
      {loggedIn && (<h1>Logged in!</h1>)}
      <Player></Player>
      <Queue></Queue>
    </div>
  );
}

export default App;
