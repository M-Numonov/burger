import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToogle/DrawerToogle";
const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.updateShowModal}/>
            {/* <div onClick={()=>props.updateShowModal(true)}>MENU</div> */}
            <Logo />
            <NavigationItems isAuthenticated={props.isAuth} topmenu/>
        </header>
    )
}

export default Toolbar;