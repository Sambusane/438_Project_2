import React from 'react'
import SearchItem from './Searchitem'
import "./App.css"
import axios from "axios";

class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchname : "",
            items: [],
            data:{},
            empty: {
                "msg": "no users"
            },
            isEmpty: true,
            message: ""
        };
        this.handleChangeSearchname = this.handleChangeSearchname.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.buyItem = this.buyItem.bind(this)
        

    }
    handleChangeSearchname(event){
        this.setState({searchname: event.target.value})
    }
    async handleSubmit(event){
        event.preventDefault();
        const url = "/search/"+this.state.searchname;
        axios.get(url)
            .then(res =>{
                this.setState({data: res.data})
                this.checkData()
            })
            .catch(error =>{
                console.log(error)
            })
        this.forceUpdate()
    }

    checkData() {
        
        if (JSON.stringify(this.state.data) === JSON.stringify(this.state.empty) ){
            this.setState({items: ["user not found"],isEmpty: "true",message:"User Not found"})

        }else{
            this.setState({isEmpty: "false"})
            this.setState({items: this.state.data})
        }
        
        
    }
    async buyItem(url,id,uid){
        console.log(url)
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
        this.setState({items: this.state.items.filter((item)=>item.id!==id)})
        const url2 = "/items/"+id
        const url3 = "/items/"+uid
        axios.delete(url2)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        axios.get(url3)
            .then(res =>{
                this.setState({data: res.data})
                this.checkData()
            })
            .catch(error =>{
                console.log(error)
            })
        this.forceUpdate()

    }



    render(){
        return(
            <div className = "Search">
                <div className = "Searchform">
                    <h1>Please enter a username</h1>
                    <br></br>
                    <input type={"text"} placeholder={"username"} value={this.state.searchname} onChange={this.handleChangeSearchname}/>
                    <button onClick={this.handleSubmit}>Search</button>
                    <br></br>
                </div>
                <div className = "Results">
                    { this.state.isEmpty === true ? ( <h4>{this.state.message}</h4>):(this.state.items.map(item =>(<SearchItem key ={item.id} item ={item} buy ={this.buyItem}/>)))
                    
                    }
                </div>
            </div>
        );


    }
}

export default Search;