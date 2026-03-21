import HeatmapGrid from "./HeatmapGrid";
import { Link } from "react-router-dom";

export default function HeatmapPreview() {

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-8">

      <div className="flex justify-between items-center mb-4">

        <h3 className="font-semibold text-lg">
          Puzzle Activity
        </h3>

        <Link
          to="/heatmap"
          className="text-primary text-sm hover:underline"
        >
          View Full
        </Link>

      </div>

      <HeatmapGrid />

    </div>
  );
}