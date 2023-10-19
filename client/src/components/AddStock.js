import React, {useEffect, useState} from "react";

function AddStock() {
    const [formData, setFormData] = useState({
        product_id:"",
        quantity:"",
        location_id:""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData, 
            [name]:value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const newStock = {
            product_id: formData.product_id,
            quantity: formData.quantity,
            location_id: formData.location_id
        };
    
        try {
            console.log("Submitting new stock: ", newStock);
    
            const response = await fetch('/stocks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newStock),
            });
            
            if (response.ok) {
                const data = await response.json();
                setStocks([...stocks, data]);
    
                setFormData({
                    product_id: "",
                    quantity: "",
                    location_id: "",
                });
            } else {
                console.error('Failed to add stock');
            }
        } catch (error) {
            console.error(`Error adding stock: ${error}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="newStockForm">
                <h1 className="formHeader">Add New Product</h1>
                    <label htmlFor="product_id">Product ID</label>
                    <input name="product_id" value={formData.product_id} onChange={handleChange}/>
                    <label htmlFor="quantity">Quantity</label>
                    <input name="quantity" value={formData.quantity} onChange={handleChange}/>
                    <label htmlFor="location_id">Location ID</label>
                    <input name="location_id" value={formData.location_id} onChange={handleChange}/>
            </div>
            <button type="submit">Add Product</button>
        </form>
    )
    

}

export default AddStock;