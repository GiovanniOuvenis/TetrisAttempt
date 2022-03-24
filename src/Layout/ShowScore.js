import React , {useContext} from 'react';
import { TetrisContext} from "../TetrisContext";

 function ShowScore() {
     const scoreContext = useContext(TetrisContext);
     

    return (
        <div className='emptyRight'>
            <h1 className='scoreHeading'>Score</h1>
            <div className='displayScore'>000000</div>
        </div>
    )
}

export { ShowScore }
