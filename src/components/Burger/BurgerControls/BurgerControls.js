import classes from "./BurgerControls.module.css";
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
    {label: 'Salad', type: 'salad'},
]

const BurgerControls = (props) => {

return (<div className={classes.BuildControls}>
        <p>Current price : {props.price.toFixed(2)}</p>
        {
            controls.map(el => (
                <BuildControl 
                key={el.label} 
                label={el.label} 
                added={()=>props.More(el.type)} 
                removed={()=>props.Less(el.type)}
                disabled = {props.disabled[el.type]}
                />
            ))        
        }
        <button disabled={!props.purchasable} className={classes.OrderButton} onClick={()=>props.updatePurchasingState(true)}>{props.isAuth? "ORDER NOW" : "SIGN UP"}</button>
    </div>)
}

export default BurgerControls;