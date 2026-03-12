import { FaFire, FaPlay, FaBrain } from "react-icons/fa";
import { BsGrid, BsGraphUp, BsTrophy } from "react-icons/bs";
import { Link } from "react-router-dom";
import HeatmapPreview from "../components/heatmap/HeatmapPreview";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getAllActivity } from "../utils/db";

export default function Dashboard() {

  const user = localStorage.getItem("user");
    const guest = localStorage.getItem("guest");

    if (!user && !guest) {
      window.location.href = "/";
    }

  const topStreaks = [
    { name: "Suraj Patil", streak: 12 },
    { name: "Rahul Sharma", streak: 10 },
    { name: "Priya Singh", streak: 8 },
  ];

  const [countdown, setCountdown] = useState("");
  const [yearlyCompletions, setYearlyCompletions] = useState(0);

  useEffect(() => {

    const updateTimer = () => {

      const now = dayjs();
      const midnight = dayjs().endOf("day").add(1, "second");

      const diff = midnight.diff(now, "second");

      const hours = Math.floor(diff / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      const seconds = diff % 60;

      setCountdown(
        `${hours.toString().padStart(2,"0")}:${minutes
          .toString()
          .padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`
      );

    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);

  }, []);

  useEffect(() => {

    async function loadStats() {

      const data = await getAllActivity();

      const year = dayjs().year();

      const count = data.filter(item =>
        item.solved &&
        dayjs(item.date).year() === year
      ).length;

      setYearlyCompletions(count);

    }

    loadStats();

  }, []);

  return (
    <div>

      {/* Start Puzzle Section */}
      <div className="bg-gradient-to-r from-primary to-blue-600 text-white rounded-3xl p-10 mb-8 shadow-lg flex flex-col md:flex-row md:items-center md:justify-between">

        <div className="max-w-lg">

          <span className="bg-white/20 px-3 py-1 rounded-full text-xs">
            DAILY CHALLENGE
          </span>

          <h2 className="text-3xl font-bold mt-4 mb-3">
            The Quantum Paradox Puzzle
          </h2>

          <p className="text-blue-100">
            A high-stakes logic puzzle involving quantum states
            and temporal loops. Only 15% of players solved this today.
          </p>

        </div>

        <Link to="/puzzle">

          <button className="mt-6 md:mt-0 flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 hover:scale-105 transition">

            <FaPlay />
            Start Solving

          </button>

        </Link>

      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition duration-200">

          <div className="flex items-center gap-3 text-accent">
            <FaFire size={22} />
            <h3 className="text-gray-500 text-sm">Current Streak</h3>
          </div>

          <p className="text-2xl font-bold text-accent mt-2">12</p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-200">

          <div className="flex items-center gap-3 text-primary">
            <BsGrid size={22} />
            <h3 className="text-gray-500 text-sm">Puzzles Solved</h3>
          </div>

          <p className="text-2xl font-bold text-primary mt-2">58</p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-200">

          <div className="flex items-center gap-3 text-green-500">
            <BsGraphUp size={22} />
            <h3 className="text-gray-500 text-sm">Accuracy</h3>
          </div>

          <p className="text-2xl font-bold text-green-500 mt-2">92%</p>

        </div>

      </div>

      {/* Daily Puzzle Status */}
      <div className="bg-white p-6 rounded-xl shadow mt-8">

        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-primary">
          <FaBrain />
          Daily Puzzle
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Difficulty</span>
            <span className="font-semibold text-blue-600">Medium</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Time Played</span>
            <span className="font-semibold">02:14</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Status</span>
            <span className="font-semibold text-green-600">
              Completed
            </span>
          </div>

        </div>

      </div>

      {/* Countdown Timer */}
      <div className="bg-white p-6 rounded-xl shadow mt-6 text-center">

        <h3 className="text-sm text-gray-500 mb-2">
          Next Puzzle Unlocks In
        </h3>

        <p className="text-2xl font-bold text-primary tracking-widest">
          {countdown}
        </p>

      </div>

      {/* Heatmap Section */}
      <div className="mt-10">

        <div className="mb-3 text-sm text-gray-500">
          <span className="font-semibold text-primary">
            {yearlyCompletions}
          </span> puzzle completions this year
        </div>

        <HeatmapPreview />

      </div>

      {/* Top Streaks Section */}
      <div className="bg-white p-6 rounded-xl shadow mt-10">

        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-accent">
          <FaFire />
          Top Streaks
        </h3>

        <div className="space-y-3">

          {topStreaks.map((player, index) => (

            <div
              key={index}
              className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition"
            >

              <div className="flex items-center gap-3">

                <BsTrophy
                  className={
                    index === 0
                      ? "text-yellow-500"
                      : index === 1
                      ? "text-gray-400"
                      : "text-orange-500"
                  }
                />

                <span className="font-medium">
                  {player.name}
                </span>

              </div>

              <span className="text-accent flex items-center gap-1">
                <FaFire />
                {player.streak}
              </span>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}