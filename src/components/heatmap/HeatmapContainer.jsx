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

    const loadData = async () => {

      const data = await getAllActivity();

      const map = {};

      data.forEach((a) => {
        map[a.date] = a;
      });

      setActivities(map);
      setLoading(false);

    };

    loadData();

  }, []);


  const stats = useMemo(() => {

    const dataList = Object.values(activities);

    const solvedCount = dataList.filter(a => a.solved).length;

    let streak = 0;
    let current = dayjs();

    while (activities[current.format("YYYY-MM-DD")]?.solved) {
      streak++;
      current = current.subtract(1, "day");
    }

    const bestScore = dataList.length
      ? Math.max(...dataList.map(a => a.score || 0))
      : 0;

    return { solvedCount, streak, bestScore };

  }, [activities]);


  /* -----------------------------
     SKELETON LOADER (NO FLICKER)
  ------------------------------*/

  if (loading) {

    return (

      <div className="space-y-8">

        {/* Stats Skeleton */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

          <Skeleton className="h-24 rounded-3xl" />
          <Skeleton className="h-24 rounded-3xl" />
          <Skeleton className="h-24 rounded-3xl" />

        </div>

        {/* Heatmap Skeleton */}

        <Skeleton className="h-64 rounded-3xl w-full" />

      </div>

    );

  }


  return (

    <motion.div
      initial={{ opacity:0, y:10 }}
      animate={{ opacity:1, y:0 }}
      className="space-y-8"
    >

      {/* Stats Header */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">

          <div className="flex items-center gap-3 mb-4">

            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <Zap size={20}/>
            </div>

            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider">
              Current Streak
            </h4>

          </div>

          <div className="flex items-baseline gap-2">

            <span className="text-4xl font-black text-slate-900">
              {stats.streak}
            </span>

            <span className="text-slate-400 font-bold">
              days
            </span>

          </div>

        </div>


        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">

          <div className="flex items-center gap-3 mb-4">

            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Trophy size={20}/>
            </div>

            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider">
              Total Solved
            </h4>

          </div>

          <div className="flex items-baseline gap-2">

            <span className="text-4xl font-black text-slate-900">
              {stats.solvedCount}
            </span>

            <span className="text-slate-400 font-bold">
              puzzles
            </span>

          </div>

        </div>


        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">

          <div className="flex items-center gap-3 mb-4">

            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <Target size={20}/>
            </div>

            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider">
              Best Score
            </h4>

          </div>

          <div className="flex items-baseline gap-2">

            <span className="text-4xl font-black text-slate-900">
              {stats.bestScore}
            </span>

            <span className="text-slate-400 font-bold">
              pts
            </span>

          </div>

        </div>

      </div>


      {/* Heatmap Card */}

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">

          <div>

            <h3 className="text-xl font-bold text-slate-900">
              Activity Heatmap
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Your puzzle solving consistency over the last year.
            </p>

          </div>

          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">

            <Calendar size={14} className="text-slate-400"/>

            <span className="text-xs font-bold text-slate-600">
              {dayjs().year()}
            </span>

          </div>

        </div>


        <div className="overflow-x-auto pb-4">

          <HeatmapGrid activityData={activities}/>

        </div>


        {/* Legend */}

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-100">

          <div className="flex items-center gap-2 text-xs text-slate-400">

            <Info size={14}/>

            <span>
              Intensity is based on your daily score and difficulty level.
            </span>

          </div>

          <div className="flex items-center gap-2">

            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Less
            </span>

            <div className="flex gap-1">

              <div className="w-3 h-3 rounded-sm bg-gray-200"></div>
              <div className="w-3 h-3 rounded-sm bg-green-200"></div>
              <div className="w-3 h-3 rounded-sm bg-green-400"></div>
              <div className="w-3 h-3 rounded-sm bg-green-600"></div>
              <div className="w-3 h-3 rounded-sm bg-green-800"></div>

            </div>

            <span className="text-[10px] font-bold text-slate-400 uppercase">
              More
            </span>

          </div>

        </div>

      </div>

    </motion.div>

  );

}