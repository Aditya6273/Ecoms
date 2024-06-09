const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
    unique: true,
  },

  title: {
    type: String,
    required: true,
  },

  model_number: {
    type: String,
    required: true,
  },

  release_date: {
    type: Date,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  discount: {
    type: Boolean,
    default: 0,
  },
  discountedPrice: {
    type: Number,
    default: 0,
  },

  category: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },
  new:{
    type:Boolean,
    default:true
    
  },
  newExpiresAt: {
    type: Date,
    default: () => Date.now() + 300000, // 5 minutes in milliseconds
  },

});
module.exports = mongoose.model("Product", productSchema);
