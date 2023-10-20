import ProductList from './ProductList'
import AddProduct from './AddProduct';
import AddLocation from './AddLocation';
import React, {useEffect} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';

const Store = ({products, handleSearch, handleChange, search, searchMade, setProducts}) => {
    const formik = useFormik({
        initialValues:{
            search:search,
        },
        validationSchema:Yup.object({
            search:Yup.string().required('Please enter search term')
        }),
        onSubmit: (values) => {
            handleSearch(values.search);
        },
    });


    function handleDelete (productToDelete) {
        const updatedProducts = products.filter((p) => 
        p.id !== productToDelete.id);
        setProducts(updatedProducts)
    }

    useEffect(() => {
        document.title = 'Products';
      }, []);


    return (
        <div className='searchBG'>
            <form onSubmit={formik.handleSubmit} className='searchBar'>
                <input name="search" type="text" className='searchInput' placeholder='Search available items...' value={formik.values.search} onChange={formik.handleChange}></input>
                {formik.touched.search && formik.errors.search ? (
                    <div className='searchError'>{formik.errors.search}</div>
                ) : null }
               
                <input className='searchBtn' type="submit" value="Search products."></input>
            </form>
            <AddProduct products={products} setProducts={setProducts} />
            
            <div className='gridWrapper'>
                <div className='storeContainer'>
                    {(searchMade && products.length === 0) ? (<p className="searchError">No result's found, please check spelling.</p>) : (<div><ProductList products={products} onDelete={handleDelete} setProducts={setProducts}/></div>)}</div>
            </div>
        </div>
    )
}

export default Store


