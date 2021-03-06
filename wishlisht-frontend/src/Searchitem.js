import React, { Component } from 'react'
import "./App.css"

export class Searchitem extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            filter: {"msg":"success"},
            item: this.props.item
        }
    }
    
    render() {
        if(this.state.item.msg===this.state.filter.msg){
            return <div></div>
        }
        return (
            <div className="searchItem">
                <h4>{this.state.item.itemName}</h4>
                <h5>Price: {this.state.item.itemPrice}</h5>
                <button onClick={() => this.props.buy(this.state.item.itemLink,this.state.item.id,this.state.item.userId)}>Buy</button>
                
            </div>
        )
    }
}

export default Searchitem
