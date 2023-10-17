import React, { useEffect, useState } from "react";
import {Link, Switch, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import Store from "./components/Store";


function App() {

const [grills, setGrills] = useState([])
const [search, setSearch] = useState(null)
const [searchMade, setSearchMade] = useState(false)

useEffect (() => {
  fetch("http://127.0.0.1:5555/products")
  .then(r => {
    if (r.ok) {
      return r.json();
    }
    throw r;
  })
  .then((grills) => {
    setGrills(grills);
  })
}, []);

function handleDeleteGrill(id) {
  fetch(`http://127.0.0.1:5555/products/${id}`, {
  method: "DELETE", 
  })
  .then((r) => r.json())
  .then(() => {
    const updatedGrills = grills.filter((g) => g.id !== id);
    setGrills(updatedGrills)
  });
}

const handleSearch = (e) => {
  e.preventDefault()
// the url for this funciton probably needs to be changed
  fetch(`http://127.0.0.1:5555/products?search=${search}`)
  .then(r => r.json())
  .then(data => {
    if (data.grills === null) {
      setGrills([])
      console.log('Product not found.')
    }
  })
  .catch((error) => {
    console.error(error)
  })
  setSearchMade(true)
}

const handleChange = (e) => {
  setSearch(e.target.value)
}

return (<>
  <NavBar/>
  <div className="container">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/store" element={<Store grills={grills} handleChange={handleChange} handleSearch={handleSearch} search={search} searchMade={searchMade}
        />}/>
      </Routes>
  </div></>
);
}

export default App;
