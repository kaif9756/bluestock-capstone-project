import HeatmapGrid from "../components/heatmap/HeatmapGrid";
import { useState } from "react";

export default function Heatmap() {

  const [year] = useState(new Date().getFullYear());

  return (
    <div>

      <div className="flex justify-between items-center mb-6">

        <div className="bg-primary text-white px-4 py-2 rounded-lg">
          {year}
        </div>

      </div>

      <p className="text-gray-500 text-sm mb-4">
        Track your daily puzzle activity throughout the year.
      </p>

      <div className="bg-white p-8 rounded-xl shadow max-w-6xl mx-auto">

        <HeatmapGrid />

        <div className="flex items-center gap-2 text-sm text-gray-500 mt-8">

          <span>Less</span>

          <div className="w-3 h-3 bg-gray-200 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-200 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-600 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-800 rounded-sm"></div>

          <span>More</span>

        </div>

      </div>

    </div>
  );
}