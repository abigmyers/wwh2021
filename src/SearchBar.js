import React, { useState } from 'react';

import Result from './Result';

import { FormControl, Container, Button, TextField, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

function SearchBar(props) {
	const [hasSearched, setHasSearched] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState(undefined);

	const handleKey = (event) => {
		if (event.key === 'Enter') {
			setSearchTerm(event.target?.value);
			search();
		}
	};

	const search = () => {
		if (props.loggedIn && searchTerm != '') {
			props.spotifyApi.searchTracks(searchTerm, { limit: '5' }).then((response) => {
				if (response.tracks.items.length > 0) {
					document.getElementById('errorMessage').style.display = 'none';
					setSearchResults([
						{
							title: response.tracks.items[0]?.name,
							artists: response.tracks.items[0]?.artists,
							album: response.tracks.items[0]?.album.name,
							image: response.tracks.items[0]?.album.images[1].url,
							uri: response.tracks.items[0]?.uri,
						},
						{
							title: response.tracks.items[1]?.name,
							artists: response.tracks.items[1]?.artists,
							album: response.tracks.items[1]?.album.name,
							image: response.tracks.items[1]?.album.images[1].url,
							uri: response.tracks.items[1]?.uri,
						},
						{
							title: response.tracks.items[2]?.name,
							artists: response.tracks.items[2]?.artists,
							album: response.tracks.items[2]?.album.name,
							image: response.tracks.items[2]?.album.images[1].url,
							uri: response.tracks.items[2]?.uri,
						},
						{
							title: response.tracks.items[3]?.name,
							artists: response.tracks.items[3]?.artists,
							album: response.tracks.items[3]?.album.name,
							image: response.tracks.items[3]?.album.images[1].url,
							uri: response.tracks.items[3]?.uri,
						},
						{
							title: response.tracks.items[4]?.name,
							artists: response.tracks.items[4]?.artists,
							album: response.tracks.items[4]?.album.name,
							image: response.tracks.items[4]?.album.images[1].url,
							uri: response.tracks.items[4]?.uri,
						},
					]);

					setHasSearched(true);
				} else {
					setSearchResults([]);
					document.getElementById('errorMessage').style.display = 'block';
				}
			});
		} else if (searchTerm == '') {
			setSearchResults([]);
		}
	};

	const handleChange = (event) => {
		setSearchTerm(event?.target.value);
	};

	return (
		<div className="SearchBar">
			<Container maxWidth="sm">
				<FormControl fullWidth>
					<TextField
						id="filled-basic"
						variant="outlined"
						color="primary"
						onKeyPress={handleKey}
						onChange={handleChange}
						InputProps={{  
							startAdornment: <SearchIcon style={{color:"#1ed760"}}/>,
							endAdornment: (
								<Button variant="contained" color="primary" onClick={search}>
									Search
								</Button>
							),
						}}
						style={{ background: '#ffffff'}}
					/>
				</FormControl>
			</Container>
			<br />
			<div id="errorMessage" style={{textAlign: 'center', display: 'none'}}>
				<Typography color="error">No results found.</Typography>
			</div>
			<br />
			{hasSearched && (
				<Container>
					{searchResults.map((result) => (
						<Result
							result={result}
							spotifyApi={props.spotifyApi}
							loggedIn={props.loggedIn}
							queue={props.queue}
							setQueue={props.setQueue}
						/>
					))}
				</Container>
			)}
		</div>
	);
}

export default SearchBar;
