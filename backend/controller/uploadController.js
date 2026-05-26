import axios from "axios";
import fs from "fs";

import Audio from "../models/audioModel.js";


export const uploadAudio = async (req, res) => {

  try {

    // Check File
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

        speech_models: ["universal-2"],
      },
      {
        headers: {
          authorization: process.env.ASSEMBLY_API_KEY,
          "content-type": "application/json",
        },
      }
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
        }
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
      await new Promise((resolve) =>
        setTimeout(resolve, 3000)
      );
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
      message: "Transcription completed",

      text: transcriptResult.data.text,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error processing audio",
    });
  }
};