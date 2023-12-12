import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ProductCard = ({ product, onDelete, updateProduct }) => {
	const [isFlipped, setIsFlipped] = useState(false);
	const handleClick = () => {
		setIsFlipped(!isFlipped);
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string().required('Name is required'),
		description: Yup.string().required('Description is required'),
		image: Yup.string().required('Image URL is required'),
		price: Yup.number()
			.typeError('Price must be a number')
			.required('Price is required'),
	});

	const deleteProduct = () => {
		fetch(`/products/${product.id}`, {
			method: 'DELETE',
		})
			.then((response) => {
				if (response.status === 204) {
					console.log('Product deleted successfully');
					onDelete(product);
				} else {
					console.error('Error deleting product');
				}
			})
			.catch((error) => {
				console.error('Network error:', error);
			});
	};


	return (
		<div className={isFlipped ? 'cardback' : 'productCard'}>
			{isFlipped ? (
				<Formik
					initialValues={product}
					validationSchema={validationSchema}
					onSubmit={(values, { setSubmitting }) => {
						fetch(`/products/${product.id}`, {
							method: 'PATCH',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify(values),
						})
							.then((r) => {
								if (r.status === 202) {
									return r.json().then((p) => {
										updateProduct(p);
										setIsFlipped(!isFlipped);
									});
								}
							})
							.catch((error) => {
								console.error('Network error:', error);
							})
							.finally(() => {
								setSubmitting(false);
							});
					}}
				>
					{({ errors, touched }) => (
						<Form className="productCard editForm">
							<h3>Edit Product</h3>
							<div>
								Name
								<Field type="text" name="name" />
								<ErrorMessage name="name" component="div" className="error" />
							</div>
							<div>
								Image URL
								<Field type="text" name="image" />
								<ErrorMessage name="image" component="div" className="error" />
							</div>
							<div>
								Description
								<Field type="text" name="description" />
								<ErrorMessage
									name="description"
									component="div"
									className="error"
								/>
							</div>
							<div>
								Price
								<Field type="text" name="price" />
								<ErrorMessage name="price" component="div" className="error" />
							</div>
							<button className="saveBtn" type="submit">
								Save
							</button>
							<button
								className="viewBtn"
								onClick={() => setIsFlipped(!isFlipped)}
							>
								View Product
							</button>
						</Form>
					)}
				</Formik>
			) : (
				<div className="productCard">
					<h2>{product.name}</h2>
					<h3>
						<img src={product.image} alt={product.name} />
					</h3>
					<h4>{product.description}</h4>
					<h3>${product.price}</h3>
					<button className="editBtn" onClick={handleClick}>
						Edit Product
					</button>

					<button className="deleteBtn" onClick={deleteProduct}>
						Remove from catalog.
					</button>
				</div>
			)}
		</div>
	);
};

export default ProductCard;
