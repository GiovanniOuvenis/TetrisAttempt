import React from 'react';
import { ZeroDegz } from '../Pieces/zPiece/ZeroDegz';
import { Block } from "../Pieces/Block/Block";
import { HalfCross } from "../Pieces/HalfCross/HalfCross";

export default function NextPieces() {
    return (
        <div className='next-pieces'>
            <div className='next'>
                <Block></Block>
            </div>
            <div className='afternext'>
                <ZeroDegz></ZeroDegz>
            </div>
            <div className='afterafternext'>
                <HalfCross></HalfCross>
            </div>
        </div>
    )
}
