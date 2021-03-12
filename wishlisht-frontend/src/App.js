import './App.css';
import Home from './Home';
import Navbar from './Navbar';
import Test from './Test';
import Login from "./Login";
import Signup from "./Signup";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/test">
            <Test />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>
      </div>
    </div>
  </Router>
  );
}

export default App;
