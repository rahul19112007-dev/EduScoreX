
import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import {
  FaUserGraduate,
  FaBook,
  FaSave,
} from "react-icons/fa";

function AddStudent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    class: "",
  });

  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const { data } = await API.get("/classes");
      setClasses(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClassChange = (e) => {
    const selectedClass = e.target.value;

    setForm({
      ...form,
      class: selectedClass,
    });

    const foundClass = classes.find(
      (cls) =>
        cls.className === selectedClass
    );

    if (foundClass) {
      setSubjects(
        foundClass.subjects.map(
          (subject) => ({
            name: subject,
            marks: "",
          })
        )
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/students", {
        ...form,
        subjects,
      });

      alert(
        "Student Added Successfully"
      );

      navigate("/students");
    } catch (error) {
      console.log(error);
      alert("Failed to add student");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

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
          Student Registration Studio
        </h1>

        <p className="text-slate-400 mt-3">
          AI Powered Academic Enrollment
          System
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* LIVE PREVIEW */}

        <Tilt
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          perspective={1200}
          scale={1.03}
        >
          <div className="bg-slate-900 border border-cyan-500/20 rounded-3xl p-8 shadow-2xl">

            <h2 className="text-2xl font-bold mb-6">
              Live Preview
            </h2>

            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-4xl font-bold mb-6">
              {form.name
                ? form.name
                    .charAt(0)
                    .toUpperCase()
                : "S"}
            </div>

            <h3 className="text-3xl font-bold">
              {form.name ||
                "Student Name"}
            </h3>

            <p className="text-slate-400 mt-2">
              Roll No :
              {" "}
              {form.rollNo || "--"}
            </p>

            <p className="text-slate-400">
              Class :
              {" "}
              {form.class || "--"}
            </p>

            <div className="mt-6">
              <p className="text-cyan-400 font-bold">
                Subjects :
                {" "}
                {subjects.length}
              </p>
            </div>

          </div>
        </Tilt>

        {/* FORM */}

        <div className="lg:col-span-2">

          <form
            onSubmit={handleSubmit}
            className="bg-slate-900 border border-cyan-500/20 rounded-3xl p-8 shadow-2xl"
          >

            {/* NAME */}

            <input
              type="text"
              placeholder="Student Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 mb-4 outline-none focus:border-cyan-400"
            />

            {/* ROLL */}

            <input
              type="text"
              placeholder="Roll Number"
              value={form.rollNo}
              onChange={(e) =>
                setForm({
                  ...form,
                  rollNo:
                    e.target.value,
                })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 mb-4 outline-none focus:border-cyan-400"
            />

            {/* CLASS */}

            <select
              value={form.class}
              onChange={
                handleClassChange
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 mb-6 outline-none focus:border-cyan-400"
            >
              <option value="">
                Select Class
              </option>

              {classes.map((cls) => (
                <option
                  key={cls._id}
                  value={
                    cls.className
                  }
                >
                  {cls.className}
                </option>
              ))}
            </select>

            {/* SUBJECTS */}

            <h2 className="text-xl font-bold mb-4">
              Subject Marks
            </h2>

            {subjects.map(
              (
                subject,
                index
              ) => (
                <div
                  key={index}
                  className="bg-slate-800 rounded-2xl p-4 mb-4"
                >
                  <div className="flex items-center gap-2 mb-3">

                    <FaBook className="text-cyan-400" />

                    <span className="font-bold">
                      {
                        subject.name
                      }
                    </span>

                  </div>

                  <input
                    type="number"
                    placeholder="Enter Marks"
                    value={
                      subject.marks
                    }
                    onChange={(
                      e
                    ) => {
                      const updated =
                        [
                          ...subjects,
                        ];

                      updated[
                        index
                      ].marks =
                        e.target
                          .value;

                      setSubjects(
                        updated
                      );
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 outline-none"
                  />
                </div>
              )
            )}

            {/* SUBJECT CHIPS */}

            <div className="flex flex-wrap gap-3 mb-6">

              {subjects.map(
                (
                  subject,
                  index
                ) => (
                  <div
                    key={index}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/20"
                  >
                    {
                      subject.name
                    }
                  </div>
                )
              )}

            </div>

            {/* BUTTON */}

            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 p-4 rounded-2xl font-bold text-lg shadow-xl"
            >
              <FaSave className="inline mr-2" />
              Save Student
            </motion.button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default AddStudent;
