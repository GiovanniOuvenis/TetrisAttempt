import React, { useState,  useContext, useLayoutEffect} from 'react';
import { Square } from "../Pieces/Square";
import { TetrisContext} from "../TetrisContext";



 function Table() {   
   const tableContext = useContext(TetrisContext);  
   const borderAndBackgroundColors = tableContext.currCol;
   const squaresToPaint = tableContext.initialPosition;
   const tableOccupied = tableContext.occ;    
   const [contents, setContents] = useState([]);

  useLayoutEffect(()=>{
    setContents((contents)=> {
      contents.length = 0;
      const {borCol, backCol} = borderAndBackgroundColors;     
      let objToPush = {};
  for (let s=0; s <= 219; s++) {
   if (squaresToPaint.includes(s)) {
      objToPush = {
        num: s,
        brdr: borCol,
        bck: backCol
      }
    } else {
        objToPush = {
          num: s,
          brdr: "red",
          bck: "black"
        } 
      }
      contents.push(objToPush);
    } 
    for (let o=0; o < tableOccupied.length; o++) {
      let ind = tableOccupied[o].num;
      contents[ind] = tableOccupied[o];
    }
    return contents;
  })
  },[squaresToPaint])

  
  


  return (
    <div className='table-container'>      
      <ul className='table'>
      {contents.map((item,index) => {
        return <Square back={item.bck} brd={item.brdr} key={index} numberId={item.num}></Square>
      })}
      </ul>
      </div>
  )
}

export { Table };

    
  
    
         
     
   