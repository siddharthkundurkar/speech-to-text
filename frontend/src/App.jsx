import { useEffect, useState }
from "react";

import { supabase }
from "./config/supabase";

import AudioUpload
from "./component/audioUpload";
import History
from "./component/History";

import Navbar
from "./Navbar";

import LiveSpeech
from "./component/LiveSpeech";

import Auth
from "./pages/Auth";


function App() {

  const [session, setSession] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  // Session
  useEffect(() => {

    // Current Session
    supabase.auth
      .getSession()

      .then(({ data }) => {

        setSession(
          data.session
        );

        setLoading(false);
      });

    // Listen Auth Changes
    const {

      data: listener,

    } = supabase.auth
      .onAuthStateChange(

        (_event, session) => {

          setSession(session);
        }
      );

    return () => {

      listener.subscription
        .unsubscribe();
    };

  }, []);


  // Loading
  if (loading) {

    return (

      <div
        className="
          min-h-screen
          bg-black
          flex
          items-center
          justify-center
          text-white
          text-3xl
          font-bold
        "
      >

        Loading...

      </div>
    );
  }


  // Not Logged In
  if (!session) {

    return <Auth />;
  }


  // Logout
  const handleLogout = async () => {

    await supabase.auth
      .signOut();
  };


  return (

    <div
    id = "top"
      className="
        min-h-screen
        bg-[#07070A]
        text-white
        overflow-x-hidden
        relative
      "
    >

      {/* Background Glow */}
      <div
        className="
          fixed
          inset-0
          -z-10

          bg-[radial-gradient(circle_at_top_right,_#9333ea33,_transparent_35%),radial-gradient(circle_at_bottom_left,_#10b98122,_transparent_35%),radial-gradient(circle_at_center,_#ec489922,_transparent_45%)]
        "
      />

      {/* Navbar */}
      <Navbar
        handleLogout={
          handleLogout
        }

        userEmail={
          session.user.email
        }
      />

      {/* Hero Section */}
      <section
       
        className="
          pt-28
          pb-24
          px-6
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
            grid
            lg:grid-cols-2
            gap-16
            items-center
          "
        >

          {/* Left Content */}
          <div>

            {/* Badge */}
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
                mb-6
                backdrop-blur-lg
              "
            >

              ✨ AI Powered Speech Recognition

            </div>

            {/* Heading */}
            <h1
              className="
                text-5xl
                md:text-7xl
                font-black
                leading-tight
                mb-8
              "
            >

              Convert

              <span
                className="
                  bg-gradient-to-r
                  from-fuchsia-400
                  via-violet-400
                  to-emerald-400

                  text-transparent
                  bg-clip-text
                "
              >

                {" "}Voice

              </span>

              <br />

              Into Text

            </h1>

            {/* Paragraph */}
            <p
              className="
                text-gray-400
                text-lg
                leading-8
                max-w-2xl
                mb-10
              "
            >

              Welcome back

              <span className="text-fuchsia-400">

                {" "}
                {
                  session.user.email
                }

              </span>

            </p>

            {/* Buttons */}
            <div
              className="
                flex
                gap-5
                flex-wrap
              "
            >

              <button
                className="
                  px-8
                  py-4
                  rounded-2xl

                  bg-gradient-to-r
                  from-fuchsia-500
                  to-violet-500

                  hover:scale-105
                  transition-all
                  duration-300

                  font-semibold

                  shadow-lg
                  shadow-fuchsia-500/30
                "
              >

                🚀 Start Transcribing

              </button>

            </div>

          </div>

          {/* Right Hero Card */}
          <div
            className="
              relative
            "
          >

            {/* Glow */}
            <div
              className="
                absolute
                -inset-1

                rounded-3xl

                bg-gradient-to-r
                from-fuchsia-500
                via-violet-500
                to-emerald-500

                blur-2xl
                opacity-30
              "
            />

            {/* Card */}
            <div
              className="
                relative

                bg-white/5
                border
                border-white/10

                backdrop-blur-xl

                rounded-3xl
                p-8

                shadow-2xl
              "
            >

              <LiveSpeech />

            </div>

          </div>

        </div>

      </section>

      {/* Upload */}
      <section
        id="Upload"
        className="
          px-6
          pb-24
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
          "
        >

          <div
            className="
              bg-white/5
              border
              border-white/10
              rounded-3xl
              p-8
              backdrop-blur-xl
            "
          >

            <AudioUpload />

          </div>

        </div>

      </section>

      {/* History */}
      <section
        id="history"
        className="
          px-6
          pb-24
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
          "
        >

          <div
            className="
              bg-white/5
              border
              border-white/10
              rounded-3xl
              p-8
              backdrop-blur-xl
            "
          >

            <History />

          </div>

        </div>

      </section>

    </div>
  );
}

export default App;