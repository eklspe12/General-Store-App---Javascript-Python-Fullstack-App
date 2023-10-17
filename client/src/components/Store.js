import GrillList from './GrillList'

const Store = ({grills, handleSearch, handleChange, search, searchMade}) => {

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input placeholder='Search available items...' value={search} onChange={handleChange} type='text'></input>
                <input type="submit" value="Search products."></input>
            </form>
            <div>
                {(searchMade && grills.length === 0) ? (<p className="searchError">No result's found, please check spelling.</p>) : (<div><GrillList grills={grills}/></div>)}
            </div>
        </div>
    )
}

export default Store
