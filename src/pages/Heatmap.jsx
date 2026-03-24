import HeatmapContainer from "../components/heatmap/HeatmapContainer";

export default function Heatmap() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">

      <p className="text-gray-500 text-sm mb-4 sm:mb-6">
        Track your daily puzzle activity throughout the year.
      </p>

      <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
        <HeatmapContainer />
      </div>

    </div>
  );
}