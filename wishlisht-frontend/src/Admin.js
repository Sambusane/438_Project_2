import axios from 'axios'
import React, { Component } from 'react'
import User from './User'

class Admin extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             users: []
        }
        this.deleteTheUser = this.deleteTheUser.bind(this)
    }

    async componentDidMount(){
        let url = "/users"
        axios.get(url)
            .then(res => {
                this.setState({users: res.data})
            })
            .catch(err => {
                console.log(err)
            })
    }

    async deleteTheUser(username){
        let url = "/user/" + username
        axios.delete(url)
            .then(res => {
                console.log(res.data)
                this.state.users.filter((user)=>user.username!==username)
                axios.get("/users")
                    .then(res2 => {
                        this.setState({users: res2.data})
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    render() {
        return (
            <div className="admin">
                <h1>Users</h1>
                <div className="users">
                    <br></br>
                    {this.state.users.map(user =>{ return <User key = {user.id} user = {user} onClick = {this.deleteTheUser} />})}
                </div>
                
                
            </div>
        )
    }
}

export default Admin
