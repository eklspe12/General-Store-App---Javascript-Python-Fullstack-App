import React from "react";
import ProductCard from './ProductCard'

const ProductList = ({products}) => {
    const productList = products.map((product) => (
       <ProductCard
        key={product.id}
        product={product}/>
    ))

return <div className="storeContainer">{productList}</div>
}

export default ProductList