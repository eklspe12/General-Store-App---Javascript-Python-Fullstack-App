import {useState} from 'react'

const GrillCard = ({grill}) => {


    return (
        <div>
            <h3>{grill.name}</h3>
            <h3>{grill.description}</h3>
            <h3><img src={grill.image} alt={grill.name}/></h3>
            <h3>{grill.price}</h3>
        </div>
    )
}

export default GrillCard
