import React, { useState } from 'react';

import Result from './Result';

import { FormControl, Container, Button, TextField } from '@material-ui/core';
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
		if (props.loggedIn) {
			props.spotifyApi.searchTracks(searchTerm, { limit: '5' }).then((response) => {
				setSearchResults([
					{ title: response.tracks.items[0]?.name, artists: response.tracks.items[0]?.artists, album: response.tracks.items[0]?.album.name, image: response.tracks.items[0]?.album.images[2].url, id: response.tracks.items[0]?.id },
					{ title: response.tracks.items[1]?.name, artists: response.tracks.items[1]?.artists, album: response.tracks.items[1]?.album.name, image: response.tracks.items[1]?.album.images[2].url, id: response.tracks.items[1]?.id },
					{ title: response.tracks.items[2]?.name, artists: response.tracks.items[2]?.artists, album: response.tracks.items[2]?.album.name, image: response.tracks.items[2]?.album.images[2].url, id: response.tracks.items[2]?.id },
					{ title: response.tracks.items[3]?.name, artists: response.tracks.items[3]?.artists, album: response.tracks.items[3]?.album.name, image: response.tracks.items[3]?.album.images[2].url, id: response.tracks.items[3]?.id },
					{ title: response.tracks.items[4]?.name, artists: response.tracks.items[4]?.artists, album: response.tracks.items[4]?.album.name, image: response.tracks.items[4]?.album.images[2].url, id: response.tracks.items[4]?.id }
				]);
				
				setHasSearched(true);
			});
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
            variant="filled"
						label="Search"
            color="primary"
						onKeyPress={handleKey}
						onChange={handleChange}
						InputProps={{
							startAdornment: <SearchIcon />,
							endAdornment: (
								<Button variant="contained" onClick={search}>
									Search
								</Button>
							)
						}}
            style={{background: "#ffffff"}}
					/>
				</FormControl>
			</Container>
			<br />
			{hasSearched && (
				<Container>
					{searchResults.map((result) => (
						<Result result={result} />
					))}
				</Container>
			)}
		</div>
	);
}

export default SearchBar;
