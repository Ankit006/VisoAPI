const express = require("express");
const User = require("../models/User");
const multer = require("multer");
const path = require("path");
const auth = require("../auth");
const fs = require("fs");
const profilePicUpload = express.Router();

let imageName;

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,`Public/profileUpload/${req.user._id}`)
    },
    filename:(req,file,cb)=>{
        imageName = file.fieldname+Date.now()+path.extname(file.originalname)
        cb(null,imageName)
    }
})

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg"){
     cb(null,true)   
    }else{
        cb(null,false)
    }
}

const upload = multer({storage:storage,fileFilter:fileFilter})


profilePicUpload.post("/profileUpload",auth,upload.single("profile"), async (req,res)=>{
    const user = req.user

    if(user.profilePic){
        await fs.unlink(`Public/profileUpload/${user._id}/${user.profilePic}`,(err)=>{
            if(err) return res.status(500)
        })
    }
    try{
        
        user.profilePic = imageName;
        await user.save()
        res.status(201).json({
            "message":"successfully uploaded",
            "user":user
        })
    }catch(err){
        res.status(406).json({err:err})
    }
})

module.exports = profilePicUpload;