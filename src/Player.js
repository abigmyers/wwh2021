import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { Paper, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';


const spotifyApi = new SpotifyWebApi();

function Player(props) {
	const [title, setTitle] = useState('No song playing');
	const [artist, setArtist] = useState('No song playing');
	const [albumCover, setAlbumCover] = useState(null);
	const [album, setAlbum] = useState("No album");
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
			currentSong();
		}
	});

	const currentSong = () => {		
			if (props.loggedIn) {
				spotifyApi.getMyCurrentPlayingTrack().then((response) => {
					if (response.is_playing) {
						if (response.progress_ms < currentProgress) {
							props.setNewSong(true);
						}
						setCurrentlyPlaying(true);
						setArtist(response.item?.artists[0].name);
						setCurrentProgress(response.progress_ms);
						setTitle(response.item?.name);
						setAlbum(response.item?.album.name);
						setAlbumCover(response.item?.album.images[2].url);
					} else {
						setArtist('No song playing');
						setCurrentProgress(0);
						setTitle('No song playing');
						setAlbum('No album');
						setCurrentlyPlaying(false);
					}
				});
			} else {
				setArtist('No song playing');
				setTitle('No song playing');
				setAlbum('No album');
				setCurrentProgress(0);
				setCurrentlyPlaying(false);
			}			
	};

	return (
		<div className="Player">
			{currentlyPlaying && (
				<Paper variant="outlined" elevation={2} style={{backgroundColor: "#222222", width: "70%", marginLeft: "15%", marginTop: "2%", marginBottom: "2%", marginRight: "15%"}} >
					<Grid container alignItems="center" alignContent="space-between" spacing={2}>
						<Grid item xs={3.5}>
							<Typography variant="subtitle2" style={{WebkitTextFillColor: "white"}}>Currently Playing:</Typography>
							<img src={albumCover} alt="album cover" style={{margin: "10%", height: "100px"}}></img>
						</Grid>
						<Grid item xs={5}>
							<Typography variant="body1" style={{WebkitTextFillColor: "white", margin: "2%"}} >
								Title: {title}
							</Typography>
							<Typography variant="body1" style={{WebkitTextFillColor: "white", margin: "2%"}} >
								Album: {album}
							</Typography>
							<Typography variant="body1" style={{WebkitTextFillColor: "white", margin: "2%"}} >
								Artist: {artist}
							</Typography>
						</Grid>
					</Grid>


				</Paper>
			)}
		</div>
	);
}

export default Player;
