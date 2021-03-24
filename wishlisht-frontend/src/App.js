import './App.css';
import Home from './Home';
import Navbar from './Navbar';
import Test from './Test';
import Login from "./Login";
import Signup from "./Signup";
import ItemList from "./ItemList"
import Search from "./Search"
import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Redirect } from "react-router-dom";
import axios from 'axios';

function App() {
  useEffect(() => {
    axios.get("/login")
      .then(response => {
        setUsername(response.data.username)
        setLoggedIn(response.data.loggedIn)
        setUserId(response.data.userId)
      })

  })

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
            {loggedIn ? <Redirect to="/itemList" /> : <Home />}
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
            <ItemList
            id = {userId}
            />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
        </Switch>
      </div>
    </div>
  </Router>
  );
}

export default App;
