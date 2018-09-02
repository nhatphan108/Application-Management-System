import React from 'react';
import './style.css';
const Input = (props) => {
    let input = null;
    const classNames = [props.inputtype];
    if (props.validation && !props.validation.isValid) {
        classNames.push('required');

    }
    switch (props.inputtype) {
        case 'text':
            input = <input className={classNames.join(" ")} onChange={props.changed} type="text" {...props.attributes} />
            break;
        case 'select':
            input = (
                <select className={classNames.join(" ")} onChange={props.changed} {...props.attributes} >
                    {props.options.map(each =>
                        <option value={each.value} key={each.value} >{each.displayValue} </option>)
                    }
                </select>
            )
            break;
        case 'textarea':
            input = <textarea className={classNames.join(" ")} onChange={props.changed} {...props.attributes} />
            break;
        default:
            input = <input className={classNames.join(" ")} onChange={props.changed} type="text" {...props.attributes} />

    }


    return (
        <div className="container">
            <label className="label">{props.text}</label>
            {input}
        </div>
    )
}
export default Input;