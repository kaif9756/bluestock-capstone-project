import { useState } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";

export default function HeatmapCell({ level, date }) {

  const [hover, setHover] = useState(false);

  const today = dayjs().format("YYYY-MM-DD");

  const colors = [
    "bg-gray-200",
    "bg-green-200",
    "bg-green-400",
    "bg-green-600",
    "bg-green-800"
  ];

  return (

    <div
      className="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >

      <motion.div
        className={`w-[14px] h-[14px] rounded-sm ${colors[level]} 
        ${date === today ? "ring-2 ring-primary" : ""}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.15 }}
        transition={{ duration: 0.2 }}
      />

      {hover && (

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">

          {dayjs(date).format("MMM D, YYYY")}

        </div>

      )}

    </div>

  );

}