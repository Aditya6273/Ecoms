const userModel = require("../models/userModel");

const userprofile = async(req,res)=>{
    try {
        const user = await userModel.findOne({ email: req.user.email });
        if (!user) {
          return res.status(404).send("User not found");
        }
        const id = req.params.id;
        res.render("profile", { user });
      } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).send("An error occurred while fetching the user profile.");
      }
}
module.exports = {userprofile}