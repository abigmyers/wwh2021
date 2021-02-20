import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { Paper, Typography } from "@material-ui/core";


const spotifyApi = new SpotifyWebApi();

function Player(props) {

  const [title, setTitle] = useState("No song playing");
  const [artist, setArtist] = useState("No song playing");
  const [albumCover, setAlbumCover] = useState(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(false);

  useEffect(() => {
    if (props.loggedIn) {
      spotifyApi
        .getMyCurrentPlayingTrack()
        .then((response) => {
          if (response.is_playing) {
            setCurrentlyPlaying(true);
            setArtist(response.item?.artists[0].name);
            setTitle(response.item?.name);
            setAlbumCover(response.item?.album.images[2].url);
          }
        })
    }
    currentSong();
  });


  const currentSong = () => {
    setInterval(() => {
      if (props.loggedIn) {
        spotifyApi
          .getMyCurrentPlayingTrack()
          .then((response) => {
            if (response.is_playing) {
              setCurrentlyPlaying(true);
              setArtist(response.item?.artists[0].name);
              setTitle(response.item?.name);
              setAlbumCover(response.item?.album.images[2].url);
            } else {
              setArtist("No song playing");
              setTitle("No song playing")
              setCurrentlyPlaying(false);
            }
          })
      } else {
        setArtist("No song playing");
        setTitle("No song playing")
        setCurrentlyPlaying(false);
      }
    }, 10000);
  }

  return (
    <div className="Player">
      {currentlyPlaying && <Paper variant="outlined" elevation={2}>
        <Typography variant="subtitle2">
          Currently Playing:
        </Typography>
        <img src={albumCover} alt="album cover"></img>
        <Typography variant="body1">
          {title} by {artist}
        </Typography>
      </Paper>}
    </div>
  );
}

export default Player;
