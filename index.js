require("./Dbconnect") // mongo database connect


// setup express server
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// get express router
const userRouter = require("./routers/userRouter");

// middleware
app.use(express.json())
app.use(userRouter)






app.listen(port,()=>{
    console.log(`server is up and running on port ${port}`)
})