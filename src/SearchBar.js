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
			search();
		}
	};

	const search = () => {
		if (props.loggedIn) {
			props.spotifyApi.searchTracks(searchTerm, { limit: '5' }).then((response) => {
				setSearchResults(response.tracks);
				console.log(searchResults);
				setHasSearched(true);
			});
		}
	};

	const handleChange = (event) => {
		setSearchTerm(event?.target.value);
	};

	return (
		<div
			className="SearchBar"
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Container maxWidth="sm">
				<FormControl fullWidth>
					<TextField
						id="standard-name"
						label="Search"
						onKeyPress={handleKey}
						onChange={handleChange}
						InputProps={{
							startAdornment: <SearchIcon />,
							endAdornment: (
								<Button variant="contained" onClick={search}>
									Search
								</Button>
							),
						}}
					/>
				</FormControl>
			</Container>
			{hasSearched && searchResults.map((result) => <Result result={result} />)}
		</div>
	);
}

export default SearchBar;
