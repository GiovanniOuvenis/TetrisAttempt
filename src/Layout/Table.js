import React, { useState, useEffect, useContext, useLayoutEffect, useRef} from 'react';
import { Square } from "../Pieces/Square";
import { TetrisContext} from "../TetrisContext";
import { Pieces } from '../Data';


 function Table() {   
   const tableContext = useContext(TetrisContext);  
   const itemsToRender = tableContext.arrayToRender
   const [ tableToRender , setTableToRender] = useState([]);
   

useEffect(()=> {
  setTableToRender(()=>{
    return itemsToRender;
  })
},[itemsToRender])

     
  
  return (
    <div className='table-container'>
      <ul className='table'>
      {tableToRender.map((item,index) => {
        return <Square back={item.bck} brd={item.brdr} key={index} numberId={item.num}></Square>
      })}
      </ul>
      </div>
  )
}


export { Table };
      
    


    
  
    
         
     
   
 
      
      





