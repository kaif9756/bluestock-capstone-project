import HeatmapGrid from "./HeatmapGrid";
import { Link } from "react-router-dom";

export default function HeatmapPreview() {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm mt-6 sm:mt-8 border border-slate-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        
        <h3 className="font-semibold text-base sm:text-lg text-slate-800">
          Puzzle Activity
        </h3>

        <Link
          to="/heatmap"
          className="text-primary text-sm font-medium hover:underline self-start sm:self-auto"
        >
          View Full
        </Link>

      </div>

      {/* Heatmap */}
      <div className="overflow-x-auto">
        <HeatmapGrid />
      </div>

    </div>
  );
}