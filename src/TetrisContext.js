import React, {useState, useEffect} from 'react';
import {Pieces} from "./Data";


const TetrisContext = React.createContext();

function TetrisProvider({children}) {
    
    const [currentColor, setCurrentColor] = useState({});
    const [positionOfCurrentPiece,setPositionOfCurrentPiece] = useState([]);
    const [currentArray, setCurrentArray] = useState([]);
    const [seconds, setSeconds] = useState(1500);
    const [trigger, setTrigger] = useState(false);
    

    



 
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
    }, [trigger])    



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
   setPositionOfCurrentPiece((positionOfCurrentPiece)=> {
    let result = pickRandomPositionsOfPiece();
    return result;
   })
   
}, [trigger])


useEffect(() => {
  setCurrentArray((currentArray)=> {   
      
        let currObject = {};
        for (let s=0; s <=219; s++) {
            currObject =  {num : s,
                    brdr: "red",
                    bck: "black",
                    occupied: false
                }                
                currentArray.push(currObject);
            } 
            return currentArray;
          })
      }, [])
        
        
      /*else {
      let checked = currentArray.map((ce, index) => {
         if (ce.num >= 210) {
             ce.occupied = true;
             return ce;
         } 
         if ( ce.occupied === true ) {
             return ce;
         } 
         if (positionOfCurrentPiece.includes(index)) {
             ce.bck = currentColor.backCol;
             ce.brdr = currentColor.borCol;
             return ce;
         }

      })
      return checked;
      }*/
     

 
useEffect(()=>{
setTrigger(()=> {
    let condition = positionOfCurrentPiece.map((it)=>{
            if (it >= 210) {
                return true;
            } 
            if (currentArray[it + 10].occupied === true) {
                return true;
            }
            else {
                return false;
            }
    })
console.log(condition);
    return condition.includes(true)? !trigger : trigger;   
})
},[positionOfCurrentPiece])

// γραψε εδω ενα εφεκτ να χειριζεται το τριγκερ τι θα συμβαινει στο καρενταρρει



useEffect(()=> {
    const belated = setInterval(()=> {

       setCurrentArray((currentArray)=>{         
         for (let p=0; p< positionOfCurrentPiece.length; p++) {
          currentArray[p].bck = currentColor.backCol;
          currentArray[p].brdr = currentColor.brdr;
         } 
          return currentArray;

          
          
        })

    },seconds);

    return () => clearInterval(belated);
    }, []
    ) 

 

  /*   
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
                    if (occupied.indexes.includes(pos + 1)) {
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
                       if (occupied.indexes.includes(piec - 1)) {
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
*/








// Moving pieces to the next line. This effect should do only this.


           
            






        
            
               
             
return (
    <TetrisContext.Provider value={{
        startingPosition: positionOfCurrentPiece, 
        Col : currentColor,        
        arrayToRender : currentArray     
        
        
                 
    }}>
        {children}
    </TetrisContext.Provider>
        )
    }
    const TetrisConsumer =  TetrisContext.Consumer;   
       
    export { TetrisProvider, TetrisContext, TetrisConsumer}
        

