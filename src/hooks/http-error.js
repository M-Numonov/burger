import { useState, useEffect} from 'react';

export default httpClient => {
    const [error, setError] = useState(null);    
    const reqIntercepter = httpClient.interceptors.request.use(request => {
        setError(null);               
        return request;
    }); 
    const resIntercepter = httpClient.interceptors.response.use(res => res, err => {
        setError(err);
    })

    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(reqIntercepter);
            httpClient.interceptors.response.eject(resIntercepter);
        }
    }, [reqIntercepter, resIntercepter]);
    

    const backdropClickedHandler = ()=>{
        setError(null)
    }
    
    return [error, backdropClickedHandler]
   
}