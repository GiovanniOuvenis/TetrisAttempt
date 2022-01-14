import React, {useContext
} from 'react';
import { TetrisContext } from '../TetrisContext';
import NextPiece from './NextPiece';
import AfterNextPiece from './AfterNextPiece';
import ThirdPiece from './ThirdPiece';


export default function NextPieces() {
    const nextPiecescontext = useContext(TetrisContext);
    
// Pieces are going to be shown this way only in the nextPieces section. In the table section I was thinking of something different 

    return (
        <div className='next-pieces'>
               <h1>hrllooooo</h1>
        </div>

    )
}
        
          
        
  
   

