import { checkPropTypes } from "prop-types";
import classes from './BuildControl.module.css';
const BuildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.label}>{checkPropTypes.label}</div>
        <button className={classes.Less} onClick={props.removed} disabled={props.disabled}>Less</button>
        <button className={classes.More} onClick={props.added}>More</button>
    </div>
)

export default BuildControl;