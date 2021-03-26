import React from "react";
import "./App.css"
import axios from "axios";
import Item from "./item";
import {Link} from "react-router-dom";

axios.defaults.headers.post['Content-Type'] = "application/json"

class itemList extends React.Component{
    constructor(props) {
        super(props);

        
        this.state = {
            isLoading: true,
            data : [],
            id : this.props.id
        }
        

    }
    async componentDidMount(){
        if(this.state.isLoading===true){
            console.log("I mounted")
            const url = "/items/" + this.props.id;
            axios.get(url)
                .then(response => {
                    this.setState({data:response.data})
                    this.setState({isLoading:false})
                })
                .catch(error =>{
                    console.log(error)
                })
        }
            
    }
    async componentDidUpdate(){
        if(this.state.isLoading===true){
            console.log("I mounted")
            const url = "/items/" + this.props.id;
            axios.get(url)
                .then(response => {
                    this.setState({data:response.data})
                    this.setState({isLoading:false})
                })
                .catch(error =>{
                    console.log(error)
                })
        }
            
    }
    

    render() {
        return (
            this.state.isLoading ? (
                    <div>Loading...</div>
                )
                : (
                    <div className="itemLists">
                        <ul>
                            {this.state.data.map(item => {
                                return <li><Item key={item.id} name={item.itemName} price={item.itemPrice} link={item.itemLink}/></li>
                            })}
                        </ul>
                    </div>)

        )
    }

}

export default itemList;



