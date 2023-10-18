import React from "react";
import ProductCard from './ProductCard'

const ProductList = ({products, onDelete}) => {
    const productList = products.map((product) => (
       <ProductCard
        key={product.id}
        product={product}
        onDelete={onDelete}/>
    ))

return <div className="storeContainer">{productList}</div>
}

export default ProductList