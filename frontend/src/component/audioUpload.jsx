import { useState } from "react";
import axios from "axios";
function AudioUpload() {
  const [audio, setAudio] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const handleUpload = async () => {
    if (!audio) {
      alert("Please select audio file");
      return;
    }
    const formData = new FormData();
    formData.append("audio", audio);
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
      );
      console.log(res.data);
      setResult(res.data.text || "Audio uploaded successfully");
    } catch (error) {
      console.log(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4 py-10">
      {" "}
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8">
        {" "}
        {/* Heading */}{" "}
        <div className="text-center mb-8">
          {" "}
          <h1 className="text-4xl font-bold text-white mb-3">
            {" "}
            Speech To Text{" "}
          </h1>{" "}
          <p className="text-gray-300 text-sm">
            {" "}
            Upload your audio file and convert it into text instantly{" "}
          </p>{" "}
        </div>{" "}
        {/* Upload Box */}{" "}
        <div className="border-2 border-dashed border-gray-500 rounded-2xl p-6 text-center bg-white/5 hover:bg-white/10 transition duration-300">
          {" "}
          <input
            type="file"
            accept="audio/*"
            id="audioUpload"
            hidden
            onChange={(e) => setAudio(e.target.files[0])}
          />{" "}
          <label htmlFor="audioUpload" className="cursor-pointer">
            {" "}
            <div className="text-5xl mb-4"> 🎵 </div>{" "}
            <p className="text-white font-medium text-lg">
              {" "}
              Click to Upload Audio{" "}
            </p>{" "}
            <p className="text-gray-400 text-sm mt-2">
              {" "}
              MP3, WAV, M4A supported{" "}
            </p>{" "}
          </label>{" "}
        </div>{" "}
        {/* Selected File */}{" "}
        {audio && (
          <div className="mt-5 bg-white/10 border border-white/10 rounded-xl p-4">
            {" "}
            <p className="text-gray-300 text-sm"> Selected File: </p>{" "}
            <p className="text-white font-semibold break-words">
              {" "}
              {audio.name}{" "}
            </p>{" "}
          </div>
        )}{" "}
        {/* Upload Button */}{" "}
        <button
          onClick={handleUpload}
          disabled={loading}
          className={`w-full mt-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 ${loading ? "bg-gray-600 text-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 hover:scale-105 text-white shadow-lg"}`}
        >
          {" "}
          {loading ? "Uploading..." : "Upload Audio"}{" "}
        </button>{" "}
        {/* Result Section */}{" "}
        <div className="mt-8 bg-white/10 border border-white/10 rounded-2xl p-5">
          {" "}
          <h2 className="text-xl font-semibold text-white mb-4">
            {" "}
            Transcription Result{" "}
          </h2>{" "}
          <div className="max-h-56 overflow-y-auto">
            {" "}
            <p className="text-gray-300 leading-relaxed break-words">
              {" "}
              {result || "No transcription available yet"}{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
export default AudioUpload;
