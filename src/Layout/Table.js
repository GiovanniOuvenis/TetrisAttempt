import React, { useState,  useContext, useLayoutEffect} from 'react';
import { Square } from "../Pieces/Square";
import { TetrisContext} from "../TetrisContext";



 function Table() {   
   const tableContext = useContext(TetrisContext);  
   const borderAndBackgroundColors = tableContext.currCol;
   const squaresToPaint = tableContext.initialPosition;
   const tableOccupied = tableContext.occ;
   const endGame = tableContext.gameOver;   
   const [contents, setContents] = useState([]);

   // Αυτό που ήθελα να κάνω είναι να δημιουργήσω ένα array με objects ίσα με´οσα κουτιά 
   // έχει ο πίνακας και σε κάθε object να έχει πληροφοριες με τι χρώματα είναι να βαφτεί.
   // Αυτο το component στην ουσία κάνει render 220 φορές το square component το οποίο περιμένει.
   // πληροφορίες για το background colorκαι το border color.

  useLayoutEffect(()=>{
    setContents((contents)=> {
      contents.length = 0;
      const {borCol, backCol} = borderAndBackgroundColors;     
      let objToPush = {};
  for (let s=0; s <= 219; s++) {
    // Αν μιλάμε για το κομμάτι που βρίσκεται σε κίνηση αυτη την στιγμη
   if (squaresToPaint.includes(s)) {
      objToPush = {
        num: s,
        brdr: borCol,
        bck: backCol
      }
    } 
    // αλλιως να το βαψει μαυρο με κοκκινο περιγραμμα σαν κενο δλδ.
    else {
        objToPush = {
          num: s,
          brdr: "red",
          bck: "black"
        } 
      }
      contents.push(objToPush);
    } 
    // αφου γινει η προηγουμενη διαδικασια, ψαχνω ενα ενα τα κατειλημμενα κομματια και 
    // τα κουτια του array που δημιουργω τωρα, τα οποια εχουν τα αντιστοιχα νουμερα τα βαφω με ότι
    // πληροφοριες λεει το object που βρισκεται στα κατειλημμενα γι αυτο το νουμερο.
    for (let o=0; o < tableOccupied.length; o++) {
      let ind = tableOccupied[o].num;
      contents[ind] = tableOccupied[o];
    }
    return contents;
  })
  },[squaresToPaint,endGame])

  
  


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

    
  
    
         
     
   
 
      
      





