const mongoose = require('mongoose');

const fileUploadSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fileName: { type: String },
  filePath: { type: String },
  fileType: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FileUpload', fileUploadSchema);
