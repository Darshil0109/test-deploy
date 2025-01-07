const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assume User model is set up
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET; // Add JWT secret in your .env file

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    
    // Generate JWT token
    const token = jwt.sign({_id:user._id, username: user.username, email: user.email}, JWT_SECRET, { expiresIn: '24h' });
    res.cookie('authToken', token, {
      domain: '.vercel.app', 
      path: '/', 
      httpOnly: false,  // Prevents access from JavaScript (for security)
      secure:true,
      sameSite:'None',
      maxAge: 1000 * 60 * 60 * 24,   // Set expiration date (24 hours)
    });
    res.json({ token, user: {_id:user._id, username: user.username, email: user.email, createdAt:user.createdAt,updatedAt:user.updatedAt } });
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ message: 'Server error' });
  }
});
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    
    // Check if the user already exists

    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "Email-ID already exists" });
    }
    else if (await User.findOne({ username: name })) {
      return res.status(400).json({ message: "UserName already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username: name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    const token = jwt.sign({_id:newUser._id, username: newUser.username, email: newUser.email}, JWT_SECRET, { expiresIn: '24h' });
    res.cookie('authToken', token, {
      domain: '.vercel.app', 
      path: '/', 
      httpOnly: false,  // Prevents access from JavaScript (for security)
      secure:true,
      sameSite:'None',
      maxAge: 1000 * 60 * 60 * 24,   // Set expiration date (24 hours)
    });
    res.json({ token, user: {_id:newUser._id, username: newUser.username, email: newUser.email, createdAt:newUser.createdAt,updatedAt:newUser.updatedAt } });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
