const express= require('express');
const router= express.Router();
const mongoose=require('mongoose');
const passport=require('passport');
const validateProfileInput=require('../../validation/profile');
const validateExpInput=require('../../validation/experience');
const validateEduInput=require('../../validation/education');
//load profile
const Profile=require('../../models/Profile');
//load user
const User=require('../../models/User');
// @route   get api/profile/test
//@desc     test profile row
//@access   public
router.get('/test',(req,res)=>res.json({msg:"profile works"}));

// @route   get api/profile/all
//@desc     all profile
//@access   public
router.get('/all',(req,res)=>
{
    const errors={};
    Profile.find()
    .populate('user',['name','avatar'])
    .then(profiles=>{
        if(!profiles){
            errors.noprofile='there is no profile for this user';
            return res.status(404).json(errors);
        }
        res.json(profiles);

    })
    .catch(err=>res.status(404).json({profile:'there is no profile'}));
});


// @route   get api/profile/handle:handle
//@desc     current profile
//@access   private
router.get('/handle/:handle',(req,res)=>{
    const errors={};
    Profile.findOne({handle:req.params.handle})
    .populate('user',['name','avatar'])
    .then(profile=>{
        if(!profile){
            errors.noprofile='there is no profile for this user';
           res.status(404).json(errors);
        }
        res.json(profile);
    })
    .catch(err=> res.status(404).json(err));
})


// @route   get api/profile/user:user
//@desc     current profile by userid
//@access   public
router.get('/user/:user_id',(req,res)=>{
    const errors={};
    Profile.findOne({user:req.params.user_id})
    .populate('user',['name','avatar'])
    .then(profile=>{
        if(!profile){
            errors.noprofile='there is no profile for this user';
            res.status(404).json(errors);
        }
        res.json(profile);
    })
    .catch(err=> res.status(404).json({profile:'mongoose error'}));
})


// @route   get api/profile/
//@desc     current profile
//@access   private
router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const errors={};
   Profile.findOne({user:req.user.id})
   .populate('user',['name','avatar'])
    .then(profile=>{
        if(!profile){
            errors.noprofile='there is no profile for this user';
            return res.status(404).json(errors);
        }
        res.json(profile);

    })
    .catch(err => res.status(404).json(err));
});
// @route   post api/profile
//@desc     create/edit profile
//@access   private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors,isValid}=validateProfileInput(req.body);
    if(!isValid){
        //return errors
        return res.status(400).json(errors);
    }
   //get fields
   const profilefield = {};
   profilefield.user=req.user.id;
   if(req.body.handle)    profilefield.handle=req.body.handle;
   if(req.body.company)    profilefield.company=req.body.company;
   if(req.body.website)    profilefield.website=req.body.website;
   if(req.body.loaction)    profilefield.loaction=req.body.loaction;
   if(req.body.bio)    profilefield.bio=req.body.bio;
   if(req.body.status)    profilefield.status=req.body.status;
   if(req.body.githubuser)    profilefield.githubuser=req.body.githubuser;
   //skills
   if(typeof req.body.skills !== 'undefined'){
       profilefield.skills = req.body.skills.split(',');
   }
   //social
   profilefield.social={};
   if(req.body.web)    profilefield.social.web=req.body.web;
   if(req.body.twitter)    profilefield.social.twitter=req.body.twitter;
   if(req.body.facebook)    profilefield.social.facebook=req.body.facebook;
   if(req.body.linkedin)    profilefield.social.linkedin=req.body.linkedin;
   if(req.body.instagram)    profilefield.social.instagram=req.body.instagram;
  Profile.findOne({user:req.user.id})
  
   .then(profile =>{
       if(profile){
           Profile.findOneAndUpdate({user:req.user.id},{$set:profilefield},{new:true})
       .then(profile=>res.json(profile));
       }
       else{
//create
//check if handle exist
Profile.findOne({handle:profilefield.handle}).then(profile =>{
    if(profile){
        errors.handle='that handle already exist';
        res.status(400).json(errors);
    }
    //save profile
    new Profile(profilefield).save().then(profile =>res.json(profile));
})
    }
   })
});

// @route   get api/profile/experience
//@desc     current profile
//@access   private
router.post('/experience',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors,isValid}=validateExpInput(req.body);
    if(!isValid){
        //return errors
        return res.status(400).json(errors);
    }
    Profile.findOne({user:req.user.id})
    .then(profile=>{
        const newexp={
            title:req.body.title,
            company:req.body.company,
            loaction:req.body.loaction,
            from:req.body.from,
            to:req.body.to,
            current:req.body.current,
            description:req.body.description
        }
        //add to exp
        profile.experience.unshift(newexp);
        profile.save().then(profile => res.json(profile));
    })
});


// @route   get api/profile/education
//@desc   edu add to profile
//@access   private
router.post('/education',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors,isValid}=validateEduInput(req.body);
    if(!isValid){
        //return errors
        return res.status(400).json(errors);
    }
    Profile.findOne({user:req.user.id})
    .then(profile=>{
        const newedu={
            school:req.body.school,
            degree:req.body.degree,
            field:req.body.field,
            from:req.body.from,
            to:req.body.to,
            current:req.body.current,
            description:req.body.description
        }
        //add to exp
        profile.education.unshift(newedu);
        profile.save().then(profile => res.json(profile));
    })
});

// @route   DELETE api/profile/experience/:expid
//@desc   delete to profile
//@access   private
router.delete('/experience/:exp_id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    
    Profile.findOne({user:req.user.id})
    .then(profile=>{
       //get remove index
       const removeind=profile.experience
       .map(item =>item.id)
       .indexOf(req.params.exp_id);
       //splice out array
       profile.experience.splice(removeind,1);
       //save
       profile.save().then(profile=>res.json(profile));
       })
       .catch(err=> res.status(404).json(err));
    });
// @route   DELETE api/profile/education/:eduid
//@desc   delete to edu profile
//@access   private
    router.delete('/education/:edu_id',passport.authenticate('jwt',{session:false}),(req,res)=>{
      
        Profile.findOne({user:req.user.id})
        .then(profile=>{
            const removeind=profile.education
            .map(item =>item.id)
            .indexOf(req.params.edu_id);
            //splice out array
            profile.education.splice(removeind,1);
            //save
            profile.save().then(profile=>res.json(profile));
            })
            .catch(err=> res.status(404).json(err));
           
    });

// @route   DELETE api/profile/
//@desc   delete to profile
//@access   private
router.delete('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
      
    Profile.findOneAndRemove({user:req.user.id})
    .then(()=>{
        User.findOneAndRemove({_id:req.user.id})
        .then(()=> res.json({success:true}));
      
       
});
});

module.exports=router;
