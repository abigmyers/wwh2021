import React from 'react';

import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core';

function Result(props) {
	const queueSong = () => {
		if (props.loggedIn) {
			props.setQueue([...props.queue, props.result]);
			props.spotifyApi.queue(props.result.uri);
		}
	};

	return (
		<Card className="Result" style={{ backgroundColor: '#303330' }}>
			<CardContent>
				<Grid container alignItems="center" alignContent="space-between" spacing={2}>
					<Grid item xs={1}>
						<img alt="Album Cover" src={props.result.image} style={{ height: '60px', width: '60px' }} />
					</Grid>
					<Grid item xs={3}>
						<Typography variant="h6" color="secondary">
							{props.result.title}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						{props.result.artists.map((artist) => (
							<Typography variant="h6" color="secondary">
								{artist.name}
							</Typography>
						))}
					</Grid>
					<Grid item xs={3}>
						<Typography variant="h6" color="secondary">
							{props.result.album}
						</Typography>
					</Grid>
					<Grid item xs={2}>
						<Button variant="contained" color="primary" onClick={queueSong}>
							Add to Queue
						</Button>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}

export default Result;
