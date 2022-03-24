import React, { useState,  useContext, useLayoutEffect} from 'react';
import { Square } from "../Pieces/Square";
import { TetrisContext} from "../TetrisContext";

function Table() {      
   const tableContext = useContext(TetrisContext);   
   const arrToRender = tableContext.tab;
   
    
    
   
  
  return (
    <div className='table-container'>      
      <ul className='table'>
      {arrToRender.map((item,index) => {
        return <Square back={item.bck} brd={item.brdr} key={index} ></Square>
      })}
      </ul>
      </div>
  )
}
export { Table };
