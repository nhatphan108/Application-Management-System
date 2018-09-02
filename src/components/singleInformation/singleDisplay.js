import React from 'react';
const Information = (props) => {
    return (
        <div>
            <h2>{props.id}</h2>
            <p>{props.value} </p>
        </div>

    )
}

export default Information;