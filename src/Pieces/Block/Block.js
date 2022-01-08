import React from 'react';
import RenderPieceWithColor from '../../Layout/WithStyles';

function Block(props) {
    return (
    <div className='container'>
        <div className='two'>
            <div className='rect'style={{backgroundColor: props.clrOne, borderColor: props.clrTwo}}>two</div>
            <div className='rect'style={{backgroundColor: props.clrOne, borderColor: props.clrTwo}}>two</div>
          </div>
          <div className='two'>
            <div className='rect'style={{backgroundColor: props.clrOne, borderColor: props.clrTwo}}>two</div>
            <div className='rect'style={{backgroundColor: props.clrOne, borderColor: props.clrTwo}}>two</div>
          </div>                    
    </div>
    )
}

export default RenderPieceWithColor(Block);
