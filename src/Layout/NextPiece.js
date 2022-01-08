import React, { useContext} from 'react'
import { TetrisContext } from "../TetrisContext";
import RenderPieceWithColor from './WithStyles';

function NextPiece() {
  const nextPieceContext = useContext(TetrisContext);
  
// This component that is provided from context is going to be rendered and given style by a Higher order component (WithStyles.js) 
// the same goes with afterNextpiece and thirdpiece

     return (
          <>
           {nextPieceContext.nexPiece.comp}
          </>
    )
}

export default RenderPieceWithColor(NextPiece);
