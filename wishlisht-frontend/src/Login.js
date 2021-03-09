import React from "react";
import "./App.css"
import axios from "axios";

axios.defaults.headers.post['Content-Type'] = "application/json"

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            userId: '',
            isLoggedIn: null,
            user: []
        };
        //this is connecting the fields to the values in the state.
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    //these functions take in an event and then set the approptiate value from the fields to the variables in the state.
    handleChangeUsername(event){
        this.setState({username: event.target.value})
    }
    handleChangePassword(event){
        this.setState({password: event.target.value})
    }
    async handleSubmit(event){
        event.preventDefault();

        const url = "/login"
        let params = {
            username: this.state.username,
            password: this.state.password
        }
        params = JSON.stringify(params)

        axios.post(url,params)
            .then(response => {

                //console.log(response)
                this.setState({user: response.data})
                this.checkTheData()


            })
            .catch(error =>{
                console.log(error)
            })
    }
    checkTheData(){
        if (this.state.user.msg === "no users"){
            alert("username not found.")

        }else if (this.state.user.msg === "Incorrect password"){
            alert("Incorrect Password")
        }else{
            this.setState({username: this.state.user.username})
            this.setState({isLoggedIn: this.state.user.loggedIn})
            this.setState({userId: this.state.user.userId})
            this.setState({password: ''})
            alert("Successfully logged in")
        }
    }

    render() {
        return (
            <div className="login">
                <div className="subLog">
                    <h1>Please Log In {this.state.isLoggedIn}</h1>
                    <br/>
                    <form onSubmit={this.handleSubmit}>
                        <input type={"text"} placeholder={"username"} value={this.state.username} onChange={this.handleChangeUsername}/>
                        <br/> <br/>
                        <input type={"password"} placeholder={"password"} value={this.state.password} onChange={this.handleChangePassword}/>
                        <br/> <br/>
                        <input type={"submit"} value="Submit"/>
                    </form>
                </div>


            </div>
        );
    }
}
export default Login;