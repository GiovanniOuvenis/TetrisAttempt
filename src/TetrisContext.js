
import React, {useState, useEffect, useRef} from 'react';



const TetrisContext = React.createContext();

function TetrisProvider({children}) {
      
    const [currentColor, setCurrentColor] = useState({});    
    const [table, setTable] = useState([]); 
    const [pickedPiece, setPickedPiece] = useState([]);       
    const [trigger, setTrigger ] = useState(0);
    const [occupied, setOccupied] = useState([]);
    const indexOfDisplayed = useRef([0]);
       
    
    
function pickRandomColor() {
    const choices =  ["blue","blueviolet","orangered","olivedrab","fuchsia","forestgreen","firebrick","red","orange","orchid","greenyellow","green","goldenrod","wheat","white","brown"]
    const integer = choices.length;
    const colorNum = Math.floor(Math.random() * integer);
    return choices[colorNum];
    };   
        
function settingColors(stateArg) {
    stateArg.borCol = pickRandomColor();
    stateArg.backCol = pickRandomColor();
    return stateArg;
    };
    

useEffect(()=> {    
    setCurrentColor((currentColor)=> {
    return settingColors(currentColor)
    })
    }, [])    
    
  
useEffect(()=>{
    setTable((table)=>{
       for (let t=0; t<= 219; t++) {
        table.push({
            brdr: "red",
            bck: "black"
            })
        }
        return table;
    })
    },[])          
    

useEffect(()=>{
   setPickedPiece((pickedPiece)=>{
     const pieces = [
                 
         [
             [4,5,14,13],
             [15,25,14,4],
             [24,23,14,15],
             [13,3,14,24]
         ], // s
         [
             [4,5,15,16],
             [6,16,15,25],
             [26,25,15,14],
             [24,14,15,5] 
         ], // z
         [ 
             [5,15,25,26],
             [16,15,14,24],
             [25,15,5,4],
             [14,15,16,6]
         ], // L
         [
           [5,15,25,24],
           [16,15,14,4],
           [25,15,5,6],
           [14,15,16,26]  
         ], // Inverted L
         [
           [5,14,15,16],
           [16,5,15,25],
           [25,16,15,14],
           [14,25,15,5]// .:.  
         ]

     ] 
    
     let num = Math.floor(Math.random() * 5);
     return pieces[num];

   })
},[indexOfDisplayed.current])

useEffect(()=>{
    
setTable((table)=>{
      //   console.log(pickedPiece[indexOfDisplayed.current])
    if (!pickedPiece[indexOfDisplayed.current[0]]) {
        return table;
     } 
    for (let p=0; p <= pickedPiece[indexOfDisplayed.current[0]].length - 1; p++) {
           let ind = pickedPiece[indexOfDisplayed.current[0]][p]; 
           table[ind].brdr = currentColor.borCol;
           table[ind].bck = currentColor.backCol;   
            }              
         return table;         
    }
      )     
},[pickedPiece, indexOfDisplayed.current]) 
            

useEffect(()=>{
    const increaseRepeatedly = setInterval(()=>{
      setPickedPiece((pickedPiece)=>{
        let plusTen = pickedPiece.map((pp)=>{
            return pp.map((pt)=>{
                return pt + 10;
            })
        })        
        return plusTen;
      })     
           
           
    }, 1500)
    return ()=> clearInterval(increaseRepeatedly);
}, [])

/*useEffect(()=>{
  setTrigger((trigger)=>{
     
  })
},[numberOfReference])*/


useEffect(()=>{
    const handleArrowButtons = (e) => {
setPickedPiece((pickedPiece)=>{
    if (e.keyCode === 37) {   
             
        let minusOne = pickedPiece[indexOfDisplayed.current[0]].map((mo)=>{return mo -1})
        pickedPiece[indexOfDisplayed.current[0]].length = 0;
        pickedPiece[indexOfDisplayed.current[0]] = [...minusOne];
        return pickedPiece;
    } 
    if(e.keyCode === 38) {          
        if (indexOfDisplayed.current[0] === 3) {
            indexOfDisplayed.current[0] = 0;
            return indexOfDisplayed.current;
        } else {
            indexOfDisplayed.current[0] += 1;
        }       
    }
    if (e.keyCode === 39) {      
        let plusOne = pickedPiece[indexOfDisplayed.current[0]].map((po)=>{ return po + 1}) 
        pickedPiece[indexOfDisplayed.current[0]].length = 0;
        pickedPiece[indexOfDisplayed.current[0]] = [...plusOne];     
        return pickedPiece;
    }
    if (e.keyCode === 40) {
        let plusten = pickedPiece[indexOfDisplayed.current[0]].map((pten)=>{ return pten + 10})
        pickedPiece[indexOfDisplayed.current[0]].length = 0;
        pickedPiece[indexOfDisplayed.current[0]] = [...plusten];
        return pickedPiece;
    }


})
       
       
       
    }
        window.addEventListener("keyup", handleArrowButtons);
    },[])
        
        
    
           
   
 
      
        
      
       return (
           <TetrisContext.Provider  ref = {indexOfDisplayed} value={{
               refer: indexOfDisplayed,                         
               tab : table,             
               currCol : currentColor,               
               pp: pickedPiece                     
           }}>
               {children}
           </TetrisContext.Provider>
               )
           }
           const TetrisConsumer =  TetrisContext.Consumer;   
       
           export { TetrisProvider, TetrisContext, TetrisConsumer}    


    
            







      
   

    



   


