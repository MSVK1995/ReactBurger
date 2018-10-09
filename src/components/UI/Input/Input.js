import React from 'react';
import classes from './Input.css';

const input = (props) => {

    const inputClasses = [classes.InputElement];
    let errorMsg = null;
    if (props.invalid && props.shouldValidate && props.elementVisited) {
        inputClasses.push(classes.Invalid);
        errorMsg = <p
            className={classes.ErrorMessage}>
            Please enter a valid {props.inputLabel}
        </p>;
    }

    let inputElement = null;
    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break;
        case ('select'):
            inputElement = (<select
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed} 
                selected = {props.value}>

                {props.elementConfig.options.map(option => (
                    <option value={option.value} key={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>);
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}> {props.label} </label>
            {inputElement}
            {errorMsg}
        </div>
    );
}

export default input;