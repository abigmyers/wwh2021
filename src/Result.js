import React from 'react';

import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core';

function Result(props) {
	return (
		<Card className="Result" style={{ backgroundColor: '#303330' }}>
			<CardContent>
				<Grid container alignItems="center" alignContent="space-between">
					<Grid item xs={1}>
						<img
							src="https://i.scdn.co/image/ab67616d0000b2738f9a38eaef72352da716ccdb"
							style={{ height: '60px', width: '60px' }}
						/>
					</Grid>
					<Grid item xs={3}>
						<Typography variant="h6" color="secondary">
							Title
						</Typography>
					</Grid>
					<Grid item xs={3}>
						{props.result.artists.map((artist) => (
							<Typography variant="h6" color="secondary">
								Artist
							</Typography>
						))}
					</Grid>
					<Grid item xs={3}>
						<Typography variant="h6" color="secondary">
							Album
						</Typography>
					</Grid>
					<Grid item xs={2}>
						<Button variant="contained" color="primary">
							Add to Queue
						</Button>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}

export default Result;
