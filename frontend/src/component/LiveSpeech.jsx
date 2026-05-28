import {
  useEffect,
  useRef,
  useState,
} from "react";


function LiveSpeech() {

  const [listening, setListening] =
    useState(false);

  const [transcript, setTranscript] =
    useState("");

  const recognitionRef =
    useRef(null);


  // Start Listening
  const startListening = async () => {

    try {

      // Browser Support
      const SpeechRecognition =

        window.SpeechRecognition ||

        window.webkitSpeechRecognition;

      if (!SpeechRecognition) {

        alert(
          "Use Google Chrome Browser"
        );

        return;
      }

      // Ask Mic Permission
      await navigator.mediaDevices
        .getUserMedia({
          audio: true,
        });

      // Create Recognition
      const recognition =
        new SpeechRecognition();

      recognitionRef.current =
        recognition;

      // Settings
      recognition.continuous =
        true;

      recognition.interimResults =
        true;

      recognition.lang = "en-US";

      // Start Event
      recognition.onstart = () => {

        console.log(
          "Recognition Started"
        );

        setListening(true);
      };

      // Result Event
      recognition.onresult = (
        event
      ) => {

        let text = "";

        for (
          let i = 0;
          i < event.results.length;
          i++
        ) {

          text +=
            event.results[i][0]
              .transcript + " ";
        }

        setTranscript(text);
      };

      // Error Event
      recognition.onerror = (
        event
      ) => {

        console.log(
          "Speech Error:",
          event.error
        );
      };

      // End Event
      recognition.onend = () => {

        console.log(
          "Recognition Ended"
        );

        setListening(false);
      };

      // Start
      recognition.start();

    } catch (error) {

      console.log(error);

      alert(
        "Microphone permission denied"
      );
    }
  };


  // Stop Listening
  const stopListening = () => {

    recognitionRef.current?.stop();

    setListening(false);
  };


  // Clear Transcript
  const clearTranscript = () => {

    setTranscript("");
  };


  // Cleanup
  useEffect(() => {

    return () => {

      recognitionRef.current
        ?.stop();
    };

  }, []);


  return (

    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-900
        via-black
        to-slate-800
        flex
        items-center
        justify-center
        p-6
      "
    >

      <div
        className="
          w-full
          max-w-5xl
          bg-white/10
          backdrop-blur-lg
          rounded-3xl
          border
          border-white/10
          shadow-2xl
          p-8
        "
      >

        {/* Header */}
        <div
          className="
            flex
            justify-between
            items-center
            mb-8
          "
        >

          <div>

            <h1
              className="
                text-4xl
                font-bold
                text-white
              "
            >
              🎤 Live Speech To Text
            </h1>

            <p
              className="
                text-gray-300
                mt-2
              "
            >
              Real-time browser speech recognition
            </p>

          </div>

          {/* Status */}
          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <div
              className={`
                h-4
                w-4
                rounded-full

                ${
                  listening
                  ? "bg-green-400 animate-pulse"
                  : "bg-red-400"
                }
              `}
            />

            <span className="text-white">

              {
                listening
                ? "Listening..."
                : "Stopped"
              }

            </span>

          </div>

        </div>

        {/* Buttons */}
        <div
          className="
            flex
            gap-4
            mb-8
          "
        >

          <button
            onClick={startListening}

            disabled={listening}

            className="
              px-6
              py-3
              bg-green-500
              hover:bg-green-600
              disabled:bg-green-300
              rounded-2xl
              text-white
              font-semibold
              transition
            "
          >

            🎤 Start

          </button>

          <button
            onClick={stopListening}

            className="
              px-6
              py-3
              bg-red-500
              hover:bg-red-600
              rounded-2xl
              text-white
              font-semibold
              transition
            "
          >

            ⏹ Stop

          </button>

          <button
            onClick={clearTranscript}

            className="
              px-6
              py-3
              bg-gray-700
              hover:bg-gray-800
              rounded-2xl
              text-white
              font-semibold
              transition
            "
          >

            🗑 Clear

          </button>

        </div>

        {/* Transcript */}
        <div
          className="
            bg-black/30
            rounded-3xl
            border
            border-white/10
            p-8
            min-h-[300px]
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

            📝 Transcript

          </h2>

          <p
            className="
              text-xl
              text-gray-100
              leading-10
              whitespace-pre-wrap
            "
          >

            {transcript}

          </p>

        </div>

      </div>

    </div>
  );
}

export default LiveSpeech;