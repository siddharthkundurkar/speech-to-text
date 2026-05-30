import { useEffect, useState } from "react";

import { fetchHistoryApi } from "../services/history";

function History() {
  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [expandedCards, setExpandedCards] = useState({});

  // Fetch History
  const fetchHistory = async () => {
    try {
      const response = await fetchHistoryApi();

      setHistory(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Load On Start
  useEffect(() => {
    fetchHistory();
  }, []);

  // Filter History
  const filteredHistory = history.filter(
    (item) =>
      item.filename.toLowerCase().includes(search.toLowerCase()) ||
      item.transcriptText.toLowerCase().includes(search.toLowerCase()),
  );

  // Copy Transcript
  const copyTranscript = (text) => {
    navigator.clipboard.writeText(text);

    alert("Transcript copied");
  };

  // Download TXT
  const downloadTranscript = (filename, text) => {
    const blob = new Blob([text], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `${filename}.txt`;

    link.click();

    URL.revokeObjectURL(url);
  };

  // Expand Transcript
  const toggleExpand = (id) => {
    setExpandedCards((prev) => {
      return {
        ...prev,

        [id]: !prev[id],
      };
    });
  };

  return (
    <div className="w-full">
      {/* Heading */}
      <div className="text-center mb-14">
        <div
          className="
            inline-block
            px-5
            py-2
            rounded-full

            bg-fuchsia-500/10
            border
            border-fuchsia-500/20

            text-fuchsia-400
            text-sm

            mb-5
          "
        >
          ✨  Generated Transcripts
        </div>

        <h1
          className="
            text-4xl
            md:text-5xl
            font-black

            text-white

            mb-4
          "
        >
          Transcription History
        </h1>

        <p
          className="
            text-gray-400
            text-lg
            max-w-2xl
            mx-auto
          "
        >
          Browse all your previously generated speech-to-text AI transcriptions.
        </p>
      </div>

      {/* Search */}
      <div
        className="
          max-w-2xl
          mx-auto
          mb-14
        "
      >
        <input
          type="text"
          placeholder="Search transcripts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full

            bg-white/5
            backdrop-blur-xl

            border
            border-white/10

            rounded-2xl

            px-6
            py-4

            text-white
            placeholder:text-gray-500

            outline-none

            focus:border-fuchsia-500/40
          "
        />
      </div>

      {/* Loading */}
      {loading ? (
        <div
          className="
              flex
              justify-center
              items-center
              py-24
            "
        >
          <div
            className="
                flex
                flex-col
                items-center
                gap-5
              "
          >
            {/* Loader */}
            <div
              className="
                  h-16
                  w-16

                  rounded-full

                  border-4
                  border-fuchsia-500/30
                  border-t-fuchsia-500

                  animate-spin
                "
            />

            <p
              className="
                  text-gray-300
                  text-lg
                  font-medium
                "
            >
              Loading AI History...
            </p>
          </div>
        </div>
      ) : filteredHistory.length === 0 ? (
        /* Empty State */
        <div
          className="
              max-w-2xl
              mx-auto

              bg-white/5
              backdrop-blur-xl

              border
              border-white/10

              rounded-[32px]

              p-14

              text-center

              shadow-2xl
            "
        >
          <div className="text-7xl mb-6">📂</div>

          <h2
            className="
                text-3xl
                font-bold
                text-white
                mb-4
              "
          >
            No Transcripts Found
          </h2>

          <p
            className="
                text-gray-400
                text-lg
                leading-8
              "
          >
            Your uploaded speech-to-text transcriptions will appear here.
          </p>
        </div>
      ) : (
        /* Cards */
        <div
          className="
              grid
              gap-8

              sm:grid-cols-2
              xl:grid-cols-3
            "
        >
          {filteredHistory.map((item) => (
            <div
              key={item._id}
              className="
                    group
                    relative

                    bg-white/5
                    backdrop-blur-xl

                    border
                    border-white/10

                    rounded-[32px]

                    overflow-hidden

                    hover:-translate-y-3
                    hover:border-fuchsia-500/30

                    transition-all
                    duration-500

                    shadow-xl
                  "
            >
              {/* Glow */}
              <div
                className="
                      absolute
                      inset-0

                      opacity-0
                      group-hover:opacity-100

                      transition-all
                      duration-500

                      bg-gradient-to-br
                      from-fuchsia-500/10
                      via-violet-500/5
                      to-emerald-500/10
                    "
              />

              {/* Top Border */}
              <div
                className="
                      h-1.5

                      bg-gradient-to-r
                      from-fuchsia-500
                      via-violet-500
                      to-emerald-400
                    "
              />

              <div className="relative p-7">
                {/* Header */}
                <div
                  className="
                        flex
                        items-center
                        justify-between
                        mb-6
                      "
                >
                  {/* Icon */}
                  <div
                    className="
                          h-16
                          w-16

                          rounded-3xl

                          bg-gradient-to-br
                          from-fuchsia-500/20
                          to-violet-500/20

                          border
                          border-white/10

                          flex
                          items-center
                          justify-center

                          text-3xl
                        "
                  >
                    🎙️
                  </div>

                  {/* Tag */}
                  <span
                    className="
                          px-4
                          py-1.5

                          rounded-full

                          bg-fuchsia-500/10
                          border
                          border-fuchsia-500/20

                          text-fuchsia-400
                          text-xs
                          font-semibold
                        "
                  >
                     Transcript
                  </span>
                </div>

                {/* Filename */}
                <h2
                  className="
                        text-2xl
                        font-bold
                        text-white

                        mb-5

                        break-words

                        group-hover:text-fuchsia-400

                        transition-all
                        duration-300
                      "
                >
                  {item.filename}
                </h2>

                {/* Transcript */}
                <div
                  className="
                        bg-black/20

                        border
                        border-white/5

                        rounded-3xl

                        p-5

                        min-h-[180px]

                        mb-6
                      "
                >
                  <p
                    className="
                          text-gray-300
                          text-sm

                          leading-8
                        "
                  >
                    {expandedCards[item._id]
                      ? item.transcriptText
                      : item.transcriptText.slice(0, 180)}

                    {item.transcriptText.length > 180 && (
                      <button
                        onClick={() => toggleExpand(item._id)}
                        className="
                                ml-2
                                text-fuchsia-400
                                hover:text-fuchsia-300
                              "
                      >
                        {expandedCards[item._id] ? "Show Less" : "Read More"}
                      </button>
                    )}
                  </p>
                </div>

                {/* Footer */}
                <div
                  className="
                        flex
                        items-center
                        justify-between

                        border-t
                        border-white/10

                        pt-5
                      "
                >
                  {/* Date */}
                  <div>
                    <p
                      className="
                            text-xs
                            text-gray-500
                            mb-1
                          "
                    >
                      Generated On
                    </p>

                    <p
                      className="
                            text-sm
                            font-medium
                            text-gray-300
                          "
                    >
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    {/* Copy */}
                    <button
                      onClick={() => copyTranscript(item.transcriptText)}
                      className="
                            px-4
                            py-2

                            rounded-2xl

                            bg-white/5
                            border
                            border-white/10

                            hover:bg-white/10

                            text-sm
                            text-white

                            transition-all
                          "
                    >
                      📋 Copy
                    </button>

                    {/* Download */}
                    <button
                      onClick={() =>
                        downloadTranscript(
                          item.filename,

                          item.transcriptText,
                        )
                      }
                      className="
                            px-4
                            py-2

                            rounded-2xl

                            bg-gradient-to-r
                            from-fuchsia-500
                            to-violet-500

                            hover:scale-105

                            text-sm
                            text-white

                            transition-all
                          "
                    >
                      ⬇ TXT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
