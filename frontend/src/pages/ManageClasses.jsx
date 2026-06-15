
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaBook,
} from "react-icons/fa";
import API from "../services/api";

function ManageClasses() {
  const [className, setClassName] = useState("");
  const [subjects, setSubjects] = useState([""]);
  const [classes, setClasses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingSubject, setEditingSubject] = useState(null);
  const [newSubjectName, setNewSubjectName] = useState("");

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

  const addSubject = () => {
    setSubjects([...subjects, ""]);
  };

  const handleSubjectChange = (index, value) => {
    const updated = [...subjects];
    updated[index] = value;
    setSubjects(updated);
  };

  const saveClass = async () => {
    try {
      if (editingId) {
        await API.put(`/classes/${editingId}`, {
          className,
          subjects,
        });
      } else {
        await API.post("/classes", {
          className,
          subjects,
        });
      }

      alert(
        editingId
          ? "Class Updated Successfully"
          : "Class Saved Successfully"
      );

      setClassName("");
      setSubjects([""]);
      setEditingId(null);

      fetchClasses();
    } catch (error) {
      console.log(error);
      alert("Error Saving Class");
    }
  };

  const editClass = (cls) => {
    setEditingId(cls._id);
    setClassName(cls.className);
    setSubjects(cls.subjects);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteClass = async (id) => {
    try {
      await API.delete(`/classes/${id}`);
      alert("Class Deleted");
      fetchClasses();
    } catch (error) {
      console.log(error);
    }
  };

  const renameSubject = async (
    cls,
    subjectIndex
  ) => {
    try {
      const updatedSubjects = [...cls.subjects];

      updatedSubjects[subjectIndex] =
        newSubjectName;

      await API.put(
        `/classes/${cls._id}`,
        {
          className: cls.className,
          subjects: updatedSubjects,
        }
      );

      setEditingSubject(null);
      setNewSubjectName("");

      fetchClasses();
    } catch (error) {
      console.log(error);
    }
  };

  const removeSubjectFromClass = async (
    cls,
    subjectIndex
  ) => {
    try {
      const updatedSubjects =
        cls.subjects.filter(
          (_, index) =>
            index !== subjectIndex
        );

      await API.put(
        `/classes/${cls._id}`,
        {
          className: cls.className,
          subjects: updatedSubjects,
        }
      );

      fetchClasses();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      {/* HEADER */}

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Manage Classes
        </h1>

        <p className="text-slate-400 mt-2">
          Create and manage academic structures
        </p>
      </motion.div>

      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-slate-900 rounded-3xl p-6 border border-cyan-500/20">
          <h3 className="text-slate-400">
            Total Classes
          </h3>

          <p className="text-4xl font-black text-cyan-400">
            {classes.length}
          </p>
        </div>

        <div className="bg-slate-900 rounded-3xl p-6 border border-purple-500/20">
          <h3 className="text-slate-400">
            Total Subjects
          </h3>

          <p className="text-4xl font-black text-purple-400">
            {classes.reduce(
              (sum, c) =>
                sum + c.subjects.length,
              0
            )}
          </p>
        </div>

        <div className="bg-slate-900 rounded-3xl p-6 border border-green-500/20">
          <h3 className="text-slate-400">
            Status
          </h3>

          <p className="text-green-400 font-bold">
            ACTIVE
          </p>
        </div>

      </div>

      {/* FORM */}

      <div className="bg-slate-900 border border-cyan-500/20 rounded-3xl p-8 shadow-2xl mb-10">

        <input
          type="text"
          placeholder="Class Name"
          value={className}
          onChange={(e) =>
            setClassName(e.target.value)
          }
          className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 mb-4 outline-none"
        />

        <h2 className="mb-4 font-bold">
          Subjects
        </h2>

        {subjects.map((subject, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Subject ${index + 1}`}
            value={subject}
            onChange={(e) =>
              handleSubjectChange(
                index,
                e.target.value
              )
            }
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 mb-3 outline-none"
          />
        ))}

        <div className="flex gap-3">

          <button
            onClick={addSubject}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 rounded-xl font-bold"
          >
            <FaPlus className="inline mr-2" />
            Add Subject
          </button>

          <button
            onClick={saveClass}
            className="bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-3 rounded-xl font-bold"
          >
            Save Class
          </button>

        </div>

      </div>

      {/* SAVED CLASSES */}

      <h2 className="text-3xl font-bold mb-6">
        Saved Classes
      </h2>

      {classes.map((cls) => (
        <Tilt
          key={cls._id}
          tiltMaxAngleX={8}
          tiltMaxAngleY={8}
          scale={1.02}
        >
          <motion.div
            whileHover={{ y: -8 }}
            className="bg-slate-900 border border-cyan-500/20 rounded-3xl p-6 shadow-2xl mb-6"
          >
            <h3 className="text-2xl font-bold mb-4">
              {cls.className}
            </h3>

            <div className="flex flex-wrap gap-3 mb-4">

              {cls.subjects.map(
                (subject, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2"
                  >
                    {editingSubject ===
                    `${cls._id}-${index}` ? (
                      <>
                        <input
                          value={
                            newSubjectName
                          }
                          onChange={(e) =>
                            setNewSubjectName(
                              e.target.value
                            )
                          }
                          className="bg-slate-800 border border-slate-700 rounded px-3 py-1"
                        />

                        <button
                          onClick={() =>
                            renameSubject(
                              cls,
                              index
                            )
                          }
                          className="bg-green-500 px-2 py-1 rounded"
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 px-4 py-2 rounded-full border border-cyan-500/20">
                          <FaBook className="inline mr-2" />
                          {subject}
                        </span>

                        <button
                          onClick={() => {
                            setEditingSubject(
                              `${cls._id}-${index}`
                            );

                            setNewSubjectName(
                              subject
                            );
                          }}
                          className="text-yellow-400"
                        >
                          Rename
                        </button>

                        <button
                          onClick={() =>
                            removeSubjectFromClass(
                              cls,
                              index
                            )
                          }
                          className="text-red-400"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                )
              )}

            </div>

            <div className="flex gap-3">

              <button
                onClick={() =>
                  editClass(cls)
                }
                className="bg-blue-500 px-4 py-2 rounded-xl"
              >
                <FaEdit />
              </button>

              <button
                onClick={() =>
                  deleteClass(cls._id)
                }
                className="bg-red-500 px-4 py-2 rounded-xl"
              >
                <FaTrash />
              </button>

            </div>

          </motion.div>
        </Tilt>
      ))}

    </div>
  );
}

export default ManageClasses;
