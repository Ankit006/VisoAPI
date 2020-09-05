require("./Dbconnect") // mongo database connect


// setup express server
const express = require("express");
const path = require("path");
const app = express();
const auth = require("./auth");
const fs = require("fs");
const key = fs.readFileSync("./key.pem");
const cert = fs.readFileSync("./cert.pem");
const https = require("https");
const port = process.env.PORT || 3000;

// create https server
const server = https.createServer({key:key,cert:cert},app)

// get express router
const userRouter = require("./routers/userRouter");
const otherImageUpload = require("./uploadRouter/otherUpload");
const profileUpload = require("./uploadRouter/profileUpload");


// middleware
app.use(express.json())

// CORS handle
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","*")
    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods","PUT","POST","PATCH","DELETE","GET")
        return res.status(200).json({});
    }
    next()
})


app.use(userRouter)
app.use(otherImageUpload)
app.use(profileUpload)




server.listen(port,()=>{
    console.log(`server is up and running on port ${port}`)
})