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

      data.forEach(item => {
        map[item.date] = item;
      });

      setActivity(map);

    }

    loadActivity();

  }, []);


  const days = [];
  let date = startOfYear.startOf("week");

  while (date.isBefore(endOfYear) || date.isSame(endOfYear, "day")) {
    days.push(date);
    date = date.add(1, "day");
  }


  const weeks = [];

  for (let i = 0; i < days.length; i += 7) {

    const week = days.slice(i, i + 7);

    if (week.length === 7) {
      weeks.push(week);
    }

  }


  const monthLabels = [];

  weeks.forEach((week, index) => {

    const firstDay = week.find(d => d.date() === 1);

    if (firstDay) {

      monthLabels.push({
        label: firstDay.format("MMM"),
        index
      });

    }

  });


  return (

    <div className="w-full overflow-x-auto">

      {/* Month Labels */}

      <div className="relative ml-12 mb-3 h-4 text-xs text-gray-500">

        {monthLabels.map((m, i) => (

          <span
            key={i}
            className="absolute"
            style={{ left: `${m.index * 18}px` }}
          >
            {m.label}
          </span>

        ))}

      </div>


      <div className="flex">

        {/* Day Labels */}

        <div className="flex flex-col text-xs text-gray-500 mr-2">

          <span className="h-[16px] leading-[16px]">Mon</span>
          <span className="h-[16px]"></span>
          <span className="h-[16px] leading-[16px]">Wed</span>
          <span className="h-[16px]"></span>
          <span className="h-[16px] leading-[16px]">Fri</span>

        </div>


        {/* Grid */}

        <div className="flex gap-[3px]">

          {weeks.map((week, wi) => (

            <div key={wi} className="grid grid-rows-7 gap-[3px]">

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

  );

}