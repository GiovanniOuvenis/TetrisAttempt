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
    //
    const [currentColor, setCurrentColor] = useState({borCol: "red",
backCol: "black"});
    const [positionOfCurrentPiece, setPositionOfCurrentPiece] = useState([1,2,3,4]);
    const [trigger, setTrigger] = useState(false);
    
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
        );
    }

       

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
                  /*  useEffect(() => {        
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
                     },[]) */
             
 /*useEffect(()=> {
     setInterval(setTrigger(trigger => !trigger),3000)
    },[positionOfCurrentPiece]);*/
     

 
 
 useEffect(()=> {
    function pickRandomColor() {
        const choices =  ["blue","blueviolet","orangered","olivedrab","fuschia","forestgreen","firebrick","red","orange","orchid","greenyellow","green","goldenrod","wheat","white","brown"]
        const integer = choices.length;
        const colorNum = Math.floor(Math.random() * integer);
        return choices[colorNum];
     }    

   setCurrentColor((currentColor)=> {
    currentColor.borCol = pickRandomColor();
    currentColor.backCol = pickRandomColor();
    return currentColor;
   })

 }, [])    
// Αυτο το εφεκτ θελουμε να τρεξει μια φορα στην αρχη και να κανει 
// σετ το ιδιο αρραυ που θα κανει σετ και το επομενο εφεκτ.
//  ΤΗν πρωτη φορα το ταμπλε θα κανει ρεντερ αυτο και απο την επομενη θα κανει ρεντερ τα δεδομενα που θα κανει σετ το εομενο εφεκτ
 useEffect(()=> {
   function pickRandomPositionsOfPiece() {
       const positions = [[4,5,14,15],[3,4,5,6],[4,13,14,15],[4,5,15,16],[4,5,13,14],[4,5,14,24],[4,5,15,25]]
       const int = positions.length;
       const positionsInt = Math.floor(Math.random() * int);
       let picked = positions[positionsInt]
       return picked;
   }

 
    setPositionOfCurrentPiece((positionOfCurrentPiece) => {
       let pickedPosition = pickRandomPositionsOfPiece();
       positionOfCurrentPiece = [...pickedPosition];
       return positionOfCurrentPiece;
   })
 }, [])

 // ενα εφεκτ που θα παιρνει τις προηγουμενες τιμες και θα τις αυξανει κατα 10 
 //αλλα με ενα ιντερβαλ 3 δευτερολεπλτω

 useEffect(()=> {
     const belated = setInterval(()=> {
        setPositionOfCurrentPiece((positionOfCurrentPiece)=>{
            return positionOfCurrentPiece.map((currInd) => {
                return currInd + 10;
            })
        })         
     },1000);
     return () => clearInterval(belated);
     
 }, []
 ) 



 
 
     
                           
 return (
     <TetrisContext.Provider value={{
         gameStatus:playing,
         removeWelcomeMessage:removeWelcome,
         removePauseMessage: removePause,
         initialPosition: positionOfCurrentPiece, 
         currCol : currentColor            
     }}>
         
         {children}
         
     </TetrisContext.Provider>
 )

}
            
const TetrisConsumer =  TetrisContext.Consumer;   
 
     
     


export { TetrisProvider, TetrisContext, TetrisConsumer}
                           
  


     

   

