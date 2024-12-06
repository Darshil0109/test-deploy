// multerConfigPost.js
const multer = require('multer');
const path = require('path');

// Set up storage configuration for post image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the upload folder
  },
  filename: (req, file, cb) => {
    const fileName = 'post_' + req.user.id + '_' + Date.now() + path.extname(file.originalname);  // Post image naming convention
    cb(null, fileName);
  }
});

// File filter to only allow image files (jpeg, png, jpg)
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Only image files are allowed'), false); // Reject the file
  }
};

const uploadPost = multer({ storage, fileFilter });

module.exports = uploadPost;
