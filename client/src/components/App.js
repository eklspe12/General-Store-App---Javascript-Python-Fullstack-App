import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Store from './Store';
import Home from './Home';
import LocationFinder from './LocationFinder';

function App() {
	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState(null);
	const [searchMade, setSearchMade] = useState(false);
	const [originalProducts, setOriginalProducts] = useState([]);

	useEffect(() => {
		fetch('/products')
			.then((r) => r.json())
			.then((products) => {
				setProducts(products);
				setOriginalProducts(products);
				console.log(products);
			});
	}, []);

	return (
		<>
			<NavBar />
			<div className="container">
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/location_finder">
						<LocationFinder />
					</Route>
					<Route path="/store">
						<Store
							products={products}
							search={search}
							searchMade={searchMade}
							setSearch={setSearch}
							setProducts={setProducts}
							setSearchMade={setSearchMade}
							originalProducts={originalProducts}
						/>
					</Route>
				</Switch>
			</div>
		</>
	);
}

export default App;
