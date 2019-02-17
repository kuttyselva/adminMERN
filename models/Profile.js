const mongoose= require('mongoose');
const Schema=mongoose.Schema;

//schema
const ProfileSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    handle:{
        type: String,
        required: true,
        max:40
    },
    
    company:{
        type:String
    },
    dob:{
        type:String
    },
    location:{
        type:String
    },
    lang:{
        type:[String]
    },
    status:{
        type:String,
        required:true
    },
    skills:{
        type:[String],
        required:true
    },
    bio:{
        type:String
    },
    githubuser:{
        type:String
    },
    experience:[{
        title:{
        type:String,
        required:true
        },
        company:{
        type:String,
        
        },
        location:{
            type:String,
        },
        from:{
            type:Date,
            required:true
        },
        to:{
            type:Date,
       },
       current:{
        type:Boolean,
        default:false
        },
        description:{
            type:String
        }

    }],
    education:[{
        school:{
        type:String,
        required:true
        },
        degree:{
        type:String,
        
        },
        field:{
            type:String,
           
        },
        from:{
            type:Date,
            required:true
        },
        to:{
            type:Date,
       },
       current:{
        type:Boolean,
        default:false
        },
        description:{
            type:String
        }

    }],
    achieve:[{
        venue:{
        type:String,
        required:true
        },
        event:{
        type:String,
        required:true
        },
        award:{
            type:String,
           
        },
        description:{
            type:String
        }

    }],
    social:{
        web:{
            type:String
        },
       twitter:{
            type:String
        },
        facebook:{
            type:String
        },
        linkedin:{
            type:String
        },
        instagram:{
            type:String
        },
    },
    date:{
        type:Date,
        default:Date.now
    },

});

module.exports=Profile=mongoose.model('profile',ProfileSchema);