import React, { useContext} from 'react'
import { TetrisContext } from "../TetrisContext";
import RenderPieceWithColor from './WithStyles';

function NextPiece() {
  const nextPieceContext = useContext(TetrisContext);
  

  
     return (
          <div className='next-pieces' is="next">
           {nextPieceContext.nexPiece.comp}
          </div>
    )
}

export default RenderPieceWithColor(NextPiece);
