import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

import {
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarAlt,
} from "react-icons/fa";

import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

function MyAttendance() {
  const [student, setStudent] = useState(null);

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  useEffect(() => {
    if (user?.studentId) {
      fetchStudent();
    }
  }, []);

  const fetchStudent = async () => {
    try {
      const { data } = await API.get(
        `/students/report/${user.studentId}`
      );

      setStudent(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPresentCount = () => {
    if (
      !student?.attendance ||
      !Array.isArray(student.attendance)
    )
      return 0;

    return student.attendance.filter(
      (item) => item.status === "Present"
    ).length;
  };

  const getAbsentCount = () => {
    if (
      !student?.attendance ||
      !Array.isArray(student.attendance)
    )
      return 0;

    return student.attendance.filter(
      (item) => item.status === "Absent"
    ).length;
  };

  const getAttendancePercentage = () => {
    const total =
      getPresentCount() +
      getAbsentCount();

    if (total === 0) return 0;

    return Number(
      (
        (getPresentCount() / total) *
        100
      ).toFixed(2)
    );
  };

  const getPerformance = () => {
    const percentage =
      getAttendancePercentage();

    if (percentage >= 95)
      return "Excellent Performance";

    if (percentage >= 85)
      return "Very Good";

    if (percentage >= 75)
      return "Good";

    return "Needs Improvement";
  };

  if (!student) {
    return (
      <div className="flex">
        <Sidebar />

        <div className="flex-1 flex items-center justify-center min-h-screen bg-slate-950 text-white text-2xl">
          Loading Attendance...
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white p-8">

        {/* HEADER */}

        <motion.div
          initial={{
            opacity: 0,
            y: -40,
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
          <h1
            className="
            text-6xl
            font-black
            bg-gradient-to-r
            from-cyan-400
            via-blue-500
            to-purple-500
            bg-clip-text
            text-transparent
            "
          >
            My Attendance Analytics
          </h1>

          <p className="text-slate-400 mt-3">
            Track your attendance
            performance in real time
          </p>
        </motion.div>

        {/* TOP SECTION */}

        <div className="grid lg:grid-cols-4 gap-6 mb-10">

          {/* PRESENT */}

          <Tilt>
            <motion.div
              whileHover={{
                y: -10,
              }}
              className="bg-slate-900/80 backdrop-blur-xl border border-green-500/20 rounded-3xl p-6 shadow-2xl"
            >
              <FaCheckCircle
                size={35}
                className="text-green-400 mb-4"
              />

              <h3 className="text-slate-400">
                Present Days
              </h3>

              <p className="text-4xl font-bold text-green-400 mt-3">
                {getPresentCount()}
              </p>
            </motion.div>
          </Tilt>

          {/* ABSENT */}

          <Tilt>
            <motion.div
              whileHover={{
                y: -10,
              }}
              className="bg-slate-900/80 backdrop-blur-xl border border-red-500/20 rounded-3xl p-6 shadow-2xl"
            >
              <FaTimesCircle
                size={35}
                className="text-red-400 mb-4"
              />

              <h3 className="text-slate-400">
                Absent Days
              </h3>

              <p className="text-4xl font-bold text-red-400 mt-3">
                {getAbsentCount()}
              </p>
            </motion.div>
          </Tilt>

          {/* TOTAL */}

          <Tilt>
            <motion.div
              whileHover={{
                y: -10,
              }}
              className="bg-slate-900/80 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6 shadow-2xl"
            >
              <FaCalendarAlt
                size={35}
                className="text-cyan-400 mb-4"
              />

              <h3 className="text-slate-400">
                Total Days
              </h3>

              <p className="text-4xl font-bold text-cyan-400 mt-3">
                {getPresentCount() +
                  getAbsentCount()}
              </p>
            </motion.div>
          </Tilt>

          {/* INSIGHT */}

          <Tilt>
            <motion.div
              whileHover={{
                y: -10,
              }}
              className="bg-slate-900/80 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 shadow-2xl"
            >
              <h3 className="text-slate-400">
                Performance
              </h3>

              <p className="text-xl font-bold text-purple-400 mt-4">
                {getPerformance()}
              </p>
            </motion.div>
          </Tilt>

        </div>

        {/* PROGRESS + INSIGHT */}

        <div className="grid lg:grid-cols-2 gap-8 mb-10">

          {/* CIRCLE */}

          <Tilt>
            <div className="bg-slate-900/80 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 shadow-2xl">

              <h2 className="text-2xl font-bold mb-6">
                Attendance Rate
              </h2>

              <div className="w-64 h-64 mx-auto">
                <CircularProgressbar
                  value={getAttendancePercentage()}
                  text={`${getAttendancePercentage()}%`}
                  styles={buildStyles({
                    textColor:
                      "#22d3ee",
                    pathColor:
                      "#22d3ee",
                    trailColor:
                      "#1e293b",
                  })}
                />
              </div>

            </div>
          </Tilt>

          {/* INSIGHTS */}

          <Tilt>
            <div className="bg-slate-900/80 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 shadow-2xl">

              <h2 className="text-2xl font-bold mb-6">
                Attendance Insights
              </h2>

              <div className="space-y-4">

                <div className="bg-slate-800 rounded-xl p-4">
                  95%+ = Excellent
                </div>

                <div className="bg-slate-800 rounded-xl p-4">
                  85%+ = Very Good
                </div>

                <div className="bg-slate-800 rounded-xl p-4">
                  75%+ = Good
                </div>

                <div className="bg-slate-800 rounded-xl p-4">
                  Below 75% = Needs
                  Improvement
                </div>

              </div>

            </div>
          </Tilt>

        </div>

        {/* TIMELINE */}

        <div className="bg-slate-900/80 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 shadow-2xl">

          <h2 className="text-3xl font-bold mb-8">
            Attendance Timeline
          </h2>

          <div className="space-y-4">

            {student.attendance &&
            student.attendance.length >
              0 ? (
              student.attendance.map(
                (
                  item,
                  index
                ) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      x: -40,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay:
                        index *
                        0.05,
                    }}
                    className={`p-5 rounded-2xl border ${
                      item.status ===
                      "Present"
                        ? "bg-green-500/10 border-green-500/30"
                        : "bg-red-500/10 border-red-500/30"
                    }`}
                  >
                    <div className="flex justify-between">

                      <span>
                        {new Date(
                          item.date
                        ).toLocaleDateString()}
                      </span>

                      <span
                        className={
                          item.status ===
                          "Present"
                            ? "text-green-400 font-bold"
                            : "text-red-400 font-bold"
                        }
                      >
                        {
                          item.status
                        }
                      </span>

                    </div>
                  </motion.div>
                )
              )
            ) : (
              <div className="text-center text-slate-400">
                No attendance
                records found
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

export default MyAttendance;
