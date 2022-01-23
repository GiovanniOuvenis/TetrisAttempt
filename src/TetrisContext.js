import React, {useState, useEffect} from 'react';
import {Pieces} from "./Data";


const TetrisContext = React.createContext();

function TetrisProvider({children}) {
    const [playing, setPlaying ] = useState(false);    
    const [currentColor, setCurrentColor] = useState({});
    const [positionOfCurrentPiece, setPositionOfCurrentPiece] = useState([]);
    const [occupied, setOccupied] = useState([]);
    const [occupiedIndexes, setOccupiedIndexes] = useState([]);
    const [seconds, setSeconds] = useState(1500);
    



 
// Picking one random colors from the choices array. We want every next piece to have a different border
// and background color

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
    }, [occupied])    



// Here we set the positions of the piece that is currently moving.
// It runs every time we have a collision and then the values of this effect get passed to 
//  the occupied  array

 useEffect(()=> {
   function pickRandomPositionsOfPiece() {
       const positions = [/*[14,15,25,5],[4,5,15,16],[4,5,14,13],[4,5,14,24],[4,5,15,25],[4,5,6,7] */ [4,5,14,15]]
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
}, [occupied])

  


 

     
// Εδώ χειριζόμαστε το πάτημα του δεξιά,  αριστερά και κατω βέλους.
 useEffect(() => {
     const rightLeftDownKey = (e) => {
        e.preventDefault();
         setPositionOfCurrentPiece((positionOfCurrentPiece)=> {
            

              if (e.keyCode === 39) {
                let onePieceRight = positionOfCurrentPiece.map((pos) => {
                    if ((pos + 1) % 10 === 0) {
                           return true;
                    } 
                    if (occupiedIndexes.includes(pos + 1)) {
                        return true;
                    }
                    else {
                        return pos + 1;
                    }
                })

                if (onePieceRight.includes(true)) {
                    return positionOfCurrentPiece;
                } else {
                    return onePieceRight;
                }

                
               } else if (e.keyCode === 37) {
                   let onePieceLeft = positionOfCurrentPiece.map((piec) => {
                       if (piec % 10 === 0) {
                           return true;
                       } 
                       if (occupiedIndexes.includes(piec - 1)) {
                           return true;
                       }
                       else {
                           return piec - 1;
                       }
                   })
                 
                   if (onePieceLeft.includes(true)) {
                       return positionOfCurrentPiece;
                   } else {
                       return onePieceLeft;
                   }

                   
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


// In the next effect, we check if the bottom piece of the current piece is marginal or occupied 
// and then we provide an object in the form that can be consumed by the table component, e.g. including
// the border and the background color. This form helps the table to present the squares the way we want them
// but we are missing an array that includes only the numbers of the occupied items so we create this effect
// This way, in the next effect we can check in an easier way if a squre is occupied

useEffect(()=> {
    setOccupiedIndexes((occupiedIndexes)=> {

        if (occupiedIndexes.length === 0) {
            let firstFour = occupied.map((f)=>{
                return f.num;
            })
            return occupiedIndexes.concat(firstFour);
        }
         else {
       let lengthMinusFour = occupied.length - 4;
    let finalFour = occupied.slice(lengthMinusFour);
    let itemsToAdd = finalFour.map((int) => {
        return int.num;
    })
    return occupiedIndexes.concat(itemsToAdd);
    }
})
},[occupied]);





useEffect(()=>{
    setOccupied((occupied) => {
        let checkConditionOne = positionOfCurrentPiece.map((el)=> {
           
            if (el <= 210) {
                return false ;
            }
            
             else {
                return true;
            }
        });
          
        let checkConditionTwo = positionOfCurrentPiece.map((xy)=>{
            let plusTen = xy + 10;
           if (occupiedIndexes.includes(plusTen)) {
               return true;
           } else {
               return false;
           }
        });

        let checkConditionThree = positionOfCurrentPiece.map((lor) => {
            if (occupiedIndexes.includes(lor + 1) || occupiedIndexes.includes(lor -1)) {
              return true;
            }
            else {
                return false;
            }      

        })

          console.log(checkConditionThree)  
          
        if  (checkConditionOne.includes(true)) {
            let objectsToConcat = positionOfCurrentPiece.map((newOccupiedCell)=> {
                return { num: newOccupiedCell, brdr: currentColor.borCol, bck: currentColor.backCol}
            })
            return occupied.concat(objectsToConcat);
        } 
        if  (checkConditionTwo.includes(true) && !checkConditionThree.includes(true)) {
            let objectsToConcat = positionOfCurrentPiece.map((newOccupiedCell)=> {
                return { num: newOccupiedCell, brdr: currentColor.borCol, bck: currentColor.backCol}
            })
            return occupied.concat(objectsToConcat);
        }   
        
        
        else {
            return occupied;
        }
    })
},[positionOfCurrentPiece])





 
// Moving pieces to the next line. This effect should do only this.

useEffect(()=> {
    const belated = setInterval(()=> {
       setPositionOfCurrentPiece((positionOfCurrentPiece)=>{         
          return positionOfCurrentPiece.map((elem) => {
              return elem + 10;
          })
        })
    },seconds);
    return () => clearInterval(belated);
    }, []
    ) 
        
            
               
             
return (
    <TetrisContext.Provider value={{
        gameStatus:playing,        
        initialPosition: positionOfCurrentPiece, 
        currCol : currentColor,        
        occ: occupied,
        occInd : occupiedIndexes
                 
    }}>
        {children}
    </TetrisContext.Provider>
        )
    }
    const TetrisConsumer =  TetrisContext.Consumer;   
       
    export { TetrisProvider, TetrisContext, TetrisConsumer}
        

