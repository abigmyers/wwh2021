import React from 'react';

import { Button, Card, CardContent, Grid } from '@material-ui/core';

function Result(props) {
	return (
		<div className="Result">
			<Card>
				<CardContent>
					<Grid container spacing={2}>
						<Grid item xs>
							<h3>Song to add</h3>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained">Add to Queue</Button>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</div>
	);
}

export default Result;
