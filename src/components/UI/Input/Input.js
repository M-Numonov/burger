import classes from './Input.module.css';

const Input = (props) => {

    let inputElement = null;

    const inputClasses = [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
    }
        
    switch(props.elementType){
        case ('input'):
            inputElement = <input onChange={props.changed}
            className={inputClasses.join(' ')} 
            {...props.elementConfig} 
            value={props.value}/>; 
            break;
        case ('textarea'):
            inputElement = <textarea onChange={props.changed}
            {...props.elementConfig} 
            value={props.value}/>
            break;
        case ('select'):
            inputElement = (<select onChange={props.changed}
            className={props.className} 
            value={props.value}>
                {
                    props.elementConfig.options.map(option => (
                        <option value={option.value} key={option.value}>{option.displayValue}</option>
                    ))
                }
            </select>)
            break;
        default:
            inputElement = <input 
            className={inputClasses.join(' ')} 
            {...props.elementConfig} 
            value={props.value}/>
    }

    return (
        <div className={classes.Input}>
            <label className={classes.label}>{props.Label}</label>
            {inputElement}
        </div>
    )

}

export default Input;