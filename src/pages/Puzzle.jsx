import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { saveActivity } from "../utils/db";
import { FaClock, FaLightbulb, FaRedo, FaCheckCircle } from "react-icons/fa";

export default function Puzzle() {

  const [showModal, setShowModal] = useState(false);
  const [selectedTile, setSelectedTile] = useState(null);
  const [time, setTime] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);

  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;
  };

  const handlePuzzleComplete = async () => {

    const today = dayjs().format("YYYY-MM-DD");

    await saveActivity({
      date: today,
      solved: true,
      score: 120,
      timeTaken: time,
      difficulty: 2
    });

    setShowModal(true);
  };

  return (
    <div>

      <h1 className="text-2xl font-semibold mb-6">Daily Puzzle</h1>

      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow mb-6">

        <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-600 font-medium">
          Medium
        </span>

        <div className="flex items-center gap-2 text-gray-600 font-medium">
          <FaClock />
          <span>{formatTime(time)}</span>
        </div>

      </div>

      <div className="bg-white p-8 rounded-xl shadow mb-6">

        <div className="grid grid-cols-5 gap-4 max-w-md mx-auto">

          {[...Array(25)].map((_, index) => (

            <div
              key={index}
              onClick={() => setSelectedTile(index)}
              className={`w-14 h-14 border-2 rounded-lg flex items-center justify-center text-lg font-semibold cursor-pointer
              transition duration-200 transform hover:scale-105
              ${
                selectedTile === index
                  ? "border-primary bg-blue-100"
                  : "border-gray-200 hover:border-primary hover:bg-blue-50"
              }`}
            >
              ?
            </div>

          ))}

        </div>

      </div>

      <div className="flex justify-center gap-4">

        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-100 text-yellow-700 font-medium hover:bg-yellow-200 transition">
          <FaLightbulb />
          Hint
        </button>

        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition">
          <FaRedo />
          Reset
        </button>

        <button
          onClick={handlePuzzleComplete}
          className="flex items-center gap-2 px-6 py-2 rounded-lg bg-primary text-white font-medium hover:bg-blue-600 transition"
        >
          <FaCheckCircle />
          Submit
        </button>

      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

          <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-sm">

            <h2 className="text-xl font-semibold mb-4">
              Puzzle Completed!
            </h2>

            <p className="text-gray-600 mb-6">
              Great job! Your puzzle has been submitted.
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition"
            >
              Continue
            </button>

          </div>

        </div>
      )}

    </div>
  );
}