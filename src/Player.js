import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { Paper, Typography } from "@material-ui/core";


const spotifyApi = new SpotifyWebApi();

function Player(props) {

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [albumCover, setAlbumCover] = useState(null);

  useEffect(() => {
    if (!props.loggedIn) {
      spotifyApi
        .getMyCurrentPlayingTrack()
        .then((response) => {
          setArtist(response.item?.artists[0].name);
          setTitle(response.item?.name);
          setAlbumCover(response.item?.album.images[2].url);
        })
      }
      currentSong();
  });


  const currentSong = () => {
    setInterval(() => {props.loggedIn && spotifyApi
      .getMyCurrentPlayingTrack()
      .then((response) => {
        setArtist(response.item?.artists[0].name);
        setTitle(response.item?.name);
        setAlbumCover(response.item?.album.images[2].url);
      })}, 10000);
  }

  return (
    <div className="Player">
      <Paper variant="outlined" elevation={2}>
        <Typography variant="subtitle2">
          Currently Playing:
        </Typography>
        <img src={albumCover} alt="album cover"></img>
        <Typography variant="body1">
          {title} by {artist}
        </Typography>
      </Paper>
    </div>
  );
}

export default Player;
