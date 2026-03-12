import { motion, AnimatePresence } from "framer-motion";
import {
User,
Mail,
Shield,
MapPin,
Calendar,
Edit2,
Camera,
Zap,
Award,
X
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
LineChart,
Line,
ResponsiveContainer,
Tooltip
} from "recharts";

/* -------------------------
Achievements
-------------------------- */

const achievements = [
{ name: "Early Bird", date: "Mar 10, 2026", icon: "🌅", color: "bg-amber-50 text-amber-600" },
{ name: "Streak Master", date: "Mar 05, 2026", icon: "🔥", color: "bg-rose-50 text-rose-600" },
{ name: "Logic Ninja", date: "Feb 28, 2026", icon: "🥷", color: "bg-slate-50 text-slate-600" },
{ name: "Speedster", date: "Feb 15, 2026", icon: "⚡", color: "bg-indigo-50 text-indigo-600" },
];

/* -------------------------
Streak Graph Data
-------------------------- */

const graphData = [
{ day: "Mon", value: 1 },
{ day: "Tue", value: 2 },
{ day: "Wed", value: 3 },
{ day: "Thu", value: 2 },
{ day: "Fri", value: 4 },
{ day: "Sat", value: 5 },
{ day: "Sun", value: 6 }
];

export default function Profile() {

const user = JSON.parse(localStorage.getItem("user"));
const guest = localStorage.getItem("guest");

const [editOpen,setEditOpen] = useState(false);
const [name,setName] = useState(user?.name || "");
const [showAchievement,setShowAchievement] = useState(false);

/* -------------------------
Guest / Login Check
-------------------------- */

if (!user && !guest) {

return (

<div className="p-10 text-center">

<h2 className="text-2xl font-bold mb-4">
Sign in to view your profile
</h2>

<div className="flex justify-center gap-4">

<Link to="/login">
<button className="bg-primary text-white px-6 py-2 rounded-lg">
Login
</button>
</Link>

<Link to="/signup">
<button className="border border-primary text-primary px-6 py-2 rounded-lg">
Sign Up
</button>
</Link>

<button
onClick={()=>{
localStorage.setItem("guest","true");
window.location.reload();
}}
className="text-gray-600"
>
Continue as Guest
</button>

</div>

</div>

);

}

/* -------------------------
Save Username
-------------------------- */

const saveName = () => {

localStorage.setItem("user",JSON.stringify({name}));

setEditOpen(false);

window.location.reload();

};

/* -------------------------
Main UI
-------------------------- */

return (

<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
className="p-8 space-y-8"
>

<div className="flex flex-col lg:flex-row gap-8">

{/* PROFILE COLUMN */}

<div className="lg:w-1/3 space-y-6">

{/* Profile Card */}

<div className="bg-white rounded-3xl border shadow-sm overflow-hidden">

<div className="h-32 bg-gradient-to-r from-primary to-indigo-500"></div>

<div className="px-6 pb-6">

<div className="relative -mt-16 mb-4">

<div className="w-32 h-32 rounded-3xl border-4 border-white bg-slate-100 overflow-hidden shadow-lg">

<img
src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
alt="avatar"
className="w-full h-full"
/>

</div>

<button className="absolute bottom-0 right-0 p-2 bg-white rounded-xl border shadow-sm">
<Camera size={16}/>
</button>

</div>

<h2 className="text-2xl font-bold text-slate-900">
{user?.name || "Guest Player"}
</h2>

<p className="text-slate-500">
Logic Puzzle Player
</p>

<div className="mt-6 space-y-3 text-sm text-gray-600">

<div className="flex items-center gap-3">
<MapPin size={16}/>
India
</div>

<div className="flex items-center gap-3">
<Calendar size={16}/>
Joined 2026
</div>

</div>

<button
onClick={()=>setEditOpen(true)}
className="w-full mt-6 bg-slate-900 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2"
>
<Edit2 size={18}/>
Edit Profile
</button>

</div>

</div>

{/* Stats */}

<div className="bg-white rounded-3xl border p-6 shadow-sm">

<h3 className="font-bold mb-4">
Performance Stats
</h3>

<div className="grid grid-cols-2 gap-4">

<div className="p-4 rounded-xl bg-gray-50">
<p className="text-xs text-gray-400">Rank</p>
<p className="text-xl font-bold">#1242</p>
</div>

<div className="p-4 rounded-xl bg-gray-50">
<p className="text-xs text-gray-400">Points</p>
<p className="text-xl font-bold">12,450</p>
</div>

</div>

<div className="mt-6">

<div className="flex justify-between text-sm mb-2">
<span>Level Progress</span>
<span>75%</span>
</div>

<div className="h-2 bg-gray-100 rounded-full overflow-hidden">

<div className="h-full bg-primary w-3/4 rounded-full"></div>

</div>

</div>

</div>

{/* STREAK GRAPH */}

<div className="bg-white rounded-3xl border p-6 shadow-sm">

<h3 className="font-bold mb-4">
Puzzle Streak
</h3>

<div className="h-40">

<ResponsiveContainer width="100%" height="100%">

<LineChart data={graphData}>

<Tooltip />

<Line
type="monotone"
dataKey="value"
stroke="#414BEA"
strokeWidth={3}
dot={{r:4}}
/>

</LineChart>

</ResponsiveContainer>

</div>

</div>

</div>

{/* RIGHT CONTENT */}

<div className="lg:w-2/3 space-y-8">

{/* Achievements */}

<div className="bg-white rounded-3xl border p-8 shadow-sm">

<div className="flex justify-between mb-6">

<h3 className="text-xl font-bold">
Recent Achievements
</h3>

<button
onClick={()=>setShowAchievement(true)}
className="text-primary text-sm"
>
Show Popup
</button>

</div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

{achievements.map((ach,i)=>(

<div
key={i}
className="flex items-center gap-4 p-4 rounded-xl bg-gray-50"
>

<div className={`w-12 h-12 flex items-center justify-center rounded-xl ${ach.color}`}>
{ach.icon}
</div>

<div>

<p className="font-bold">
{ach.name}
</p>

<p className="text-xs text-gray-500">
Unlocked on {ach.date}
</p>

</div>

</div>

))}

</div>

</div>

{/* Account Info */}

<div className="bg-white rounded-3xl border p-8 shadow-sm">

<h3 className="text-xl font-bold mb-6">
Account Information
</h3>

<div className="space-y-6">

<div className="flex justify-between">

<div className="flex gap-4">

<Mail size={20}/>

<div>
<p className="font-semibold">Email</p>
<p className="text-sm text-gray-500">
user@example.com
</p>
</div>

</div>

<button className="text-primary">
Change
</button>

</div>

<div className="flex justify-between">

<div className="flex gap-4">

<Shield size={20}/>

<div>
<p className="font-semibold">Password</p>
<p className="text-sm text-gray-500">
••••••••
</p>
</div>

</div>

<button className="text-primary">
Update
</button>

</div>

<div className="flex justify-between">

<div className="flex gap-4">

<Zap size={20}/>

<div>
<p className="font-semibold">
Subscription
</p>
<p className="text-sm text-gray-500">
Free Plan
</p>
</div>

</div>

<button className="text-primary">
Upgrade
</button>

</div>

</div>

</div>

</div>

</div>

{/* -------------------------
Edit Modal
-------------------------- */}

<AnimatePresence>

{editOpen && (

<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
exit={{opacity:0}}
className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
>

<motion.div
initial={{scale:0.9}}
animate={{scale:1}}
exit={{scale:0.9}}
className="bg-white p-6 rounded-2xl w-80 shadow-xl"
>

<div className="flex justify-between mb-4">

<h3 className="font-bold">
Edit Username
</h3>

<button onClick={()=>setEditOpen(false)}>
<X size={18}/>
</button>

</div>

<input
value={name}
onChange={(e)=>setName(e.target.value)}
className="border p-2 w-full rounded-lg mb-4"
/>

<button
onClick={saveName}
className="bg-primary text-white px-4 py-2 rounded-lg w-full"
>
Save
</button>

</motion.div>

</motion.div>

)}

</AnimatePresence>

{/* -------------------------
Achievement Popup
-------------------------- */}

<AnimatePresence>

{showAchievement && (

<motion.div
initial={{y:40,opacity:0}}
animate={{y:0,opacity:1}}
exit={{opacity:0}}
className="fixed bottom-8 right-8 bg-white p-4 border rounded-xl shadow-lg flex gap-3"
>

<div className="bg-yellow-50 text-yellow-500 p-2 rounded-lg">
<Award size={20}/>
</div>

<div>

<p className="font-semibold">
Achievement Unlocked
</p>

<p className="text-sm text-gray-500">
Streak Master
</p>

</div>

</motion.div>

)}

</AnimatePresence>

</motion.div>

);
}