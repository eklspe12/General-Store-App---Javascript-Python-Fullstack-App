import React from "react";
import ProductCard from './ProductCard'

const ProductList = ({products, onDelete, updateProduct}) => {
    const productList = products.map((product) => (
       <ProductCard
        key={product.id}
        product={product}
        onDelete={onDelete}
        updateProduct={updateProduct}/>
    ))

return <div className="storeContainer">{productList}</div>
}

export default ProductList