import React from 'react';
import err from '../common/dri.gif';

export default () => {
  return (
     
    <div id="notfound" >
    <br/><br/><br/>
    <h1 className="display-3 text-center">404 not found</h1>
      <img 
                src={err}
                alt="loading..."
                style={{width:'50%' ,margin:'auto' , display:'block'}}/>
    </div>
  );
};