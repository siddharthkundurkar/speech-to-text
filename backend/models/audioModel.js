import mongoose from "mongoose";

const audioSchema = new mongoose.Schema({

  filename: {
    type: String,
    required: true,
  },

  filepath: {
    type: String,
    required: true,
  },

  transcriptText: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

const Audio = mongoose.model(
  "Audio",
  audioSchema
);

export default Audio;