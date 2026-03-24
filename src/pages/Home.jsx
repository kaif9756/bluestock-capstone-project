import { Link } from "react-router-dom";
import { FaPlay, FaBrain, FaFire } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 sm:px-6">

      <div className="max-w-2xl">

        <h1 className="text-3xl sm:text-5xl font-bold mb-4">
          Master your mind,
          <span className="text-primary block mt-2">
            one puzzle at a time
          </span>
        </h1>

        <p className="text-gray-500 text-sm sm:text-lg mb-8">
          Solve daily challenges and improve your logic skills.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">

          <Link to="/login">
            <button className="w-full sm:w-auto bg-primary text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 active:scale-95">
              <FaPlay />
              Get Started
            </button>
          </Link>

          <button
            onClick={() => {
              localStorage.setItem("guest","true");
              window.location.href="/dashboard";
            }}
            className="w-full sm:w-auto border px-6 py-3 rounded-xl"
          >
            Guest Mode
          </button>

        </div>

      </div>

    </div>
  );
}