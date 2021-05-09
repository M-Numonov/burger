import React, { Component } from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const Checkout = props => {
    const checkoutCanceled = () => {
        props.history.goBack()
    }
    const checkoutContinued = () =>{
        props.history.push(props.match.path + "/contact-data");
    }

         
    let summary = <Redirect to="/" />
        if(props.ings){    
            let purchaseRedirect = props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchaseRedirect}
                <CheckoutSummary 
                ingredients={props.ings}
                checkoutCanceled={checkoutCanceled}
                checkoutContinued={checkoutContinued}
                />
                <Route path={props.match.path + '/contact-data'} 
                component={ContactData} />
                </div>
            )
        }
        return summary;
    }

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);