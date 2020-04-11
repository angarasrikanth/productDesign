import React from 'react';
import { Card, Button, Dropdown } from 'react-bootstrap';
import data from "../data.json";
import axios from 'axios';
var product = data.products.map(item => {
    return item
});
class ProductList extends React.Component {
    constructor() {
        super();

        this.state = {
            currency: product ? product : [],
            usdFlag: false,
            newCurrency: [],
        }
    }

    handleChange = (event) => {
        var value = event.target.textContent;
        var currency = this.state.currency;
        var newCurrency = [];

        if (value === "USD") {
            this.setState({
                usdFlag: true
            })
            axios.get('https://api.exchangeratesapi.io/latest?base=USD').then((response) => {
                var USD = response.data.rates.USD
                var INR = response.data.rates.INR
                var amount = "";
                currency.map(item => {
                    console.log(newCurrency, item.price, "prices")
                    if (item.price.length > 2) {
                        amount = Math.round(item.price / INR * USD)
                        item.price = amount
                        newCurrency = amount;
                    }

                })
                this.setState({
                    newCurrency
                })
            });
        } else {
            this.setState({
                usdFlag: false
            })
            axios.get('https://api.exchangeratesapi.io/latest?base=INR').then((response) => {
                var USD = response.data.rates.USD
                var INR = response.data.rates.INR
                var amount = "";
                currency.map(item => {
                    amount = Math.round(item.price / USD * INR)
                    item.price = amount
                    newCurrency = amount;

                })
                this.setState({
                    newCurrency
                })
            });

        }

    }
    cards = () => {
        {
            return this.state.currency.map(item => {
                return <div className="col-3">
                    <Card style={{ width: '18rem', margin: '20px' }}>
                        <Card.Img variant="top" src={item.img} style={{ width: "200px", height: '100px', marginLeft: '40px' }} />
                        <Card.Body>
                            <Card.Title>{item.product}</Card.Title>

                            {this.state.newCurrency !== undefined && !this.state.newCurrency.length > 0 &&
                                <Card.Text>
                                    {this.state.usdFlag ? '$' + item.price : 'Rs.' + item.price}
                                </Card.Text>
                            }


                        </Card.Body>
                    </Card>
                </div>
            })
        }

    }
    render() {
        var columns = this.cards()
        return (
            <div>
                <div className="row">
                    {columns}
                </div>

                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Currency
                                </Dropdown.Toggle>

                    <Dropdown.Menu onClick={this.handleChange}>
                        <Dropdown.Item href="" value="INR">INR</Dropdown.Item>
                        <Dropdown.Item href="" value="USD">USD</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )
    }
}

export default ProductList;