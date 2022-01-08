import React, { useContext} from 'react'
import { TetrisContext } from "../TetrisContext";
import RenderPieceWithColor from './WithStyles';

function ThirdPiece() {
  const thirdPieceContext = useContext(TetrisContext);
 

  
     return (
          <>
           {thirdPieceContext.finalPiece.comp}
          </>
    )
}

export default RenderPieceWithColor(ThirdPiece);
