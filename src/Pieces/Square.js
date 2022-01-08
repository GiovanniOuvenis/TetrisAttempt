import React, {useContext,useEffect
} from 'react';
import { TetrisContext } from "../TetrisContext";

function Square(props) {
    const colorTogive = useContext(TetrisContext);   
    const colored = colorTogive.coloring;
    const {keys, numberId} = props;
  

    return (
        <div className="cell" id={keys} >
            cont
        </div>
    )
}


export { Square}