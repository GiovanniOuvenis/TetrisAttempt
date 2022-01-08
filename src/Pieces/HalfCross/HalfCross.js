import React from 'react'
import RenderPieceWithColor from '../../Layout/WithStyles';

function HalfCross(props) {
    return (
       
        <div className='container' style={{minHeight:20}}>
        <div className='rect down'style={{backgroundColor: props.clrOne, borderColor: props.clrTwo}}>con</div>      
        <div className='two'>
                <div className='rect'style={{backgroundColor: props.clrOne, borderColor: props.clrTwo}}>two</div>
                <div className='rect'style={{backgroundColor: props.clrOne, borderColor: props.clrTwo}}>two</div>
              </div>          
        <div className='rect down'style={{backgroundColor: props.clrOne, borderColor: props.clrTwo}}>con</div>           
    </div>
   
    )
}


export default RenderPieceWithColor(HalfCross);
