import React, { Component } from 'react'

class User extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <div className="searchItem">
                <h4>{this.props.user.username}</h4>
                <h5>Name: {this.props.user.firstname} {this.props.user.lastname}</h5>
                <button onClick={() => this.props.onClick(this.props.user.username)}>DELETE</button>
                
            </div>
        )
    }
}

export default User

