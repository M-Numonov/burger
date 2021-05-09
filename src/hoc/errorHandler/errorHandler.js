import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilary/Auxilary';
import useHttpErrorHandler from '../../hooks/http-error';
const ErrorHandler = (WrappedComponent, axios) => {
    
    const InnerFunction = props => {
            const [error, backdropClickedHandler] = useHttpErrorHandler(axios);
            return (
                <Aux>
                    <Modal showModal={error}
                    updatePurchasingState={backdropClickedHandler}
                    >{error ? error.message : null}</Modal>
                    <WrappedComponent {...props} />
                </Aux>
            );
            
        }
    return InnerFunction;
    
}

export default ErrorHandler;