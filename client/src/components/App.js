import React, { useEffect, useState } from "react";
import {Link, Switch, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {

const [grills, setGrills] = useState([])

useEffect (() => {
  fetch('whatever the url is')
  .then((r) =>r.json())
  .then((grills) => {
    setGrills(grills);
  })
}, []);

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
