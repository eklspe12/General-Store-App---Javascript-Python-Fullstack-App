import React, { useState, useEffect } from "react";
import AddStock from "./AddStock";
import { useFormik } from "formik";
import * as Yup from 'yup';
import AddLocation from "./AddLocation";

function SearchBar() {
  const [search, setSearch] = useState("");
  const [stocks, setStocks] = useState([]);
  const [originalStocks, setOriginalStocks] = useState([])
  const [searchMade, setSearchMade] = useState(false)

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



  useEffect(() => {
    fetch("/stocks")
      .then((r) => r.json())
      .then((stocks) => {
        setStocks(stocks)
        setOriginalStocks(stocks)
        console.log(stocks)} )
  
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchMade(true);

    if (search.trim() === "") {
      setStocks(originalStocks);
      return;
    }

    const filteredStocks = originalStocks.filter((stock) => {
      const productName = stock.product.name.toLowerCase();
      const locationAddress = stock.location.address.toLowerCase();
      const query = search.toLowerCase();

      return productName.includes(query) || locationAddress.includes(query);
    });
    setStocks(filteredStocks)

  }

  const handleChange = (e) => {
    setSearch(e.target.value, () =>{
    // console.log(search)
    });
  }
  
  useEffect(() => {
    console.log(search);
  }, [search]);

  return (
    <div>
      <div className="addContainer">
        <div className="addStockContainer"><AddStock stocks={stocks} setStocks={setStocks}/>
          </div>
           <div className="addLocationContaienr"><AddLocation/></div> 
           </div>
      <form onSubmit={formik.handleSubmit} className='stockSearch' >
                <input name="name" type="text" className='searchInput' placeholder='Search available items...' value={formik.values.search} onChange={formik.handleChange}></input>
                {formik.touched.search && formik.errors.search ? (
                    <div className='searchError'>{formik.errors.search}</div>
                ) : null }
               
                <input className='searchBtn' type="submit" value="Search products."></input>
            </form>

      <ul className="searchUl">
        {stocks.map((stock) => (
          <li className="stocks" key={stock.id}>
            <p>{stock.product ? stock.product.name : 'N/A'}, Address:{stock.location ? stock.location.address : 'N/A'}, Quantity: {stock.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar
