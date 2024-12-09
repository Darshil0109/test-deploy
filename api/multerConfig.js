// multerConfig.js
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');

cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL, // Use Cloudinary_URL from environment variables
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profiles', // Specify the folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'], // Allowed image formats
    transformation: [
      { width: 1080, height: 1080, crop: 'fill', quality: 'auto', fetch_format: 'auto' },
    ],
  },
});


const upload = multer({ storage: storage });

module.exports = upload;
