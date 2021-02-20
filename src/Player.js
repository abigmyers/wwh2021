import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { Paper, Typography } from '@material-ui/core';

const spotifyApi = new SpotifyWebApi();

function Player(props) {
	const [title, setTitle] = useState('No song playing');
	const [artist, setArtist] = useState('No song playing');
	const [albumCover, setAlbumCover] = useState(null);
	const [currentlyPlaying, setCurrentlyPlaying] = useState(false);
	const [currentProgress, setCurrentProgress] = useState(0);
	const [upToDate, setUpToDate] = useState(false);
	const [firstLoad, setFirstLoad] = useState(true)

	

	useEffect(() => {
		if (firstLoad) {
			setFirstLoad(false);
			setInterval(() => setUpToDate(false), 10000);
		}
		if (!upToDate) {
			setUpToDate(true);
			console.log("Calling currentSong()")
			currentSong();
		}
	});

	const currentSong = () => {		
			if (props.loggedIn) {
				spotifyApi.getMyCurrentPlayingTrack().then((response) => {
					if (response.is_playing) {
						console.log("is playing")
						if (response.progress_ms < currentProgress) {
							props.setNewSong(true);
						}
						setCurrentlyPlaying(true);
						setArtist(response.item?.artists[0].name);
						setCurrentProgress(response.progress_ms);
						setTitle(response.item?.name);
						setAlbumCover(response.item?.album.images[2].url);
					} else {
						console.log("isn't playing")
						setArtist('No song playing');
						setCurrentProgress(0);
						setTitle('No song playing');
						setCurrentlyPlaying(false);
					}
				});
			} else {
				console.log("not logged in")
				setArtist('No song playing');
				setTitle('No song playing');
				setCurrentProgress(0);
				setCurrentlyPlaying(false);
			}			
	};

	return (
		<div className="Player">
			{currentlyPlaying && (
				<Paper variant="outlined" elevation={2}>
					<Typography variant="subtitle2">Currently Playing:</Typography>
					<img src={albumCover} alt="album cover"></img>
					<Typography variant="body1">
						{title} by {artist}
					</Typography>
				</Paper>
			)}
		</div>
	);
}

export default Player;
