import React, {useContext, useState, useEffect
} from 'react';
import { TetrisContext } from '../TetrisContext';
import NextPiece from './NextPiece';
import AfterNextPiece from './AfterNextPiece';


export default function NextPieces() {
    const nextPiecescontext = useContext(TetrisContext);
    
    
    

    return (
        <div className='next-pieces'>
            <NextPiece ></NextPiece> 
            <AfterNextPiece></AfterNextPiece>     
        </div>

    )
}
        
          
        
  
   

