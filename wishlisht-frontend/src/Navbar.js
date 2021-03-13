import { Link } from 'react-router-dom';
const Navbar = (props) => {
    const username = props.uName
    return (
        <nav className="navbar">
            <h1>Wish List</h1>
            <div className="links">
                <Link to="/"> Home </Link>
                <Link to="/test"> Test </Link>
                  {username}
            </div>
        </nav>
      );
}
 
export default Navbar;