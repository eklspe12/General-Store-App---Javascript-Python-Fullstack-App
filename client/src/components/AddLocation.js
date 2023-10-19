import React, { useEffect, useState } from "react";
import {Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';


function AddLocation() {
const [locations, setLocations] = useState([])
const [originalLocations, setOriginalLocations] = useState([])


useEffect(() => {
    fetch("/locations")
    .then((r) => r.json())
    .then((locations) => {
        setLocations(locations)
        setOriginalLocations(locations)
        console.log(locations)} )

}, []);

const validationSchema = Yup.object().shape({
  address: Yup.string().required('Address is required'),
});

const formik = useFormik({
  initialValues: {
    address: '',
  },
  validationSchema,
  onSubmit: async (values) => {
    try {
      console.log('Submitting new location:', values);

      const response = await fetch('/locations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        setLocations([...locations, data]);
        formik.resetForm();
      } else {
        console.error('Failed to add location');
      }
    } catch (error) {
      console.error(`Error adding location: ${error}`);
    }
  },
});


return (
  <form onSubmit={formik.handleSubmit}>
  <div className="newLocationForm">
        <h1 className="formHeader">Add New Location</h1>
        <div>
            <label htmlFor="address">Address</label>
            <input type="text" name='address' value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            {formik.touched.address && formik.errors.address ? (
              <div className="error">{formik.errors.address}</div>
            ) : null}
    </div>
    </div>
    <button type="submit">Add Location</button>
  </form>
    

)


}

export default AddLocation