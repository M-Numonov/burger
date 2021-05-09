import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxilary/Auxilary';
import Backdrop from '../Backdrop/Backdrop';
import React from 'react';
import { useEffect } from 'react';
const Modal = props => {
    
    // shouldComponentUpdate(nextProps, nextState){
    //     return nextProps.showModal !== props.showModal || nextProps.children !== props.children;
    // }

    return (
        <Aux>
            <Backdrop showModal={props.showModal} updatePurchasingState={props.updatePurchasingState}/>
            <div className= {classes.Modal}
                style = {{
                    transform:  props.showModal ? "translateY(0)" : "translateY(-100vh)",
                    opacity: props.showModal ? '1' : '0'
                }}
            >
                {props.children}
            </div>
        </Aux>
    )
 
}

export default React.memo(Modal, (prevProps, nextProps) => 
    nextProps.showModal === prevProps.showModal 
    && nextProps.children === prevProps.children
);