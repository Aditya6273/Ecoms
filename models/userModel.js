const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    trim: true,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  order_history: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "order",
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});
const userCollection = mongoose.model("user", userSchema);

module.exports = userCollection;
