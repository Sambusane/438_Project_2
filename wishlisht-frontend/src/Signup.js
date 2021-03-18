import React from "react";
import axios from "axios";

axios.defaults.headers.post['Content-Type'] = "application/json"

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            firstName: '',
            lastName: '',
            userId: '',
            user: []
        };

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
        handleChangeUsername(event) {
            this.setState({username: event.target.value})
        }
        handleChangePassword(event) {
            this.setState({password: event.target.value})
        }
        handleChangeEmail(event) {
            this.setState({email: event.target.value})
        }
        handleChangeFirstName(event) {
            this.setState({firstName: event.target.value})
        }
        handleChangeLastName(event) {
            this.setState({lastName: event.target.value})
        }
        async handleSubmit(event) {
            event.preventDefault();

            const url = "/signup"
            let params = {
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName
            }

            params = JSON.stringify(params)

            axios.post(url,params)
                .then(response => {

                    console.log(response)
                    this.setState({user: response.data})
                    this.verifyData();
                })
                .catch(error => {
                    console.log(error)
                })
        }
        verifyData() {
            if (this.state.user.msg === "duplicate username") {
                alert("Username is already in use.")
            } else if (this.state.user.msg === "password is too short") {
                alert("Password needs to be at least 6 characters long.")
            } else if (this.state.user.msg === "password needs number.") {
                alert("Password needs to include a number.")
            } else if (this.state.user.msg === "password needs capital letter") {
                alert("Password needs to include a capital letter.")
            } else if (this.state.user.msg === "password needs a special character") {
                alert("Password needs to include a special character.")
            } else {
                alert("You are now registered.")
            }
        }

        render() {
            return (
                <div className="signup">
                    <div className="subSignup">
                        <h1> Register </h1>
                        <br/>
                        <form onSubmit={this.handleSubmit}>
                            <p className="formTitle"> Username</p>
                            <input type={"text"} placeholder={"username"} value={this.state.username} onChange={this.handleChangeUsername}/>
                            <br/> <br/>
                            <p className="formTitle"> Password</p>
                            <input type={"password"} placeholder={"password"} value={this.state.password} onChange={this.handleChangePassword}/>
                            <br/> <br/>
                            <p className="formTitle"> Email</p>
                            <input type={"email"} placeholder={"email"} value={this.state.email} onChange={this.handleChangeEmail}/>
                            <br/> <br/>
                            <p className="formTitle"> First Name</p>
                            <input type={"text"} placeholder={"firstName"} value={this.state.firstName} onChange={this.handleChangeFirstName}/>
                            <br/> <br/>
                            <p className="formTitle"> Last Name</p>
                            <input type={"text"} placeholder={"lastName"} value={this.state.lastName} onChange={this.handleChangeLastName}/>
                            <br/> <br/>
                            <input type={"submit"} value="Submit"/>
                        </form>
                    </div>
                </div>
            );
        }
}

export default Signup;