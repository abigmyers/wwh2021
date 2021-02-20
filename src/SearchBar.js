import React, { useState } from "react";

import { Grid, TextField } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { Search } from "@material-ui/icons";



function SearchBar(props) {

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(undefined);

  const handleKey = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  const search = () => {
    if (props.loggedIn) {
      props.spotifyApi.searchTracks(searchTerm, {"limit":"5"})
        .then((response) => {
          setSearchResults(response.tracks);
          console.log(searchResults);
        });
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event?.target.value);
  }

  return (
    <div className="SearchBar">
      
      <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <SearchIcon />
          </Grid>
          <Grid item>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" onKeyPress={handleKey} onChange={handleChange} />
          </Grid>
        </Grid>
    </div>
  );
}

export default SearchBar;
