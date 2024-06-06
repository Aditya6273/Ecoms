const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const adminModel = require("../models/adminModel");
const secret = "adminadityashah";

const adminSignup = async (req, res) => {
  const { name, email, username, password, contact } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const admin = await adminModel.create({
      name,
      email,
      username,
      contact,
      password: hash,
    });

    const token = jwt.sign({ email , name ,username,contact ,id:admin._id }, secret, {
      expiresIn: "1h",
    });

    res.cookie("Admin_token", token, {
      httpOnly: true,
      maxAge: 3600000,
    });

    // Redirect the admin to the "/admins" route
    res.redirect(`/admin/adminpanel`);
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the admin by email
    const admin = await adminModel.findOne({ email });
    
    // admin if a specific admin with a known ID exists

    // Validate admin and password
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: admin.email, adminId: admin._id, username: admin.username, name: admin.name, contact: admin.contact },
    secret,
      { expiresIn: "1h" }
    );

    // Set cookie with the token
    res.cookie("Admin_token", token, {
      httpOnly: true,
      maxAge: 3600000, // 1 hour
    });

    // Redirect to admin profile
    res.status(200).redirect(`/admin/adminpanel`);
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const restrictUnauthorizedAdmin = (req, res, next) => {
  const token = req.cookies.Admin_token;

  if (!token) {
    return res.redirect("/admin/register");
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.admin = decoded;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.redirect("/admin/register");
  }
};


module.exports = {adminSignup,adminLogin,restrictUnauthorizedAdmin}