import ProductList from './ProductList'
import AddProduct from './AddProduct';
import AddLocation from './AddLocation';

const Store = ({products, handleSearch, handleChange, search, searchMade, setProducts}) => {

    function handleDelete (productToDelete) {
        const updatedProducts = products.filter((p) => 
        p.id !== productToDelete.id);
        setProducts(updatedProducts)
    }

    return (
        <div className='searchBG'>
            <h1>Order Online!</h1>
            <form onSubmit={handleSearch} className='searchBar'>
                <input className='searchInput' placeholder='Search available items...' value={search} onChange={handleChange} type='text'></input>
                <input className='searchBtn' type="submit" value="Search products."></input>
            </form>
            
            <div className='gridWrapper'>
                <div className='storeContainer'>
                    {(searchMade && products.length === 0) ? (<p className="searchError">No result's found, please check spelling.</p>) : (<div><ProductList products={products} onDelete={handleDelete} setProducts={setProducts}/></div>)}</div>
            </div>
            <AddProduct products={products} setProducts={setProducts} />
        </div>
    )
}

export default Store


