const express= require('express');
const router= express.Router();
const gravatar=require('gravatar');
const bcrypt=require('bcryptjs');
const User =require('../../models/User');
const jwt=require('jsonwebtoken');
const keys=require('../../config/keys');
// @route   get api/users/test
//@desc     test users row
//@access   public
router.get('/test',(req,res)=>res.json({msg:"users works"}));
// @route   get api/users/reg
//@desc     reg
//@access   public
router.post('/register',(req,res)=> {
User.findOne({email:req.body.email}).then(user => {
    if(user) {
        return res.status(400).json({email:'mail already exist'});
    }else{
        const avatar=gravatar.url(req.body.email,{
            s:'200',//size
            r:'pg',//rating
            d:'mm' //default
        });
        const newUser = new User({
            name:req.body.name,
            email: req.body.email,
            avatar,
            password: req.body.password
        });

        bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
             if(err) throw err;
             newUser.password=hash;
                newUser.save()
                   .then(user => res.json(user))
                   .catch(err => console.log(err));

            })
        })

    }
});
});
//route get api/user/login
//desc user login jwt tokn
//access public

router.post('/login',(req,res)=>{
const email=req.body.email;
const password=req.body.password;
//find user by mail

User.findOne({email})
    .then(user =>{
        //check user
        if(!user){
            return res.status(404).json({email:'user mail ot found'});
        }
        // check pass
        bcrypt.compare(password,user.password).then(isMatch => {
            if(isMatch){
                //user match
                const payload={id:user.id,name:user.name,avatar:user.avatar};


                // res.json({msg:'success'});
                //sign token
                jwt.sign(payload,keys.secretkey,
                    {expiresIn:3600},(err,token)=>{
                        res.json({success:true,token:'Bearer ' + token});
                    });
            }
            else{
                return res.status(400).json({password:'password incorrect'});
            }
        })
    })
})
   
module.exports=router;
