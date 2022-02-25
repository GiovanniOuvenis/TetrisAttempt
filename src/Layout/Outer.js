import React from 'react';
import { Table } from './Table';
import {EmptyUpLeft} from "./EmptyUpLeft";
import {TetrisTitle} from "./TetrisTitle";
import { EmptyUpRight } from './EmptyUpRight';
import { BottomRight, EmptyDownRight} from "./EmptyDownRight";
import { ShowInstructions } from './ShowInstructions';
import { ShowScore } from './ShowScore';
import {EmptyDownLeft} from "./EmptyDownLeft";
import {EmptyDownCenter} from "./EmptyDownCenter";




 function Outer() {
    
    
return (
    <div className='outerDiv' >
        <EmptyUpLeft></EmptyUpLeft>
        <TetrisTitle></TetrisTitle>
        <EmptyUpRight></EmptyUpRight>
        <ShowScore></ShowScore>      
        <Table></Table>
        <ShowInstructions></ShowInstructions>               
        <EmptyDownLeft></EmptyDownLeft>
        <EmptyDownCenter></EmptyDownCenter>
        <EmptyDownRight></EmptyDownRight>
    </div>
)
}


export { Outer }
                    
      


    




