import { useEffect, useState } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../shared/utility';
const Auth = props => {
    const [controls, setControls] = useState({
        email : {
            elementType: 'input',
            elementConfig : {
                type: 'email',
                placeholder: 'Mail Address'
            },
            value: "",
            validation:{
                required: true,
                isEmail: true
            },
            valid:false,
            touched: false
        },
        password : {
            elementType: 'input',
            elementConfig : {
                type: 'password',
                placeholder: 'Password'
            },
            value: "",
            validation:{
                required: true,
                minLength: 6
            },
            valid:false,
            touched: false
        }});
    
    const [isSignUp, setIsSignUp] = useState(true); 

    const {onSetAuthRedirectPath, buildingBurger, authRedirectPath} = props;

    useEffect(()=>{
        if(!buildingBurger && authRedirectPath !== '/'){
            onSetAuthRedirectPath();
        }
    }, [onSetAuthRedirectPath, buildingBurger, authRedirectPath]);

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true,
            }
        }
        setControls(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignUp)
    }
    const buttonSwitchHandle = () => {
        setIsSignUp(!isSignUp);
    }
    const formElementsArray = [];
    for(let key in controls){
        formElementsArray.push({
            id: key,
            config: controls[key]
        })
    }

    let form = (
        formElementsArray.map(formElement => {
            return  <Input 
                key={formElement.id}
                elementType={formElement.config.elementType} 
                elementConfig = {formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event)=>inputChangedHandler(event, formElement.id)}
                invalid={!formElement.config.valid}
                shouldValidate = {formElement.config.validation}
                touched = {formElement.config.touched}
                />
        }) 
    )

    if(props.loading){
        form = <Spinner /> 
    }

    let errorMessage = null;

    if(props.error){
        errorMessage = (
            <p>{props.error.message}</p>
        )
    }
    let authRedirect = null;
    if(props.isAuthenticated){
        authRedirect = <Redirect to={props.authRedirectPath} />
    }
    return (
        <div className={classes.Auth}>
            {authRedirect}
            <form onSubmit={submitHandler}>
                <p>Sign {isSignUp ? "Up" : "In"}</p>
                {errorMessage}
                {form}
            <Button btnType="Success">Submit</Button>
            </form>
            <Button btnType="Success" clicked={buttonSwitchHandle}>Switch to sign {!isSignUp ? "Up" : "In"}</Button>
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null, 
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.AuthRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Auth);