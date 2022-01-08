import React, { useContext} from 'react'
import { TetrisContext } from "../TetrisContext";


function AfterNextPiece() {
  const afterNextPieceContext = useContext(TetrisContext);
 

  
     return (
          <div className='next-pieces'>
           {afterNextPieceContext.afterNext.comp}
          </div>
    )
}

export default AfterNextPiece;
