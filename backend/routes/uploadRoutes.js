import express from "express";
import multer from "multer";

import { uploadAudio }
from "../controller/uploadController.js";

import { getHistory }
from "../controller/historyController.js";

const router = express.Router();


// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });


// Upload Route
router.post(
  "/upload",
  upload.single("audio"),
  uploadAudio
);


// History Route
router.get(
  "/history",
  getHistory
);

export default router;