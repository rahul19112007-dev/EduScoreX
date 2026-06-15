import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

import {
  FaUserCheck,
  FaUserTimes,
  FaCalendarAlt,
  FaUsers,
} from "react-icons/fa";

function Attendance() {
  const [students, setStudents] =
    useState([]);

  const [date, setDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0]
    );

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const { data } =
        await API.get("/students");

      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };

  const markAttendance = async (
    id,
    status
  ) => {
    try {
      await API.post(
        `/students/attendance/${id}`,
        {
          date,
          status,
        }
      );

      alert(
        `${status} marked successfully`
      );

      fetchStudents();
    } catch (error) {
      console.log(error);
      alert(
        "Failed to save attendance"
      );
    }
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
          className="mb-10"
        >
          <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Attendance Control Center
          </h1>

          <p className="text-slate-400 mt-3">
            Smart Attendance Tracking
            System
          </p>
        </motion.div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

          <Tilt>
            <motion.div
              whileHover={{
                y: -10,
              }}
              className="bg-slate-900 border border-cyan-500/20 rounded-3xl p-6 shadow-2xl"
            >
              <FaUsers
                size={35}
                className="text-cyan-400 mb-4"
              />

              <h3 className="text-slate-400">
                Total Students
              </h3>

              <p className="text-4xl font-bold text-cyan-400 mt-3">
                {students.length}
              </p>
            </motion.div>
          </Tilt>

          <Tilt>
            <motion.div
              whileHover={{
                y: -10,
              }}
              className="bg-slate-900 border border-purple-500/20 rounded-3xl p-6 shadow-2xl"
            >
              <FaCalendarAlt
                size={35}
                className="text-purple-400 mb-4"
              />

              <h3 className="text-slate-400">
                Attendance Date
              </h3>

              <p className="text-lg mt-3">
                {date}
              </p>
            </motion.div>
          </Tilt>

          <Tilt>
            <motion.div
              whileHover={{
                y: -10,
              }}
              className="bg-slate-900 border border-green-500/20 rounded-3xl p-6 shadow-2xl"
            >
              <FaUserCheck
                size={35}
                className="text-green-400 mb-4"
              />

              <h3 className="text-slate-400">
                Present
              </h3>

              <p className="text-4xl font-bold text-green-400 mt-3">
                --
              </p>
            </motion.div>
          </Tilt>

          <Tilt>
            <motion.div
              whileHover={{
                y: -10,
              }}
              className="bg-slate-900 border border-red-500/20 rounded-3xl p-6 shadow-2xl"
            >
              <FaUserTimes
                size={35}
                className="text-red-400 mb-4"
              />

              <h3 className="text-slate-400">
                Absent
              </h3>

              <p className="text-4xl font-bold text-red-400 mt-3">
                --
              </p>
            </motion.div>
          </Tilt>

        </div>

        {/* DATE PICKER */}

        <div className="mb-8">
          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(
                e.target.value
              )
            }
            className="bg-slate-900 border border-cyan-500/20 rounded-2xl px-5 py-3 outline-none"
          />
        </div>

        {/* STUDENT CARDS */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {students.map(
            (
              student,
              index
            ) => (
              <Tilt
                key={student._id}
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1200}
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 50,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      index *
                      0.05,
                  }}
                  whileHover={{
                    scale: 1.03,
                  }}
                  className="bg-slate-900/80 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6 shadow-2xl"
                >

                  {/* PROFILE */}

                  <div className="flex items-center gap-4 mb-6">

                    <div className="h-14 w-14 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-xl font-bold">
                      {student.name
                        ?.charAt(
                          0
                        )
                        ?.toUpperCase()}
                    </div>

                    <div>

                      <h3 className="text-xl font-bold">
                        {
                          student.name
                        }
                      </h3>

                      <p className="text-slate-400">
                        Roll No :
                        {" "}
                        {
                          student.rollNo
                        }
                      </p>

                      <p className="text-slate-500">
                        Class :
                        {" "}
                        {
                          student.class
                        }
                      </p>

                    </div>

                  </div>

                  {/* BUTTONS */}

                  <div className="flex gap-3">

                    <button
                      onClick={() =>
                        markAttendance(
                          student._id,
                          "Present"
                        )
                      }
                      className="
                      flex-1
                      bg-green-500/20
                      border
                      border-green-500
                      text-green-400
                      py-3
                      rounded-2xl
                      hover:bg-green-500
                      hover:text-white
                      transition-all
                      "
                    >
                      Present
                    </button>

                    <button
                      onClick={() =>
                        markAttendance(
                          student._id,
                          "Absent"
                        )
                      }
                      className="
                      flex-1
                      bg-red-500/20
                      border
                      border-red-500
                      text-red-400
                      py-3
                      rounded-2xl
                      hover:bg-red-500
                      hover:text-white
                      transition-all
                      "
                    >
                      Absent
                    </button>

                  </div>

                </motion.div>
              </Tilt>
            )
          )}

        </div>

      </div>
    </div>
  );
}

export default Attendance;
