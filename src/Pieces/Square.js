import React, {useContext,useEffect
} from 'react';
import { TetrisContext } from "../TetrisContext";

function Square(props) {
    const colorTogive = useContext(TetrisContext);   
    
    const {keys, numberId} = props;
  

    return (
        <div className="cell" key={numberId} id={keys} style={{backgroundColor: props.back, borderColor: props.brd}}>
            cont
        </div>
    )
}


export { Square}