import React from "react";

class item extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: this.props.name,
            price: this.props.price
        }
    }

    render(){
        return(
            <div className="items">{this.state.name }</div>
        )
    }
}

export default item;