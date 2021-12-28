import React from 'react';

function Colored(props) {
    console.log(props)
        return (
        <div >
         {props.children}
        </div>
    )
}


export {Colored}