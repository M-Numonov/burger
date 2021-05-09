import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const orderReducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.ON_INIT_PURCHASE:
           return  updateObject(state, {purchased:false})
        case actionTypes.PURCHASE_BURGER_START:
           return updateObject(state, {loading:true})
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId,
               
            }
            return updateObject(state, {
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased:true
            });
        case actionTypes.PURCHASE_BURGER_FAIL:
            return updateObject(state, {
                loading: false,
                purchased:true
            });
        case actionTypes.FETCH_ORDERS_START:
            return updateObject(state, {
                loading: false,
            });
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state, {
                orders: action.orders,
                loading: false,
            });
        case actionTypes.FETCH_ORDERS_FAIL:
            return updateObject(state, {
                loading: false,
            });
        default:
            return state
    }
}

export default orderReducer;