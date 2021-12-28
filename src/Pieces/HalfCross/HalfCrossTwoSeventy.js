import React from 'react';


 function HalfCrossTwoSeventy() {
    return (
        <div className='barcontainer rotated' style={{minHeight:60}}>
        <div className='two'>
                 <div className='rect'>two</div>
                 <div style={{display:'flex', flexDirection:"row", minWidth:40}}>
                 <div className='rect' >two</div>
                 <div className='rect' >two</div>
                 </div>           
                    
                 <div className='rect'>two</div>                 
        </div>                     
     </div>
    )
}


export { HalfCrossTwoSeventy }