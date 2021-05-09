import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const INGREDIENT_PRICE = {
    bacon : 0.5,
    salad : 0.3,
    meat : 1,
    cheese : 0.7
}

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error:false,
    loading:false,
    building: false
};

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName]+1 } ;
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient); 
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
        building:true
    }
    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updatedIngredientR = { [action.ingredientName]: state.ingredients[action.ingredientName]-1 } ;
    const updatedIngredientsR = updateObject(state.ingredients, updatedIngredientR); 
    const updatedStateR = {
        ingredients: updatedIngredientsR,
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
        building:true
    }
    return updateObject(state, updatedStateR);
}

const setIngredient = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
        }, 
        loading: false,
        error:false,
        totalPrice: 4,
        building:false
    });
}

const fetchIngredient = (state, action) => {
    return updateObject(state, {
        error: true,
        loading: false
    });
}

const burgerReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);               
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENT: return setIngredient(state, action);            
        case actionTypes.FETCH_INGREDIENT_FAILED: return fetchIngredient(state, action);
        default : return state
    }
}

export default burgerReducer;