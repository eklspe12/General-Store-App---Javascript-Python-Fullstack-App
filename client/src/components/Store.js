import GrillList from './GrillList'

const Store = ({grills}) => {

    return (
        <div>
            <form>
                <input placeholder='Search available items...' value={search}></input>
            </form>
            <div>
                {(searchMade && grills.length === 0) ? (<p className="searchError">No result's found, please check spelling.</p>) : (<div><GrillList grills={grills}/></div>)}
            </div>
        </div>
    )
}

export default Store
