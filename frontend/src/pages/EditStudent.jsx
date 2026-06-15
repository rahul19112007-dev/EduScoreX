import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import {
  FaUserGraduate,
  FaBook,
  FaSave,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

import API from "../services/api";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
  name: "",
  rollNo: "",
  class: "",
  subjects: [],
});
  
  useEffect(() => {
  fetchStudent();
}, []);

const fetchStudent = async () => {
  try {
    const { data } = await API.get("/students");

    const student = data.find((s) => s._id === id);

    if (student) {
      setForm({
  name: student.name || "",
  rollNo: student.rollNo || "",
  class: student.class || "",
  subjects: student.subjects || [],
});
    }
  } catch (error) {
    console.log(error);
  }
};

const handleSubjectChange = (
  index,
  field,
  value
) => {
  const updatedSubjects = [
    ...form.subjects,
  ];

  updatedSubjects[index][field] =
    value;

  setForm({
    ...form,
    subjects: updatedSubjects,
  });
};

const addSubject = () => {
  setForm({
    ...form,
    subjects: [
      ...form.subjects,
      {
        name: "",
        marks: "",
      },
    ],
  });
};

const removeSubject = (index) => {
  const updatedSubjects =
    form.subjects.filter(
      (_, i) => i !== index
    );

  setForm({
    ...form,
    subjects: updatedSubjects,
  });
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.put(`/students/${id}`, form);

    alert("Student Updated");
    navigate("/students");
  };

  return (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center p-8">

    <Tilt
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      glareEnable={true}
      glareMaxOpacity={0.15}
      scale={1.01}
      className="w-full max-w-5xl"
    >

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
          bg-slate-900/80
          backdrop-blur-xl
          border border-cyan-500/20
          rounded-3xl
          shadow-2xl
          overflow-hidden
        "
      >

        <div className="p-8 border-b border-slate-800">

          <div className="flex items-center gap-4">

            <div className="
              w-16 h-16
              rounded-2xl
              bg-cyan-500/20
              flex items-center justify-center
            ">
              <FaUserGraduate
                className="text-cyan-400"
                size={28}
              />
            </div>

            <div>
              <h1 className="text-4xl font-black text-white">
                Edit Student
              </h1>

              <p className="text-slate-400">
                Update student profile and subjects
              </p>
            </div>

          </div>

        </div>

        <form
          onSubmit={handleSubmit}
          className="p-8"
        >

          <div className="grid md:grid-cols-3 gap-6 mb-8">

            <input
              value={form.name}
              placeholder="Student Name"
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="
                bg-slate-800
                border border-slate-700
                rounded-xl
                p-4
                text-white
                focus:outline-none
                focus:border-cyan-400
              "
            />

            <input
              value={form.rollNo}
              placeholder="Roll Number"
              onChange={(e) =>
                setForm({
                  ...form,
                  rollNo: e.target.value,
                })
              }
              className="
                bg-slate-800
                border border-slate-700
                rounded-xl
                p-4
                text-white
                focus:outline-none
                focus:border-cyan-400
              "
            />

            <input
              value={form.class}
              placeholder="Class"
              onChange={(e) =>
                setForm({
                  ...form,
                  class: e.target.value,
                })
              }
              className="
                bg-slate-800
                border border-slate-700
                rounded-xl
                p-4
                text-white
                focus:outline-none
                focus:border-cyan-400
              "
            />

          </div>

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <FaBook className="text-cyan-400" />
              Subjects
            </h2>

            <button
              type="button"
              onClick={addSubject}
              className="
                flex items-center gap-2
                bg-cyan-500
                hover:bg-cyan-400
                text-black
                px-5 py-3
                rounded-xl
                font-bold
              "
            >
              <FaPlus />
              Add Subject
            </button>

          </div>

          <div className="space-y-4">

            {form.subjects.map(
              (subject, index) => (

                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.01,
                  }}
                  className="
                    bg-slate-800
                    border border-slate-700
                    rounded-2xl
                    p-4
                  "
                >

                  <div className="grid md:grid-cols-3 gap-4">

                    <input
                      value={subject.name}
                      placeholder="Subject Name"
                      onChange={(e) =>
                        handleSubjectChange(
                          index,
                          "name",
                          e.target.value
                        )
                      }
                      className="
                        bg-slate-900
                        border border-slate-700
                        rounded-xl
                        p-3
                        text-white
                      "
                    />

                    <input
                      value={subject.marks}
                      placeholder="Marks"
                      onChange={(e) =>
                        handleSubjectChange(
                          index,
                          "marks",
                          e.target.value
                        )
                      }
                      className="
                        bg-slate-900
                        border border-slate-700
                        rounded-xl
                        p-3
                        text-white
                      "
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeSubject(index)
                      }
                      className="
                        bg-red-500
                        hover:bg-red-600
                        rounded-xl
                        text-white
                        flex items-center justify-center gap-2
                      "
                    >
                      <FaTrash />
                      Remove
                    </button>

                  </div>

                </motion.div>
              )
            )}

          </div>

          <div className="mt-10">

            <button
              type="submit"
              className="
                bg-gradient-to-r
                from-cyan-500
                to-blue-500
                hover:scale-105
                transition-all
                duration-300
                px-8 py-4
                rounded-2xl
                font-bold
                text-black
                flex items-center gap-3
              "
            >
              <FaSave />
              Update Student
            </button>

          </div>

        </form>

      </motion.div>

    </Tilt>

  </div>
);
}

export default EditStudent;