const cookieParser = require("cookie-parser")
const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const path = require("path")
const router = require("../routes/router")
const userRouter = require("../routes/userRouter")
const adminRouter = require("../routes/adminRouter")
const productRouter = require("../routes/productRouter")
const db = require("../config/mongooose-connection")
const http = require("http")


//middlewares
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.json())
app.use(express.static(path.join(__dirname,"../public")))


//set up view engine
app.set("view engine" , "ejs")


//routing
app.use("",router)
app.use("/users",userRouter)
app.use("/admin",adminRouter)
app.use("/products",productRouter)


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})