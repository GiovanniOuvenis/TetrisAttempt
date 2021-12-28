import React, {useContext, useEffect, useState} from 'react';
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
   const conte = useContext(TetrisContext);
   const [outerState, setOuterState] = useState(false);

useEffect(() => {
 const pauseElem = document.getElementById("pause");
   
 const logging = (event) => {
       if (event.keyCode === 32) {
           pauseElem.classList.remove("disappear");          
       }
      
   }
   
    window.addEventListener("keyup", logging)
    
}, [conte.stat])

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