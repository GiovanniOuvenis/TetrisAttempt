
import React  from 'react'
import RenderPieceWithColor from '../../Layout/WithStyles';

function BarFlat(props) {
  
    

    return (
    <div  className='container' >
        <div className='rect' style={{backgroundColor: props.clrOne, borderColor: props.clrTwo}}>con</div>
        <div className='rect'style={{backgroundColor: props.clrOne, borderColor: props.clrTwo}}>con</div>
        <div className='rect'style={{backgroundColor: props.clrOne, borderColor: props.clrTwo}}>con</div>
        <div className='rect'style={{backgroundColor: props.clrOne, borderColor: props.clrTwo}}>con</div>           
    </div>
    )
}

export default RenderPieceWithColor(BarFlat);
