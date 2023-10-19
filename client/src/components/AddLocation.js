import React, { useEffect, useState } from "react";

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

const [formData, setFormData] = useState({
    address:""
});
const [errors, setErrors] = useState([]);

const handleChange = (e) => {
const {name, value} = e.target;
setFormData({
    ...formData,
    [name]: value,
});
}

function addLocation(newLocation) {
setLocations([...locations, newLocation])
}


const handleSubmit = async (e) => {
e.preventDefault();
const newLocation = {
    address:formData.address
};

try {
    // Send a POST request to the server
    console.log("Submitting new location:", newLocation);

    const response = await fetch('/locations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newLocation),
    });

    if (response.ok) {
      // If the request was successful, add the new location to the state
      const data = await response.json();
      setLocations([...locations, data]);

      // Reset the form fields and errors
      setFormData({
        address:"",
      });
    } else {
      // Handle errors, e.g., show a message to the user
      console.error('Failed to add location');
    }
  } catch (error) {
    console.error(`Error adding location: ${error}`);
  }
};

return (
<form onSubmit={handleSubmit}>
    <div className="newLocationForm">
        <h1 className="formHeader">Add New Location</h1>
            <label htmlFor="address">Address</label>
            <input name='address' value={formData.address} onChange={handleChange}/>
    </div>
    <button type="submit">Add Location</button>
</form>
)


}

export default AddLocation