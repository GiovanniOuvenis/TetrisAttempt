import React from 'react';
import RenderPieceWithColor from '../../Layout/WithStyles';


function ZetaPiece(props) {
    return (        
        <div className='container'>
           <div className='rect one' style={{backgroundColor: props.clrOne, borderColor: props.clrTwo}}>one</div>  
              <div className='two'>
                <div className='rect'style={{backgroundColor: props.clrOne, borderColor: props.clrTwo}}>two</div>
                <div className='rect'style={{backgroundColor: props.clrOne, borderColor: props.clrTwo}}>two</div>
              </div>          
            <div className='rect aux-class-sigma'style={{backgroundColor: props.clrOne, borderColor: props.clrTwo}}>three</div> 
              
                     
        </div>
        
    )
}




export default RenderPieceWithColor(ZetaPiece);



