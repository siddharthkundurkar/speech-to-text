import { useState } from "react";

import { supabase }
from "../config/supabase";


function Auth() {

  const [isLogin, setIsLogin] =
    useState(true);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");


  // Handle Auth
  const handleAuth = async (
    e
  ) => {

    e.preventDefault();

    setLoading(true);

    setMessage("");

    try {

      // LOGIN
      if (isLogin) {

        const { error } =

          await supabase.auth
            .signInWithPassword({

              email,

              password,
            });

        if (error) {

          setMessage(
            error.message
          );

        } else {

          setMessage(
            "Login successful"
          );
        }

      }

      // SIGNUP
      else {

        const { error } =

          await supabase.auth
            .signUp({

              email,

              password,
            });

        if (error) {

          setMessage(
            error.message
          );

        } else {

          setMessage(
            "Signup successful"
          );
        }
      }

    } catch (error) {

      console.log(error);

      setMessage(
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  };


  return (

    <div
      className="
        min-h-screen

        bg-[#07070A]

        flex
        items-center
        justify-center

        px-6

        relative
        overflow-hidden
      "
    >

      {/* Glow */}
      <div
        className="
          absolute
          inset-0

          bg-[radial-gradient(circle_at_top_right,_#9333ea33,_transparent_35%),radial-gradient(circle_at_bottom_left,_#10b98122,_transparent_35%),radial-gradient(circle_at_center,_#ec489922,_transparent_45%)]
        "
      />


      {/* Card */}
      <div
        className="
          relative

          w-full
          max-w-md

          bg-white/5
          backdrop-blur-2xl

          border
          border-white/10

          rounded-[32px]

          p-10

          shadow-2xl
        "
      >

        {/* Heading */}
        <div className="text-center mb-10">

          <h1
            className="
              text-4xl
              font-black

              text-white

              mb-3
            "
          >

            {
              isLogin

              ? "Welcome Back"

              : "Create Account"
            }

          </h1>

          <p className="text-gray-400">

            AI Speech To Text Platform

          </p>

        </div>


        {/* Form */}
        <form
          onSubmit={handleAuth}

          className="
            flex
            flex-col
            gap-5
          "
        >

          {/* Email */}
          <input
            type="email"

            placeholder="Enter email"

            value={email}

            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }

            required

            className="
              w-full

              bg-white/5

              border
              border-white/10

              rounded-2xl

              px-5
              py-4

              text-white
              placeholder:text-gray-500

              outline-none

              focus:border-fuchsia-500/40
            "
          />


          {/* Password */}
          <input
            type="password"

            placeholder="Enter password"

            value={password}

            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }

            required

            className="
              w-full

              bg-white/5

              border
              border-white/10

              rounded-2xl

              px-5
              py-4

              text-white
              placeholder:text-gray-500

              outline-none

              focus:border-fuchsia-500/40
            "
          />


          {/* Button */}
          <button
            type="submit"

            disabled={loading}

            className="
              w-full

              py-4

              rounded-2xl

              bg-gradient-to-r
              from-fuchsia-500
              to-violet-500

              hover:scale-[1.02]

              text-white
              font-semibold

              transition-all
              duration-300

              shadow-lg
              shadow-fuchsia-500/20
            "
          >

            {
              loading

              ? "Please wait..."

              : isLogin

                ? "Login"

                : "Signup"
            }

          </button>

        </form>


        {/* Message */}
        {
          message && (

            <div
              className="
                mt-6

                bg-white/5

                border
                border-white/10

                rounded-2xl

                p-4

                text-center
                text-gray-300
              "
            >

              {message}

            </div>
          )
        }


        {/* Toggle */}
        <div
          className="
            mt-8
            text-center
          "
        >

          <button
            onClick={() =>
              setIsLogin(
                !isLogin
              )
            }

            className="
              text-fuchsia-400
              hover:text-fuchsia-300
            "
          >

            {
              isLogin

              ? "Don't have an account? Signup"

              : "Already have an account? Login"
            }

          </button>

        </div>

      </div>

    </div>
  );
}

export default Auth;