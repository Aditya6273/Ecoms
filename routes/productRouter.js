const express = require("express")
const router = express.Router()
const userModel = require("../models/userModel")
const {restrictUnauthorizedUser} = require("../controllers/userLoginSignupController");
  
router.get("/shop",restrictUnauthorizedUser,async (req,res)=>{
const user = await userModel.findOne({email:req.user.email})

res.render("shop" ,{user,nav:true})
})


module.exports = router