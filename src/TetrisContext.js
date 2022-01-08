import React, {useState, useEffect} from 'react';
import {Pieces} from "./Data";


const TetrisContext = React.createContext();


function TetrisProvider({children}) {
    //  Initiates game
    const [playing, setPlaying ] = useState(false);    
    // First Item shown in right column
    const [nextPiece, setNextPiece] = useState({})
    // Second item shown in right column
    const [secondPiece, setSecondPiece] = useState({});
    // Third item shown in right column
    const [thirdPiece, setThirdPiece] = useState({});
    
// Picks randomly one of the shapes defined in data.js from the Pieces array.
    const pickShape = () => {
        const maxVal = Pieces.length;
        const indTwo = Math.floor(Math.random() * maxVal);
        return Pieces[indTwo];
       }
        

    
    // removes welcome message
    const removeWelcome = () => {
        const welcomeElement = document.getElementById("welcome");

        welcomeElement.classList.add("disappear");    
        setPlaying(playing=> !playing
        );}
    // removes pause message 
        const removePause = () => {
           
            const pauseElement = document.getElementById("pause");
            pauseElement.classList.add("disappear");
           
        }

    
  
// Fills every context state value with information. Used as effect in useEffect 
    const pickNextPiece = (objArg) => {
         let result = pickShape();
        objArg = {...result};        
        return objArg;
    }


     
// In the first render every state value is going to be blank. After the first render every piece is set to be the next one 
// e.g first receives value from second, second gets value from the third and only third receives a new value. 
        useEffect(() => {        
           
           setNextPiece(()=>{
            if (Object.keys(nextPiece).length === 0) {
                return pickNextPiece(nextPiece);
            }
            else {
                return secondPiece;
            }
           }) 

           setSecondPiece(()=>{
               if (Object.keys(secondPiece).length === 0){
                   return pickNextPiece(secondPiece);
               }
               else {
                   return thirdPiece;
               }
           })

           setThirdPiece(()=>{
               
                   return pickNextPiece(thirdPiece);
               
           })
               
         },[]) 
     

        return (
            <TetrisContext.Provider value={{
                gameStatus:playing,
                removeWelcomeMessage:removeWelcome,
                removePauseMessage: removePause,
                nexPiece: nextPiece,
                afterNext: secondPiece,
                finalPiece: thirdPiece
                
            }}>
                
                {children}
                
            </TetrisContext.Provider>
        )

    }
                   
    const TetrisConsumer =  TetrisContext.Consumer;   
        
            
            

    
export { TetrisProvider, TetrisContext, TetrisConsumer}