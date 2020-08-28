require("dotenv").config()
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    userName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error("Invalid email")
        }
    },
    password:{
        type:String,
        minlength:7,
        required:true
    },
    profilePic:{
        type:String
    },
    uploadPic:[
        {
            type:String
        }
    ]
})

userSchema.pre("save", async function(next){
    const user = this;
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password,8);
    }
    next()
})

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = await jwt.sign({_id:user._id.toString()},process.env.SECRETKEY)
    return token
}


const User = mongoose.model("User",userSchema);

module.exports = User