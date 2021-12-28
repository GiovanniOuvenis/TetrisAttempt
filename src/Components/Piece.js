import React, {useState,useEffect} from 'react';
import { Colored } from "./Colored";
import { BarFlat } from "../Pieces/Bar/BarFlat";
import { Block} from "../Pieces/Block/Block";

function Piece() {
    const [pieceToRender, setPieceToRender] = useState()

    useEffect(()=>{
        setPieceToRender(Block);
    },[])

    return (
        <Colored >
        {pieceToRender}
        </Colored>       
       
        
    )
}

export { Piece }
