const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../auth");
const User = require("../models/User");

// create user account
router.post("/signup",async (req,res)=>{
    const user = new User(req.body);
    const token = await user.generateAuthToken()// generate jwt auth token
    try{
        await user.save()
        res.status(201).json({message:"Signup successfully",token:token})
    }catch(err){
        res.status(500).json({error:"error while creating account,try using different information"})
    }
})

// login user
router.post("/login",async (req,res)=>{
    
    // find user by email
    const user = await User.findOne({email:req.body.email})
    if(!user) return res.status(404).send({error:"Please provide correct information"})
    
    //compare password
    const match = await bcrypt.compare(req.body.password,user.password)
    if(!match) return res.status(404).send({error:"Please provide correct information"})
 
     const token = await user.generateAuthToken()
    res.status(200).json({message:"Success",token:token}) // login success message 

})


// delete user account

router.delete("/removeUser", auth,async (req,res)=>{
    try{
        await User.deleteOne({_id:req.user._id})
        res.status(200).json({message:"user removed successfully"})
    }catch(Err){
        res.status(500).json({error:"Internal server error"})
    }
})


module.exports = router