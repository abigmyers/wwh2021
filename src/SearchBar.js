import React from "react";

import { Grid, TextField } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

function SearchBar(props) {
  return (
    <div className="SearchBar">
      
      <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <SearchIcon />
          </Grid>
          <Grid item>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          </Grid>
        </Grid>
    </div>
  );
}

export default SearchBar;
