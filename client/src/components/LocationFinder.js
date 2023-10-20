import { Link } from "react-router-dom"
import AddLocation from "./AddLocation"
import SearchBar from "./SearchBar"
import React, {useEffect} from 'react'



const LocationFinder = () => {

    useEffect(() => {
        document.title = 'Find Locations';
      }, []);

    return (
        <div className="homepage">
            <AddLocation/>
            <SearchBar/>
        </div>
    )
}


export default LocationFinder
