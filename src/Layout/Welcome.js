import React, {useContext, useEffect} from 'react';
import { TetrisContext } from '../TetrisContext';



const Welcome = (value) => {
     const cont = useContext(TetrisContext);
     

  

    return (        
        <div className={cont.stat? "disappear" : "welcome"}>
           <section className= "welcome-pause" >Welcome to the shittiest Tetris Game!</section>      
           
           <button className="play-resume"  onClick={cont.toggle}>Play!!!</button>
        </div>
        
    )
}

export { Welcome}

