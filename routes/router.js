const express = require("express")
const router = express.Router()
// const userModel = require("../models/userModel")
const {UserSignUp,UserLogin} = require("../controllers/userLoginSignupController")

router.get("/login",(req,res)=>{
    res.render("login")
})

router.get("/register",(req,res)=>{
    res.render("index")
})
router.post("/register",UserSignUp)
router.post("/login",UserLogin)

module.exports = router