import mongoose from "mongoose";

const transcriptSchema = new mongoose.Schema({

  fileName: {
    type: String,
  },

  transcriptText: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

const Transcript = mongoose.model(
  "Transcript",
  transcriptSchema
);

export default Transcript;