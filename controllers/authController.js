const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { generateAccessToken, generateRefreshToken } = require("../utils/tokenUtils.js");

// User Signup
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10); // Hash password before saving
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// User Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ accessToken, userId: user._id });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
// Refresh Token API
const refresh = (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    console.log("Received Refresh Token:", refreshToken); // Log received refresh token

    if (!refreshToken) {
      console.log("No refresh token found.");
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) {
        console.log("Invalid Refresh Token:", err.message);
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      console.log("Refresh Token Verified for User ID:", decoded.id);
      const newAccessToken = generateAccessToken(decoded.id);
      
      console.log("Generated New Access Token:", newAccessToken);
      res.json({ accessToken: newAccessToken });
    });
  } catch (error) {
    console.log("Error in Refresh Token Flow:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// User Logout
const logout = (req, res) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signup, login, refresh, logout };

