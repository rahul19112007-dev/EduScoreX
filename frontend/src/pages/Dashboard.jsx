import CountUp from "react-countup";
import DashboardChart from "../components/DashboardChart";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaChalkboardTeacher,
  FaSchool,
  FaTrophy,
  FaBook,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      let url = "";

      if (user.role === "admin") {
        url = "/dashboard/admin";
      }

      if (user.role === "teacher") {
        url = "/dashboard/teacher";
      }

      if (user.role === "student") {
        url = "/dashboard/student";
      }

      const response = await API.get(url);

      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-2xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="flex bg-slate-950 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8 text-white overflow-auto">
        <Navbar />

        {/* Hero Section */}

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="rounded-3xl p-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-cyan-500/20 shadow-2xl">
            <h1 className="text-5xl font-black">
              EduScoreX Analytics
            </h1>

            <p className="mt-3 text-slate-200 text-lg">
              AI Powered Academic Intelligence Platform
            </p>

            <p className="mt-4 text-slate-300">
              Welcome back, {user.name}
            </p>
          </div>
        </motion.div>

        {/* ADMIN DASHBOARD */}

        {user.role === "admin" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-slate-900/80 backdrop-blur-xl border border-cyan-500/20 hover:border-cyan-400 rounded-3xl p-6 shadow-2xl"
              >
                <div className="flex justify-between items-center">

                  <div>
                    <p className="text-slate-400">
                      Total Students
                    </p>

                    <h2 className="text-5xl font-bold mt-3">
                      {data.totalStudents}
                    </h2>
                  </div>

                  <FaUsers
                    size={50}
                    className="text-cyan-400"
                  />
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl"
              >
                <div className="flex justify-between items-center">

                  <div>
                    <p className="text-slate-400">
                      Total Teachers
                    </p>

                    <h2 className="text-5xl font-bold mt-3">
                      {data.totalTeachers}
                    </h2>
                  </div>

                  <FaChalkboardTeacher
                    size={50}
                    className="text-green-400"
                  />
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl"
              >
                <div className="flex justify-between items-center">

                  <div>
                    <p className="text-slate-400">
                      Total Classes
                    </p>

                    <h2 className="text-5xl font-bold mt-3">
                      {data.totalClasses}
                    </h2>
                  </div>

                  <FaSchool
                    size={50}
                    className="text-purple-400"
                  />
                </div>
              </motion.div>

            </div>
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

  <div className="bg-slate-900 rounded-3xl p-6 border border-cyan-500/20 h-32 flex flex-col justify-center">
    <h3 className="text-slate-400">
      System Status
    </h3>

    <p className="text-green-400 font-bold text-xl">
      ONLINE
    </p>
  </div>

  <div className="bg-slate-900 rounded-3xl p-6 border border-cyan-500/20 h-32 flex flex-col justify-center">
    <h3 className="text-slate-400">
      Version
    </h3>

    <p className="font-bold text-xl">
      v1.0
    </p>
  </div>

  <div className="bg-slate-900 rounded-3xl p-6 border border-cyan-500/20 h-32 flex flex-col justify-center">
    <h3 className="text-slate-400">
      Users
    </h3>

    <p className="font-bold text-xl">
      {data.totalStudents}
    </p>
  </div>

  <div className="bg-slate-900 rounded-3xl p-6 border border-cyan-500/20 h-32 flex flex-col justify-center">
    <h3 className="text-slate-400">
      Performance
    </h3>

    <p className="font-bold text-cyan-400 text-xl">
      Excellent
    </p>
  </div>

</div>
            {/* TOP PERFORMER */}

            <div className="mt-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-yellow-500/20 rounded-3xl p-8 shadow-2xl">

              <div className="flex items-center gap-4">

                <FaTrophy
                  className="text-yellow-400"
                  size={45}
                />

                <div>
                  <h2 className="text-2xl font-bold">
                    Top Performer
                  </h2>

                  <p className="text-slate-400">
                    Highest scoring student
                  </p>
                </div>

              </div>

              <div className="mt-6">

                <h3 className="text-3xl font-bold text-yellow-400">
                  {data.topPerformer?.name}
                </h3>

                <p className="text-slate-300 mt-2">
                  Percentage :
                  {" "}
                  {data.topPerformer?.percentage?.toFixed(
                    2
                  )}
                  %
                </p>

              </div>

            </div>

            {/* CHART */}

            <div className="mt-8">
              <DashboardChart
                students={data.students}
              />
            </div>
          </>
        )}

        {/* TEACHER DASHBOARD */}

        {user.role === "teacher" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center">

                <div>
                  <p className="text-slate-400">
                    Total Students
                  </p>

                  <h2 className="text-5xl font-bold mt-3">
                    {data.totalStudents}
                  </h2>
                </div>

                <FaUsers
                  size={50}
                  className="text-cyan-400"
                />
              </div>
            </motion.div>

          </div>
        )}

        {/* STUDENT DASHBOARD */}

        {user.role === "student" && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6"
            >
              <h3 className="text-slate-400">
                Class
              </h3>

              <p className="text-3xl font-bold mt-3">
                {data.class}
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6"
            >
              <h3 className="text-slate-400">
                Percentage
              </h3>

              <p className="text-3xl font-bold mt-3 text-cyan-400">
                {data.percentage?.toFixed(2)}%
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6"
            >
              <h3 className="text-slate-400">
                Total Marks
              </h3>

              <p className="text-3xl font-bold mt-3">
                {data.totalMarks}
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6"
            >
              <h3 className="text-slate-400">
                Subjects
              </h3>

              <p className="text-3xl font-bold mt-3">
                {data.subjects?.length}
              </p>
            </motion.div>

          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;