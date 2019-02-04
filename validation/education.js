const Validator=require('validator');
const isEmpty =require('./is-empty');
module.exports=function validatedupInput(data){
    let errors={};
   
    data.school=!isEmpty(data.school)? data.school : '';
    data.degree=!isEmpty(data.degree)? data.degree : '';
    
    data.from=!isEmpty(data.from)? data.from : '';
  
    
    if(Validator.isEmpty(data.school)){
        errors.school='school is required';
    }
    if(Validator.isEmpty(data.degree)){
        errors.degree='company is invalid';
    }
    
    if(Validator.isEmpty(data.from)){
        errors.from='from date is required';
    }
    
    
    
    return{
        errors,
        isValid:isEmpty(errors)
    };
};