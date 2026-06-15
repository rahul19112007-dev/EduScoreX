import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function ReportCard() {
  const { id } = useParams();

  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      const { data } = await API.get(
        `/students/report/${id}`
      );

      setStudent(data);
    } catch (error) {
      console.log(error);
      alert("Failed to load report");
    }
  };

  const getGrade = (percentage) => {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B";
    if (percentage >= 60) return "C";
    if (percentage >= 50) return "D";
    return "F";
  };

  const attendancePercentage = () => {
    if (
      !student?.attendance ||
      !Array.isArray(student.attendance) ||
      student.attendance.length === 0
    ) {
      return 0;
    }

    const presentCount =
      student.attendance.filter(
        (item) =>
          item.status === "Present"
      ).length;

    return (
      (presentCount /
        student.attendance.length) *
      100
    ).toFixed(2);
  };

  if (!student) {
    return (
      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        <div className="bg-white shadow-2xl p-12 max-w-5xl mx-auto border border-gray-400">

          {/* School Header */}

          <div className="text-center border-b-4 border-black pb-6 mb-8">

            <h1 className="text-4xl font-black tracking-widest">
              EDUSCOREX PUBLIC SCHOOL
            </h1>

            <p className="text-gray-600 mt-2 text-lg">
              Academic Excellence Report Card
            </p>

            <h2 className="text-2xl font-bold mt-4">
              STUDENT REPORT CARD
            </h2>

          </div>

          {/* Print Button */}

          <div className="flex justify-end mb-6">
            <button
              onClick={() => window.print()}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Print Report
            </button>
          </div>

          {/* Student Information */}

          <div className="border border-black mb-8">

            <div className="grid grid-cols-2">

              <div className="border p-4">
                <strong>Student Name:</strong> {student.name}
              </div>

              <div className="border p-4">
                <strong>Roll Number:</strong> {student.rollNo}
              </div>

              <div className="border p-4">
                <strong>Class:</strong> {student.class}
              </div>

              <div className="border p-4">
                <strong>Student ID:</strong> {student._id}
              </div>

            </div>

          </div>

          {/* Academic Performance */}

          <h2 className="text-xl font-bold bg-gray-100 p-3 border border-gray-300">
            ACADEMIC PERFORMANCE
          </h2>

  <table className="w-full border border-gray-300 mb-8">

    <thead className="bg-gray-200">
      <tr>
        <th className="border p-3">Subject</th>
        <th className="border p-3">Marks</th>
        <th className="border p-3">Grade</th>
      </tr>
    </thead>

    <tbody>

      {student.subjects?.map((subject, index) => (
        <tr key={index}>
          <td className="border p-3">
            {subject.name}
          </td>

          <td className="border p-3 text-center">
            {subject.marks}
          </td>

          <td className="border p-3 text-center">
            {getGrade(subject.marks)}
          </td>
        </tr>
      ))}

    </tbody>

  </table>

  {/* Result Summary */}

  <h2 className="text-xl font-bold bg-gray-100 p-3 border border-gray-300">
    RESULT SUMMARY
  </h2>

  <table className="w-full border border-gray-300 mb-8">

    <tbody>

      <tr>
        <td className="border p-4 font-semibold">
          Total Marks
        </td>

        <td className="border p-4 text-center">
          {student.totalMarks}
        </td>

        <td className="border p-4 font-semibold">
          Percentage
        </td>

        <td className="border p-4 text-center">
          {student.percentage?.toFixed(2)}%
        </td>
      </tr>

      <tr>
        <td className="border p-4 font-semibold">
          Grade
        </td>

        <td className="border p-4 text-center">
          {getGrade(student.percentage)}
        </td>

        <td className="border p-4 font-semibold">
          Attendance
        </td>

        <td className="border p-4 text-center">
          {attendancePercentage()}%
        </td>
      </tr>

      <tr>
        <td className="border p-4 font-semibold">
          Result
        </td>

        <td
          colSpan="3"
          className="border p-4 text-center font-bold"
        >
          {student.percentage >= 40
            ? "PASS"
            : "FAIL"}
        </td>
      </tr>

    </tbody>

  </table>

  {/* Attendance */}

  <h2 className="text-xl font-bold bg-gray-100 p-3 border border-gray-300">
    ATTENDANCE RECORD
  </h2>

  <table className="w-full border mb-8">

    <thead className="bg-gray-200">

      <tr>
        <th className="border p-3">
          Date
        </th>

        <th className="border p-3">
          Status
        </th>
      </tr>

    </thead>

    <tbody>

      {student.attendance?.length > 0 ? (
        student.attendance.map((item, index) => (
          <tr key={index}>

            <td className="border p-3 text-center">
              {new Date(
                item.date
              ).toLocaleDateString()}
            </td>

            <td className="border p-3 text-center">
              {item.status}
            </td>

          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan="2"
            className="border p-3 text-center"
          >
            No attendance records
          </td>
        </tr>
      )}

    </tbody>

  </table>

{/* AI STUDY RECOMMENDATIONS */}

<div className="mt-10">

  <h2 className="text-3xl font-bold mb-6">
    🧠 AI Study Recommendations
  </h2>

  <div
    className="
    relative
    overflow-hidden
    rounded-3xl
    p-8
    bg-gradient-to-br
    from-cyan-500/10
    via-blue-500/10
    to-purple-500/10
    border
    border-cyan-400/20
    backdrop-blur-xl
    shadow-2xl
    "
  >

    <div
      className="
      absolute
      w-64
      h-64
      bg-cyan-500/10
      blur-3xl
      rounded-full
      -top-10
      -right-10
      "
    />

    <div
      className="
      absolute
      w-64
      h-64
      bg-purple-500/10
      blur-3xl
      rounded-full
      -bottom-10
      -left-10
      "
    />

    {student.recommendations &&
    student.recommendations.length > 0 ? (

      <div className="space-y-4">

        {student.recommendations.map(
          (rec, index) => (

            <div
              key={index}
              className="
              bg-white/5
              border
              border-cyan-500/10
              p-5
              rounded-2xl
              hover:scale-[1.02]
              transition-all
              duration-300
              "
            >
              <div className="flex items-center gap-3">

                <div
                  className="
                  w-10
                  h-10
                  rounded-full
                  bg-cyan-500/20
                  flex
                  items-center
                  justify-center
                  text-cyan-300
                  font-bold
                  "
                >
                  AI
                </div>

                <p className="text-lg">
                  {rec}
                </p>

              </div>
            </div>

          )
        )}

      </div>

    ) : (

      <div
        className="
        text-center
        text-gray-500
        text-lg
        "
      >
        No recommendations available
      </div>

    )}

  </div>

</div>

   {/* Signatures */}

  <div className="mt-20 flex justify-between">

    <div className="text-center">
      <div className="border-t border-black w-48"></div>
      <p className="mt-2 font-medium">
        Class Teacher
      </p>
    </div>

    <div className="text-center">
      <div className="border-t border-black w-48"></div>
      <p className="mt-2 font-medium">
        Principal
      </p>
    </div>

  </div>

        </div>
      </div>
    </div>
  );
}

export default ReportCard;