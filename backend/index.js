const express = require("express") //express....
const mongoose = require("mongoose")
const cors = require("cors")
//express object..
const app = express()
app.use(cors())
app.use(express.json()) //to accept data as json...

//userRoutes
const userRoutes = require("./src/routes/UserRoutes")
app.use("/user",userRoutes)

const cityRoutes = require("./src/routes/CityRoutes")
app.use("/city",cityRoutes)

const stateRoutes = require("./src/routes/StateRoutes")
app.use("/state",stateRoutes)



mongoose.connect("mongodb://127.0.0.1:27017/jobportal").then(()=>{
    console.log("database connected....")
})


//server creation...
const PORT = 3000
app.listen(PORT,()=>{
    console.log("server started on port number ",PORT)
})