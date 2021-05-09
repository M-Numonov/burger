import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
const NavigationItems = (props) => (
    <ul className={[props.topmenu ? classes.Menu:null, classes.NavigationItems].join(' ')}>
        <NavigationItem link="/">Burger Builder</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem>: null}
        {props.isAuthenticated 
        ? <NavigationItem link="/logout">Logout</NavigationItem>
        : <NavigationItem link="/auth">Authentification</NavigationItem>
        }
    </ul>
);

export default NavigationItems