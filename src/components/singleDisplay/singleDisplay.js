import React from 'react';
import './style.css';

const singleDisplay = (props) => {
    const classNames = ["displaycontainer"];
    if(props.className){
        classNames.push(props.className);
    }
    return (
        <div className={classNames.join(" ")}>
            <h2>{props.index}/</h2>
            <h2>{props.name}</h2>
            <h2>{props.age} </h2>
            <h2>{props.occupation}</h2>
            
        </div>
      
    )
}

export default singleDisplay;