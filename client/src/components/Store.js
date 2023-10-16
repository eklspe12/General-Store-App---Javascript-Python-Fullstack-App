import GrillList from './GrillList'

const Store = ({grills}) => {

    return (
        <div>
            <h1>Available Items <GrillList grills={grills}/></h1>
        </div>
    )
}

export default Store