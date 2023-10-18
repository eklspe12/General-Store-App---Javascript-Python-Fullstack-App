import ProductList from './ProductList'

const Store = ({products, handleSearch, handleChange, search, searchMade}) => {

    return (
        <div className='searchBG'>
            <h1>Order Online!</h1>
            <form onSubmit={handleSearch} className='searchBar'>
                <input className='searchInput' placeholder='Search available items...' value={search} onChange={handleChange} type='text'></input>
                <input className='searchBtn' type="submit" value="Search products."></input>
            </form>
            
            <div className='gridWrapper'>
                <div className='storeContainer'><ProductList products={products}/></div>
            </div>
        
        </div>
    )
}

export default Store


// {(searchMade && products.length === 0) ? (<p className="searchError">No result's found, please check spelling.</p>) : (<div><ProductList products={products}/></div>)}