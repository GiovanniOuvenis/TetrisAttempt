import React, { useContext} from 'react'
import { TetrisContext } from "../TetrisContext";
import RenderPieceWithColor from './WithStyles';

function AfterNextPiece() {
  const afterNextPieceContext = useContext(TetrisContext);
 

  
     return (
          <>
           {afterNextPieceContext.afterNext.comp}
          </>
    )
}

export default RenderPieceWithColor(AfterNextPiece);
