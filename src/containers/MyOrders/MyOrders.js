import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import errorHandler from '../../hoc/errorHandler/errorHandler';


class MyOrders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        let getOrders = [];
        axios.get('/orders.json')
            .then(response => {
                for (let key in response.data) {
                    getOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }
                this.setState({ loading: false, orders: getOrders });
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price} />
                ))}
                {/* {console.log(this.state.orders)} */}
            </div>
        );
    }
}


export default errorHandler(MyOrders, axios);