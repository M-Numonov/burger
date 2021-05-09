import { useCallback, useEffect, useState } from "react";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BurgerControls/BurgerControls";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/Auxilary/Auxilary";
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import ErrorHandler from '../../hoc/errorHandler/errorHandler';
import { connect, useDispatch, useSelector } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';

const INGREDIENT_PRICE = {
    bacon : 0.5,
    salad : 0.3,
    meat : 1,
    cheese : 0.7
}

export const BurgerBuilder = props =>{
 
    const ings = useSelector(state => state.burgerBuilder.ingredients);
    const price = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const loading = useSelector(state => state.burgerBuilder.loading);
    const isAuthenticated = useSelector(state => state.auth.token !== null);

    const [showModal, setShowModal] = useState(false);

    const dispatch  = useDispatch();

    const onIngredientAdded = ingName => dispatch(burgerBuilderActions.addIngredient(ingName));
    const onIngredientRemoved = ingName => dispatch(burgerBuilderActions.removeIngredient(ingName));
    const onInitIngredients = useCallback(() => dispatch(burgerBuilderActions.initIngredients()), [dispatch]);
    const onInitPurchase = () => dispatch(burgerBuilderActions.onInitPurchase());
    const onSetAuthRedirectPath = (path)=>dispatch(burgerBuilderActions.setAuthRedirectPath(path));

    useEffect(()=>{
        onInitIngredients();
    }, [onInitIngredients]);
 
    const updatePurchasingState= (stater) => {
        if(isAuthenticated){
            setShowModal(stater)
        }else{
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }

    }
 
    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(ingKey => {
            return ingredients[ingKey]
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        return  sum > 0
    }
    const processOrder = ()=>{
        onInitPurchase();
        props.history.push('/checkout');
    }

    const disabledInfo = {
        ...ings
    }
    for(let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0
    };
    let modalInner = null;
    if(loading){
        modalInner = <Spinner />
    } else if(ings){
        modalInner = <OrderSummary 
        totalPrice={price} 
        updatePurchasingState={updatePurchasingState} 
        ingredients = {ings}
        processOrder = {processOrder}
        />
    };
    let  burger = error ? error: <Spinner />;
    
    if(ings){
        burger = (
            <Aux>
                <Burger ingredients={ings}/>
                <BurgerControls 
                    Less={onIngredientRemoved}
                    More={onIngredientAdded}
                    disabled = {disabledInfo}
                    price = {price}
                    purchasable = {updatePurchaseState(ings)}
                    updatePurchasingState={updatePurchasingState}
                    isAuth = {isAuthenticated}
                    />
            </Aux>
        )
    }
    return (
        <Aux>
            <Modal 
            showModal={showModal} 
            updatePurchasingState={updatePurchasingState}>
                {modalInner}
            </Modal>
            {burger}
        </Aux>
    )
}





export default ErrorHandler(BurgerBuilder, axios);