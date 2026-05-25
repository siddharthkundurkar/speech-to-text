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
        formData
      );

      console.log(res.data);

      setResult(
        res.data.text || "Audio uploaded successfully"
      );

    } catch (error) {
      console.log(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Upload Audio File
        </h2>

        <div className="mb-5">
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudio(e.target.files[0])}
            className="w-full border border-gray-300 rounded-lg p-3 cursor-pointer 
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-500 file:text-white
            hover:file:bg-blue-600"
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition duration-300
          ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Uploading..." : "Upload Audio"}
        </button>

        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-4">
          
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Transcription Result:
          </h3>

          <p className="text-gray-600 break-words">
            {result || "No transcription yet"}
          </p>

        </div>

      </div>

    </div>
  );
}

export default AudioUpload;