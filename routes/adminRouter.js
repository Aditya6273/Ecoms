const express = require("express");
const router = express.Router();
const productModel = require("../models/productModel");
const adminModel = require("../models/adminModel");

const {
  adminSignup,
  adminLogin,
  restrictUnauthorizedAdmin,
} = require("../controllers/admincontroller");

router.post("/adminRegister", adminSignup);
router.post("/adminLogin", adminLogin);

router.get("/addproduct", restrictUnauthorizedAdmin, async (req, res) => {
  const user = await userModel.findOne({ email: req.user.email });
  res.render("addproduct", { user });
});

router.get("/adminpanel", restrictUnauthorizedAdmin, async (req, res) => {
  res.render("adminpanel");
});
router.get("/register", async (req, res) => {
  res.render("adminregister");
});
router.get("/login", async (req, res) => {
  res.render("adminlogin");
});

module.exports = router;
