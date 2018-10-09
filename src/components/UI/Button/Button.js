import React from 'react';
import classes from './Button.css';


//below syntax is used to ONLY return plain JSX
const button = (props) => {

    let disable = false;
    if (props.disabled) {
        disable = props.disabled;
    }
    return (
        <button
            onClick={props.clicked}
            className={[classes.Button, classes[props.btnType]].join(' ')}
            disabled = {disable}>
            {props.children}
        </button>
    );
};

//if you want to include any other logic or variables to manipulate,use this approach
/*const *func_Name* = () =>{

    return(
        <button onClick = {props.clicked}>
            {props.children}
        </button>
    );
} */

export default button;