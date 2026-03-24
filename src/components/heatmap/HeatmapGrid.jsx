import dayjs from "dayjs";
import HeatmapCell from "./HeatmapCell";
import { useEffect, useState } from "react";
import { getAllActivity } from "../../utils/db";

export default function HeatmapGrid() {
  const startOfYear = dayjs().startOf("year");
  const endOfYear = dayjs().endOf("year");

  const [activity, setActivity] = useState({});

  useEffect(() => {
    async function loadActivity() {
      const data = await getAllActivity();

      const map = {};
      data.forEach((item) => {
        map[item.date] = item;
      });

      setActivity(map);
    }

    loadActivity();
  }, []);

  // -------- Generate Days --------

  const days = [];
  let currentDate = startOfYear.startOf("week");

  while (
    currentDate.isBefore(endOfYear) ||
    currentDate.isSame(endOfYear, "day")
  ) {
    days.push(currentDate);
    currentDate = currentDate.add(1, "day");
  }

  // -------- Split into Weeks --------

  const weeks = [];

  for (let i = 0; i < days.length; i += 7) {
    const week = days.slice(i, i + 7);

    if (week.length === 7) {
      weeks.push(week);
    }
  }

  // -------- Month Labels --------

  const monthLabels = [];

  weeks.forEach((week, index) => {
    const firstDay = week.find((d) => d.date() === 1);

    if (firstDay) {
      monthLabels.push({
        label: firstDay.format("MMM"),
        index,
      });
    }
  });

  // -------- UI --------

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-max">
        {/* Month Labels */}
        <div className="relative ml-10 mb-2 h-4 text-[10px] sm:text-xs text-gray-500">
          {monthLabels.map((m, i) => (
            <span
              key={i}
              className="absolute"
              style={{ left: `${m.index * 20}px` }}
            >
              {m.label}
            </span>
          ))}
        </div>

        <div className="flex">
          {/* Day Labels */}
          <div className="flex flex-col text-[10px] sm:text-xs text-gray-500 mr-2">
            <span className="h-4 leading-4">Mon</span>
            <span className="h-4"></span>
            <span className="h-4 leading-4">Wed</span>
            <span className="h-4"></span>
            <span className="h-4 leading-4">Fri</span>
          </div>

          {/* Grid */}
          <div className="flex gap-[2px] sm:gap-[3px]">
            {weeks.map((week, wi) => (
              <div key={wi} className="grid grid-rows-7 gap-[2px] sm:gap-[3px]">
                {week.map((day) => {
                  const dateStr = day.format("YYYY-MM-DD");
                  const entry = activity[dateStr];

                  let level = 0;

                  if (entry?.solved) {
                    if (entry.score > 150) level = 4;
                    else if (entry.score > 100) level = 3;
                    else if (entry.score > 50) level = 2;
                    else level = 1;
                  }

                  return (
                    <HeatmapCell
                      key={dateStr}
                      date={dateStr}
                      level={level}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}