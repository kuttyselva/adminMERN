const Validator=require('validator');
const isEmpty =require('./is-empty');
module.exports=function validatedProInput(data){
    let errors={};
   
    data.name=!isEmpty(data.name)? data.name : '';
    data.team=!isEmpty(data.team)? data.team : '';
    
    
  
    
    if(Validator.isEmpty(data.name)){
        errors.name='Name is required';
    }
    if(Validator.isEmpty(data.team)){
        errors.team='# of Team is required';
    }
    
   
    
    
    return{
        errors,
        isValid:isEmpty(errors)
    };
};