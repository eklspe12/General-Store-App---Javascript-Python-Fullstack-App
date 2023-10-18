import React, {useState} from "react"

const AddProduct = ({products, setProducts}) => {
    const [formData, setFormData] = useState({
        name:"",
        image:"",
        description:"",
        price:"",
    });
    const [errors, setErrors] = useState([]);

const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
}

function addProduct(newProduct) {
    setProducts([...products, newProduct])
}


const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
        name:formData.name,
        description:formData.description,
        image:formData.image,
        price:formData.price,
    };

    try {
        // Send a POST request to the server
        console.log("Submitting new product:", newProduct);

        const response = await fetch('/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        });
  
        if (response.ok) {
          // If the request was successful, add the new product to the state
          const data = await response.json();
          setProducts([...products, data]);
  
          // Reset the form fields and errors
          setFormData({
            name: "",
            image: "",
            description: "",
            price: "",
          });
        } else {
          // Handle errors, e.g., show a message to the user
          console.error('Failed to add product');
        }
      } catch (error) {
        console.error(`Error adding product: ${error}`);
      }
    };

return (
    <form onSubmit={handleSubmit}>
        <div className="newProductForm">
            <h1 className="formHeader">Add New Product</h1>
                <label htmlFor="name">Name</label>
                <input name='name' value={formData.name} onChange={handleChange}/>
                <label htmlFor="description">Description</label>
                <input name='description' value={formData.description} onChange={handleChange}/>
                <label htmlFor="image">Image URL</label>
                <input name="image" value={formData.image} onChange={handleChange}/>
                <label htmlFor="price">Price</label>
                <input name="price" value={formData.price} onChange={handleChange}/>   
        </div>
        <button type="submit">Add Product</button>
    </form>
)

}

export default AddProduct