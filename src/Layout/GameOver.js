import React, {useContext, useEffect, useRef} from 'react';
import { TetrisContext } from '../TetrisContext';



const GameOver = () => {
     const gameOverContext = useContext(TetrisContext);
     const borderPassed = gameOverContext.trigg;
     const finalScore = gameOverContext.points;
     
     
     const gameOverRef = useRef();
     
     useEffect(()=>{
       if (borderPassed) {
        gameOverRef.current.classList.remove("disappear")
       } 

     },[borderPassed])
  
  

    return (        
       <div className='gameover disappear' ref={gameOverRef}>
         <div className='textContainer'>
          <h1 className='gameOverMessage'>The game is over! Well done! Your score is {finalScore} Hope you enjoyed it!
           Refresh to start new game!</h1> 
           </div>
       </div>
        
    )
}

export { GameOver}

