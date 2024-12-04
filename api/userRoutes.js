const express = require('express');
const bcrypt = require('bcryptjs');
const { User } = require('../models'); // Import models
const router = express.Router();
const upload = require('./multerConfig'); 
// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);  // req.params.id will get the 'id' from the URL
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.put('/:id', upload.single('profilePicture'), async (req, res) => {
  const { username, email, password, bio } = req.body;
  const profilePicture = req.file ? req.file.filename : null;

  // Basic validation
  if (!username || !email) {
    return res.status(400).json({ message: 'Username and email are required' });
  }

  try {
    // Fetch the user by ID
    const userId = req.params.id;
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if email or username already exists (for a different user)
    const duplicate = await User.findOne({
      $or: [{ email }, { username }],
      _id: { $ne: userId }, // Exclude the current user
    });

    if (duplicate) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Update fields
    const updatedFields = {
      username,
      email,
      bio,
      updatedAt: new Date(), 
    };

    // If a new profile picture is uploaded, update it
    if (profilePicture) {
      updatedFields.profilePicture = profilePicture;
    }

    // If a new password is provided, hash it and update
    if (password) {
      updatedFields.password = await bcrypt.hash(password, 10);
    }

    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });

    // Return the updated user (excluding the password)
    res.status(200).json({
      message: 'User updated successfully',
      user: {
        username: updatedUser.username,
        email: updatedUser.email,
        profilePicture: updatedUser.profilePicture,
        bio: updatedUser.bio,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
