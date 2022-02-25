import React , {useContext} from 'react';
import { TetrisContext} from "../TetrisContext";

 function ShowScore() {
     const scoreContext = useContext(TetrisContext);
     const currentScore = scoreContext.points;

    return (
        <div className='emptyRight'>
            <h1 className='scoreHeading'>Score</h1>
            <div className='displayScore'>{currentScore}</div>
        </div>
    )
}

export { ShowScore }
