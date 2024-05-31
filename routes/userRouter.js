const express = require("express");
const router = express.Router();
const {
  restrictUnauthorizedUser,
  UserLogOutFunc,
} = require("../controllers/userLoginSignupController");

router.get("/", restrictUnauthorizedUser, (req, res) => {
  res.render("profile");
});
router.get("/logout", UserLogOutFunc);

router.get("/cart", (req, res) => {
  res.send("hello from cart");
});

module.exports = router;
