import {useState} from 'react'

const ProductCard = ({product}) => {


    return (
        <div className='productCard'>
            <h3>{product.name}</h3>
            <h3><img src={product.image} alt={product.name}/></h3>
            <h4>{product.description}</h4>
            <h3>${product.price}</h3>
        </div>
    )
}

export default ProductCard
