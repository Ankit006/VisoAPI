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
app.use(userRouter)
app.use(otherImageUpload)
app.use(profileUpload)




server.listen(port,()=>{
    console.log(`server is up and running on port ${port}`)
})