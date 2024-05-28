const cookieParser = require("cookie-parser")
const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const path = require("path")
const userRouter = require("../routes/userRouter")
const adminRouter = require("../routes/adminRouter")
const productRouter = require("../routes/productRouter")
const db = require("../config/mongooose-connection")
app.use(express.urlencoded({extended:true}))
const http = require("http")
app.use(cookieParser())
app.use(express.json())
app.use(express.static(path.join(__dirname,"../public")))

app.set("view engine" , "ejs")

app.use("/users",userRouter)
app.use("/admin",adminRouter)
app.use("/products",productRouter)


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})