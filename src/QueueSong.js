import React from "react";

import { Grid } from "@material-ui/core";

function QueueSong(props) {
  	return (
    	<div className="QueueSong">
      		<Grid container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
        		<Grid item xs={3}>
					<img src={props.song.image} style={{height:"60px", width:"60px"}} />
				</Grid>
				<Grid item xs={3}>
					<h2>{props.song.title}</h2>
				</Grid>
				<Grid item xs={3}>
					{props.song.artists.map((artist) => (
						<h2>{artist}</h2>
					))}
				</Grid>
				<Grid item xs={3}>
					<h2>{props.song.album}</h2>
				</Grid>
			</Grid>
		</div>
	);
}

export default QueueSong;
