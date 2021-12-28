import { useRef, useEffect, useState } from "react/cjs/react.development"
import React  from 'react'

function BarFlat() {
  const barRef = useRef();
   const [position, setPosition] = useState();
 
   useEffect(()=>{
    const offset = barRef.current.offsetTop + 140;
    setPosition(offset);
    console.log(offset)
  },[])

    return (
    <div ref={barRef} className='container' style={{minHeight:20, position:"absolute", top: position, left:-5}}>
        <div className='rect'>con</div>
        <div className='rect'>con</div>
        <div className='rect'>con</div>
        <div className='rect'>con</div>           
    </div>
    )
}

export { BarFlat }
