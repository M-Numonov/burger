import React, { useEffect, useState } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilary/Auxilary';

const ErrorHandler = (WrappedComponent, axios) => {
    
    const InnerFunction = props => {
            const [error, setError] = useState(null);    
            const reqIntercepter = axios.interceptors.request.use(request => {
                setError(null);               
                return request;
            }); 
            const resIntercepter = axios.interceptors.response.use(res => res, err => {
                setError(err);
            })
    
            useEffect(() => {
                return () => {
                    axios.interceptors.request.eject(reqIntercepter);
                    axios.interceptors.response.eject(resIntercepter);
                }
            }, [reqIntercepter, resIntercepter]);
            
        
            const backdropClickedHandler = ()=>{
                setError(null)
            }
            
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