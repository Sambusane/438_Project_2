import { Link } from 'react-router-dom';
import React from 'react'
import axios from 'axios';


class Navbar extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            dset: this.props.dataSetter,
            username: this.props.uName
        }

        this.logout = this.logout.bind(this)
    }
    
    
    async logout(event){
        event.preventDefault()

        axios.get("api/logout")
            .then(res =>{
                console.log(res)
                this.state.dset("",false,"")
                window.location.href="/"
                
            })
            .catch(err => {
                console.log(err)
            })
            
    }
    render(){
    return (

        <nav className="navbar">
            <h1>Wish List</h1>
            <div className="links">
                <Link to="/"> Home </Link>
                <Link to="/search"> Search </Link>
                {this.props.uName === "ADMIN" ? <Link to="/admin"> Admin </Link> : null }
                {this.props.uName === "" ? (<a className="logout"> Please Log In </a>) : (<a className="logout" onClick={this.logout}>Log Out </a>)}
                {this.props.uName === "" ? (<a className="logout">  </a>) : (<a className="logout">Welcome! </a>)}
                {this.props.uName}
            </div>
        </nav>
      )
    }
}
 
export default Navbar;