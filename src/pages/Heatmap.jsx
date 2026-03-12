import HeatmapContainer from "../components/heatmap/HeatmapContainer";
import { useState } from "react";

export default function Heatmap() {

  return (

    <div className="max-w-6xl mx-auto">


      <p className="text-gray-500 text-sm mb-6">
        Track your daily puzzle activity throughout the year.
      </p>


      {/* Heatmap + Stats Container */}

      <div className="bg-white p-8 rounded-xl shadow">

        <HeatmapContainer />

      </div>

    </div>

  );

}