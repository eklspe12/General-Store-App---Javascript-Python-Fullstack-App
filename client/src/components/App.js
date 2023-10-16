import React, { useEffect, useState } from "react";
import {Link, Switch, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import Store from "./components/Store";


function App() {

const [grills, setGrills] = useState([])

useEffect (() => {
  fetch("http://127.0.0.1:5555/grills")
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
  fetch(`http://127.0.0.1:5555/grills/${id}`, {
  method: "DELETE", 
  })
  .then((r) => r.json())
  .then(() => {
    const updatedGrills = grills.filter((g) => g.id !== id);
    setGrills(updatedGrills)
  });
}

return (<>
  <NavBar/>
  <div className="container">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/store" element={<Store grills={grills}/>}/>
      </Routes>
  </div></>
);
}

export default App;
