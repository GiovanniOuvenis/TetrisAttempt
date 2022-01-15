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
    const [currentColor, setCurrentColor] = useState({});
    const [positionOfCurrentPiece, setPositionOfCurrentPiece] = useState([]);
    const [trigger, setTrigger] = useState(false);
    
// Picks randomly one of the shapes defined in data.js from the Pieces array.
    const pickShape = () => {
        const maxVal = Pieces.length;
        const indTwo = Math.floor(Math.random() * maxVal);
        return Pieces[indTwo];
       }
        

    /*
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
                    } */        
           

  
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
             
 
     

 
 // Διαλέγω τυχαία χρώμα για το επόμενο κομμάτι. Θέλουμε να τρέξει σίγουρα μια φορά στην αρχή 
 //και κάθε φορά  που έχουμε ένα κομματι που "έκατσε."

 useEffect(()=> {
    function pickRandomColor() {
        const choices =  ["blue","blueviolet","orangered","olivedrab","fuchsia","forestgreen","firebrick","red","orange","orchid","greenyellow","green","goldenrod","wheat","white","brown"]
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



// Όπως και το προηγούμενο θέλω να τρέξει μια φορά στην αρχή και αμέσως μετά αφού έχει "κάτσει" κάποιο κομμάτι.
 useEffect(()=> {
   function pickRandomPositionsOfPiece() {
       const positions = [[4,5,14,15],[3,4,5,6],[3,4,5,6],[4,13,14,15],[4,13,14,15],[4,5,15,16],[4,5,15,16],[4,5,13,14],[4,5,14,24],[4,5,15,25]]
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

 

     
// Εδώ χειριζόμαστε το πάτημα του δεξιά,  αριστερά και κατω βέλους.
 useEffect(() => {
     const rightLeftDownKey = (e) => {
        e.preventDefault();
         setPositionOfCurrentPiece((positionOfCurrentPiece)=> {
            let noEdgyPiecesRight = positionOfCurrentPiece.map((piec)=> {
             if ((piec + 1) % 10 === 0) {
                 return true;
             } else {
                 return false;
             } 
            })
            let noEdgyPiecesLeft = positionOfCurrentPiece.map((posit)=> {
                if (posit % 10 === 0) {
                    return true;
                } else {
                    return false;
                }
            })

              if (e.keyCode === 39) {
                let onePieceRight = positionOfCurrentPiece.map((pos) => {
                    return pos + 1;
                })
                return  noEdgyPiecesRight.includes(true) ? positionOfCurrentPiece : onePieceRight;
               } else if (e.keyCode === 37) {
                   let onePieceLeft = positionOfCurrentPiece.map((piec) => {
                       return piec - 1;
                   })
                   return noEdgyPiecesLeft.includes(true) ? positionOfCurrentPiece : onePieceLeft;
               } else if (e.keyCode === 40) {
                   let onePieceDown = positionOfCurrentPiece.map((arg) => {
                       return arg + 10;
                   })
                   return onePieceDown;
               }                
    })
 }
 window.addEventListener("keyup", rightLeftDownKey)
}, [])


// Το effect που κινεί τα κομμάτια προς τα κάτω όταν περάσει το καθορισμένο inteval. Η λογική σειρά 
// είναι να βρίσκεται πριν τα effects  που κινουν δεξια και αριστερα τα κομμάτια για να εκτελείται όπως και 
// να έχει όταν έχει έρθει η ώρα. Θα πρέπει να βρω έναν τρόπο να μειώνω το inteval κάθε κάποιο διάστημα
// δηλαδη να αυξανεται προοδευτικα η ταχυτητα με την οποια πεφτουν τα κομματια
 

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
        initialPosition: positionOfCurrentPiece, 
        currCol : currentColor            
    }}>
        {children}
    </TetrisContext.Provider>
        )
    }
    const TetrisConsumer =  TetrisContext.Consumer;   
       
    export { TetrisProvider, TetrisContext, TetrisConsumer}
                   
                   
   
    

                

         
         
         
       
        
            
            
    
        
        
   
   
                              
     

    
      


 
 
     
                              

     

   

