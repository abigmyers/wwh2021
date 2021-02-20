import React, { useState, useEffect } from "react";

import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

function SearchBar(props) {
  const [searches, showSearches] = useState(false);
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
  };

  if(!searches){
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
        InputProps={{startAdornment: <SearchIcon />, endAdornment: <Button variant="contained" onClick={() => showSearches(true)}>Search</Button>}}
      />
        </FormControl>
      </Container>
      </div>
    );
  } else{
    return(
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

        <Card >
          <CardContent>
            <h3>Song to add</h3>
          </CardContent>
        </Card>
        <Card >
          <CardContent>
          <h3>Song to add</h3>
          </CardContent>
        </Card>
        <Card >
          <CardContent>
          <h3>Song to add</h3>
          </CardContent>
        </Card>
        <Card >
          <CardContent>
          <h3>Song to add</h3>
          </CardContent>
        </Card>
        <Card >
          <CardContent>
          <h3>Song to add</h3>
          </CardContent>
        </Card>
      </Container>
      </div>
    );
  }
}

export default SearchBar;
