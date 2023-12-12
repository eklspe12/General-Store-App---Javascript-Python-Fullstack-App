import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

function AddStock({ stocks, setStocks }) {
	const [allProducts, setAllProducts] = useState([]);
	const [allLocations, setAllLocations] = useState([]);

	useEffect(() => {
		fetch('/products')
			.then((r) => {
				if (r.ok) {
					return r.json();
				}
				throw new Error('Failed to fetch products');
			})
			.then((data) => {
				setAllProducts(data);
			})
			.catch((error) => {
				console.error(error);
			});
		fetch('/locations')
			.then((r) => {
				if (r.ok) {
					return r.json();
				}
				throw new Error('Failed to fetch locations');
			})
			.then((data) => {
				setAllLocations(data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const validationSchema = Yup.object().shape({
		product_id: Yup.number()
			.required('Product ID is required')
			.positive('Product ID must be a postive number'),
		quantity: Yup.number()
			.typeError('Quantity must be a number')
			.positive('Quantity must be a positive number')
			.required('Quantity is required'),
		location_id: Yup.number()
			.positive('Location ID must be a number')
			.required('Location ID is required'),
	});

	const formik = useFormik({
		initialValues: {
			product_id: '',
			quantity: '',
			location_id: '',
		},
		validationSchema,
		onSubmit: async (values) => {
			try {
				console.log('Submitting new stock: ', values);

				const response = await fetch('/stocks', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(values),
				});

				if (response.ok) {
					const data = await response.json();
					setStocks([...stocks, data]);
					formik.resetForm();
				} else {
					console.error('Failed to add stock');
				}
			} catch (error) {
				console.error(`Error adding stock: ${error}`);
			}
		},
	});

	const handleAddProduct = () => {
		const { product_id, location_id } = formik.values;

		const isProductValid = allProducts.some(
			(product) => product.id === product_id
		);
		const isLocaitonValid = allLocations.some(
			(location) => location.id === location_id
		);

		if (!isProductValid) {
			console.error('Invalid Product ID');
			formik.setFieldError('product_id', 'Invalid Product ID');
			return;
		}
		if (!isLocaitonValid) {
			console.error('Invalid Location ID');
			formik.setFieldError('location_id', 'Invalid Location ID');
			return;
		}
		formik.handleSubmit();
	};

	return (
		<form onSubmit={formik.handleSubmit}>
			<div className="newStockForm">
				<h1 className="stockFormHeader">Add New Inventory</h1>
				<div className="stockInput">
					<label htmlFor="product_id">Product ID</label>
					<input
						type="number"
						name="product_id"
						value={formik.values.product_id}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					{formik.touched.product_id && formik.errors.product_id ? (
						<div className="error">{formik.errors.product_id}</div>
					) : null}
				</div>
				<div className="stockInput">
					<label htmlFor="quantity">Quantity</label>
					<input
						type="number"
						name="quantity"
						value={formik.values.quantity}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					{formik.touched.quantity && formik.errors.quantity ? (
						<div className="error">{formik.errors.quantity}</div>
					) : null}
				</div>
				<div className="stockInput">
					<label htmlFor="location_id">Location ID</label>
					<input
						type="number"
						name="location_id"
						value={formik.values.location_id}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					{formik.touched.location_id && formik.errors.location_id ? (
						<div className="error">{formik.errors.location_id}</div>
					) : null}
				</div>
			</div>
			<button
				type="button"
				onClick={handleAddProduct}
				className="addStockButton"
			>
				Add Product
			</button>
		</form>
	);
}

export default AddStock;
