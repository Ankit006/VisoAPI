require("./Dbconnect") // mongo database connect


// setup express server
const express = require("express");
const path = require("path");
const app = express();
const auth = require("./auth");
const port = process.env.PORT || 3000;

// get express router
const userRouter = require("./routers/userRouter");
const otherImageUpload = require("./uploadRouter/otherUpload");
const profileUpload = require("./uploadRouter/profileUpload");


// middleware
app.use(express.json())
app.use(userRouter)
app.use(otherImageUpload)
app.use(profileUpload)




app.listen(port,()=>{
    console.log(`server is up and running on port ${port}`)
})