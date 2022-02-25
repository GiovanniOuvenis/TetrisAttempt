import React from 'react';


function Square(props) {     
    const {numberId} = props;
    return (
        <div className="cell" key={numberId} style={{backgroundColor: props.back, borderColor: props.brd}}>
            cont
        </div>
    )
}


export { Square}