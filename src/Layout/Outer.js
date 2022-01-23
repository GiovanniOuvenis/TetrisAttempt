import React, {useContext, useEffect, useLayoutEffect, useState, useRef} from 'react';
import { TetrisContext } from '../TetrisContext';
import { Table } from './Table';
import {Emptydiv} from "./Emptydiv";
import {EmptySpace} from "./EmptySpace";
import { EmptyLeft } from "./EmptyLeft";
import { EmptyRight} from "./EmptyRight";
import { BottomRight} from "./BottomRight";
import NextPieces from './NextPieces';
import  EmptyDown from "./EmptyDown";
import Bottom from "./Bottom";




 function Outer() {
   const outerContext = useContext(TetrisContext);
  




useEffect(() => {
 const pauseElem = document.getElementById("pause");
   
 const logging = (e) => {
     
       if (e.keyCode === 32 && outerContext.gameStatus === true) {
           e.preventDefault(); 
           pauseElem.classList.remove("disappear"); 
        }
    }
    window.addEventListener("keyup", logging)
}, [outerContext.gameStatus])
    
    
    
return (
    <div className='outerDiv' >
                 
        <Emptydiv></Emptydiv>
        <EmptySpace></EmptySpace>
        <EmptyLeft></EmptyLeft>
        <EmptyRight></EmptyRight>
         <Table></Table>
        <NextPieces></NextPieces>
        <EmptyDown></EmptyDown>
        <Bottom></Bottom>
        <BottomRight></BottomRight>
    </div>
)
}


export { Outer }
                    
      


    




