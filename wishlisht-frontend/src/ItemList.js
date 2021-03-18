import React from "react";
import "./App.css"
import axios from "axios";

axios.defaults.headers.post['Content-Type'] = "application/json"

class itemList extends React.Component{
    constructor(props) {
        super(props);

        const url = "/items"
        this.state = {
        data : axios.get(url)
        }

    }

    render() {
        return(
            <ul>
                {this.state(item => {
                    return <li>{item.data}</li>
                })}
            </ul>

        )
    }

}

export default itemList;


