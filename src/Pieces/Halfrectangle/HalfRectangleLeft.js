import React from 'react'
import RenderPieceWithColor from '../../Layout/WithStyles'

function HalfRectangleLeft(props) {
    return (
        <div className='container'>
            
           <div className='two'>
                <div className='rect' style={{backgroundColor: props.clrOne, borderColor: props.clrTwo}}>two</div>
                <div className='rect'style={{backgroundColor: props.clrOne, borderColor: props.clrTwo}}>two</div>
                <div className='rect'style={{backgroundColor: props.clrOne, borderColor: props.clrTwo}}>two</div>
            </div> 
            <div className='rect'style={{backgroundColor: props.clrOne, borderColor: props.clrTwo}}>one</div>
         </div>
    )
}


export default RenderPieceWithColor(HalfRectangleLeft);