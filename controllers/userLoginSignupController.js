const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const secret = "adityashah";

const UserSignUp = async (req, res) => {
  const { name, email, username, password, contact } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      name,
      email,
      username,
      contact,
      password: hash,
    });

    const token = jwt.sign({ email , name ,username,contact ,userid:user._id }, secret, {
      expiresIn: "1h",
    });

    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: 3600000,
    });

    // Redirect the user to the "/users" route
    res.redirect(`/users/profile/${user._id}`);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const UserLogin = async (req, res) => {
  const { email, password, username, name, contact } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { email, userId: user._id, username, name, contact },
      secret,
      { expiresIn: "1h" }
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: 3600000, // 1 hour
    });

    res.status(200).redirect(`/users/profile/${user._id}`);
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const restrictUnauthorizedUser = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.redirect("/register");
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.redirect("/register");
  }
};
const UserLogOutFunc = (req, res) => {
  try {
    console.log("Cookies before clear:", req.cookies);
    
    res.clearCookie("access_token", { path: '/', httpOnly: true, secure: true });
    
    console.log("Cookies after clear:", req.cookies);
    
    console.log("token is deleted");
    
    res.status(200).redirect("/login");
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).send("An error occurred during logout.");
  }
};

  
module.exports = { UserSignUp, UserLogin , restrictUnauthorizedUser,UserLogOutFunc};
