const express = require("express")
const router = express.Router()
const userModel = require("../models/userModel")
const {restrictUnauthorizedUser} = require("../controllers/userLoginSignupController");
const productModel = require('../models/productModel') 



router.get("/shop",restrictUnauthorizedUser,async (req,res)=>{
const user = await userModel.findOne({email:req.user.email})
const products = await productModel.find()
res.render("shop" ,{user,nav:true,products})
})
router.get("/shop/filter", restrictUnauthorizedUser, async (req, res) => {
  const { minPrice, maxPrice, category } = req.query;

  const filters = {};

  if (minPrice) {
    filters.price = { $gte: parseInt(minPrice) };
  }

  if (maxPrice) {
    if (filters.price) {
      filters.price.$lte = parseInt(maxPrice);
    } else {
      filters.price = { $lte: parseInt(maxPrice) };
    }
  }

  if (category) {
    filters.category = category;
  }

  try {
    const products = await productModel.find(filters);
    const user = await userModel.findOne({ email: req.user.email });

    res.render("shop", { products, user, nav: true });
  } catch (error) {
    console.error("Error filtering products", error);
    res.status(500).json({ error: "Error filtering products" });
  }
});
const expireNewProducts = () => {
  productModel.updateMany({ new: true, newExpiresAt: { $lte: Date.now() } }, { $set: { new: false } });
};

// call expireNewProducts function periodically (e.g., every hour)
setInterval(expireNewProducts, 3600000);
module.exports = router