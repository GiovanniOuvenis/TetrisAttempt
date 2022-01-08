import React, { useState, useEffect, useContext, useLayoutEffect} from 'react';
import { Square } from "../Pieces/Square";
import { TetrisContext} from "../TetrisContext";
import { Pieces } from '../Data';


 function Table() {
   const [contents, setContents] = useState([]);
   const contextT = useContext(TetrisContext);  
   const [nextItem, setNextItem] = useState({});

   useEffect(()=> {
    setContents(contents => {
     let objToPass = {};
      for (let i=0; i <= 219; i++) {
        objToPass = {
          num : i          
        } 
        contents.push(objToPass)
       } 
      
         
       return contents;
    }
    )
   
  },[])

useEffect(() => {
  const pickFirstShape = () => {
    const maximum = Pieces.length;
    const indexOfPiece = Math.floor(Math.random() * maximum);
    return Pieces[indexOfPiece];
   }
   let result = pickFirstShape();
   setNextItem(result);
   
   
 
}, [contextT.gameStatus])


    return (
      <div className='table-container'>
        <ul className='table' >
        {contents.map((item,index)=> {
          return (<li id={`item${index}`} key={index} className='listItem' >
            <Square keys={item.num} numberId={item.num}></Square>
            </li>
          )
        })}
        </ul>
        </div>
    )
}


export { Table };


