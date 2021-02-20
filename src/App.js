import React, { useState, useEffect } from "react";
import { Box, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import Player from './Player.js';
import Queue from './Queue.js';
import Header from './Header.js';
import SearchBar from './SearchBar.js';

import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [addingSongs, setAddingSongs] = useState(false);
  const [queue, setQueue] = useState([{title: 'Title', artists: ['Artist'], album: 'Album', image: 'https://i.scdn.co/image/ab67616d0000b2738f9a38eaef72352da716ccdb'}]);

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
        getUser();
      }
    }
  });

  const getUser = () => {
    spotifyApi
      .getMe()
      .then((response) => {
        console.log("ran")
        setUser(response);
      });
  }

  if(addingSongs){
    return (
      <div className={classes.root}>
        <Header user={user} classes={classes} loggedIn={loggedIn} />
        <br/>
        <SearchBar />
        <br/>
        <Box textAlign="center">
          <Button variant="contained" color="primary" onClick={() => setAddingSongs(false)}>
          I'm done adding songs!
          </Button>
        </Box>
      </div>
    )
  } else {
    return (
      <div className={classes.root}>
        <Header user={user} classes={classes} loggedIn={loggedIn} />
        <Player />
        <Queue queue={queue} />
        <br/>
        <Box textAlign="center">
          <Button variant="contained" color="primary" onClick={() => setAddingSongs(true)}>
            Add song to queue
          </Button>
        </Box>
      </div>
    );
  }
}

export default App;
