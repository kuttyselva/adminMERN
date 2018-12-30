const Validator=require('validator');
const isEmpty =require('./is-empty');
module.exports=function validateProfileInput(data){
    let errors={};
   
    data.handle=!isEmpty(data.handle)? data.handle : '';
    data.status=!isEmpty(data.status)? data.status : '';
    data.skills=!isEmpty(data.skills)? data.skills : '';

  
    
    if(!Validator.isLength(data.handle,{min:2,max:40})){

        errors.handle='handle needs to between 2 to 40 character';
    }
    if(Validator.isEmpty(data.handle)){
        errors.handle='profile handle is requied';
    }
    if(Validator.isEmpty(data.status)){
        errors.status='status is required';
    }
     if(Validator.isEmpty(data.skills)){
        errors.skills='skills is required';
    }
    if(!isEmpty(data.website)){
        if(!Validator.isURL(data.website)){
            errors.website='url invalid';
        }
    }
    if(!isEmpty(data.web)){
        if(!Validator.isURL(data.web)){
            errors.web='url invalid';
        }
    }
    if(!isEmpty(data.youtube)){
        if(!Validator.isURL(data.youtube)){
            errors.youtube='youtube url invalid';
        }
    }
    if(!isEmpty(data.twitter)){
        if(!Validator.isURL(data.twitter)){
            errors.twitter='twitter url invalid';
        }
    }
    if(!isEmpty(data.facebook)){
        if(!Validator.isURL(data.facebook)){
            errors.facebook='facebook url invalid';
        }
    }
    if(!isEmpty(data.linkedin)){
        if(!Validator.isURL(data.linkedin)){
            errors.linkedin='linkedin url invalid';
        }
    }
    if(!isEmpty(data.instagram)){
        if(!Validator.isURL(data.instagram)){
            errors.instagram='instagram url invalid';
        }
    } 
    return{
        errors,
        isValid:isEmpty(errors)
    };
};