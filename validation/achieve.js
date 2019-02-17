const Validator=require('validator');
const isEmpty =require('./is-empty');
module.exports=function validatedupInput(data){
    let errors={};
   
    data.venue=!isEmpty(data.venue)? data.venue : '';
    data.event=!isEmpty(data.event)? data.event : '';
    
    
  
    
    if(Validator.isEmpty(data.venue)){
        errors.venue='Venue is required';
    }
    if(Validator.isEmpty(data.event)){
        errors.event='Event name is invalid';
    }
    
   
    
    
    return{
        errors,
        isValid:isEmpty(errors)
    };
};