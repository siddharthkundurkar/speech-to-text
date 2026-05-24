import express from "express";
import multer from "multer";
import axios from "axios";
import fs from "fs";

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


// Upload + Speech To Text Route
router.post(
  "/upload",
  upload.single("audio"),
  async (req, res) => {

    try {

      if (!req.file) {
        return res.status(400).json({
          message: "No audio file uploaded",
        });
      }
      console.log(req.file);

      // Read Audio File
      const audioData = fs.readFileSync(req.file.path);

      // Upload Audio To AssemblyAI
      const uploadResponse = await axios.post(
        "https://api.assemblyai.com/v2/upload",
        audioData,
        {
          headers: {
            authorization: process.env.ASSEMBLY_API_KEY,
            "content-type": "application/octet-stream",
          },
        }
      );

      // Start Transcription
      const transcriptResponse = await axios.post(
        "https://api.assemblyai.com/v2/transcript",
        {
          audio_url: uploadResponse.data.upload_url,
        },
        {
          headers: {
            authorization: process.env.ASSEMBLY_API_KEY,
            "content-type": "application/json",
          },
        }
      );

      res.status(200).json({
        message: "Audio uploaded successfully",
        transcriptId: transcriptResponse.data.id,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Error processing audio",
      });
    }
  }
);

export default router;