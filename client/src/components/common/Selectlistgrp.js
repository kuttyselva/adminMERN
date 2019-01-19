import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
const Selectlistgrp=({
    name,value,error,info,onChange,options
})=>{
    const selectoptions=options.map(option => (
        <option key={option.label} value={option.value}>{option.label}</option>
    ))
    return(
        <div className="form-group">
        <select className={classnames("form-control form-control-lg",{'is-invalid': error})}  value={value} onChange={onChange} name={name} >
        {selectoptions}
        </select>
        {info && <small className="form-text text-muted">{info}</small>}
        {error && (<div className="invalid-feedback">{error}</div>)}
      </div>
    )
};
Selectlistgrp.propTypes={
    name:PropTypes.string.isRequired,
    value:PropTypes.string.isRequired,
    info:PropTypes.string,
    error:PropTypes.string,
    options:PropTypes.array.isRequired,
    onChange:PropTypes.func.isRequired,
    

};

export default Selectlistgrp;