const multer = require("multer");

// Configure Multer to store PDFs in memory as a Buffer
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDFs are allowed"), false);
  }
};

// Initialize Multer with storage and file filter
const upload = multer({ storage, fileFilter });

module.exports = upload;
