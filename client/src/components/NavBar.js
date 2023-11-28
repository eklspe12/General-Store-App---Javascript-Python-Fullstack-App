import { Link } from 'react-router-dom';

function NavBar() {
	return (
		<nav className="nav">
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/store">View/Modify Products</Link>
				</li>
				<li>
					<Link to="/location_finder">Location Finder</Link>
				</li>
			</ul>
		</nav>
	);
}

export default NavBar;
