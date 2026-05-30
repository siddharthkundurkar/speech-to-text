import { useState } from "react";

import { uploadAudioApi } from "../services/audio";

function AudioUpload() {
  const [audio, setAudio] = useState(null);

  const [result, setResult] = useState("");

  const [loading, setLoading] = useState(false);

  // Upload
  const handleUpload = async () => {
    if (!audio) {
      alert("Please select audio file");

      return;
    }

    const formData = new FormData();

    formData.append("audio", audio);

    try {
      setLoading(true);

      const data = await uploadAudioApi(formData);

      console.log(data);

      setResult(data.text || "Audio uploaded successfully");
    } catch (error) {
      console.log(error);

      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        w-full
      "
    >
      <div
        className="
          w-full

          bg-white/5
          backdrop-blur-2xl

          border
          border-white/10

          rounded-[32px]

          shadow-2xl

          p-8
        "
      >
        {/* Heading */}
        <div className="text-center mb-8">
          <h1
            className="
              text-4xl
              font-black
              text-white
              mb-3
            "
          >
            Upload Audio
          </h1>

          <p className="text-gray-400">Convert speech into AI powered text</p>
        </div>

        {/* Upload Box */}
        <div
          className="
            border-2
            border-dashed
            border-fuchsia-500/30

            rounded-3xl

            p-10

            text-center

            bg-white/5

            hover:bg-white/10

            transition-all
            duration-300
          "
        >
          <input
            type="file"
            accept="audio/*"
            id="audioUpload"
            hidden
            onChange={(e) => setAudio(e.target.files[0])}
          />

          <label
            htmlFor="audioUpload"
            className="
              cursor-pointer
            "
          >
            <div className="text-6xl mb-5">🎙️</div>

            <h2
              className="
                text-2xl
                font-bold
                text-white
                mb-3
              "
            >
              Click To Upload
            </h2>

            <p className="text-gray-400">MP3, WAV, M4A Supported</p>
          </label>
        </div>

        {/* File */}
        {audio && (
          <div
            className="
                mt-6

                bg-white/5

                border
                border-white/10

                rounded-2xl

                p-5
              "
          >
            <p className="text-gray-400 text-sm mb-2">Selected File</p>

            <p
              className="
                  text-white
                  font-semibold
                  break-all
                "
            >
              {audio.name}
            </p>
          </div>
        )}

        {/* Button */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className={`
            w-full
            mt-7

            py-4

            rounded-2xl

            font-semibold
            text-lg

            transition-all
            duration-300

            ${
              loading
                ? `
                bg-gray-700
                text-gray-400
                cursor-not-allowed
              `
                : `
                bg-gradient-to-r
                from-fuchsia-500
                to-violet-500

                hover:scale-[1.02]

                text-white

                shadow-lg
                shadow-fuchsia-500/20
              `
            }
          `}
        >
          {loading ? "Uploading..." : "Upload Audio"}
        </button>

        {/* Result */}
        <div
          className="
            mt-8

            bg-white/5

            border
            border-white/10

            rounded-3xl

            p-6
          "
        >
          <h2
            className="
              text-2xl
              font-bold
              text-white
              mb-5
            "
          >
            Transcription Result
          </h2>

          <div
            className="
              max-h-72
              overflow-y-auto
            "
          >
            <p
              className="
                text-gray-300
                leading-8
                break-words
              "
            >
              {result || "No transcription available yet"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudioUpload;
