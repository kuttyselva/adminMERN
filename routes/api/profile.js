const express= require('express');
const router= express.Router();
const mongoose=require('mongoose');
const passport=require('passport');
//load profile
const Profile=require('../../models/Profile');
//load user
const User=require('../../models/User');
// @route   get api/profile/test
//@desc     test profile row
//@access   public
router.get('/test',(req,res)=>res.json({msg:"profile works"}));
// @route   get api/profile/
//@desc     current profile
//@access   private
router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const errors={};
   Profile.findOne({user:req.user.id})
    .then(profile=>{
        if(!profile){
            errors.noprofile='there is no profile for this user';
            return res.status(404).json({errors});
        }
        res.json(profile);

    })
    .catch(err => res.status(404).json(err));
});
// @route   post api/profile
//@desc     create/edit profile
//@access   private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
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
   if(req.body.website)    profilefield.social.website=req.body.website;
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




module.exports=router;
