import { useState } from "react";
import { FaFire } from "react-icons/fa";

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


// 🏆 Global Ranking Logic
const players = [...playersData].sort((a, b) => b.score - a.score);

// Pagination
const [page, setPage] = useState(1);
const perPage = 5;

const start = (page - 1) * perPage;
const end = start + perPage;

const paginatedPlayers = players.slice(start, end);
const totalPages = Math.ceil(players.length / perPage);

// Top 3 players
const top3 = players.slice(0, 3);

return (

<div>

<h1 className="text-2xl font-semibold mb-8">
Leaderboard
</h1>

{/* 🥇 Top 3 Cards */}

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

{top3.map((player, index) => (

<div
key={index}
className={`p-6 rounded-xl shadow text-center bg-white hover:shadow-lg transition
${player.name === currentUser ? "border-2 border-primary" : ""}
`}
>

<div className="text-3xl mb-2">
{index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
</div>

<h3 className="text-lg font-semibold">
{player.name}
</h3>

<p className="text-primary font-bold text-xl mt-2">
{player.score}
</p>

<p className="text-sm text-gray-500 mt-1">
{player.solved} puzzles solved
</p>

<div className="flex justify-center items-center gap-1 mt-2 text-accent">
<FaFire />
{player.streak} day streak
</div>

</div>

))}

</div>

{/* 📊 Leaderboard Table */}

<div className="bg-white rounded-xl shadow overflow-hidden">

<table className="w-full text-left">

<thead className="bg-gray-50 border-b text-sm text-gray-600">

<tr>

<th className="px-6 py-3">Rank</th>
<th className="px-6 py-3">Player</th>
<th className="px-6 py-3">Score</th>
<th className="px-6 py-3">Solved</th>
<th className="px-6 py-3">Streak</th>

</tr>

</thead>

<tbody>

{paginatedPlayers.map((player, index) => {

const rank = start + index + 1;

return (

<tr
key={rank}
className={`border-b hover:bg-gray-50 transition
${player.name === currentUser ? "bg-blue-50 font-semibold" : ""}
`}
>

<td className="px-6 py-4">

{rank === 1 ? "🥇" :
 rank === 2 ? "🥈" :
 rank === 3 ? "🥉" :
 rank}

</td>

<td className="px-6 py-4">
{player.name}
</td>

<td className="px-6 py-4 text-primary font-semibold">
{player.score}
</td>

<td className="px-6 py-4">
{player.solved}
</td>

<td className="px-6 py-4 flex items-center gap-1 text-accent">

<FaFire />
{player.streak}

</td>

</tr>

);

})}

</tbody>

</table>

</div>

{/* 📊 Pagination */}

<div className="flex justify-center items-center gap-4 mt-6">

<button
disabled={page === 1}
onClick={() => setPage(page - 1)}
className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
>
Previous
</button>

<span className="text-sm text-gray-500">
Page {page} of {totalPages}
</span>

<button
disabled={page === totalPages}
onClick={() => setPage(page + 1)}
className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
>
Next
</button>

</div>

</div>

);
}