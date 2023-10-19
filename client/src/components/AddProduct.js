import React, {useState} from "react"
import {Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';


const AddProduct = ({products, setProducts}) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    image: Yup.string().required('Image URL required'),
    price: Yup.string().required('Price is required')
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      description:'',
      image:'',
      price:''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log('Submitting new product');

        const response = await fetch('/products', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          const data = await response.json();
          setProducts([...products, data]);
          formik.resetForm()
        } else {
          console.error('Failed to add product')
        }
      } catch (error) {
        console.error(`Error adding product: ${error}`)
      }
    },
  });

return (
    <form onSubmit={formik.handleSubmit}>
        <div className="newProductForm">
            <h1 className="formHeader">Add New Product</h1>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                {formik.touched.name && formik.errors.name ? (
                        <div className="error">{formik.errors.name}</div>
                        ) : null}
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <input type="text" name='description' value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                {formik.touched.description && formik.errors.description ? (
                        <div className="error">{formik.errors.description}</div>
                        ) : null}
            </div>
            <div>
                <label htmlFor="image">Image URL</label>
                <input type="text" name="image" value={formik.values.image} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                {formik.touched.image && formik.errors.image ? (
                        <div className="error">{formik.errors.image}</div>
                        ) : null}
            </div>
            <div>
                <label htmlFor="price">Price</label>
                <input type="number" name="price" value={formik.values.price} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                {formik.touched.price && formik.errors.price ? (
                        <div className="error">{formik.errors.price}</div>
                        ) : null}
            </div>
                   
        
        </div>
        <button type="submit">Add Product</button>
    </form>
)

}

export default AddProduct