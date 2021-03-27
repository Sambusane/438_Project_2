import React from "react";
import "./App.css"
import axios from "axios";
import Item from "./item";
import { Link } from "react-router-dom";

axios.defaults.headers.post['Content-Type'] = "application/json"

class itemList extends React.Component{
    constructor(props) {
        super(props);

        
        this.state = {
            isLoading: true,
            data : [],
            id : this.props.id,
            empty : {"msg": "no items"},
            isEmpty: true
        }
        

    }

    async componentDidMount(){
        if(this.state.isLoading===true){
            console.log("I mounted")
            const url = "/api/items/" + this.props.id;
            axios.get(url)
                .then(response => {
                    if(response.data.msg===this.state.empty.msg){
                        this.setState({data:[response.data]})
                        this.setState({isLoading:false})

                    }else{
                        this.setState({data:response.data})
                        this.setState({isLoading:false})
                        this.setState({isEmpty:false})
                    }
                })
                .catch(error =>{
                    console.log(error)
                })
        }
            
    }

    async componentDidUpdate(){
        if(this.state.isLoading===true){
            console.log("I mounted")
            const url = "/api/items/" + this.props.id;
            axios.get(url)
                .then(response => {
                    if(response.data.msg===this.state.empty.msg){
                        this.setState({data:[response.data]})
                        this.setState({isLoading:false})

                    }else{
                        this.setState({data:response.data})
                        this.setState({isLoading:false})
                        this.setState({isEmpty:false})
                    }
                })
                .catch(error =>{
                    console.log(error)
                })
        }
            
    }
    

    render() {
        return(
            
            this.state.isLoading ?(
                
                <div>
                    Loading...
                    <br></br>
                    <Link className="addItemLinkButton" to="/AddItem"> Add an Item </Link>
                </div>
            )
            :(this.state.isEmpty ?(
                <div>
                    No Items in List
                    <br></br>
                    <Link className="addItemLinkButton" to="/AddItem"> Add an Item </Link>
                </div>
                
            )
            :(<div className="itemLists"><ul>
                {this.state.data.map(item => {
                    return <li><Item key = {item.id} msg={item.msg} name = {item.itemName} price = {item.itemPrice} link = {item.itemLink}/></li>
                })}
            </ul>
            <br></br>
            <Link className="addItemLinkButton" to="/AddItem"> Add an Item </Link>
            </div>))

        )
    }

}

export default itemList;


