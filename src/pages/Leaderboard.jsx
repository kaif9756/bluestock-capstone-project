import { useState } from "react";
import {
  FaFire,
  FaMedal,
  FaAward,
  FaTrophy,
  FaCrown,
  FaUserCircle
} from "react-icons/fa";

export default function Leaderboard() {

  const currentUser = "Suraj";

  const playersData = [
    { name: "Suraj", score: 980, solved: 58, streak: 12 },
    { name: "Rahul", score: 910, solved: 52, streak: 10 },
    { name: "Priya", score: 870, solved: 49, streak: 8 },
    { name: "Amit", score: 820, solved: 45, streak: 7 },
    { name: "Neha", score: 790, solved: 43, streak: 6 },
    { name: "Rohan", score: 760, solved: 41, streak: 5 },
    { name: "Pooja", score: 730, solved: 39, streak: 4 },
    { name: "Vikas", score: 710, solved: 37, streak: 3 },
  ];

  const players = [...playersData].sort((a, b) => b.score - a.score);

  const [page, setPage] = useState(1);
  const perPage = 5;

  const start = (page - 1) * perPage;
  const end = start + perPage;

  const paginatedPlayers = players.slice(start, end);
  const totalPages = Math.ceil(players.length / perPage);

  const top3 = players.slice(0, 3);

  return (
    <div className="space-y-6 sm:space-y-10 px-4 sm:px-0">

      {/* ---------- PODIUM ---------- */}
      <div className="flex flex-col sm:flex-row justify-center items-center sm:items-end gap-4 sm:gap-6">

        {/* 2nd */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 text-center w-full sm:w-48">
          <FaMedal className="text-gray-400 text-xl mx-auto mb-2"/>

          <FaUserCircle className="text-4xl text-gray-400 mx-auto mb-2"/>

          <h3 className="font-medium text-sm sm:text-base">
            {top3[1]?.name}
          </h3>

          <p className="text-primary font-semibold">
            {top3[1]?.score}
          </p>

          <div className="flex justify-center items-center gap-1 text-accent mt-1 text-sm">
            <FaFire/>
            {top3[1]?.streak}
          </div>
        </div>

        {/* 1st */}
        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-8 text-center w-full sm:w-52 border-2 border-primary">
          <FaCrown className="text-yellow-500 mx-auto mb-2"/>

          <FaUserCircle className="text-5xl text-primary mx-auto mb-2"/>

          <h3 className="font-semibold">
            {top3[0]?.name}
          </h3>

          <p className="text-primary text-lg font-bold">
            {top3[0]?.score}
          </p>

          <div className="flex justify-center items-center gap-1 text-accent mt-2">
            <FaFire/>
            {top3[0]?.streak}
          </div>
        </div>

        {/* 3rd */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 text-center w-full sm:w-48">
          <FaTrophy className="text-orange-500 text-xl mx-auto mb-2"/>

          <FaUserCircle className="text-4xl text-orange-500 mx-auto mb-2"/>

          <h3 className="font-medium text-sm sm:text-base">
            {top3[2]?.name}
          </h3>

          <p className="text-primary font-semibold">
            {top3[2]?.score}
          </p>

          <div className="flex justify-center items-center gap-1 text-accent mt-1 text-sm">
            <FaFire/>
            {top3[2]?.streak}
          </div>
        </div>

      </div>

      {/* ---------- TABLE ---------- */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full min-w-[600px] text-left">

          <thead className="bg-gray-50 border-b text-xs sm:text-sm text-gray-600">
            <tr>
              <th className="px-4 sm:px-6 py-3">Rank</th>
              <th className="px-4 sm:px-6 py-3">Player</th>
              <th className="px-4 sm:px-6 py-3">Score</th>
              <th className="px-4 sm:px-6 py-3">Solved</th>
              <th className="px-4 sm:px-6 py-3">Streak</th>
            </tr>
          </thead>

          <tbody>

            {paginatedPlayers.map((player, index) => {

              const rank = start + index + 1;

              return (
                <tr
                  key={rank}
                  className={`border-b hover:bg-gray-50
                  ${player.name === currentUser ? "bg-blue-50 font-semibold" : ""}`}
                >

                  <td className="px-4 sm:px-6 py-3">

                    {rank === 1 ? (
                      <FaMedal className="text-yellow-500"/>
                    ) : rank === 2 ? (
                      <FaAward className="text-gray-400"/>
                    ) : rank === 3 ? (
                      <FaTrophy className="text-orange-500"/>
                    ) : (
                      rank
                    )}

                  </td>

                  <td className="px-4 sm:px-6 py-3 flex items-center gap-2">
                    <FaUserCircle className="text-gray-400"/>
                    {player.name}
                  </td>

                  <td className="px-4 sm:px-6 py-3 text-primary font-semibold">
                    {player.score}
                  </td>

                  <td className="px-4 sm:px-6 py-3">
                    {player.solved}
                  </td>

                  <td className="px-4 sm:px-6 py-3 flex items-center gap-1 text-accent">
                    <FaFire/>
                    {player.streak}
                  </td>

                </tr>
              );

            })}

          </tbody>

        </table>

      </div>

      {/* ---------- PAGINATION ---------- */}
      <div className="flex justify-center items-center gap-3 mt-4">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-2 text-sm bg-gray-100 rounded-lg disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-xs sm:text-sm text-gray-500">
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-2 text-sm bg-gray-100 rounded-lg disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>
  );
}