import React from 'react';
import { TetrisConsumer } from '../TetrisContext';
 
const RenderPieceWithColor = (ComponentArg) => {
    
    class NewComponent extends React.Component {
      constructor(props) {
          super(props)
          
      }
        

        render () {
            return (
            <TetrisConsumer>
                {(value) => {
                    const { nexPiece } = value;
                    const  bckClr  = nexPiece.backColor;  
                    const  brdrClr = nexPiece.borderColor; 
                    const root = document.getElementById("next");
                    
                    
                   
                 return  <ComponentArg  clrOne={bckClr} clrTwo={brdrClr}/>
                 }                
                 }
                  
            
            </TetrisConsumer>
            )
        }
    }
    return NewComponent
}

export default RenderPieceWithColor;