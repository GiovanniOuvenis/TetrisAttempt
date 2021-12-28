import React, {useContext, useEffect, useRef} from 'react';
import { TetrisContext } from '../TetrisContext';



 function Pause() {
 
 const conte = useContext(TetrisContext);

 

    return (
        <div className="welcome disappear"  id='pause' >
            <h1 className='welcome-pause'>Take your time!</h1>
            <button className='play-resume' onClick={conte.toggleOn}>Continue</button>
        </div>
    )
}


export {Pause}