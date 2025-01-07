const express = require('express');
const uploadPost = require('./multerConfigPost');
const { Post } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Create posts
router.post(
  '/create',
  authMiddleware, // Ensure user is authenticated
  uploadPost.single('image'), // Use multer to handle the file upload
  async (req, res, next) => {
    console.log('File received:', req.file);  // Log the file to check if it is in `req.file`
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required.' });
    }

    try {
      if (req.file) {
        const newPost = new Post({
          title,
          description,
          image: req.file.path, // Path from Cloudinary or local upload
          createdBy: req.user._id,
          createdAt: new Date(),
        });

        await newPost.save();
        return res.status(201).json({
          message: 'Post created successfully',
          post: newPost,
        });
      } else {
        return res.status(400).json({ message: 'No file uploaded' });
      }
    } catch (error) {
      console.error('Error occurred:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }
);

//get posts of perticular user
router.get('/',authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
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
