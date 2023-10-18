import {useState} from 'react'

const ProductCard = ({product, onDelete}) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [editedProduct, setEditedProduct] = useState({...product});

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };



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

      const handleInput = (e) => {
        const {name, value} = e.target;
        console.log(`Input ${name} changed to ${value}`)
        setEditedProduct({
            ...editedProduct, 
            [name]: value,
        })
      }

      const handleSubmit = () => {
        fetch(`/products/${editedProduct.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(editedProduct),
        })
        .then((r) => {
            if (r.status === 200) {
                console.log('Product updated successfully');
            }
        })
        .catch((error) => {
            console.error('Network error:', error);
        });
      };

    return (
        <div className={isFlipped ? "cardback" : "productCard"}>
            {isFlipped ? (
                <div className="editForm">
                    <h3>Edit Product</h3>
                    <input
                    type="text"
                    name="name"
                    value={editedProduct.name}
                    onChange={handleInput}
                    />
                    <input
                    type="text"
                    name="image"
                    value={editedProduct.image}
                    onChange={handleInput}
                    />
                    <input 
                    type="text"
                    name="description"
                    value={editedProduct.description}
                    onChange={handleInput}
                    />
                    <input
                    type="text"
                    name="price"
                    value={editedProduct.price}
                    onChange={handleInput}
                    />
                    <button onClick={handleSubmit}>Save</button>
                    <button onClick={handleClick}>View Product</button>
                </div>
            ): (
            <div className="productCard">
            <h3>{product.name}</h3>
            <h3>
              <img src={product.image} alt={product.name} />
            </h3>
            <h4>{product.description}</h4>
            <h3>${product.price}</h3>
            <button onClick={deleteProduct}>Remove from catalog.</button>
            <button onClick={handleClick}>Edit Product</button>
          </div>
            )}
        </div>
    )
}

export default ProductCard

