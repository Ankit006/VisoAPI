require("dotenv").config()
const jwt = require("jsonwebtoken");
const User = require("./models/User")

const authentication=async (req,res,next)=>{
    try{
        const token = req.header("Authorization").split(" ")[1];
        const userData = await jwt.verify(token,process.env.SECRETKEY);
        const user = await User.findById(userData._id);
        if(!user) return res.status(401).json({error:"Unauthorized access"})
        req.user = user
        next()
    }catch(err){
        res.status(401).json({error:"Unauthorized access"})
    }
}

module.exports = authentication;