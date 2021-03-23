import React from "react";
import "./App.css"
import axios from "axios";
import Item from "./item";

axios.defaults.headers.post['Content-Type'] = "application/json"

class itemList extends React.Component{
    constructor(props) {
        super(props);

        
        this.state = {
        data : [],
            id : this.props.id
        }

    }
    componentDidMount(){
        const url = "/items/" + this.state.id;
        axios.get(url)
            .then(response => this.setState({ data:response.data}))
            .catch(error =>{
                console.log(error)
            })
        
    }

    render() {
        return(
            <div className="itemLists"><ul>
                {this.state.data.map(item => {
                    return <li><Item name = {item.itemName} price = {item.itemPrice}/></li>
                })}
            </ul>
            </div>

        )
    }

}

export default itemList;


