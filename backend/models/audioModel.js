import mongoose from "mongoose";

const audioSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },

    filepath: {
      type: String,
      required: true,
    },

    transcription: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Audio = mongoose.model("Audio", audioSchema);

export default Audio;