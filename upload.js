const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: './uploads/', // Directory to store images
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp + original file extension
  },
});

// File upload settings
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/; // Allowed extensions
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Images only! (jpg, jpeg, png)'));
    }
  },
});

module.exports = upload;
