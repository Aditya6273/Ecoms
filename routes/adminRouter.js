const express = require("express")
const router = express.Router()
const productModel = require("../models/productModel")
const userModel = require("../models/userModel");
const { restrictUnauthorizedUser} = require("../controllers/userLoginSignupController");


router.get("/addproduct",restrictUnauthorizedUser, async (req,res)=>{
    const user = await userModel.findOne({email:req.user.email})
res.render("addproduct" ,{user,isAdmin:true })
})

module.exports = router