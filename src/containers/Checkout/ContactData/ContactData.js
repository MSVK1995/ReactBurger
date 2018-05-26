import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name *'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                visited: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street *'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                visited: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code *'
                },
                value: '',
                validation: {
                    required: true,
                    minLen: 6,
                    maxLen: 6
                },
                isValid: false,
                visited: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country *'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                visited: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email *'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                visited: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'Fastest', displayValue: 'fastest' },
                        { value: 'Cheapest', displayValue: 'cheapest' },
                    ]
                },
                value: 'Fastest',
                isValid: true
            }
        },
        loading: false,
        contactOrder: false
    };



    orderHandler = (event) => {
        event.preventDefault();

        let submitData = {};
        for (let key in this.state.orderForm) {
            submitData[key] = this.state.orderForm[key].value;
        }
        //console.log(this.props.price);
        //alert("Bill : " + this.props.price.toFixed(2));
        this.setState({
            loading: true
        });

        const orderPrice = Number(this.props.price);
        const order = {
            ingredients: this.props.ingredients,
            price: orderPrice.toFixed(2),
            orderData: submitData
        };
        //used for firebase to create a sub node
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false
                });
                //console.log(this.props.history);
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({
                    loading: false
                });
            });
    }

    checkValidity(value, rules) {
        let validity = true;
        if (rules) {
            if (rules.required) {
                validity = value.trim() !== '' && validity;
            }
            if (rules.minLen) {
                validity = value.length >= rules.minLen && validity;
            }
            if (rules.maxLen) {
                validity = value.length <= rules.maxLen && validity;
            }
        }
        return validity;
    }


    inputChangesHandler = (event, inputIdentifier) => {
        // console.log(event.target.value);
        let changeInput = { ...this.state.orderForm };
        let changeElement = { ...changeInput[inputIdentifier] };
        changeElement.value = event.target.value;
        changeElement.isValid = this.checkValidity(changeElement.value, changeElement.validation);
        changeElement.visited = true;
        let val = true;
        

        for(let validate in this.state.orderForm)
        {
            val = changeInput[validate].isValid  && val ;
        }
        changeInput[inputIdentifier] = changeElement;
        this.setState({
            orderForm: changeInput,
            contactOrder: val
        });
        
    }

    render() {

        let inputElements = [];
        for (let key in this.state.orderForm) {
            inputElements.push({
                id: key,
                formData: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {inputElements.map(formElement => (
                    <Input
                        key={formElement.id}
                        inputLabel={formElement.id}
                        // label = {formElement.id}
                        elementType={formElement.formData.elementType}
                        elementConfig={formElement.formData.elementConfig}
                        value={formElement.formData.value}
                        invalid={!(formElement.formData.isValid)}
                        shouldValidate={formElement.formData.validation}
                        elementVisited={formElement.formData.visited}
                        changed={(event) => this.inputChangesHandler(event, formElement.id)} />
                ))}
                <Button
                    btnType='Success'
                    disabled={!this.state.contactOrder}
                >Order </Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4> Enter your contact details </h4>
                {form}
            </div>
        );
    }
}

export default ContactData;