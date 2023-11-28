import React, { useState, useEffect } from 'react';
import AddStock from './AddStock';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AddLocation from './AddLocation';

function SearchBar() {
	const [stocks, setStocks] = useState([]);
	const [searchedTerm, setSearchedTerm] = useState('');
	const [filteredStocks, setFilteredStocks] = useState([]);

	const formik = useFormik({
		initialValues: {
			search: '',
		},
		validationSchema: Yup.object({
			search: Yup.string().required('Please enter search term'),
		}),
		onSubmit: (values) => {
			setSearchedTerm(values.search);
		},
	});

	useEffect(() => {
		fetch('/stocks')
			.then((r) => r.json())
			.then((stocks) => {
				setStocks(stocks);
				console.log(stocks);
			});
	}, []);

	useEffect(() => {
		const filtered = stocks.filter((stock) => {
			const productName = stock.product.name.toLowerCase();
			const locationAddress = stock.location.address.toLowerCase();
			const query = searchedTerm.toLowerCase();

			return productName.includes(query) || locationAddress.includes(query);
		});

		setFilteredStocks(filtered);
	}, [searchedTerm, stocks]);

	const handleSearchChange = (event) => {
		formik.handleChange(event);
		setSearchedTerm(event.target.value);
	};

	return (
		<div>
			<div className="addContainer">
				<div className="addStockContainer">
					<AddStock stocks={stocks} setStocks={setStocks} />
				</div>
				<div className="addLocationContaienr">
					<AddLocation />
				</div>
			</div>
			<form onSubmit={formik.handleSubmit} className="stockSearch">
				<input
					name="search"
					type="text"
					className="searchInput"
					placeholder="Search available items..."
					value={formik.values.search}
					onChange={handleSearchChange}
				/>
				{formik.touched.search && formik.errors.search ? (
					<div className="searchError">{formik.errors.search}</div>
				) : null}

				<input
					className="searchBtn"
					type="submit"
					value="Search products."
				></input>
			</form>

			<ul className="searchUl">
				{filteredStocks.map((stock) => (
					<li className="stocks" key={stock.id}>
						<p>
							{stock.product ? stock.product.name : 'N/A'}, Address:
							{stock.location ? stock.location.address : 'N/A'}, Quantity:{' '}
							{stock.quantity}
						</p>
					</li>
				))}
			</ul>
		</div>
	);
}

export default SearchBar;
