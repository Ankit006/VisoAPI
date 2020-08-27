const express = require("express");
const fs = require("fs");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../auth");
const User = require("../models/User");



///////////////////////////// Setup API //////////////////////////////////
// create user account
router.post("/signup",async (req,res)=>{
    const user = new User(req.body);
    const token = await user.generateAuthToken()// generate jwt auth token
  
    try{
        await user.save()
        // create a directory on Public/otherUpload using user id for saving users uploaded pictures
        await fs.mkdir(`Public/otherUpload/${user._id}`,(err)=>{
            if (err) return res.status(500)
        })

        res.status(201).json({message:"Signup successfully",token:token})// send token and message after successfully signup
    
    }catch(err){
        res.status(406).json({error:"error while creating account,try using different information"})
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
 
     const token = await user.generateAuthToken() // generate authentication token

    res.status(200).json({message:"Success",token:token}) // login success message 

})


// delete user account

router.delete("/removeUser", auth,async (req,res)=>{
    try{
        await User.deleteOne({_id:req.user._id})

        // delete every files Public/otherUpload/${user id}  directory
        const files = fs.readdirSync(`Public/otherUpload/${req.user._id}`,"utf8");
        for(let x =0;x<files.length;x++){
            await fs.unlink(`Public/otherUpload/${req.user._id}/${files[x]}`,(err)=>{
                if(err) return res.status(500)
            })
        }
        // delete Public/otherUpload/${user id} directory
        await fs.rmdir(`Public/otherUpload/${req.user._id}`,(err)=>{
            if(err) return res.status(500)
        })
        
        res.status(200).json({message:"user removed successfully"})
    }catch(Err){
        res.status(500).json({error:"Internal server error"})
    }
})


module.exports = router