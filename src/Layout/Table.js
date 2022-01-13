import React, { useState, useEffect, useContext, useLayoutEffect, useRef} from 'react';
import { Square } from "../Pieces/Square";
import { TetrisContext} from "../TetrisContext";
import { Pieces } from '../Data';


 function Table() {
   
   const tableContext = useContext(TetrisContext);  
   const positions = tableContext.nexPiece.position;
   const [contents, setContents] = useState([]);
   const tableRef = useRef();
   const itemsToShow = tableContext.square;
   const status = tableContext.gameStatus;
console.log(positions)

   useEffect(() => {
     setContents(contents => {
       contents = [...itemsToShow];
       
       return contents
     })
   }, [status])
 



    return (
      <div className='table-container'>
        <ul className='table' ref={tableRef}>
        {contents.map((item,index)=> {
          return (
            <Square keys={item.num} numberId={item.num} brd={item.brdColr} back={item.backColr}></Square>
            
          )
        })}
        </ul>
        </div>
    )
}


export { Table };


