import React, { useState } from "react";

import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';


import Container from '@material-ui/core/Container';
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
      props.spotifyApi.searchTracks(searchTerm, { "limit": "5" })
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
            onKeyPress={handleKey}
            onChange={handleChange}
            InputProps={{ startAdornment: <SearchIcon />, endAdornment: <Button variant="contained" onClick={search}>Search</Button> }}
          />
        </FormControl>
      </Container>
    </div>
  );
}

export default SearchBar;
