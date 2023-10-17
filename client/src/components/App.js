import React, { useEffect, useState } from "react";
import {Link, Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
// import Home from "./components/Home";
// import About from "./components/About";
import Store from "./Store";


function App() {

const [grills, setGrills] = useState([])
const [search, setSearch] = useState(null)
const [searchMade, setSearchMade] = useState(false)

useEffect(() => {
  fetch("/products")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error("Response status:", response.status);
        console.error("Response status text:", response.statusText);
        return Promise.reject("Fetch failed");
      }
    })
    .then((grills) => {
      setGrills(grills);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}, []);

// function handleDeleteGrill(id) {
//   fetch(`http://127.0.0.1:5555/products/${id}`, {
//   method: "DELETE", 
//   })
//   .then((r) => r.json())
//   .then(() => {
//     const updatedGrills = grills.filter((g) => g.id !== id);
//     setGrills(updatedGrills)
//   });
// }

// const handleSearch = (e) => {
//   e.preventDefault()
// // the url for this funciton probably needs to be changed
//   fetch(`http://127.0.0.1:5555/products?search=${search}`)
//   .then(r => r.json())
//   .then(data => {
//     if (data.products === null) {
//       setGrills([])
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
        {/* <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/> */}
        <Route path="/store" element={<Store grills={grills} search={search} searchMade={searchMade}
        />}/>
      </Route>
  </div></>
);
}

export default App;
