import React, { useEffect, useState } from "react";
import {Link, Switch, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Store from "./Store";
import Home from "./Home";
import LocationFinder from "./LocationFinder";


function App() {

const [products, setProducts] = useState([])
const [search, setSearch] = useState(null)
const [searchMade, setSearchMade] = useState(false)
const [originalProducts, setOriginalProducts] = useState([])

useEffect(() => {
  fetch("/products")
    .then((r) => r.json())
    .then((products) => {
      setProducts(products)
      setOriginalProducts(products)
      console.log(products)} )

}, []);

// function handleDeleteProduct(id) {
//   fetch(`http://127.0.0.1:5555/products/${id}`, {
//   method: "DELETE", 
//   })
//   .then((r) => r.json())
//   .then(() => {
//     const updatedProducts = products.filter((p) => p.id !== id);
//     setProducts(updatedProducts)
//   });
// }

const handleSearch = (e) => {
  e.preventDefault();

  if (search) {
    const filteredProducts = originalProducts.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()));
    setProducts(filteredProducts);
  } else {
    setProducts(originalProducts)
  }
  setSearchMade(true);
};

const handleChange = (e) => {
  setSearch(e.target.value, () =>{
  // console.log(search)
  });
}

useEffect(() => {
  console.log(search);
}, [search]);

return (<>
  <NavBar/>
  <div className="container">
      <Route>
        <Route path="/" element={<Home/>}/>
        <Route path="/location_finder" element={<LocationFinder/>}/>
        <Route path="/store" element={<Store products={products} search={search} searchMade={searchMade} handleChange={handleChange} handleSearch={handleSearch}/>}/>
      </Route>
  </div></>
);
}

export default App;
