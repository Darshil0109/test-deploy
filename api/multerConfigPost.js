const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Cloudinary configuration using the URL
cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL, // Use Cloudinary_URL from environment variables
});

// Multer storage configuration for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'posts', // Specify the folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'], // Allowed image formats
    transformation: [
      { width: 1080, height: 1080, crop: 'fill', quality: 'auto', fetch_format: 'auto' },
    ],
  },
});

// Multer upload middleware
const uploadPost = multer({ storage: storage });

module.exports = uploadPost;
