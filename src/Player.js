import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { Paper, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const spotifyApi = new SpotifyWebApi();

function Player(props) {
	const [title, setTitle] = useState('No song playing');
	const [artist, setArtist] = useState([]);
	const [albumCover, setAlbumCover] = useState(null);
	const [album, setAlbum] = useState('No album');
	const [currentlyPlaying, setCurrentlyPlaying] = useState(false);
	const [currentProgress, setCurrentProgress] = useState(0);
	const [upToDate, setUpToDate] = useState(false);
	const [firstLoad, setFirstLoad] = useState(true);

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
					console.log(response)
					if (response.progress_ms < currentProgress) {
						props.setNewSong(true);
					}
					setCurrentlyPlaying(true);

					const tempA = [];
					response.item?.artists.map(a => {
						tempA.push(a.name);
					});
					setArtist([...tempA]);

					setCurrentProgress(response.progress_ms);
					setTitle(response.item?.name);
					setAlbum(response.item?.album.name);
					setAlbumCover(response.item?.album.images[1].url);
				} else {
					setArtist([]);
					setCurrentProgress(0);
					setTitle('No song playing');
					setAlbum('No album');
					setCurrentlyPlaying(false);
				}
			});
		} else {
			setArtist([]);
			setTitle('No song playing');
			setAlbum('No album');
			setCurrentProgress(0);
			setCurrentlyPlaying(false);
		}
	};

	return (
		<div className="Player">
			{currentlyPlaying && (
				<Paper
					variant="outlined"
					elevation={2}
					style={{
						backgroundColor: '#222222',
						width: '70%',
						marginLeft: '15%',
						marginTop: '2%',
						marginBottom: '2%',
						marginRight: '15%',
					}}
				>
					<Grid container alignItems="center" alignContent="space-between" spacing={2}>
						<Grid item xs={2}>
							<Typography
								variant="subtitle2"
								style={{ WebkitTextFillColor: 'white', paddingTop: '10px', paddingLeft: '20px' }}
							>
								Currently Playing:
							</Typography>
							<img
								src={albumCover}
								alt="album cover"
								style={{ margin: '10%', height: '100px', paddingLeft: '5px' }}
							></img>
						</Grid>
						<Grid item xs={10}>
							<Typography variant="body1" style={{ WebkitTextFillColor: 'white', margin: '2%' }}>
								<b style={{ WebkitTextFillColor: '#1ed760' }}>Title:</b> {title}
							</Typography>
							<Typography variant="body1" style={{ WebkitTextFillColor: 'white', margin: '2%' }}>
								<b style={{ WebkitTextFillColor: '#1ed760' }}>Album:</b> {album}
							</Typography>
							<Typography variant="body1" style={{ WebkitTextFillColor: 'white', margin: '2%' }}>
								<b style={{ WebkitTextFillColor: '#1ed760' }}>Artist:</b> {artist[0]}{artist.slice(1).map((a) => ", " + a)}
							</Typography>
						</Grid>
					</Grid>
				</Paper>
			)}
		</div>
	);
}

export default Player;
