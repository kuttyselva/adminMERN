const express= require('express');
const router= express.Router();
const mongoose=require('mongoose');
const passport=require('passport');
const Post =require('../../models/Post');
const Profile =require('../../models/Profile');
const validatePostinput=require('../../validation/post');
// @route   get api/posts/test
//@desc     test post row
//@access   public
router.get('/test',(req,res)=>res.json({msg:"posts works"}));
// @route   post api/post
//@desc     createpost
//@access   private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors,isValid}=validatePostinput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }
const newPost=new Post({
    user:req.user.id,
    text:req.body.text,
    name:req.body.name,
    avatar:req.user.avatar,
  
});
newPost.save().then(post=>res.json(post));
});
// @route   post api/post
//@desc     viewpost
//@access   public
router.get('/',(req,res)=>{
    Post.find()
    .sort({date: -1})
    .then(posts =>res.json(posts))
    .catch(err=>res.status(404).json({nopost:'no posts'}))
});
// @route   post api/post/:id
//@desc     viewpost
//@access   public
router.get('/:id',(req,res)=>{
    Post.findById(req.params.id)
    .sort({date: -1})
    .then(posts =>res.json(posts))
    .catch(err=>res.status(404).json({nopost:'no post found with that id'}));
});
// @route   delete api/post/:id
//@desc     deletepost
//@access   private
router.delete('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user:req.user.id})
    .then(profile=> {
        Post.findById(req.params.id)
        .then(post=> {
            //check for owner
            if(post.user.toString() !== req.user.id){
return res.status(401).json({unauth:'user unauthorized'});
            }
            //delete
            post.remove().then(()=> res.json({success:true}));
        })
        .catch(err => res.status(404).json({notfound:'post not found'}));
    });
});
// @route   post api/post/like/:id
//@desc     deletepost
//@access   private
router.post('/like/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user:req.user.id})
    .then(profile=> {
        Post.findById(req.params.id)
        .then(post=> {
            if(post.likes.filter(like => like.user.toString()=== req.user.id).length >0){
return res.status(400).json({already:'user already liked'});
            }
            //add user id to likes array
            post.likes.unshift({user:req.user.id});
            post.save().then(post=> res.json(post));
        })
        .catch(err => res.status(404).json({notfound:'post not found'}));
    });
});
// @route   post api/post/unlike/:id
//@desc     deletepost
//@access   private
router.post('/unlike/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user:req.user.id})
    .then(profile=> {
        Post.findById(req.params.id)
        .then(post=> {
            if(post.likes.filter(like => like.user.toString()=== req.user.id).length ===0){
return res.status(400).json({already:'user not yet liked'});
            }
            //get user id to unlikes array
           const remind =post.likes.map(item => item.user.toString())
           .indexOf(req.user.id);
           //splice out array
           post.likes.splice(remind,1);
           post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({notfound:'post not found'}));
    });
});

// @route   post api/post/comment/:id
//@desc     comment post
//@access   private
router.post('/comment/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors,isValid}=validatePostinput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
    .then(post=> {
        const newComm={
            user:req.user.id,
            text:req.body.text,
            name:req.body.name,
            avatar:req.user.avatar
        }
        post.comments.unshift(newComm);
        post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({nopost:'post not found'}));
});
// @route   delete api/post/comment/:id/:commentid
//@desc     delete comment post
//@access   private
router.delete('/comment/:id/:commentid',passport.authenticate('jwt',{session:false}),(req,res)=>{
    
    Post.findById(req.params.id)
    .then(post=> {
        //check comment exist
        if(post.comments.filter(comment => comment._id.toString()===req.params.commentid).length===0){
            return res.status(404).json({commnotexist:'comment not found'});
        }
        //get index
        const remind=post.comments.map(item=> item._id.toString())
        .indexOf(req.params.commentid);
        //splicecomment
        post.comments.splice(remind,1);
        post.save().then(post=> res.json(post));
    })
    .catch(err => res.status(404).json({nopost:'post not found'}));
});

module.exports=router;
