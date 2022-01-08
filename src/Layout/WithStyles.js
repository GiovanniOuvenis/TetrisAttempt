import React from 'react';


 
const RenderPieceWithColor = (ComponentArg) => {
    
    class NewComponent extends React.Component {
      constructor(props) {
          super(props)
          
          this.state = {
              bgClr : "",
              brClr : ""
          }
      }      

      pickColorBckgr = () => {
        const colors = ["blue","blueviolet","orangered","olivedrab","fuschia","forestgreen","firebrick","red","orange","orchid","greenyellow","green","goldenrod","wheat","white","brown"]
        const maxim = colors.length;
        const ind = Math.floor(Math.random() * maxim);
        this.setState(()=> {
            return { bgClr : colors[ind]}
        })
    }   


    pickColorBrdr = () => {
        const colors = ["blue","blueviolet","orangered","olivedrab","fuschia","forestgreen","firebrick","red","orange","orchid","greenyellow","green","goldenrod","wheat","white","brown"]
        const maxim = colors.length;
        const ind = Math.floor(Math.random() * maxim);
        this.setState(()=> {
            return { brClr : colors[ind]}
        })
    }   


      componentDidMount() {
         this.pickColorBckgr();       
         this.pickColorBrdr();
    
      }
        

        render () {
            return (
               
                    <ComponentArg clrOne={this.state.bgClr} clrTwo={this.state.brClr}></ComponentArg>
                    
                    )
                }
            }
            return NewComponent
        }
            
                            
                   
                              
                 
                  
            

export default RenderPieceWithColor;