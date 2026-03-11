import { Link } from "react-router-dom";
import { FaPlay, FaBrain, FaFire } from "react-icons/fa";

export default function Home() {

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">

      <div className="max-w-2xl">

        <h1 className="text-4xl font-bold mb-4">
          Logic Looper
        </h1>

        <p className="text-gray-500 mb-8">
          Solve daily logic puzzles, maintain streaks, and challenge your mind every day.
        </p>

        <div className="flex justify-center gap-4 mb-10">

          <Link to="/login">
            <button className="bg-primary text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-600">
              <FaPlay />
              Start Playing
            </button>
          </Link>

          <button
            onClick={() => {
              localStorage.setItem("guest", "true");
              window.location.href = "/dashboard";
            }}
            className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white"
          >
            Continue as Guest
          </button>

        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

        <div className="bg-white p-6 rounded-xl shadow">

          <FaBrain className="text-primary text-xl mb-2" />

          <h3 className="font-semibold">Daily Puzzles</h3>

          <p className="text-sm text-gray-500">
            New logic challenge every day.
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <FaFire className="text-accent text-xl mb-2" />

          <h3 className="font-semibold">Streak System</h3>

          <p className="text-sm text-gray-500">
            Maintain your puzzle solving streak.
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <FaPlay className="text-green-500 text-xl mb-2" />

          <h3 className="font-semibold">Offline Play</h3>

          <p className="text-sm text-gray-500">
            Play puzzles even without internet.
          </p>

        </div>

      </div>

    </div>
  );
}