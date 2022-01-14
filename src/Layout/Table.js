import React, { useState, useEffect, useContext, useLayoutEffect, useRef} from 'react';
import { Square } from "../Pieces/Square";
import { TetrisContext} from "../TetrisContext";
import { Pieces } from '../Data';


 function Table() {   
   const tableContext = useContext(TetrisContext);  
   const borderAndBackgroundColors = tableContext.currCol;
   const squaresToPaint = tableContext.initialPosition;
   const [squaresToColor, setSquaresToColor] = useState([]);
   const [contents, setContents] = useState([]);

/*useEffect(()=> {
setSquaresToColor((squaresToColor)=> {
  if (squaresToColor.length === 0) {
    squaresToColor = [...squaresToPaint];
  } else {
    squaresToColor = squaresToColor.map((item) => {
      return item + 10;
    })
  }
  return squaresToColor;
})
},[squaresToPaint])*/


useLayoutEffect(()=>{
   setContents((contents)=> {
     contents.length = 0;
     const {borCol, backCol} = borderAndBackgroundColors;
     
     let objToPush = {};
 for (let s=0; s <= 219; s++) {
      
      objToPush = {
        num: s,
        brdr: "red",
        bck: "black"
      } 
      if (squaresToPaint.includes(s)) {
        objToPush = {
          num: s,
          brdr: borCol,
          bck: backCol
        }
      }
      contents.push(objToPush);
    }
 
 return contents
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


