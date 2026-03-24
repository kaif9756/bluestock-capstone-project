import React, { useEffect, useState, useMemo } from "react";
import { Zap, Trophy, Target, Calendar, Info } from "lucide-react";
import HeatmapGrid from "./HeatmapGrid";
import { getAllActivity } from "../../utils/db";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import Skeleton from "../ui/Skeleton";

export default function HeatmapContainer() {
  const [activities, setActivities] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAllActivity();

        const map = {};
        data?.forEach((item) => {
          map[item.date] = item;
        });

        setActivities(map);
      } catch (error) {
        console.error("Heatmap loading error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // -------- Stats --------

  const stats = useMemo(() => {
    const dataList = Object.values(activities || {});

    const solvedCount = dataList.filter((a) => a?.solved).length;

    let streak = 0;
    let current = dayjs();

    while (activities?.[current.format("YYYY-MM-DD")]?.solved) {
      streak++;
      current = current.subtract(1, "day");
    }

    const bestScore = dataList.length
      ? Math.max(...dataList.map((a) => a?.score || 0))
      : 0;

    return { solvedCount, streak, bestScore };
  }, [activities]);

  // -------- Loader --------

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Skeleton className="h-20 rounded-2xl" />
          <Skeleton className="h-20 rounded-2xl" />
          <Skeleton className="h-20 rounded-2xl" />
        </div>

        <Skeleton className="h-56 rounded-2xl w-full" />
      </div>
    );
  }

  // -------- Card Component --------

  const StatCard = ({ icon, title, value, label, color }) => {
    return (
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 rounded-lg ${color}`}>
            {icon}
          </div>

          <h4 className="text-xs sm:text-sm font-bold text-slate-500 uppercase">
            {title}
          </h4>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-4xl font-bold text-slate-900">
            {value}
          </span>

          <span className="text-slate-400 text-sm font-medium">
            {label}
          </span>
        </div>
      </div>
    );
  };

  // -------- Main UI --------

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={<Zap size={18} />}
          title="Current Streak"
          value={stats.streak}
          label="days"
          color="bg-amber-50 text-amber-600"
        />

        <StatCard
          icon={<Trophy size={18} />}
          title="Total Solved"
          value={stats.solvedCount}
          label="puzzles"
          color="bg-indigo-50 text-indigo-600"
        />

        <StatCard
          icon={<Target size={18} />}
          title="Best Score"
          value={stats.bestScore}
          label="pts"
          color="bg-emerald-50 text-emerald-600"
        />
      </div>

      {/* Heatmap */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Activity Heatmap
            </h3>

            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Your puzzle solving consistency over the last year.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-full border">
            <Calendar size={14} className="text-slate-400" />

            <span className="text-xs font-semibold text-slate-600">
              {dayjs().year()}
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="overflow-x-auto pb-3">
          <HeatmapGrid activityData={activities} />
        </div>

        {/* Footer */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Info size={14} />
            <span>Intensity is based on daily activity.</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400">
              Less
            </span>

            <div className="flex gap-1">
              <div className="w-3 h-3 bg-gray-200 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-200 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-600 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-800 rounded-sm"></div>
            </div>

            <span className="text-[10px] font-bold text-slate-400">
              More
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}