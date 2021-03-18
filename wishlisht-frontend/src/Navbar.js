import { Link } from 'react-router-dom';

const Navbar = (props) => {
    const username = props.uName
    return (
        <nav className="navbar">
            <h1>Wish List</h1>
            <div className="links">
                <Link to="/"> Home </Link>
                <Link to="/test"> Test </Link>
                {username === "" ? (<a className="logout"> Please Log In </a>) : (<a className="logout" href="home">Log Out </a>)}
                {username === "" ? (<a className="logout">  </a>) : (<a className="logout" href="home">Welcome! </a>)}
                  {username}
            </div>
        </nav>
      );
}
 
export default Navbar;