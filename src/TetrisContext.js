import React, {useState, useEffect} from 'react';



const TetrisContext = React.createContext();


function TetrisProvider({children}) {
    const [playing, setPlaying ] = useState(false);
    const [onGoing, setonGoing] = useState(false);
    
    let pauseElement = document.getElementById("pause");
    //let pauseClass = pauseElement.classList;

   /*useEffect(()=> {
       // setonGoing(onGoing => !onGoing)
        console.log("classlist updated")
    },[]) */

    const togglePlaying = () => {
        setPlaying(playing=> !playing
        );
        setonGoing(onGoing => !onGoing);
    }

  const toggleOnGoing = () => {
      setonGoing(onGoing => !onGoing);
      pauseElement.classList.add("disappear");
  }
   

    return (
        <TetrisContext.Provider value={{stat:playing, 
        toggle: togglePlaying, 
        gameStatus: onGoing, 
        toggleOn: toggleOnGoing}}>
            
            {children}
            
        </TetrisContext.Provider>
    )

    }

    
export { TetrisProvider, TetrisContext}