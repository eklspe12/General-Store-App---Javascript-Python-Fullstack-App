import { Link } from "react-router-dom"




const LocationFinder = () => {

    

    return (
        <div className="homepage">
        <h1 className="logo">barNone</h1>
        <p>A fun way to  
            <Link to="/store" style={{cursor: 'pointer'}}><span> DISCOVER </span></Link>
             </p>
        </div>
    )
}


export default LocationFinder
