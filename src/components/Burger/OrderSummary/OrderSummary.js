import Aux from "../../../hoc/Auxilary/Auxilary";
import Button from "../../../components/UI/Button/Button";
const OrderSummary = props => {
    
    const ingredientSummary = Object.keys(props.ingredients)
    .map(ingKey => {
        return (
            <li key={ingKey}>
                <span style={{textTransform: 'capitalize'}}>{ingKey}</span>: 
                {props.ingredients[ingKey]}
            </li>
        )
    });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <b>Total price: {props.totalPrice.toFixed(2)}</b>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={()=>props.updatePurchasingState(false)}>Cnacel</Button>
            <Button btnType="Success" clicked={props.processOrder}>Order</Button>
        </Aux>
    );
}


export default OrderSummary;