import { FaFire, FaPlay, FaBrain } from "react-icons/fa";
import { BsGrid, BsGraphUp, BsTrophy } from "react-icons/bs";
import { Link } from "react-router-dom";
import HeatmapPreview from "../components/heatmap/HeatmapPreview";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getAllActivity } from "../utils/db";
import DashboardSkeleton from "../components/ui/DashboardSkeleton";

export default function Dashboard() {

  const user = localStorage.getItem("user");
  const guest = localStorage.getItem("guest");

  if (!user && !guest) {
    window.location.href = "/";
  }

  const [countdown, setCountdown] = useState("");
  const [yearlyCompletions, setYearlyCompletions] = useState(0);
  const [loading, setLoading] = useState(true);

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
        item.solved && dayjs(item.date).year() === year
      ).length;

      setYearlyCompletions(count);
    }

    loadStats();

    setTimeout(() => {
      setLoading(false);
    }, 600);
  }, []);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="space-y-6 sm:space-y-8">

      {/* Hero */}
      <div className="bg-gradient-to-r from-primary to-blue-600 text-white rounded-2xl p-6 sm:p-10 shadow-lg flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <span className="bg-white/20 px-3 py-1 rounded-full text-xs">
            DAILY CHALLENGE
          </span>

          <h2 className="text-xl sm:text-3xl font-bold mt-3">
            The Quantum Paradox Puzzle
          </h2>

          <p className="text-blue-100 text-sm sm:text-base mt-2">
            Only 15% of players solved this today.
          </p>
        </div>

        <Link to="/puzzle">
          <button className="w-full sm:w-auto bg-white text-primary px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-95">
            <FaPlay />
            Start Solving
          </button>
        </Link>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
          <div className="flex items-center gap-2 text-accent">
            <FaFire />
            <span className="text-sm text-gray-500">Streak</span>
          </div>
          <p className="text-xl font-bold mt-2">12</p>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
          <div className="flex items-center gap-2 text-primary">
            <BsGrid />
            <span className="text-sm text-gray-500">Solved</span>
          </div>
          <p className="text-xl font-bold mt-2">58</p>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
          <div className="flex items-center gap-2 text-green-500">
            <BsGraphUp />
            <span className="text-sm text-gray-500">Accuracy</span>
          </div>
          <p className="text-xl font-bold mt-2">92%</p>
        </div>

      </div>

      {/* Timer */}
      <div className="bg-white p-5 rounded-xl shadow text-center">
        <p className="text-sm text-gray-500">Next Puzzle In</p>
        <p className="text-xl font-bold text-primary">{countdown}</p>
      </div>

      {/* Heatmap */}
      <div>
        <p className="text-sm text-gray-500 mb-2">
          <span className="text-primary font-semibold">
            {yearlyCompletions}
          </span> completions this year
        </p>

        <HeatmapPreview />
      </div>

    </div>
  );
}