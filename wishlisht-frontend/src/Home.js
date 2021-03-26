import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home">
            <h1>Welcome</h1>
            <br></br>
            <Link className="button" to='/login'>Login</Link>
            <br></br>
            <Link className="button" to='/signup'>Signup</Link>
        </div>
      );
}
 
export default Home;