import Aux from "../../../hoc/Auxilary/Auxilary";
import Logo from "../../Logo/Logo"
import Backdrop from "../../UI/Backdrop/Backdrop";
import NavigationItems from "../NavigationItems/NavigationItems"
import classes from "./SideDrawer.module.css";
const SideDarwer = (props) => {
    let activeClasses = [classes.SideDrawer, classes.Close];
    if(props.showModal){
        activeClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop showModal={props.showModal} updatePurchasingState = {props.updateShowModal}/>
            <div className={activeClasses.join(' ')}>
                <Logo />
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </Aux>
    )    
}

export default SideDarwer;