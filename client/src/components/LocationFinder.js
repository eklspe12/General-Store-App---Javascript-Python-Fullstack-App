import SearchBar from './SearchBar';
import React, { useEffect } from 'react';

const LocationFinder = () => {
	useEffect(() => {
		document.title = 'Find Locations';
	}, []);

	return (
		<div className="locationFinder">
			<SearchBar />
		</div>
	);
};

export default LocationFinder;
