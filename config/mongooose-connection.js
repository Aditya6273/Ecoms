const mongoose = require("mongoose");
const env = require('dotenv').config()
const mongo = process.env.MONGO_URI
mongoose
  .connect(`${mongo}/ecoms`)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
  
  module.exports = mongoose.connection