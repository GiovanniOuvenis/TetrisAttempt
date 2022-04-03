import React, {useState, useEffect, useRef} from 'react';


const TetrisContext = React.createContext();

function TetrisProvider({children}) {      
    const [currentColor, setCurrentColor] = useState({});
    const [positionOfCurrentPiece, setPositionOfCurrentPiece] = useState([]);
    const [occupied, setOccupied] = useState([]);   
    const [seconds, setSeconds] = useState(1500); 
    const [trigger, setTrigger] = useState(false); 
    const [score, setScore] = useState("0000005");    
    const contextRef = useRef([0]);
  

    function pickRandomColor() {
        const choices =  ["blue","blueviolet","orangered","olivedrab","fuchsia","forestgreen","firebrick","red","orange","orchid","greenyellow","green","goldenrod","wheat","white","brown"]
        const integer = choices.length;
        const colorNum = Math.floor(Math.random() * integer);
        return choices[colorNum];
     };   
     function pickRandomPositionsOfPiece() {
        const positions = [[25,15,35,5],[15,4,5,16],[14,4,5,13],[15,4,5,25],[15,5,16,25],[15,5,6,25],[14,4,15,5]]
        const int = positions.length;
        const positionsInt = Math.floor(Math.random() * int);
        let picked = positions[positionsInt]
        return picked;
      };
      function settingColors(stateArg) {
        stateArg.borCol = pickRandomColor();
        stateArg.backCol = pickRandomColor();
        return stateArg;
      };
      function recursiveCount(numArg, arrArg) {
         if (!arrArg.includes(numArg)) {
             return false;
         } else if ((numArg + 1) % 10 === 0) {
             return Math.floor(numArg / 10) * 10;
         } else {
             return recursiveCount(numArg+1,arrArg)
         }
      }
     

useEffect(()=> {    
     setCurrentColor((currentColor)=> {
     return settingColors(currentColor)
     })
    }, [occupied])    


useEffect(()=> {  
  setPositionOfCurrentPiece((positionOfCurrentPiece) => {
    let result = pickRandomPositionsOfPiece();
    return result;  
  })
}, [occupied])



  
       
     


 useEffect(() => {
    const rightLeftDownKey = (e) => {
       
        setPositionOfCurrentPiece((positionOfCurrentPiece)=> {
            
            if (e.keyCode === 39) {
                
                let onePieceRight = positionOfCurrentPiece.some((pos) => {
                  if ((pos + 1) % 10 === 0) {
                    return true;
                } 
                if (contextRef.current.includes(pos + 1)) {
                    return true;
                }
                
                })
                
            let right = positionOfCurrentPiece.map((re)=>{
                return re + 1;
            })  
            
            if (onePieceRight) {
                return positionOfCurrentPiece;                
            } 
            else {
                return right;
            }
            } else if (e.keyCode === 37) {
    
            e.preventDefault();
            let conditionToMove = positionOfCurrentPiece.some((piec) => {
             if (piec % 10 === 0) {
                 return true;
             } 
             if (contextRef.current.includes(piec -1)) {
                return true;
            }

            })
            let onePieceLeft = positionOfCurrentPiece.map(((lp) => {
                return  lp - 1;
            }))
         
        if (conditionToMove) {
             return positionOfCurrentPiece;
        } else {
             return onePieceLeft;
        }
    } 
    else if (e.keyCode === 40) {       
        e.preventDefault();
        // 
        if (trigger) {
            return positionOfCurrentPiece;
        }
        let onePieceDown = positionOfCurrentPiece.map((arg) => {
          return  arg + 10;       
        })       
        let collision = positionOfCurrentPiece.some((col) =>{
            if (col >= 210) {
              return true;
            } 
            if (contextRef.current.includes(col + 10)) {
              return true;
            }
        })
        
     if (collision) {       

       return  positionOfCurrentPiece.concat(positionOfCurrentPiece[0]);
     } else {
        return onePieceDown;
     }
        
    } else if (e.keyCode === 38) {
        e.preventDefault();
        let newArray = [];
        for (let r=0; r < positionOfCurrentPiece.length; r++){
            newArray[0] = positionOfCurrentPiece[0];     

            if (positionOfCurrentPiece[r] === positionOfCurrentPiece[0] - 10) {
                newArray[r] = positionOfCurrentPiece[0]  +1;
            }

            if (positionOfCurrentPiece[r] === positionOfCurrentPiece[0] - 10 + 1) {
                newArray[r] = positionOfCurrentPiece[0] + 10 + 1;
            }
            if (positionOfCurrentPiece[r] === positionOfCurrentPiece[0] + 1) {
                newArray[r] = positionOfCurrentPiece[0] + 10;
            }
            if (positionOfCurrentPiece[r] === positionOfCurrentPiece[0] + 10 + 1) {
                newArray[r] = positionOfCurrentPiece[0] + 10 -1;
            }
            if (positionOfCurrentPiece[r] === positionOfCurrentPiece[0] + 10) {
                newArray[r] = positionOfCurrentPiece[0] - 1;
            }
            if (positionOfCurrentPiece[r] === positionOfCurrentPiece[0] + 10 - 1) {
                newArray[r] = positionOfCurrentPiece[0] - 10 - 1;
            }
            if (positionOfCurrentPiece[r] === positionOfCurrentPiece[0] - 1) {
                newArray[r] = positionOfCurrentPiece[0] - 10;
            }
            if (positionOfCurrentPiece[r] === positionOfCurrentPiece[0] - 10 - 1) {
                newArray[r] = positionOfCurrentPiece[0] - 10 + 1;
            }  

            if (positionOfCurrentPiece[r] === positionOfCurrentPiece[0] - 20) {
                newArray[r] = positionOfCurrentPiece[0] + 2;
            }

            if (positionOfCurrentPiece[r] === positionOfCurrentPiece[0] + 2) {
                newArray[r] = positionOfCurrentPiece[0] - 20;
            }
                               
            
        }
       
        let checkCondition = newArray.some((item)=>{
           if (item >=210) {
               return true;
           }
           if (contextRef.current.includes(item + 10)) {
               return true;
           }
        })
        
         let superImpose = newArray.some((rot)=>{
             if (contextRef.current.includes(rot)) {
                 return true;
             } else {
                 return false;
             }
         })
         
          let isBarOnRightMargin = positionOfCurrentPiece.every((ir) => {
              return (ir + 1) % 10 === 0;
          })
          if (isBarOnRightMargin) {
            let minusTwo = newArray.map((mt)=> {
                return mt - 2;
            })
            return minusTwo;
        }         
       if (superImpose) {
        return positionOfCurrentPiece;
       }        
        if (positionOfCurrentPiece[0] - positionOfCurrentPiece[1] === 10 && positionOfCurrentPiece[2] - positionOfCurrentPiece[3] === 10) {
            return positionOfCurrentPiece;
        }       
       if (positionOfCurrentPiece[0] >= 210 || contextRef.current.includes(positionOfCurrentPiece[0] + 10)) {
            let minusTen = newArray.map((mt) => {
                return mt - 10;
            })
            return minusTen.concat(positionOfCurrentPiece[0],positionOfCurrentPiece[0]);
        }        
       if (positionOfCurrentPiece[0] % 10 === 0 || contextRef.current.includes(positionOfCurrentPiece[0] -1)) {
            let plusOne = newArray.map((po)=>{
                return po + 1;
            }) 
            return plusOne;
       }  
       if ((positionOfCurrentPiece[0] + 1) % 10 === 0) {
           let minusOne = newArray.map((mo) => {
               return mo - 1;
           })
           return minusOne;
       }   
       if (checkCondition) {
           return newArray.concat(positionOfCurrentPiece[0],positionOfCurrentPiece[0]);
       } else {
           return newArray;
       }
    }            
})
}
window.addEventListener("keyup", rightLeftDownKey);

}, [])
        
useEffect(()=> {    
       let getIndexes = occupied.map((ci)=>{
           return ci.num;
       });           
       contextRef.current = getIndexes     
       return contextRef;
   
   },[occupied]);            
      
 

 useEffect(()=> {
    setOccupied((occupied) => {           
       
    if  (positionOfCurrentPiece.length >= 6) {
        let objectsToConcat = positionOfCurrentPiece.map((newOccupiedCell)=> {
        return { num: newOccupiedCell, brdr: currentColor.borCol, bck: currentColor.backCol}
        })
        let newOccupied = occupied.concat(objectsToConcat);
        let indexes = newOccupied.map((indx)=>{
            return indx.num;
        })
        let minVal = Math.min.apply(null,indexes);
        let rows = [];
        for (let r=210; r >=minVal; r-=10) {
            let row = recursiveCount(r,indexes);
            if (row) {
                rows.push(row);
            }
        }
        contextRef.current[0] = rows.length * 1000;
        
        let newFiltered = newOccupied.filter((itf)=>{
            let floored = Math.floor((itf.num) / 10) * 10;
            let times = 0;
            for (let z=0; z< rows.length; z++) {
                if (itf.num < rows[z]) {
                    times += 10;
                }
            }
            itf.num += times;
            return !rows.includes(floored);
        })
        
          return newFiltered;
        } else {
          return occupied;
        }            
       })

 },[positionOfCurrentPiece])     





useEffect(()=>{
    setTrigger((trigger)=> {
     let condition = positionOfCurrentPiece.some((pocp)=>{
         return contextRef.current.includes(pocp)})
    return condition ? true : false;
    })
  },[positionOfCurrentPiece])

  
        
        
        
useEffect(()=> {
       const belated = setInterval(()=> {
          setPositionOfCurrentPiece((positionOfCurrentPiece)=>{   
                   
          let check =  positionOfCurrentPiece.some((elem) => {
                if (contextRef.current.includes(elem + 10)) {
                    return true;
                } 
                if (elem < 210) {
                    return false;
                } else {
                    return true;
                }
            })
          let plusTen = positionOfCurrentPiece.map((pop) => {
              return pop + 10;
          })
          if (trigger) {
              return positionOfCurrentPiece;
          }
          if (check) {          
              let itemToConcat = positionOfCurrentPiece[0];    
              let newPositions = positionOfCurrentPiece.concat(itemToConcat);
            return newPositions;
          } else {
              return plusTen;
          }
            
          }) 
        },seconds);
        return () => clearInterval(belated);
        }, [seconds,trigger]
        ) 

  useEffect(()=> {
            const changeSpeed = setInterval(()=> {
               setSeconds((seconds)=>{   
                return seconds <= 500 ? seconds : seconds - 200;                               
               }) 
             },180000);
             return () => clearInterval(changeSpeed);
             }, []
             ) 



useEffect(()=>{
  setScore((score)=>{
      let parsed = parseInt(score);               
      console.log(contextRef.current[0]) 
      let newScore = parsed + 5 + contextRef.current[0];
     /* if (typeof contextRef.current[0] === "number") {
          newScore += contextRef.current[0]
      }*/
      let stringedLength = newScore.toString().length; 
      let digits = 7 - stringedLength; 
      let arrToJoin = [];
      arrToJoin.length = 7;
      arrToJoin.fill(0,0,digits);
      arrToJoin.push(newScore); 
         if (trigger) {
             return score;
         } else {
      return arrToJoin.join("");
         }
  })
},[occupied])          

         
return (
    <TetrisContext.Provider ref={contextRef} value={{
    refer : contextRef,
    initialPosition: positionOfCurrentPiece, 
    currCol : currentColor,        
    occ: occupied,                           
    trigg: trigger,
    points : score
}}>
    {children}
</TetrisContext.Provider>
    )
}
const TetrisConsumer =  TetrisContext.Consumer;   

export { TetrisProvider, TetrisContext, TetrisConsumer}    
           


    
            







      
   

    



   


