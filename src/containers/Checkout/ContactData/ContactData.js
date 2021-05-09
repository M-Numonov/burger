import classes from './ContactData.module.css';
import React, {Component, useState} from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/errorHandler/errorHandler';
import * as actions from '../../../store/actions/index';
import {updateObject, checkValidity} from '../../../shared/utility';
const ContactData = props => {
const [isFormValid, setIsFormValid] = useState(false);       
const [orderForm, setOrderForm] =  useState({
    name : {
        elementType: 'input',
        elementConfig : {
            type: 'text',
            placeholder: 'Your Name'
        },
        value: "",
        validation:{
            required: true
        },
        valid:false,
        touched: false
    },
    street : {
        elementType: 'input',
        elementConfig : {
            type: 'text',
            placeholder: 'Your Street'
        },
        value: "",
        validation:{
            required: true
        },
        valid:false,
        touched: false
    },
    country : {
        elementType: 'input',
        elementConfig : {
            type: 'text',
            placeholder: 'Your Country'
        },
        value: "",
        validation:{
            required: true
        },
        valid:false,
        touched: false
    },
    delivery : {
        elementType: 'select',
        elementConfig : {
            options : [
                {value: 'fastest', displayValue: 'Fastest'},
                {value: 'cheapest', displayValue: 'Cheapest'}
            ]
        },
        value: "fastest",
        valid: "",
        validation: {}
    }
})
    
    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(orderForm[inputIdentifier], {
            value:event.target.value,
            valid:checkValidity(event.target.value, orderForm[inputIdentifier].validation),
            touched: true
        });

        const updatedOrderForm = updateObject(orderForm, {
            [inputIdentifier]: updatedFormElement
        })

        let formIsValid = true;

        for (let inputIdentifier in updatedOrderForm){
            if(inputIdentifier==="delivery" || inputIdentifier==="formIsValid") continue
                formIsValid = updatedOrderForm[inputIdentifier].valid;
          
        }

        setOrderForm(updatedOrderForm);
        setIsFormValid(formIsValid);    
    }
    
    const orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for(let identifier in orderForm){
            formData[identifier] = orderForm[identifier].value;
        }
    
        const order = {
            ingredients : props.ings,
            price : props.price,
            costumer : formData,
            userId: props.userId
        }
        props.onOrderBurger(order, props.token);
    }
    
    const formElementsArray = [];
    for (let key in orderForm){
        if(key === "isFormValid") continue;
        formElementsArray.push(
            {
                id: key,
                config: orderForm[key]
            }
        );
    }

    let form = (
        <form>

                {
                    formElementsArray.map(formElement => {
                        return  <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType} 
                        elementConfig = {formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event)=>inputChangedHandler(event, formElement.id)}
                        className={classes.Select}
                        invalid={!formElement.config.valid}
                        shouldValidate = {formElement.config.validation}
                        touched = {formElement.config.touched}
                        />
                    })
                }

                <Button btnType="Success" disabled={!isFormValid} clicked={orderHandler}>Order</Button>
            </form>
    );
    if(props.loading){
        form = <Spinner />
    }
    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    )
    }

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
