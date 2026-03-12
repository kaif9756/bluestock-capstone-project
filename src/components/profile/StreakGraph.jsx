import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip
} from "recharts";

const data = [
  { day: "Mon", value: 1 },
  { day: "Tue", value: 2 },
  { day: "Wed", value: 3 },
  { day: "Thu", value: 2 },
  { day: "Fri", value: 4 },
  { day: "Sat", value: 5 },
  { day: "Sun", value: 6 },
];

export default function StreakGraph() {
  return (
    <div className="bg-white rounded-3xl border p-6 shadow-sm">
      <h3 className="font-bold mb-4">Puzzle Streak</h3>

      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#414BEA"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}