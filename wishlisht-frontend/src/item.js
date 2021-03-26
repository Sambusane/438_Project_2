import React from "react";
import * as url from "url";
import {Link} from "react-router-dom";

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
                {this.state.name }
                {this.state.price}
                <Link
                href = {this.state.link}>
                    Link
                </Link>

            </div>

        )
    }
}

export default item;