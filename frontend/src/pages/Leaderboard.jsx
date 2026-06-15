import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import {
  FaTrophy,
  FaMedal,
  FaCrown,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

function Leaderboard() {
  const [students, setStudents] = useState([]);
const user = JSON.parse(
  localStorage.getItem("user")
);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const { data } = await API.get("/students");
      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };

  const rankedStudents = [...students].sort(
    (a, b) => (b.percentage || 0) - (a.percentage || 0)
  );

  return (
    <div className="flex-1 p-8 bg-slate-950 min-h-screen text-white">

<motion.div
initial={{ opacity: 0, y: -30 }}
animate={{ opacity: 1, y: 0 }}
className="mb-10"
>

<h1 className="text-5xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
Leaderboard
</h1>

<p className="text-slate-400 mt-2">
Top Academic Champions
</p>

</motion.div>

{/* TOP 3 PODIUM */}

<div className="grid md:grid-cols-3 gap-6 mb-12">

{rankedStudents.slice(0, 3).map((student, index) => (

<Tilt
key={student._id}
tiltMaxAngleX={12}
tiltMaxAngleY={12}
perspective={1200}
scale={1.05}
>

<motion.div
whileHover={{ y: -10 }}
className={`rounded-3xl p-6 shadow-2xl border

${index === 0
? "bg-gradient-to-br from-yellow-500/20 to-yellow-800/20 border-yellow-500"
: index === 1
? "bg-gradient-to-br from-slate-300/10 to-slate-500/10 border-slate-400"
: "bg-gradient-to-br from-orange-600/10 to-orange-900/20 border-orange-500"
}
`}
>

<div className="flex justify-center mb-4">

{index === 0 && (
<FaCrown
size={50}
className="text-yellow-400"
/>
)}

{index === 1 && (
<FaMedal
size={50}
className="text-slate-300"
/>
)}

{index === 2 && (
<FaTrophy
size={50}
className="text-orange-400"
/>
)}

</div>

<h2 className="text-2xl font-bold text-center">
{student.name}
</h2>

<p className="text-center text-slate-400">
Class {student.class}
</p>

<p className="text-center text-4xl font-black mt-4">
{student.percentage?.toFixed(2)}%
</p>

</motion.div>

</Tilt>

))}

</div>

{/* FULL RANKING */}

<div className="space-y-4">

{rankedStudents.map((student, index) => (

<motion.div
key={student._id}
whileHover={{
scale: 1.02,
x: 10,
}}
className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl"
>

<div className="flex items-center justify-between">

<div className="flex items-center gap-5">

<div
className={`w-14 h-14 rounded-full flex items-center justify-center font-black text-xl

${index === 0
? "bg-yellow-500 text-black"
: index === 1
? "bg-slate-400 text-black"
: index === 2
? "bg-orange-500 text-black"
: "bg-slate-700"}
`}
>
#{index + 1}
</div>

<div>

<h2 className="font-bold text-xl">

{user?.role === "student"
? student._id === user._id
? `${student.name} (You)`
: "Hidden"
: student.name}

</h2>

<p className="text-slate-400">
{user?.role === "student"
? student._id === user._id
? student.class
: "--"
: student.class}
</p>

</div>

</div>

<div className="text-right">

<p className="text-2xl font-black text-cyan-400">

{user?.role === "student"
? student._id === user._id
? `${student.percentage?.toFixed(2)}%`
: "--"
: `${student.percentage?.toFixed(2)}%`}

</p>

</div>

</div>

<div className="mt-4 bg-slate-800 h-3 rounded-full overflow-hidden">

<motion.div
initial={{ width: 0 }}
animate={{
width: `${student.percentage}%`,
}}
transition={{
duration: 1,
}}
className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
/>

</div>

</motion.div>

))}

</div>

</div>

  );
}

export default Leaderboard;