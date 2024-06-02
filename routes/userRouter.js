const express = require("express");
const router = express.Router();
// const userModel = require("../models/userModel");
const {userprofile}= require('../controllers/productscontroller')
const { restrictUnauthorizedUser} = require("../controllers/userLoginSignupController");
router.get("/profile/:id", restrictUnauthorizedUser, userprofile);


// Logout route

router.get("/logout",(req, res) => {
  res.clearCookie("access_token")
  res.redirect("/login")
});

// Cart route
router.get("/carts", restrictUnauthorizedUser,(req, res) => {
  console.log("hello");
  res.send("hello from cart");
});

module.exports = router;