import React from 'react';
import classes from './Order.css';

const order = (props) => {

    let ingredients = [];
    for (let ingName in props.ingredients) {
        ingredients.push({
            name: ingName,
            amount: props.ingredients[ingName]
        });
    }

    const ingOutput = ingredients.map(ing => {
        return (
            <span
                key={ing.name}
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '3px 8px',
                    border: '1px solid #eee',
                    padding: '0 2px',
                    boxShadow: '0 2px 3px black'
                }}>
                {ing.name} ({ing.amount})
            </span>);
    });
    return (
        <div className={classes.Order}>
            <p> Ingredients : {ingOutput}</p>
            <p> Price : <strong> {props.price.toFixed(2)} </strong> </p>
        </div>
    );
};

export default order;