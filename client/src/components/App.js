import React, { useEffect, useState } from "react";
import {Link, Switch, Route, useParams } from "react-router-dom";
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

// useEffect(() => {
//   console.log(search);
// }, [search]);

return (<>
  <NavBar/>
  <div className="container">
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/location_finder">
          <LocationFinder/>
        </Route>
        <Route path="/store">
          <Store products={products} search={search} searchMade={searchMade} handleChange={handleChange} handleSearch={handleSearch} setProducts={setProducts}/>
        </Route>
      </Switch>
      {/* <Store products={products} handleSearch={handleSearch} handleChange={handleChange} search={search} searchMade={searchMade} setProducts={setProducts}/> */}
  </div></>
);
}

export default App;
