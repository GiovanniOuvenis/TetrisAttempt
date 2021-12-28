import React from 'react'

 function HalfCrossNinety(styl) {
    return (
        <div className='barcontainer' style={{minHeight:60, minWidth:40, }}>
        <div className='two' >
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

export { HalfCrossNinety };
