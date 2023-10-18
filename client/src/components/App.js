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

useEffect(() => {
  fetch("/products")
    .then((r) => r.json())
    .then((products) => {setProducts(products)
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

// const handleSearch = (e) => {
//   e.preventDefault()
// // the url for this funciton probably needs to be changed
//   fetch(`http://127.0.0.1:5555/products?search=${search}`)
//   .then(r => r.json())
//   .then(data => {
//     if (data.products === null) {
//       setProducts([])
//       console.log('Product not found.')
//     }
//   })
//   .catch((error) => {
//     console.error(error)
//   })
//   setSearchMade(true)
// }

// const handleChange = (e) => {
//   setSearch(e.target.value)
// }

return (<>
  <NavBar/>
  <div className="container">
      <Route>
        <Route path="/" element={<Home/>}/>
        <Route path="/location_finder" element={<LocationFinder/>}/>
        <Route path="/store" element={<Store products={products} search={search} searchMade={searchMade}
        />}/>
      </Route>
      <Store products={products}/>
  </div></>
);
}

export default App;
