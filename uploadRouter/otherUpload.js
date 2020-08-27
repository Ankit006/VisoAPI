const express = require("express");
const User = require("../models/User");
const multer = require("multer");
const auth = require("../auth");
const path = require("path");
const otherUploadRouter = express.Router();

let imageName;

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,`Public/otherUpload/${req.user._id}`)
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




otherUploadRouter.post("/otherUpload",auth,upload.single("other"),async (req,res)=>{
    try{   
            const user = await User.findById(req.user._id)
            user.uploadPic = user.uploadPic.concat(imageName)
            await user.save()
           res.status(201).json({
            "message":"successfully uploaded"
        })

    }catch(err){
        res.status(406).json({error:err})
    }
})

module.exports = otherUploadRouter;