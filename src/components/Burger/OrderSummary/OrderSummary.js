import React from 'react';

import Aux from '../../../hoc/_Aux/aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map((ingKey) => {
        return (<li key={ingKey}>
            <span style={{ textTransform: 'capitalize' }}>
                {ingKey}
            </span> : {props.ingredients[ingKey]}
        </li>);
    });
    return (
        <Aux>
            <h3>Your order </h3>
            <p>Your burger has : </p>
            <ul>
                {ingredientSummary}
            </ul>
            <strong> Price : {props.price} </strong>
            <p>Continue to checkout?</p>
            <center>
                <Button btnType="Danger" clicked={props.purchaseCancelled}> CANCEL </Button>
                <Button btnType="Success" clicked={props.purchaseConfirmed}> CONFIRM </Button>
            </center>

        </Aux>
    );
};

export default orderSummary;