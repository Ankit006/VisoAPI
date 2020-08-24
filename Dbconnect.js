require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.DBCONNECT,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true},()=>{
    console.log("Database connected")
})


