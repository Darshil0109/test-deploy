const express = require('express');
const uploadPost = require('./multerConfigPost');
const { Post } = require('../models'); // Import models
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// create posts
router.post(
  '/create',
  authMiddleware, // Ensure the user is authenticated
  uploadPost.single('image'), // Use multer to handle the file upload
  async (req, res) => {
    const { title, description } = req.body;

    // Validate title and description
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required.' });
    }

    try {
      // Create a new post
      const newPost = new Post({
        title,
        description,
        image: req.file ? req.file.filename : null, // Save the uploaded image filename
        createdBy: req.user.id, // Use user ID from the token
        createdAt: new Date(),
      });

      // Save the post to the database
      const savedPost = await newPost.save();

      res.status(201).json({
        message: 'Post created successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);


//get posts of perticular user
router.get('/',authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // Find posts created by the user
    const posts = await Post.find({ createdBy: userId });

    // If no posts are found, return an empty array
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
