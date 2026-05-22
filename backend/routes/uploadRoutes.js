import express from "express";
import multer from "multer";

const router = express.Router();


// Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});


// File Filter
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "audio/mpeg" ||
    file.mimetype === "audio/wav" ||
    file.mimetype === "audio/mp3"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only audio files are allowed"), false);
  }
};


// Multer Setup
const upload = multer({
  storage,
  fileFilter,
});


// Upload API
router.post(
  "/upload",
  upload.single("audio"),
  (req, res) => {

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    res.status(200).json({
      message: "Audio uploaded successfully",
      file: req.file,
    });
  }
);

export default router;