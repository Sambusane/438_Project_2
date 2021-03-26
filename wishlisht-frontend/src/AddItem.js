import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import Item from "./item";


axios.defaults.headers.post['Content-Type'] = "application/json"

class AddItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemName: '',
            itemDescription: '',
            itemPrice: '',
            itemLink: '',
            id: this.props.id,
            item: []
        };

        this.handleChangeItemName = this.handleChangeItemName.bind(this);
        this.handleChangeItemPrice = this.handleChangeItemPrice.bind(this);
        this.handleChangeItemDescription = this.handleChangeItemDescription.bind(this);
        this.handleChangeItemLink = this.handleChangeItemLink.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

        handleChangeItemName(event) {
            this.setState({itemName: event.target.value})
        }
        handleChangeItemPrice(event) {
            this.setState({itemPrice: event.target.value})
        }
        handleChangeItemDescription(event) {
            this.setState({itemDescription: event.target.value})
        }
        handleChangeItemLink(event) {
            this.setState({itemLink: event.target.value})
        }

        async handleSubmit(event) {
            event.preventDefault();

            const url = "/items/" + this.props.id;
            let params = {
                itemName: this.state.itemName,
                itemPrice: this.state.itemPrice,
                itemDescription: this.state.itemDescription,
                itemLink: this.state.itemLink
            }

            params = JSON.stringify(params)

            axios.post(url, params)
                .then(response => {
                    console.log(response)
                    this.setState({item: response.data})
                })
                .catch(error => {
                    console.log(error)
                })
        }

        render() {
            return (
                <div className="addItem">
                    <div className="subAddItem">
                        <h1> Add Item </h1>
                        <br/>
                        <form onSubmit={this.handleSubmit}>
                            <p className="formTitle"> Item Name</p>
                            <input type={"text"} placeholder={"itemname"} value={this.state.itemName} onChange={this.handleChangeItemName}/>
                            <br/> <br/>
                            <p className="formTitle"> Price</p>
                            <input type={"text"} placeholder={"price"} value={this.state.itemPrice} onChange={this.handleChangeItemPrice}/>
                            <br/> <br/>
                            <p className="formTitle"> Item Description</p>
                            <input type={"text"} placeholder={"itemDescription"} value={this.state.itemDescription} onChange={this.handleChangeItemDescription}/>
                            <br/> <br/>
                            <p className="formTitle"> Link</p>
                            <input type={"text"} placeholder={"link"} value={this.state.itemLink} onChange={this.handleChangeItemLink}/>
                            <br/> <br/>
                            <input type={"submit"} value="Submit"/>
                        </form>
                    </div>
                </div>
            );
        }
}

export default AddItem;