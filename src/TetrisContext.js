import React, {useState, useEffect} from 'react';
import {Pieces} from "./Data";


const TetrisContext = React.createContext();


function TetrisProvider({children}) {
    const [playing, setPlaying ] = useState(false);    
    const [nextPiece, setNextPiece] = useState({})
    const [secondPiece, setSecondPiece] = useState({});
    const [thirdPiece, setThirdPiece] = useState({});
    

    const pickShape = () => {
        const maxVal = Pieces.length;
        const indTwo = Math.floor(Math.random() * maxVal);
        return Pieces[indTwo];
       }
        

    const pickColor = () => {
        const colors = ["blue","blueviolet","orangered","olivedrab","fuschia","forestgreen","firebrick","red","orange","orchid","greenyellow","green","goldenrod","wheat","white","brown"]
        const maxim = colors.length;
        const ind = Math.floor(Math.random() * maxim);
        return colors[ind];
    }   
 
    
    const removeWelcome = () => {
        const welcomeElement = document.getElementById("welcome");

        welcomeElement.classList.add("disappear");    
        setPlaying(playing=> !playing
        );}
    
        const removePause = () => {
           
            const pauseElement = document.getElementById("pause");
            pauseElement.classList.add("disappear");
           
        }

    
  

    const pickNextPiece = (objArg) => {
         let result = pickShape();
        objArg = {...result};   
        objArg.backColor = pickColor();
        objArg.borderColor = pickColor();
        return objArg;
    }


     

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