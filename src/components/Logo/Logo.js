import logo from "../../assets/images/burger-logo.png";
import classes from "./Logo.module.css";
const Logo = (props) => (
    <div className={classes.Logo}>
        <img src={logo} alt="basketball"/>
    </div>
);
export default Logo;