import { Home, Puzzle, BarChart3, Trophy, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white border-r p-5 hidden md:flex flex-col">

      <div className="text-lg font-semibold text-primary mb-6">
        Daily Puzzle
      </div>

      <nav className="flex flex-col gap-3 text-gray-700 text-sm">

        <Link to="/" className="flex items-center gap-2 hover:text-primary">
          <Home size={18} /> Dashboard
        </Link>

        <Link to="/puzzle" className="flex items-center gap-2 hover:text-primary">
          <Puzzle size={18} /> Play Puzzle
        </Link>

        <Link to="/heatmap" className="flex items-center gap-2 hover:text-primary">
          <BarChart3 size={18} /> Heatmap
        </Link>

        <Link to="/leaderboard" className="flex items-center gap-2 hover:text-primary">
          <Trophy size={18} /> Leaderboard
        </Link>

        <Link to="/profile" className="flex items-center gap-2 hover:text-primary">
          <User size={18} /> Profile
        </Link>

      </nav>

    </div>
  );
}