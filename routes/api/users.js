const express= require('express');
const router= express.Router();
// @route   get api/users/test
//@desc     test users row
//@access   public
router.get('/test',(req,res)=>res.json({msg:"users works"}));
module.exports=router;
