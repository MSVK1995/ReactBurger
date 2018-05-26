import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route} from 'react-router-dom';
import MyOrders from './containers/MyOrders/MyOrders';


class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Route path = '/checkout' component = {Checkout} />
          <Route path = '/orders' component = {MyOrders} />
          <Route path = '/'exact component = {BurgerBuilder}/>
        </Layout>
      </div>
    );
  }
}

export default App;
