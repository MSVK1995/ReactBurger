import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

const burger = (props) =>{
    let ings = Object.keys(props.ingredients)
    .map((ingKey) =>{
        return [...Array(props.ingredients[ingKey])].map((_, i) =>{
           return <BurgerIngredient key = {ingKey + i} type = {ingKey} />
        });
    })
    .reduce((arr, ele) =>{    //reduce() method optimizes by displaying an empty array when there's no ingredient
        return arr.concat(ele);
    }, []);  //reduce method checks for addition of elements(ingredient) and performs required operation (ie add ingredients to the arr from current ingredient->ele)
     //console.log(ings);
    if(ings.length === 0)
    {
        ings = <p>Please add ingredients. </p>
    }
    return(
        <div className = {classes.burgerclass}>
            <BurgerIngredient type = "bread-top" />
            {ings}
            <BurgerIngredient type = "bread-bottom" />
        </div>
    );
};

export default burger; 