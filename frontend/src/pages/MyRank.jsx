import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

import { motion } from "framer-motion";

import {
  FaTrophy,
  FaUsers,
  FaChartLine,
  FaRocket,
  FaMedal,
  FaFire,
  FaStar,
} from "react-icons/fa";

function MyRank() {
  const [student, setStudent] = useState(null);
  const [rank, setRank] = useState(null);
  const [totalStudents, setTotalStudents] = useState(0);

  const user =
    typeof window !== "undefined"
      ? JSON.parse(
          localStorage.getItem("user") || "null"
        )
      : null;

  useEffect(() => {
    fetchRank();
  }, []);

  const fetchRank = async () => {
    try {
      const { data } = await API.get("/students");

      const sortedStudents = [...data].sort(
        (a, b) =>
          (b.percentage || 0) -
          (a.percentage || 0)
      );

      const currentStudent =
        sortedStudents.find(
          (s) => s._id === user?.studentId
        );

      const currentRank =
        sortedStudents.findIndex(
          (s) => s._id === user?.studentId
        ) + 1;

      setStudent(currentStudent);
      setRank(currentRank);
      setTotalStudents(sortedStudents.length);
    } catch (error) {
      console.log(error);
    }
  };

  const percentile =
    rank && totalStudents
      ? (
          ((totalStudents - rank + 1) /
            totalStudents) *
          100
        ).toFixed(1)
      : 0;

  const getLevel = () => {
    if (rank <= 3) return "Elite Performer";
    if (rank <= 10) return "Top Performer";
    return "Rising Talent";
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white p-8">

        {/* HEADER */}
        <motion.div
          initial={{
            opacity: 0,
            y: -30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mb-10"
        >
          <h1 className="text-6xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            🏆 My Ranking Analytics
          </h1>

          <p className="text-slate-400 mt-3 text-lg">
            Startup-Level Performance Dashboard
          </p>
        </motion.div>

        {/* HERO CARD */}
        <motion.div
          whileHover={{
            scale: 1.02,
          }}
          className="relative overflow-hidden rounded-3xl p-10 mb-10 bg-slate-900/80 border border-yellow-500/20 backdrop-blur-xl shadow-2xl text-center"
        >
          <div className="absolute w-80 h-80 bg-yellow-500/10 blur-3xl rounded-full -top-20 left-1/2 -translate-x-1/2" />

          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
          >
            <FaTrophy
              size={90}
              className="mx-auto text-yellow-400 mb-5"
            />
          </motion.div>

          <motion.h2
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 120,
            }}
            className="text-7xl font-black text-yellow-400"
          >
            #{rank || "--"}
          </motion.h2>

          <p className="text-2xl mt-4 font-bold">
            {getLevel()}
          </p>

          <p className="text-slate-400 mt-2">
            Ranked among top students
          </p>
        </motion.div>

        {/* ANALYTICS */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <motion.div
            whileHover={{
              scale: 1.05,
              rotateX: 8,
              rotateY: 8,
            }}
            className="bg-slate-900/80 border border-cyan-500/20 rounded-3xl p-6 backdrop-blur-xl shadow-xl"
          >
            <FaTrophy
              size={35}
              className="text-cyan-400 mb-3"
            />

            <h3 className="text-slate-400">
              Current Rank
            </h3>

            <p className="text-4xl font-bold mt-3">
              {rank || 0}
            </p>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.05,
              rotateX: 8,
              rotateY: 8,
            }}
            className="bg-slate-900/80 border border-green-500/20 rounded-3xl p-6 backdrop-blur-xl shadow-xl"
          >
            <FaChartLine
              size={35}
              className="text-green-400 mb-3"
            />

            <h3 className="text-slate-400">
              Percentage
            </h3>

            <p className="text-4xl font-bold mt-3">
              {student?.percentage?.toFixed(2) ||
                "0.00"}
              %
            </p>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.05,
              rotateX: 8,
              rotateY: 8,
            }}
            className="bg-slate-900/80 border border-purple-500/20 rounded-3xl p-6 backdrop-blur-xl shadow-xl"
          >
            <FaUsers
              size={35}
              className="text-purple-400 mb-3"
            />

            <h3 className="text-slate-400">
              Students
            </h3>

            <p className="text-4xl font-bold mt-3">
              {totalStudents}
            </p>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.05,
              rotateX: 8,
              rotateY: 8,
            }}
            className="bg-slate-900/80 border border-orange-500/20 rounded-3xl p-6 backdrop-blur-xl shadow-xl"
          >
            <FaRocket
              size={35}
              className="text-orange-400 mb-3"
            />

            <h3 className="text-slate-400">
              Level
            </h3>

            <p className="text-xl font-bold mt-4">
              {getLevel()}
            </p>
          </motion.div>

        </div>

        {/* PERCENTILE */}
        <div className="bg-slate-900/80 border border-yellow-500/20 rounded-3xl p-8 backdrop-blur-xl mb-10">

          <h2 className="text-2xl font-bold mb-4">
            Percentile Ranking
          </h2>

          <p className="text-5xl font-black text-yellow-400 mb-4">
            Top {percentile}%
          </p>

          <div className="h-5 bg-slate-800 rounded-full overflow-hidden">

            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${percentile}%`,
              }}
              transition={{
                duration: 1.5,
              }}
              className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"
            />

          </div>

        </div>

        {/* ACHIEVEMENTS */}
        <div className="grid md:grid-cols-4 gap-6">

          {[
            {
              icon: <FaMedal size={40} />,
              title: "Elite Rank",
              color: "yellow",
            },
            {
              icon: <FaFire size={40} />,
              title: "Consistent Performer",
              color: "red",
            },
            {
              icon: <FaStar size={40} />,
              title: "Academic Excellence",
              color: "cyan",
            },
            {
              icon: <FaRocket size={40} />,
              title: "Rising Talent",
              color: "purple",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.08,
                rotate: 2,
              }}
              className="bg-slate-900 border border-white/10 rounded-3xl p-6 text-center"
            >
              <div className="flex justify-center mb-3">
                {item.icon}
              </div>

              <h3>{item.title}</h3>
            </motion.div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default MyRank;