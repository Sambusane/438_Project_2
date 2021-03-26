import React from "react";

class item extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: this.props.name,
            price: this.props.price,
            image: this.props.image,
            url : this.props.link
        }
    }

    render(){
        return(
            <div className="items">
                <h4>{this.state.name }</h4>
                <h5>Price = {this.state.price}</h5>
                <button onClick={()=> {const newWindow = window.open(this.state.url, '_blank', 'noopener,noreferrer')
                        if (newWindow) newWindow.opener = null}
                }>Link</button>


            </div>

        )
    }
}

export default item;