import ProductList from './ProductList';
import AddProduct from './AddProduct';
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Store = ({
	setSearch,
	setSearchMade,
	products,
	search,
	searchMade,
	setProducts,
	originalProducts,
}) => {
	const formik = useFormik({
		initialValues: {
			search: search,
		},
		validationSchema: Yup.object({
			search: Yup.string().required('Please enter search term'),
		}),
		onSubmit: (values) => {
			handleSearch(values.search);
		},
	});

	function handleDelete(productToDelete) {
		const updatedProducts = products.filter((p) => p.id !== productToDelete.id);
		setProducts(updatedProducts);
	}

	function updateProduct(updatedProduct) {
		const updatedProducts = products.map((product) => {
			if (product.id != updatedProduct.id) {
				return product;
			} else {
				return updatedProduct;
			}
		});
		setProducts(updatedProducts);
	}

	useEffect(() => {
		document.title = 'Products';
	}, []);
	const handleSearch = (search) => {
		setSearchMade(!!search.trim());
		if (search.trim() === '') {
			setProducts(originalProducts);
		} else {
			const filteredProducts = originalProducts.filter((product) =>
				product.name.toLowerCase().includes(search.toLowerCase())
			);
			setProducts(filteredProducts);
		}
	};

	const handleChange = (e) => {
		const { value } = e.target;
		formik.handleChange(e);
		setSearch(value);
		handleSearch(value);
	};

	return (
		<div className="searchBG">
			<AddProduct products={products} setProducts={setProducts} />

			<div className="searchContainer">
				<form onSubmit={formik.handleSubmit} className="searchBar">
					<input
						name="search"
						type="text"
						className="searchInput"
						placeholder="Search available items..."
						value={formik.values.search}
						onChange={handleChange}
					></input>
					{formik.touched.search && formik.errors.search ? (
						<div className="searchError">{formik.errors.search}</div>
					) : null}

					<input
						className="searchBtn"
						type="submit"
						value="Search products."
					></input>
				</form>
			</div>

			<div className="gridWrapper">
				<div className="storeContainer">
					{searchMade && products.length === 0 ? (
						<p className="searchError">
							No result's found, please check spelling.
						</p>
					) : (
						<div>
							<ProductList
								products={products}
								updateProduct={updateProduct}
								onDelete={handleDelete}
								setProducts={setProducts}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Store;
