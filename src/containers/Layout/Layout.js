import Aux from "../../hoc/Auxilary/Auxilary";
import classes from "./Layout.module.css";
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDarwer from "../../components/Navigation/SideDrawer/SideDrawer";
import { useState } from "react";
import { connect } from 'react-redux';
const Layout = props => {
    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const updateShowModal = (stater) => {
        
        setSideDrawerIsVisible(stater)

    }

    
    return (
        <Aux>
            <div className={classes.Content}>          
                <Toolbar isAuth={props.isAuthenticated} showModal={sideDrawerIsVisible} updateShowModal={updateShowModal}/>
                <SideDarwer isAuth={props.isAuthenticated} showModal={sideDrawerIsVisible} updateShowModal={updateShowModal}/>
                <main>{props.children}</main>
            </div>
        </Aux>
    )
    
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(Layout);