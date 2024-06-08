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

  description: {
    type: String,
    required: true,
  },

  manufacture_details: {
    model_number: {
      type: String,
      required: true,
    },

    release_date: {
      type: Date,
      required: true,
    },
  },

  price: {
    type: Number,
    required: true,
  },

  discount: {
    type: Number,
    default: 0,
  },
  discountedPrice: {
    type: Number,
    default: 0,
  },

  categories: [
    {
      title: {
        type: String,
        required: true,
      },
    },
  ],

  image: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Product", productSchema);
