import axios from "../../axios-orders";
import { Component, useEffect } from "react";

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/errorHandler/errorHandler';
import * as action from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = props => {
    

    useEffect(()=>{
        props.onFetchOrders(props.token, props.userId);
    }, []);

    let orders = <Spinner />;
    if(!props.loading){
        orders = (
            <div>
            {
                props.orders.map(order=>(
                    <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                    />
                ))
            }
            </div>
            )
        }
        return orders;
    }


const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId)=>dispatch(action.fetchOrders(token, userId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));