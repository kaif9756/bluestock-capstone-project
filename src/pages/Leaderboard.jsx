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

// pagination
const [page, setPage] = useState(1);
const perPage = 5;

const start = (page - 1) * perPage;
const end = start + perPage;

const paginatedPlayers = players.slice(start, end);
const totalPages = Math.ceil(players.length / perPage);

// top 3
const top3 = players.slice(0, 3);

return (

<div>

{/* ---------------- TOP PODIUM ---------------- */}

<div className="flex flex-col md:flex-row justify-center items-end gap-6 mb-12">

{/* 2nd */}

<div className="bg-white rounded-xl shadow p-6 text-center w-52 hover:shadow-lg transition">

<FaMedal className="text-gray-400 text-2xl mx-auto mb-2"/>

<div className="text-5xl text-gray-400 mb-2">
<FaUserCircle className="mx-auto"/>
</div>

<h3 className="font-semibold">
{top3[1]?.name}
</h3>

<p className="text-primary font-bold">
{top3[1]?.score}
</p>

<div className="flex justify-center items-center gap-1 text-accent mt-2">
<FaFire/>
{top3[1]?.streak}
</div>

</div>

{/* 1st */}

<div className="bg-white rounded-xl shadow-lg p-8 text-center w-56 border-2 border-primary scale-105">

<div className="flex justify-center mb-2 text-yellow-500 text-xl">
<FaCrown/>
</div>

<div className="text-6xl text-primary mb-2">
<FaUserCircle className="mx-auto"/>
</div>

<h3 className="text-lg font-semibold">
{top3[0]?.name}
</h3>

<p className="text-primary text-xl font-bold">
{top3[0]?.score}
</p>

<div className="flex justify-center items-center gap-1 text-accent mt-2">
<FaFire/>
{top3[0]?.streak}
</div>

</div>

{/* 3rd */}

<div className="bg-white rounded-xl shadow p-6 text-center w-52 hover:shadow-lg transition">

<FaTrophy className="text-orange-500 text-2xl mx-auto mb-2"/>

<div className="text-5xl text-orange-500 mb-2">
<FaUserCircle className="mx-auto"/>
</div>

<h3 className="font-semibold">
{top3[2]?.name}
</h3>

<p className="text-primary font-bold">
{top3[2]?.score}
</p>

<div className="flex justify-center items-center gap-1 text-accent mt-2">
<FaFire/>
{top3[2]?.streak}
</div>

</div>

</div>


{/* ---------------- TABLE ---------------- */}

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

<td className="px-6 py-4 flex items-center gap-2">

<FaUserCircle className="text-gray-400"/>

{player.name}

</td>

<td className="px-6 py-4 text-primary font-semibold">
{player.score}
</td>

<td className="px-6 py-4">
{player.solved}
</td>

<td className="px-6 py-4 flex items-center gap-1 text-accent">
<FaFire/>
{player.streak}
</td>

</tr>

);

})}

</tbody>

</table>

</div>


{/* ---------------- PAGINATION ---------------- */}

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