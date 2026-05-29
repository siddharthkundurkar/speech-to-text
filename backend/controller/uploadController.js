import axios from "axios";
import fs from "fs";

import Audio from "../models/audioModel.js";

export const uploadAudio = async (req, res) => {
  try {
    // Check File
    if (!req.file) {
      return res.status(400).json({
        success: false,

        message: "No audio file uploaded",
      });
    }

    // Allowed Audio Types
    const allowedTypes = [
      "audio/mpeg",
      "audio/mp3",
      "audio/wav",
      "audio/ogg",
      "audio/webm",
    ];

    // File Type Validation
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,

        message: "Invalid audio format",
      });
    }

    // File Size Validation
    const maxSize = 10 * 1024 * 1024;

    if (req.file.size > maxSize) {
      return res.status(400).json({
        success: false,

        message: "File size exceeds 10MB",
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
      },
    );

    // Start Transcription
    const transcriptResponse = await axios.post(
      "https://api.assemblyai.com/v2/transcript",

      {
        audio_url: uploadResponse.data.upload_url,

        speech_model: "universal",
      },

      {
        headers: {
          authorization: process.env.ASSEMBLY_API_KEY,

          "content-type": "application/json",
        },
      },
    );

    // Transcript ID
    const transcriptId = transcriptResponse.data.id;

    let transcriptResult;

    // Polling
    while (true) {
      transcriptResult = await axios.get(
        `https://api.assemblyai.com/v2/transcript/${transcriptId}`,

        {
          headers: {
            authorization: process.env.ASSEMBLY_API_KEY,
          },
        },
      );

      console.log(transcriptResult.data.status);

      // Completed
      if (transcriptResult.data.status === "completed") {
        break;
      }

      // Error
      if (transcriptResult.data.status === "error") {
        throw new Error("Transcription failed");
      }

      // Wait 3 Seconds
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }

    console.log(transcriptResult.data.text);

    // Save To MongoDB
    await Audio.create({
      filename: req.file.originalname,

      filepath: req.file.path,

      transcriptText: transcriptResult.data.text,
    });

    // Final Response
    res.status(200).json({
      success: true,

      message: "Transcription completed successfully",

      text: transcriptResult.data.text,
    });
  } catch (error) {
    console.log(error);

    // AssemblyAI Error
    if (error.response) {
      return res.status(500).json({
        success: false,

        message: error.response.data?.error || "AssemblyAI API Error",
      });
    }

    // General Error
    res.status(500).json({
      success: false,

      message: error.message || "Error processing audio",
    });
  }
};
