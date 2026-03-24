import { useState } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";

export default function HeatmapCell({ level, date }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const today = dayjs().format("YYYY-MM-DD");

  const colors = [
    "bg-gray-200",
    "bg-green-200",
    "bg-green-400",
    "bg-green-600",
    "bg-green-800",
  ];

  const isToday = date === today;

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => setShowTooltip((prev) => !prev)} // mobile support
    >
      <motion.div
        className={`
          w-4 h-4 sm:w-5 sm:h-5   // mobile first sizing
          rounded-sm 
          ${colors[level]} 
          ${isToday ? "ring-2 ring-blue-500" : ""}
        `}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.15 }}
        transition={{ duration: 0.2 }}
      />

      {showTooltip && (
        <div
          className="
            absolute 
            bottom-7 
            left-1/2 
            -translate-x-1/2 
            bg-gray-900 
            text-white 
            text-xs 
            px-2 py-1 
            rounded 
            shadow-md 
            whitespace-nowrap
            z-10
          "
        >
          {dayjs(date).format("MMM D, YYYY")}
        </div>
      )}
    </div>
  );
}