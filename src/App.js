import React, { useState, useEffect } from "react";
import { AppBar, Button, Toolbar } from "@material-ui/core/"
import { makeStyles } from '@material-ui/core/styles';

import SpotifyWebApi from "spotify-web-api-js";
import { Typography } from "@material-ui/core";
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
      })
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            App Name TBD
          </Typography>
          {!loggedIn &&
            <Button variant="outlined" color="inherit" aria-label="login" href="http://localhost:8888" >
              Login to Spotify
            </Button>
          }
          { loggedIn && <img alt="Avatar" src={user?.images[0].url} style={{height:"50px", width:"50px", borderRadius:"50%"}}></img>}

        </Toolbar>
      </AppBar>
    </div>
  );
}

export default App;
