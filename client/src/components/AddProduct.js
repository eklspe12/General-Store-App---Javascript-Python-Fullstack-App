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


async function postProduct() {
    const config = {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(formData),
    };
    const res = await fetch('/products', config);
    if (res.ok) {
        const newPro = await res.json();
        onProductRequest(newPro);
        setFormData({
            name:"",
            description:"",
            image:"",
            price:"",
        });
        setErrors([]);
    } else {
        const messages = await res.json();
        setErrors(messages.erros)
    }
}


// const handleSubmit = (e) => {
//     e.preventDefault();
//     const newProduct = {
//         name:formData.name,
//         description:formData.description,
//         image:formData.image,
//         price:formData.price,
//     }

//     fetch('/products', {
//         method: "POST",
//         headers :{
//             "Content-Type":"application/json",
//         },
//         body: JSON.stringify(newProduct),
//     })
//     .then((r) => r.json())
//     .then((data) => {
//     addProduct(data);
//     })
//     .catch((error) => {
//         console.error(`Error adding product: ${error}`);
//     })
//     setFormData({
//         name:"",
//         description:"",
//         image:"",
//         price:""
//     })
// };

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
        <button type="submit" onClick={handleSubmit}>Add Product</button>
    </form>
)

}

export default AddProduct