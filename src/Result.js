import React from 'react';

import { Button, Card, CardContent, Grid } from '@material-ui/core';

function Result(props) {

	const queueSong = () => {
		if (props.loggedIn) {
			props.spotifyApi.queue(props.result.uri);
		}
	}

	return (
		<div className="Result">
			<Card>
				<CardContent>
					<Grid container spacing={2}>
						<Grid item xs>
							<h3>{props.result.title}</h3>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={queueSong}>Add to Queue</Button>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</div>
	);
}

export default Result;
