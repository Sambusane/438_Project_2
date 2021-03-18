import './App.css';
import Home from './Home';
import Navbar from './Navbar';
import Test from './Test';
import Login from "./Login";
import Signup from "./Signup";
import ItemList from "./ItemList"
import React, { useState } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Redirect } from "react-router-dom";

function App() {

  const [username,setUsername] = useState(() => {
    return "";
  })
  const [loggedIn, setLoggedIn] = useState(() => {
    return false;
  })
  const [userId, setUserId] = useState(() => {
    return "";
  })
  function setTheData(x,y,z){
    setUsername(x);
    setLoggedIn(y);
    setUserId(z);
  }
  return (
    <Router>
    <div className="App">
      <Navbar uName = {username}/>
      <div className="content">
        <Switch>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/test" /> : <Home />}
          </Route>
          <Route path="/test">
            <Test />
          </Route>
          <Route path="/login">
            <Login
            name = {username}
            id = {userId}
            log = {loggedIn}
            dataSetter = { setTheData.bind(this)}/>
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/itemlist">
            <ItemList />
          </Route>
        </Switch>
      </div>
    </div>
  </Router>
  );
}

export default App;
