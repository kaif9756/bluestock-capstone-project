import { Link } from "react-router-dom";
import { FaPlay, FaBrain, FaFire } from "react-icons/fa";

export default function Home() {

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center text-center px-6">

      {/* Hero Section */}

      <div className="max-w-3xl">

        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">

          Master your mind,<br />

          <span className="text-primary">
            one puzzle at a time.
          </span>

        </h1>

        <p className="text-gray-500 text-lg mb-10">

          Logic Looper is the ultimate daily puzzle platform.
          Solve challenges, maintain streaks, and climb the
          global leaderboard.

        </p>

        {/* Buttons */}

        <div className="flex justify-center gap-4 mb-12">

          <Link to="/login">
            <button className="bg-primary text-white px-8 py-4 rounded-xl flex items-center gap-2 hover:scale-105 transition shadow-lg">
              <FaPlay />
              Get Started Free
            </button>
          </Link>

          <button
            onClick={() => {
              localStorage.setItem("guest", "true");
              window.location.href = "/dashboard";
            }}
            className="border border-gray-300 px-8 py-4 rounded-xl hover:bg-gray-50 transition"
          >
            Continue as Guest
          </button>

        </div>

      </div>

      {/* Feature Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 max-w-5xl w-full">

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">

          <FaBrain className="text-primary text-xl mb-3" />

          <h3 className="font-semibold mb-1">
            Daily Puzzles
          </h3>

          <p className="text-sm text-gray-500">
            A new logic challenge every day to train your brain.
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">

          <FaFire className="text-accent text-xl mb-3" />

          <h3 className="font-semibold mb-1">
            Streak System
          </h3>

          <p className="text-sm text-gray-500">
            Maintain your solving streak and stay consistent.
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">

          <FaPlay className="text-green-500 text-xl mb-3" />

          <h3 className="font-semibold mb-1">
            Offline Play
          </h3>

          <p className="text-sm text-gray-500">
            Play puzzles anytime even without internet.
          </p>

        </div>

      </div>

    </div>
  );
}