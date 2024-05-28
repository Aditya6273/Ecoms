const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/ecoms")
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Database not connected due to some error");
  });
  
  module.exports = mongoose.connection