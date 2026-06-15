import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import {
  FaUserGraduate,
  FaChartLine,
  FaTrophy,
} from "react-icons/fa";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

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

  const deleteStudent = async (id) => {
    try {
      await API.delete(`/students/${id}`);

      alert("Student Deleted");

      fetchStudents();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      (student.name || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (student.rollNo || "").toString().includes(search)
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-2xl font-bold mb-4">
        Students
      </h1>

      <input
        type="text"
        placeholder="Search Student..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
          padding: "10px",
          marginBottom: "20px",
          width: "300px",
        }}
      />

      <div className="grid md:grid-cols-3 gap-6">

  {filteredStudents.map((student, index) => (

    <Tilt
      key={student._id}
      tiltMaxAngleX={15}
      tiltMaxAngleY={15}
      perspective={1000}
      glareEnable={true}
      glareMaxOpacity={0.2}
      scale={1.02}
    >

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
          delay: index * 0.05,
        }}
        className="
          bg-slate-900
          border border-cyan-500/20
          rounded-3xl
          p-6
          shadow-2xl
        "
      >

        <div className="flex justify-between items-center">

          <FaUserGraduate
            size={40}
            className="text-cyan-400"
          />

          <span className="text-xs bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full">
            Student
          </span>

        </div>

        <h2 className="text-2xl font-bold mt-4">
          {student.name}
        </h2>

        <p className="text-slate-400 mt-2">
          Roll No: {student.rollNo}
        </p>

        <p className="text-slate-400">
          Class: {student.class}
        </p>

        <div className="flex gap-2 mt-6 flex-wrap">
          <Link to={`/report/${student._id}`}>
            <button className="bg-green-500 px-4 py-2 rounded-xl text-white">
              Report
            </button>
          </Link>

          {user?.role !== "student" && (
            <>
              <Link to={`/edit-student/${student._id}`}>
                <button className="bg-blue-500 px-4 py-2 rounded-xl text-white">
                  Edit
                </button>
              </Link>
              <button
                onClick={() => deleteStudent(student._id)}
                className="bg-red-500 px-4 py-2 rounded-xl text-white"
              >
                Delete
              </button>
            </>
          )}
        </div>

      </motion.div>

    </Tilt>

  ))}

</div>
    </div>
  );
}

export default Students;