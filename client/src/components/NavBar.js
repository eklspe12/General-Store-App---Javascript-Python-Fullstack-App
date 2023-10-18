import { Link } from 'react-router-dom'

function NavBar() {
return (
    <nav className="nav">
       <ul>
        <Link to="/">Home</Link>
        <Link to="/location_finder">Location Finder</Link>
        <Link to="/store">Store</Link> 
    </ul>
    </nav>  
)
}

export default NavBar
