import { useEffect, useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    return savedTheme === "dark";
  });

  // Theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");

      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");

      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav
      className="
        fixed
        top-0
        left-0
        w-full
        z-50

        bg-black/30
        backdrop-blur-2xl

        border-b
        border-white/10

        text-white

        transition-all
        duration-300
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            h-20
          "
        >
          {/* Logo */}
          <div
            className="
              text-3xl
              font-black
              tracking-wide
            "
          >
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
              Speech - TO -
            </span>

            <span className="text-white"> Text</span>
          </div>

          {/* Desktop Menu */}
          <div
            className="
              hidden
              md:flex
              items-center
              gap-10
            "
          >
            <a
              href="/"
              className="
                text-gray-300
                hover:text-fuchsia-400
                transition-all
                duration-300
              "
            >
              Home
            </a>

            <a
              href="#AudioUpload"
              className="
                text-gray-300
                hover:text-fuchsia-400
                transition-all
                duration-300
              "
            >
              Upload
            </a>

            <a
              href="#history"
              className="
                text-gray-300
                hover:text-fuchsia-400
                transition-all
                duration-300
              "
            >
              History
            </a>
          </div>

          {/* Right Section */}
          <div
            className="
              hidden
              md:flex
              items-center
              gap-4
            "
          >
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="
                h-12
                w-12

                rounded-2xl

                bg-white/5
                border
                border-white/10

                flex
                items-center
                justify-center

                hover:bg-white/10
                hover:scale-105

                transition-all
                duration-300
              "
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            {/* Login Button */}
            <button
              className="
                px-6
                py-3

                rounded-2xl

                bg-gradient-to-r
                from-fuchsia-500
                to-violet-500

                hover:scale-105

                shadow-lg
                shadow-fuchsia-500/20

                font-semibold

                transition-all
                duration-300
              "
            >
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div
            className="
              md:hidden
              flex
              items-center
              gap-3
            "
          >
            {/* Theme */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="
                h-11
                w-11

                rounded-xl

                bg-white/5
                border
                border-white/10
              "
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            {/* Menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="
                h-11
                w-11

                rounded-xl

                bg-white/5
                border
                border-white/10

                text-xl
              "
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="
              md:hidden

              bg-black/70
              backdrop-blur-2xl

              border-t
              border-white/10

              px-6
              py-6
            "
        >
          <div
            className="
                flex
                flex-col
                gap-5
              "
          >
            <a
              href="/"
              className="
                  text-gray-300
                  hover:text-fuchsia-400
                "
            >
              Home
            </a>

            <a
              href="#upload"
              className="
                  text-gray-300
                  hover:text-fuchsia-400
                "
            >
              Upload
            </a>

            <a
              href="#history"
              className="
                  text-gray-300
                  hover:text-fuchsia-400
                "
            >
              History
            </a>

            <button
              className="
                  mt-3
                  px-5
                  py-3

                  rounded-2xl

                  bg-gradient-to-r
                  from-fuchsia-500
                  to-violet-500

                  text-white
                  font-semibold
                "
            >
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
