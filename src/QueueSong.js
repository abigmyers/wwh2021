import React from "react";

import { Grid, Paper, Typography } from "@material-ui/core";

function QueueSong(props) {
  return (
    <Paper elevation="3" style={{width: '100%', padding: '10px', backgroundColor: '#303330'}}>
      <Grid container className="QueueSong"
        alignItems="center"
      >
        <Grid item xs={1}>
          <img src={props.song?.image} style={{height:"60px", width:"60px"}} />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" color="secondary">{props.song?.title}</Typography>
        </Grid>
        <Grid item xs={4}>
          {props.song?.artists?.map((artist) => (
            <Typography variant="h6" color="secondary">{artist}</Typography>
          ))}
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" color="secondary">{props.song?.album}</Typography>
        </Grid>
      </Grid>
    </Paper>
    
	);
}

export default QueueSong;
