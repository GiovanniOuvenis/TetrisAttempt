import React, {useContext, useEffect} from 'react';
import { TetrisContext } from '../TetrisContext';



const Welcome = (value) => {
     const cont = useContext(TetrisContext);
     

  

    return (        
        <div className="welcome" id="welcome">
           <section className= "welcome-pause" >Welcome to the shittiest Tetris Game that you ever played!</section>      
           
           <button className="play-resume"  onClick={cont.removeWelcomeMessage}>Play!!!</button>
        </div>
        
    )
}

export { Welcome}

