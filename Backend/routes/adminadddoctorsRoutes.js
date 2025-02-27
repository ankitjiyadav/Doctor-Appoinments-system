const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { addDoctor, getDoctors } = require("../controllers/adminadddoctorcontroller");

const router = express.Router();

// ✅ Ensure "uploads" folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create folder if it doesn't exist
}

// ✅ Multer Storage Setup for Image Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // ✅ Uploads directory ensured
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname).toLowerCase()); // ✅ Unique filename with correct extension
  },
});

// ✅ File Type Validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);

  if (extName && mimeType) {
    return cb(null, true);
  } else {
    return cb(new Error("Only JPEG, JPG, or PNG images are allowed!"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // ✅ Max file size: 2MB
});

// ✅ Routes
router.post("/add", upload.single("image"), addDoctor);
router.get("/", getDoctors);

module.exports = router;
