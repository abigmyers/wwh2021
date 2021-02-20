import React from "react";

import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function SearchBar(props) {
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
    
    
      
    </div>
  );
}

export default SearchBar;
