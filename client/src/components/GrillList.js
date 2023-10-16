import React from "react";
import GrillCard from './GrillCard'

const GrillList = ({grills}) => {
    const grillList = grills.map((grill) => (
       <GrillCard
        key={grill.id}
        grill={grill}/>
    ))

return <div>{grillList}</div>
}

export default GrillList
