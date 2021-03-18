import React from "react";
import "./App.css"
import axios from "axios";
import Item from "./item";

axios.defaults.headers.post['Content-Type'] = "application/json"

class itemList extends React.Component{
    constructor(props) {
        super(props);

        
        this.state = {
        data : []
        }

    }
    componentDidMount(){
        const url = "/items/6";
        axios.get(url)
            .then(response => this.setState({ data:response.data}))
            .catch(error =>{
                console.log(error)
            })
        
    }

    render() {
        return(
            <ul>
                {this.state.data.map(item => {
                    //<Item item.itemName />
                    return <li>{item.itemName}</li>
                })}
            </ul>

        )
    }

}

export default itemList;


