const express= require('express');
const router= express.Router();
// @route   get api/profile/test
//@desc     test profile row
//@access   public
router.get('/test',(req,res)=>res.json({msg:"profile works"}));
module.exports=router;
