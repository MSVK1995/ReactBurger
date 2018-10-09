import React, { Component } from 'react';
import Aux from '../../hoc/_Aux/_aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Loading from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/errorHandler/errorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';



const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        ordered: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        axios.get('https://reactburger-de030.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({
                    ingredients: response.data
                });
            }).catch(error =>{
                this.setState({error: true})
            });
    }

    purchaseOrderHandler(ingredients) {
        const sum = Object.keys(ingredients).map(ingKeys => {
            return ingredients[ingKeys];
        }).reduce((sum, el) => {
            return sum + el;
        });
        this.setState({ purchasable: sum > 0 ? true : false });
    }

    orderedHandler = () => {
        this.setState({ ordered: true });
    }

    cancelOrderHandler = () => {
        this.setState({ ordered: false });
    }

    finalOrderHandler = () => {
        const queryParams = [];
        for(let i in this.state.ingredients)
        {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price='+ this.state.totalPrice);
        let queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
        // this.props.history.push('/checkout');
    }

    addIngredientHandler = (type) => {
        let oldCount = this.state.ingredients[type];
        let newCount = oldCount + 1;
        let newIngredients = { ...this.state.ingredients };
        newIngredients[type] = newCount;
        const additionPrice = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + additionPrice;
        this.setState({ totalPrice: newPrice, ingredients: newIngredients });
        this.purchaseOrderHandler(newIngredients);
    }

    removeIngredientHandler = (type) => {
        let oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        let newCount = oldCount - 1;
        let newIngredients = { ...this.state.ingredients };
        newIngredients[type] = newCount;
        const deductionPrice = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - deductionPrice;
        this.setState({ totalPrice: newPrice, ingredients: newIngredients });
        this.purchaseOrderHandler(newIngredients);
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.state.error ? <center><strong>Ingredients can't be loaded </strong></center> 
                                      : 
                                      <Spinner />;

        if(this.state.ingredients)
        {
            burger = (<Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={(event) => this.addIngredientHandler(event)}
                    ingredientRemoved={(event) => this.removeIngredientHandler(event)}
                    disabled={disableInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    purchaseOrder={this.orderedHandler} />
            </Aux>);

            orderSummary = (<OrderSummary
            ingredients={this.state.ingredients}
            purchaseConfirmed={this.finalOrderHandler}
            purchaseCancelled={this.cancelOrderHandler}
            price={this.state.totalPrice.toFixed(2)} />);
        }

        if (this.state.loading) {
            orderSummary = <Loading />;
        }
        return (
            <Aux>
            {burger}
                <Modal show={this.state.ordered} modalClosed={this.cancelOrderHandler}>
                    {orderSummary}
                </Modal>
            </Aux>
        )
    }
}

export default errorHandler(BurgerBuilder, axios);