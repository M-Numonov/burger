import classes from "./Backdrop.module.css";

const Backdrop = (props) => (
   props.showModal ? <div className={classes.Backdrop} onClick={()=>props.updatePurchasingState(false)}></div> : null
);

export default Backdrop;