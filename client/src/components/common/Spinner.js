import React from 'react';
import spinner from './blob.gif';
export default()=>{
    return(
        <div>
            <img 
                src={spinner}
                alt="loading..."
                style={{width:'100px' ,margin:'auto' , display:'block',marginTop:'12%'}}/>
        </div>
    )
}