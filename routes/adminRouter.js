const express = require("express");
const router = express.Router();
const productModel = require("../models/productModel");
const adminModel = require("../models/adminModel");
const userModel = require("../models/userModel")
const upload = require("../config/multer-config")
const {
  adminSignup,
  adminLogin,
  restrictUnauthorizedAdmin,
  Addingproduct
} = require("../controllers/admincontroller");
const {
 
  restrictUnauthorizedUser,
} = require("../controllers/userLoginSignupController");

router.post("/adminRegister", adminSignup);
router.post("/adminLogin", adminLogin);

router.get("/addproduct",restrictUnauthorizedUser, restrictUnauthorizedAdmin, async (req, res) => {
  const user = await userModel.findOne({ email: req.user.email });
  res.render("addproduct" ,{user ,nav:false});
  console.log(user)
});

router.get("/adminpanel",restrictUnauthorizedUser, restrictUnauthorizedAdmin, async (req, res) => {
  const user =await userModel.findOne({email:req.user.email})
  const admin =await adminModel.findOne({email:req.admin.email})
  console.log(admin)
  res.render("adminpanel",{user,nav:false});
});
router.get("/register", async (req, res) => {
  res.render("adminregister");
});
router.get("/login", async (req, res) => {
  res.render("adminlogin");
});

router.post ("/addproduct",restrictUnauthorizedAdmin,upload.single("image"),Addingproduct)
module.exports = router;
