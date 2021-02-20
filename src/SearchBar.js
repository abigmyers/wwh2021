import React, { useState } from "react";

import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import { Search } from "@material-ui/icons";


import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
    <div className="SearchBar" style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>

    <Container maxWidth="sm">
      <FormControl fullWidth>
      <TextField
      id="standard-name"
      label="Search"
      InputProps={{startAdornment: <SearchIcon />, endAdornment: <Button variant="contained">Search</Button>}}
    />
      </FormControl>
    </Container>
    
    
      
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
